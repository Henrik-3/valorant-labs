const Canvas = require("canvas")
const { MessageAttachment, Permissions, Client } = require("discord.js")
const fs = require("fs")
const basedata = require("./basedata.json")
const MongoClient = require('mongodb').MongoClient;
const bot = new MongoClient(basedata.mongoaccess);
bot.connect()
var linkjson = JSON.parse(fs.readFileSync('lang.json'))
const axios = require("axios")
const moment = require('moment')
const system = require("systeminformation")
const pretty = require('pretty-bytes')
const randomize = require('randomatic')

Canvas.registerFont('commands/fonts/product_sans.ttf', { family: 'product_sans' })
Canvas.registerFont('commands/fonts/valorant_font.ttf', { family: 'valorant_font'})
Canvas.registerFont('commands/fonts/umeboshi_.ttf', { family: 'japan2'})
Canvas.registerFont('commands/fonts/anton.ttf', { family: 'anton'})

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getSettings(lang, type) {
    return await bot.db("VALORANT-LABS").collection("settings").find({$where: `this.${type} !== false && this.lang == '${lang}'`}).toArray()
}
  
async function addSettings(lang, guild_id) {
    await bot.db("VALORANT-LABS").collection("settings").insertOne({prefix: 'v?', news: false, onews: false, serverstatus: false, lang: lang, blacklist: false, gid: guild_id})
}

async function checkGuild(guild_id) {
    var guild = await bot.db("VALORANT-LABS").collection("settings").find({gid: guild_id}).toArray()
    return guild.length != 0 ? 1 : 0
}
  
async function getGuildSettings(guild_id) {
    var guild = await bot.db("VALORANT-LABS").collection("settings").find({gid: guild_id}).toArray()
    if(guild.length == 0) {
        await bot.db("VALORANT-LABS").collection("settings").insertOne({gid: guild_id, news: false, lang: "en-us", blacklist: false, prefix: "v?"})
        return {gid: guild_id, news: false, lang: "en-us", blacklist: false, prefix: "v?"}
    }
    return guild[0]
}
  
async function getGuildBlacklist(guild_id) {
    var res = await bot.db("VALORANT-LABS").collection("blacklist").find({gid: guild_id}).toArray()
    if(res.length) return res[0].entrys
    return []
}

async function addGuildBlacklist(bot, guild_id, channel_id) {
    var res = await bot.db("VALORANT-LABS").collection("blacklist").find({gid: guild_id}).toArray()
    var newarray = res.length != 0 ? res[0].entrys : []
    if(newarray.includes(channel_id)) return 404
    newarray.push(channel_id)
    await bot.db("VALORANT-LABS").collection("blacklist").updateOne({gid: guild_id}, {$set: {entrys: newarray}}, {upsert: true})
    return newarray
}

async function removeGuildBlacklist(bot, guild_id, channel_id) {
    var res = await bot.db("VALORANT-LABS").collection("blacklist").find({gid: guild_id}).toArray()
    if(res.length == 0) return
    if(!res[0].entrys.includes(channel_id)) return 404
    var indexnumber = res[0].entrys.findIndex(element => element == channel_id)
    res[0].entrys.splice(indexnumber, 1)
    await bot.db("VALORANT-LABS").collection("blacklist").updateOne({gid: guild_id}, {$set: {entrys: res[0].entrys}}, {upsert: false})
    return res[0].entrys.length == 0 ? "**None**" : res[0].entrys
}

async function getGuildBlacklist_js(bot, guild_id) {
    var res = await bot.db("VALORANT-LABS").collection("blacklist").find({gid: guild_id}).toArray()
    if(res.length == 0) return "**None**" 
    return res[0].entrys.length == 0 ? "**None**" : res[0].entrys
}

async function fetchWebsite(type, ccode, client) {
    if(type == "patchnotes") {
        var website2 = await axios.get(websites[ccode].website).catch(error => {return error})
        if(website2.response) return
        var db = await bot.db("VALORANT-LABS").collection("websitecheck").findOne({code: ccode})
        var article = website2.data.result.data.allContentstackArticles.nodes.filter(item => Date.parse(item.date) > Number(db.datewebsite) && item.url.url.includes("game-updates"))
        if(article.length != 0) {
            article = article.reverse()
            bot.db("VALORANT-LABS").collection("websitecheck").updateOne({code: ccode}, {$set: {datewebsite: Date.now()}})
            var fetch = await getSettings(websites[ccode].dguilds, "news")
            article.forEach(article => {
                fetch.forEach(guild => {
                    let channel = guild.news.replace(/[^0-9]/g, '')
                    guild = client.guilds.cache.get(guild.gid)
                    if (guild) {
                      channel = guild.channels.cache.get(channel)
                      if (channel) {
                        channel.send({embeds: [{
                            color: 0xff4654,
                            description: article.description,
                            title: article.title,
                            url: article.article_type == 'External Link' ? article.external_link : `https://playvalorant.com/ja-JP/${article.url.url}`,
                            image: {
                                url: article.banner.url
                            }, 
                            timestamp: new Date().toISOString(),
                            footer: {
                                text: 'VALORANT LABS [AUTONEWS WEBSITE]'
                            }
                        }]})
                        return null;
                      }
                    }
                })
            })
        }
        return
    } else if(type == "othernews") {
        var website2 = await axios.get(websites[ccode].website).catch(error => {return error})
        if(website2.response) return
        var db = await bot.db("VALORANT-LABS").collection("websitecheck").findOne({code: ccode})
        var article = website2.data.result.data.allContentstackArticles.nodes.filter(item => Date.parse(item.date) > Number(db.datewebsite) && !item.url.url.includes("game-updates"))
        if(article.length != 0) {
            article = article.reverse()
            bot.db("VALORANT-LABS").collection("websitecheck").updateOne({code: ccode}, {$set: {datewebsite: Date.now()}})
            var fetch = await getSettings(websites[ccode].dguilds, "onews")
            article.forEach(article => {
                fetch.forEach(guild => {
                    let channel = guild.news.replace(/[^0-9]/g, '')
                    guild = client.guilds.cache.get(guild.gid)
                    if (guild) {
                      channel = guild.channels.cache.get(channel)
                      if (channel) {
                        channel.send({embeds: [{
                            color: 0xff4654,
                            description: article.description,
                            title: article.title,
                            url: article.article_type == 'External Link' ? article.external_link : `https://playvalorant.com/ja-JP/${article.url.url}`,
                            image: {
                                url: article.banner.url
                            }, 
                            timestamp: new Date().toISOString(),
                            footer: {
                                text: 'VALORANT LABS [AUTONEWS WEBSITE]'
                            }
                        }]})
                        return null;
                      }
                    }
                })
            })
        }
    } else if(type == "maintenance") {
        var website2 = await axios.get(websites[ccode].status).catch(error => {return error})
        if(website2.response) return
        var article = website2.data.data.maintenances[0]
        if(!website2.data.data.maintenances.length) return
        article.updates[0].updated_at = Date.parse(article.updates[0].updated_at)
        var db = await bot.db("VALORANT-LABS").collection("websitecheck").findOne({code: ccode})
        if(article.updates[0].updated_at > Number(db.datestatusmaintenance)) {
            bot.db("VALORANT-LABS").collection("websitecheck").updateOne({code: ccode}, {$set: {datestatusmaintenance: Date.parse(article.updates[0].updated_at)}})
            var fetch = await getSettings(websites[ccode].dguilds, "serverstatus")
            moment.locale(websites[ccode].moment)
            fetch.forEach(guild => {
                let channel = guild.news.replace(/[^0-9]/g, '')
                guild = client.guilds.cache.get(guild.gid)
                if (guild) {
                    channel = guild.channels.cache.get(channel)
                    if (channel) {
                        channel.send({embeds: [{
                            color: 0xff4654,
                            description: article.updates[0].translations.find(c => c.locale == websites[ccode].locale).content != undefined ? article.updates[0].translations.find(c => c.locale == websites[ccode].locale).content : article.updates[0].translations.find(c => c.locale == 'en_US').content,
                            title: article.titles.find(c => c.locale == websites[ccode].locale).content != undefined ? article.titles.find(c => c.locale == websites[ccode].locale).content : article.titles.find(c => c.locale == 'en_US').content,
                            fields: [
                                { name: 'Erstellt am:', value: moment(article.created_at).format('LLLL'), inline: true},
                                { name: 'Platformen betroffen:', value: article.platforms[0], inline: true},
                            ], 
                            timestamp: new Date().toISOString(),
                            footer: {
                                text: websites[ccode].footer
                            }
                        }]})
                        return null;
                    }
                }
            })
        }
    } else if(type == "incidents") {
        var website2 = await axios.get(websites[ccode].status).catch(error => {return error})
        if(website2.response) return
        var article = website2.data.data.incidents[0]
        if(!website2.data.data.incidents.length) return
        article.updates[0].updated_at = Date.parse(article.updates[0].updated_at)
        var db = await bot.db("VALORANT-LABS").collection("websitecheck").findOne({code: ccode})
        if(article.updates[0].updated_at > Number(db.datestatusincidents)) {
            bot.db("VALORANT-LABS").collection("websitecheck").updateOne({code: ccode}, {$set: {datestatusincidents: Date.parse(article.updates[0].updated_at)}})
            var fetch = await getSettings(websites[ccode].dguilds, "serverstatus")
            moment.locale(websites[ccode].moment)
            fetch.forEach(guild => {
                let channel = guild.news.replace(/[^0-9]/g, '')
                guild = client.guilds.cache.get(guild.gid)
                if (guild) {
                    channel = guild.channels.cache.get(channel)
                    if (channel) {
                        channel.send({embeds: [{
                            color: 0xff4654,
                            description: article.updates[0].translations.find(c => c.locale == websites[ccode].locale).content != undefined ? article.updates[0].translations.find(c => c.locale == websites[ccode].locale).content : article.updates[0].translations.find(c => c.locale == 'en_US').content,
                            title: article.titles.find(c => c.locale == websites[ccode].locale).content != undefined ? article.titles.find(c => c.locale == websites[ccode].locale).content : article.titles.find(c => c.locale == 'en_US').content,
                            fields: [
                                { name: 'Erstellt am:', value: moment(article.created_at).format('LLLL'), inline: true},
                                { name: 'Platformen betroffen:', value: article.platforms[0], inline: true},
                            ], 
                            timestamp: new Date().toISOString(),
                            footer: {
                                text: websites[ccode].footer
                            }
                        }]})
                        return null;
                    }
                }
            })
        }
    }
}

async function getPreGameData(gamekey) {
    var req = await bot.db("VALORANT-LABS").collection("games").find({gamekey: gamekey}).toArray()
    return req.length == 0 ? 404 : req[0]
}

async function getUser(author_id) {
    var res = await bot.db("VALORANT-LABS").collection("link").findOne({user_id: String(author_id)})
    if(res == null) return 404
    return res.ingamename != undefined ? res : 400
}

async function getGuild(message, guild_id) {
    var check = await bot.db("VALORANT-LABS").collection("settings").find({gid: guild_id}).toArray()
    if(check.length != 0) {
      message.reply({embeds: [{
        color: 0xff4654,
        title: "VALORANT LABS Settings",
        description: "Settings for " + message.guild.name,
        fields: [
          {name: "prefix", value: check[0].prefix},
          {name: "patchnotes", value: String(check[0].news)},
          {name: "othernews", value: String(check[0].onews)},
          {name: "serverstatus", value: String(check[0].serverstatus)},
          {name: "language", value: check[0].lang},
          {name: "blacklist", value: String(check[0].blacklist)}
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'VALORANT LABS [SETTINGS]',
          icon_url: "https://valorantlabs.xyz/valorantlabs.png"
        }
      }]})
    } else {
      await bot.db("VALORANT-LABS").collection("settings").insert({prefix: 'v?', news: false, onews: false, serverstatus: false, lang: lang, blacklist: false, gid: guild_id})
      message.reply({embeds: [{
        color: 0xff4654,
        title: "VALORANT LABS Settings",
        description: "Settings for " + message.guild.name,
        fields: [
          {name: "prefix", value: "v?"},
          {name: "patchnotes", value: "false"},
          {name: "othernews", value: "false"},
          {name: "serverstatus", value: "false"},
          {name: "language", value: "en-us"},
          {name: "blacklist", value: "false"}
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'VALORANT LABS [SETTINGS]',
          icon_url: "https://valorantlabs.xyz/valorantlabs.png"
        }
      }]})
    }
}

async function updateGuild(message, key, value) {
    var check = await bot.db("VALORANT-LABS").collection("settings").find({gid: message.guild.id}).toArray()
    if(check.length != 0) {
      var field
      if(key == "prefix") {
        await bot.db("VALORANT-LABS").collection("settings").updateOne({gid: message.guild.id}, {$set: {prefix: value}}, {upsert: false})
        field = [{name: "prefix", value: value},{name: "patchnotes", value: String(check[0].news)},{name: "othernews", value: String(check[0].onews)},{name: "serverstatus", value: String(check[0].serverstatus)},{name: "language", value: check[0].lang},{name: "blacklist", value: String(check[0].blacklist)}]
      }
      if(key == "lang") {
        await bot.db("VALORANT-LABS").collection("settings").updateOne({gid: message.guild.id}, {$set: {lang: value}}, {upsert: false})
        field = [{name: "prefix", value: check[0].prefix},{name: "patchnotes", value: String(check[0].news)},{name: "othernews", value: String(check[0].onews)},{name: "serverstatus", value: String(check[0].serverstatus)},{name: "language", value: value},{name: "blacklist", value: String(check[0].blacklist)}]
      }
      if(key == "patchnotes"){
        await bot.db("VALORANT-LABS").collection("settings").updateOne({gid: message.guild.id}, {$set: {news: value}}, {upsert: false})
        field = [{name: "prefix", value: check[0].prefix},{name: "patchnotes", value: String(value)},{name: "othernews", value: String(check[0].onews)},{name: "serverstatus", value: String(check[0].serverstatus)},{name: "language", value: check[0].lang},{name: "blacklist", value: String(check[0].blacklist)}]
      }
      if(key == "othernews") {
        await bot.db("VALORANT-LABS").collection("settings").updateOne({gid: message.guild.id}, {$set: {onews: value}}, {upsert: false})
        field = [{name: "prefix", value: value},{name: "patchnotes", value: String(check[0].news)},{name: "othernews", value: String(value)},{name: "serverstatus", value: String(check[0].serverstatus)},{name: "language", value: check[0].lang},{name: "blacklist", value: String(check[0].blacklist)}]
      }
      if(key == "serverstatus") {
        await bot.db("VALORANT-LABS").collection("settings").updateOne({gid: message.guild.id}, {$set: {serverstatus: value}}, {upsert: false})
        field = [{name: "prefix", value: value},{name: "patchnotes", value: String(check[0].news)},{name: "othernews", value: String(check[0].onews)},{name: "serverstatus", value: String(value)},{name: "language", value: check[0].lang},{name: "blacklist", value: String(check[0].blacklist)}]
      }
      if(key == "blacklist") {
        await bot.db("VALORANT-LABS").collection("settings").updateOne({gid: message.guild.id}, {$set: {blacklist: Boolean(value)}}, {upsert: false})
        field = [{name: "prefix", value: check[0].prefix},{name: "patchnotes", value: String(check[0].news)},{name: "othernews", value: String(check[0].onews)},{name: "serverstatus", value: String(check[0].serverstatus)},{name: "language", value: check[0].lang},{name: "blacklist", value: String(value)}]
      }
      message.reply({embeds: [{
        color: 0xff4654,
        title: "VALORANT LABS Settings",
        description: "Settings for " + message.guild.name,
        fields: field,
        timestamp: new Date().toISOString(),
        footer: {
          text: 'VALORANT LABS [SETTINGS]',
          icon_url: "https://valorantlabs.xyz/valorantlabs.png"
        }
      }]})
    }
}
  
async function addUser(bot, author_id, name, tag) {
    await bot.db("VALORANT-LABS").collection("link").updateOne({user_id: author_id}, {$set: {ingamename: name, ingametag: tag}}, {upsert: true})
}

async function deleteUser(bot, author_id) {
    await bot.db("VALORANT-LABS").collection("link").deleteOne({user_id: author_id})
}

async function checkPrivacy(name, tag) {
    var puuid = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURI(name)}/${encodeURI(tag)}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
    if(puuid.response && puuid.response.status == 404) return {status: 404, name: name, tag: tag}
    if(puuid.response) return {status: puuid.response.status, name: name, tag: tag}
    var dbentry = await bot.db("VALORANT-LABS").collection("rso").findOne({puuid: puuid.data.puuid})
    if(dbentry == null) return {status: 451, puuid: puuid.data.puuid, name: name, tag: tag}
    var region = await bot.db("VALORANT-LABS").collection("userstats").findOne({puuid: puuid.data.puuid})
    return {status: 200, region: region.region, puuid: puuid.data.puuid, name: name, tag: tag, type: region.type, ingamepuuid: region.ingamepuuid == null ? null : region.ingamepuuid}
}

async function checkPrivacyInteraction(puuid3) {
    var puuid = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid3}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
    if(puuid.response && puuid.response.status == 404) return {status: 404, name: puuid.data.gameName, tag: puuid.data.tagLine}
    if(puuid.response) return {status: puuid.response.status,name: puuid.data.gameName, tag: puuid.data.tagLine}
    var dbentry = await bot.db("VALORANT-LABS").collection("rso").findOne({puuid: puuid3})
    if(dbentry == null) return {status: 451, puuid: puuid3, name: puuid.data.gameName, tag: puuid.data.tagLine}
    var region = await bot.db("VALORANT-LABS").collection("userstats").findOne({puuid: puuid3})
    return {status: 200, region: region.region, puuid: puuid3, name: puuid.data.gameName, tag: puuid.data.tagLine, type: region.type, ingamepuuid: region.ingamepuuid == null ? null : region.ingamepuuid}
}

function text(ctx, content, size, x, y, color="#ffffff", textAlign="left", font="anton", rotate=false) {
    ctx.font = `${size}px ${font}`
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    if(rotate == true) {
        ctx.save();
        ctx.translate(200, 1080);
        ctx.rotate(-0.5*Math.PI);
        ctx.fillText(content, 0, 0);
        ctx.restore();
    } else {
        ctx.fillText(content, x, y)
    }
}

function errorhandler(message, status, command, guilddata, data) {
    if(status == 451) return message.reply({embeds: [{title: statuscodes[status][command][guilddata.lang].title, description: statuscodes[status][command][guilddata.lang].description, color: 0xff4654}], components: [{type: 1, components: [{type: 2, style: 5, url: `https://valorantlabs.xyz/v1/login?guild=${message.guild.id}&channel=${message.channel.id}&message=${message.id}&puuid=${data.puuid}`, label: statuscodes[status][command][guilddata.lang].components_login}, {type: 2, style: 4, customId: `update;${data.puuid}`, label: statuscodes[status][command][guilddata.lang].components_update}, {type: 2, style: 4, label: statuscodes[status][command][guilddata.lang].components_rank, customId: `rank;${data.name};${data.tag}`}]}]})
    if(statuscodes[status] != undefined) return message.reply({embeds: [{title: statuscodes[status][command][guilddata.lang].title, description: statuscodes[status][command][guilddata.lang].description, color: 0xff4654}]})
    return message.reply({embeds: [{title: statuscodes["Unknown"][command][guilddata.lang].title, description: statuscodes[status][command][guilddata.lang].description, color: 0xff4654}]})
}

function errorhandlerinteraction(interaction, status, command, guilddata, data) {
    if(status == 451) {interaction.fetchReply(); return interaction.editReply({embeds: [{title: statuscodes[status][command][guilddata.lang].title, description: statuscodes[status][command][guilddata.lang].description, color: 0xff4654}], components: [{type: 1, components: [{type: 2, style: 5, url: `https://valorantlabs.xyz/v1/login?guild=${interaction.message.guild.id}&channel=${interaction.message.channel.id}&message=${interaction.message.id}&puuid=${data.puuid}`, label: statuscodes[status][command][guilddata.lang].components_login}, {type: 2, style: 4, customId: `update;${data.puuid}`, label: statuscodes[status][command][guilddata.lang].components_update}, {type: 2, style: 4, label: statuscodes[status][command][guilddata.lang].components_rank, customId: `rank;${data.name};${data.tag}`}]}]}) }
    if(statuscodes[status] != undefined) return interaction.editReply({embeds: [{title: statuscodes[status][command][guilddata.lang].title, description: statuscodes[status][command][guilddata.lang].description, color: 0xff4654}]})
    return interaction.editReply({embeds: [{title: statuscodes["Unknown"][command][guilddata.lang].title, description: statuscodes["Unknown"][command][guilddata.lang].description, color: 0xff4654}]})
}

const statuscodes = {
    404: {
        game: {
            de:  {
                title: "Spiel nicht gefunden",
                description: "Dieses Spiel wurde auf den VALORANT Servern nicht gefunden"
            },
            "en-gb":  {
                title: "Game not found",
                description: "This Game was not found on the VALORANT Servers"
            },
            "en-us":  {
                title: "Game not found",
                description: "This Game was not found on the VALORANT Servers"
            },
            "jp":  {
                title: "ゲームが見つかりません",
                description: "このゲームはVALORANTサーバーで見つかりませんでした"
            },
            "pt-br":  {
                title: "Jogo não encontrado",
                description: "Este jogo não foi encontrado nos servidores VALORANT"
            },
            fr:  {
                title: "Jeu introuvable",
                description: "Ce jeu n'a pas été trouvé sur les serveurs VALORANT"
            }
        },
        stats: {
            de: {
                title: "Spieler nicht gefunden",
                description: "Stelle sicher das der Account existiert, falls alles dennoch korrekt sein sollte warte 5min und versuche es noch einmal. Wenn der Fehler weiterhin existiert, trete dem Support Server bei und teile uns das Problem mit"
            },
            "en-gb": {
                title: "Player not found",
                description: "Make sure the account exist, if everything is correct wait 5min and try again. When the error still exist, join the support server"
            },
            "en-us": {
                title: "Player not found",
                description: "Make sure the account exist, if everything is correct wait 5min and try again. When the error still exist, join the support server"
            },
            jp: {
                title: "ユーザーの取得中にエラーが発生しました",
                description: "アカウントが存在することを確認します。すべてが正しい場合は、5分待ってから再試行してください。エラーがまだ存在する場合は、サポートサーバーに参加してください"
            },
            "pt-br": {
                title: "Erro ao buscar usuário",
                description: "Certifique-se de que a conta existe, se tudo estiver correto aguarde 5 minutos e tente novamente. Quando o erro ainda existir, entre no servidor de suporte"
            },
            fr: {
                title: "Erreur lors de la récupération de l'utilisateur",
                description: "Soit sûr que le compte existe, si tout est correcte attend 5min et réessaie. Si l'erreur persiste rejoint le serveur d'aide"
            }
        }
    },
    451: {
        stats: {
            de: {
                title: "Dieser Account ist privat",
                description: "Insofern dies dein Account ist, drücke auf den 'Einloggen' Button unter dieser Nachricht um VALORANT LABS die Berechtigung zu geben Match Daten von dir sammeln, dafür musst du dich über RSO (Riot Sign On) einloggen. Nachdem du dich eingeloggt hast, sollte sich diese Nachricht automatisch aktualisieren. Insofern dies nicht der Fall ist, nutze einfach den 'Aktualisieren' Button unter dieser Nachricht. Insofern du bereits Stats bei tracker.gg hast und dort eingeloggt bist wird der Bot Versuchen diese zu übernehmen.",
                components_login: "Einloggen",
                components_update: "Aktualisieren",
                components_rank: "Zeige MMR"
            },
            "en-gb": {
                title: "This account is private",
                description: "If this is your account, press the 'Login' button below this message to give VALORANT LABS the authorization to collect match data from you, for this you have to log in via RSO (Riot Sign On). After you have logged in, this message should update itself automatically. If this is not the case, simply use the 'Update' button below this message. If you already have stats at tracker.gg and are logged in there, the bot will try to take them over.",
                components_login: "Login",
                components_update: "Update",
                components_rank: "Show MMR"
            },
            "en-us": {
                title: "This account is private",
                description: "If this is your account, press the 'Log in' button below this message to give VALORANT LABS the authorization to collect match data from you, for this you have to log in via RSO (Riot Sign On). After you have logged in, this message should update itself automatically. If this is not the case, simply use the 'Update' button below this message. If you already have stats at tracker.gg and are logged in there, the bot will try to take them over.",
                components_login: "Login",
                components_update: "Update",
                components_rank: "Show MMR"
            },
            jp: {
                title: "このアカウントは非公開です",
                description: "これがあなたのアカウントである場合は、このメッセージの下にある[ログイン]ボタンを押して、VALORANT LABSに一致データを収集する権限を与えます。これには、RSO（Riot Sign On）を介してログインする必要があります。ログインすると、このメッセージは自動的に更新されます。そうでない場合は、このメッセージの下にある[更新]ボタンを使用してください。すでにtracker.ggに統計があり、そこにログインしている場合、ボットはそれらを引き継ごうとします。",
                components_login: "ログイン",
                components_update: "更新",
                components_rank: "MMRを表示",
            },
            "pt-br": {
                title: "Esta conta é privada",
                description: "Se esta é a sua conta, pressione o botão 'Log in' abaixo desta mensagem para dar ao VALORANT LABS a autorização para coletar seus dados de jogo, para isso você deve fazer o login via RSO (Riot Sign On). Depois de fazer o login, esta mensagem deve ser atualizada automaticamente. Se este não for o caso, simplesmente use o botão 'Atualizar' abaixo desta mensagem. Se você já tem estatísticas em tracker.gg e está logado lá, o bot tentará controlá-las.",
                components_login: "Login",
                components_update: "Atualizar",
                components_rank: "Mostrar MMR"
            },
            fr: {
                title: "Ce compte est privé",
                description: "S'il s'agit de votre compte, appuyez sur le bouton « Connexion » sous ce message pour donner à VALORANT LABS l'autorisation de collecter des données de match auprès de vous, pour cela, vous devez vous connecter via RSO (Riot Sign On). Après vous être connecté, ce message devrait se mettre à jour automatiquement. Si ce n'est pas le cas, utilisez simplement le bouton 'Mettre à jour' sous ce message. Si vous avez déjà des statistiques sur tracker.gg et que vous y êtes connecté, le bot essaiera de les prendre en charge.",
                components_login : "Connexion",
                components_update : "Mettre à jour",
                components_rank : "Afficher le MMR"
            }
        }
    },
    "Unknown": {
        game: {
            de:  {
                title: "Fehler während der Serverabfrage",
                description: "Ein unbekannter Fehler ist aufgetreten, bitte warte einige Minuten. Sollte der Fehler weiterhin, joine auf den Support Server und melde das Problem"
            },
            "en-gb":  {
                title: "Error while fetching match",
                description: "Please try again in a few minutes. If the Error still exists join the support server and report the issue"
            },
            "en-us":  {
                title: "Error while fetching match",
                description: "Please try again in a few minutes. If the Error still exists join the support server and report the issue"
            },
            "jp":  {
                title: "一致のフェッチ中にエラーが発生しました",
                description: "数分後に再試行してください。エラーがまだ存在する場合は、サポートサーバーに参加して、問題を報告してください。"
            },
            "pt-br":  {
                title: "Erro ao buscar correspondência",
                description: "Por favor, tente novamente em alguns minutos. Se o erro ainda existir, entre no servidor de suporte e relate o problema"
            },
            fr:  {
                title: "Erreur lors de la récupération du match",
                description: "Veuillez réessayer dans quelques minutes. Si l'erreur persiste, rejoignez le serveur de support et signalez le problème"
            }
        }
    }
}

const websites = {
    "de": {
        website: "https://playvalorant.com/page-data/de-de/news/page-data.json",
        patch: "https://api.henrikdev.xyz/valorant/v1/website/de-de?filter=game_updates",
        status: "https://api.henrikdev.xyz/valorant/v1/status/eu",
        moment: "de",
        footer: "VALORANT LABS [AUTONEWS STATUS][EU]",
        dguilds: "de",
        locale: "de_DE"
    },
    "en-us": {
        website: "https://playvalorant.com/page-data/en-us/news/page-data.json",
        patch: "https://api.henrikdev.xyz/valorant/v1/website/en-us?filter=game_updates",
        status: "https://api.henrikdev.xyz/valorant/v1/status/na",
        moment: "en",
        footer: "VALORANT LABS [AUTONEWS STATUS][NA]",
        dguilds: "en-us",
        locale: "en_US"
    },
    "en-gb": {
        website: "https://playvalorant.com/page-data/en-gb/news/page-data.json",
        patch: "https://api.henrikdev.xyz/valorant/v1/website/en-gb?filter=game_updates",
        status: "https://api.henrikdev.xyz/valorant/v1/status/eu",
        moment: "en-gb",
        footer: "VALORANT LABS [AUTONEWS STATUS][EU]",
        dguilds: "en-gb",
        locale: "en_US"
    },
    "jp": {
        website: "https://playvalorant.com/page-data/ja-jp/news/page-data.json",
        patch: "https://api.henrikdev.xyz/valorant/v1/website/ja-jp?filter=game_updates",
        status: "https://api.henrikdev.xyz/valorant/v1/status/ap",
        moment: "ja",
        footer: "VALORANT LABS [AUTONEWS STATUS][AP]",
        dguilds: "jp",
        locale: "ja_JP"
    },
    "pt-br": {
        website: "https://playvalorant.com/page-data/pt-br/news/page-data.json",
        patch: "https://api.henrikdev.xyz/valorant/v1/website/pt-br?filter=game_updates",
        status: "https://api.henrikdev.xyz/valorant/v1/status/na",
        moment: "pt-br",
        footer: "VALORANT LABS [AUTONEWS STATUS][LATAM]",
        dguilds: "pt-br",
        locale: "pt_BR"
    },
    "fr": {
        website: "https://playvalorant.com/page-data/fr-fr/news/page-data.json",
        patch: "https://api.henrikdev.xyz/valorant/v1/website/fr-fr?filter=game_updates",
        status: "https://api.henrikdev.xyz/valorant/v1/status/eu",
        moment: "fr",
        footer: "VALORANT LABS [AUTONEWS STATUS][EU]",
        dguilds: "fr",
        locale: "fr_FR"
    }
}

const help = {
    "de": {
        1: "commands/images/help/Help1-Deutsch.png",
        2: "commands/images/help/Help2-Deutsch.png",
        3: "commands/images/help/Help3-Deutsch.png"
    },
    "en-us": {
        1: "commands/images/help/Help1-Englisch.png",
        2: "commands/images/help/Help2-Englisch.png",
        3: "commands/images/help/Help3-Englisch.png"
    },
    "en-gb": {
        1: "commands/images/help/Help1-Englisch.png",
        2: "commands/images/help/Help2-Englisch.png",
        3: "commands/images/help/Help3-Englisch.png"
    },
    "pt-br": {
        1: "commands/images/help/Help1-Portugisisch.png",
        2: "commands/images/help/Help2-Portugisisch.png",
        3: "commands/images/help/Help3-Portugisisch.png"
    },
    "jp": {
        1: "commands/images/help/Help1-Japanisch.png",
        2: "commands/images/help/Help2-Japanisch.png",
        3: "commands/images/help/Help3-Japanisch.png"
    },
    "fr": {
        1: "commands/images/help/Help1-Französisch.png",
        2: "commands/images/help/Help2-Französisch.png",
        3: "commands/images/help/Help3-Französisch.png"
    }
}

const agents = {
    astra: {
        name: "Astra",
        stats: "commands/images/stats/Astra.png",
        small: "commands/images/game/Astra.png",
        lang: {
            "de": "./commands/images/agent/Astra/Astra-Deutsch.png",
            "en-us": "./commands/images/agent/Astra/Astra-Englisch.png",
            "en-gb": "./commands/images/agent/Astra/Astra-Englisch.png",
            "fr": "./commands/images/agent/Astra/Astra-Französisch.png",
            "pt-br": "./commands/images/agent/Astra/Astra-Portugisisch.png",
            "jp": "./commands/images/agent/Astra/Astra-Japanisch.png"
        },
        role: {
            discordid: "<:controller:868803058711277598>"
        }
    },
    breach: {
        name: 'Breach',
        stats: "commands/images/stats/Breach.png",
        small: "commands/images/game/Breach.png",
        lang: {
            "de": "./commands/images/agent/Breach/Breach-Deutsch.png",
            "en-us": "./commands/images/agent/Breach/Breach-Englisch.png",
            "en-gb": "./commands/images/agent/Breach/Breach-Englisch.png",
            "fr": "./commands/images/agent/Breach/Breach-Französisch.png",
            "pt-br": "./commands/images/agent/Breach/Breach-Portugisisch.png",
            "jp": "./commands/images/agent/Breach/Breach-Japanisch.png"
        },
        role: {
            discordid: "<:initiator:868802616732303362>"
        }
    },
    brimstone: {
        name: 'Brimstone',
        stats: "commands/images/stats/Brimstone.png",
        small: "commands/images/game/Brimstone.png",
        lang: {
            "de": "./commands/images/agent/Brimstone/Brimstone-Deutsch.png",
            "en-us": "./commands/images/agent/Brimstone/Brimstone-Englisch.png",
            "en-gb": "./commands/images/agent/Brimstone/Brimstone-Englisch.png",
            "fr": "./commands/images/agent/Brimstone/Brimstone-Französisch.png",
            "pt-br": "./commands/images/agent/Brimstone/Brimstone-Portugisisch.png",
            "jp": "./commands/images/agent/Brimstone/Brimstone-Japanisch.png"
        },
        role: {
            discordid: "<:controller:868803058711277598>"
        }
    },
    cypher: {
        name: 'Cypher',
        stats: "commands/images/stats/Cypher.png",
        small: "commands/images/game/Cypher.png",
        lang: {
            "de": "./commands/images/agent/Cypher/Cypher-Deutsch.png",
            "en-us": "./commands/images/agent/Cypher/Cypher-Englisch.png",
            "en-gb": "./commands/images/agent/Cypher/Cypher-Englisch.png",
            "fr": "./commands/images/agent/Cypher/Cypher-Französisch.png",
            "pt-br": "./commands/images/agent/Cypher/Cypher-Portugisisch.png",
            "jp": "./commands/images/agent/Cypher/Cypher-Japanisch.png"
        },
        role: {
            discordid: "<:sentinel:868802869967597568>"
        }
    },
    jett: {
        name: 'Jett',
        stats: "commands/images/stats/Jett.png",
        small: "commands/images/game/Jett.png",
        lang: {
            "de": "./commands/images/agent/Jett/Jett-Deutsch.png",
            "en-us": "./commands/images/agent/Jett/Jett-Englisch.png",
            "en-gb": "./commands/images/agent/Jett/Jett-Englisch.png",
            "fr": "./commands/images/agent/Jett/Jett-Französisch.png",
            "pt-br": "./commands/images/agent/Jett/Jett-Portugisisch.png",
            "jp": "./commands/images/agent/Jett/Jett-Japanisch.png"
        },
        role: {
            discordid: "<:duelist:868802702258352178>"
        }
    },
    omen: {
        name: 'Omen',
        stats: "commands/images/stats/Omen.png",
        small: "commands/images/game/Omen.png",
        lang: {
            "de": "./commands/images/agent/Omen/Omen-Deutsch.png",
            "en-us": "./commands/images/agent/Omen/Omen-Englisch.png",
            "en-gb": "./commands/images/agent/Omen/Omen-Englisch.png",
            "fr": "./commands/images/agent/Omen/Omen-Französisch.png",
            "pt-br": "./commands/images/agent/Omen/Omen-Portugisisch.png",
            "jp": "./commands/images/agent/Omen/Omen-Japanisch.png"
        },
        role: {
            discordid: "<:controller:868803058711277598>"
        }
    },
    phoenix: {
        name: 'Phoenix',
        stats: "commands/images/stats/Phoenix.png",
        small: "commands/images/game/Phoenix.png",
        lang: {
            "de": "./commands/images/agent/Pheonix/Pheonix-Deutsch.png",
            "en-us": "./commands/images/agent/Pheonix/Pheonix-Englisch.png",
            "en-gb": "./commands/images/agent/Pheonix/Pheonix-Englisch.png",
            "fr": "./commands/images/agent/Pheonix/Pheonix-Französisch.png",
            "pt-br": "./commands/images/agent/Pheonix/Pheonix-Portugisisch.png",
            "jp": "./commands/images/agent/Pheonix/Pheonix-Japanisch.png"
        },
        role: {
            discordid: "<:duelist:868802702258352178>"
        }
    },
    raze: {
        name: 'Raze',
        stats: "commands/images/stats/Raze.png",
        small: "commands/images/game/Raze.png",
        lang: {
            "de": "./commands/images/agent/Raze/Raze-Deutsch.png",
            "en-us": "./commands/images/agent/Raze/Raze-Englisch.png",
            "en-gb": "./commands/images/agent/Raze/Raze-Englisch.png",
            "fr": "./commands/images/agent/Raze/Raze-Französisch.png",
            "pt-br": "./commands/images/agent/Raze/Raze-Portugisisch.png",
            "jp": "./commands/images/agent/Raze/Raze-Japanisch.png"
        },
        role: {
            discordid: "<:duelist:868802702258352178>"
        }
    },
    sage: {
        name: 'Sage',
        stats: "commands/images/stats/Sage.png",
        small: "commands/images/game/Sage.png",
        lang: {
            "de": "./commands/images/agent/Sage/Sage-Deutsch.png",
            "en-us": "./commands/images/agent/Sage/Sage-Englisch.png",
            "en-gb": "./commands/images/agent/Sage/Sage-Englisch.png",
            "fr": "./commands/images/agent/Sage/Sage-Französisch.png",
            "pt-br": "./commands/images/agent/Sage/Sage-Portugisisch.png",
            "jp": "./commands/images/agent/Sage/Sage-Japanisch.png"
        },
        role: {
            discordid: "<:sentinel:868802869967597568>"
        }
    },
    sova: {
        name: 'Sova',
        stats: "commands/images/stats/Sova.png",
        small: "commands/images/game/Sova.png",
        lang: {
            "de": "./commands/images/agent/Sova/Sova-Deutsch.png",
            "en-us": "./commands/images/agent/Sova/Sova-Englisch.png",
            "en-gb": "./commands/images/agent/Sova/Sova-Englisch.png",
            "fr": "./commands/images/agent/Sova/Sova-Französisch.png",
            "pt-br": "./commands/images/agent/Sova/Sova-Portugisisch.png",
            "jp": "./commands/images/agent/Sova/Sova-Japanisch.png"
        },
        role: {
            discordid: "<:initiator:868802616732303362>"
        }
    },
    viper: {
        name: 'Viper',
        stats: "commands/images/stats/Viper.png",
        small: "commands/images/game/Viper.png",
        lang: {
            "de": "./commands/images/agent/Viper/Viper-Deutsch.png",
            "en-us": "./commands/images/agent/Viper/Viper-Englisch.png",
            "en-gb": "./commands/images/agent/Viper/Viper-Englisch.png",
            "fr": "./commands/images/agent/Viper/Viper-Französisch.png",
            "pt-br": "./commands/images/agent/Viper/Viper-Portugisisch.png",
            "jp": "./commands/images/agent/Viper/Viper-Japanisch.png"
        },
        role: {
            discordid: "<:controller:868803058711277598>"
        }
    },
    reyna: {
        name: 'reyna',
        stats: "commands/images/stats/Reyna.png",
        small: "commands/images/game/Reyna.png",
        lang: {
            "de": "./commands/images/agent/Reyna/Reyna-Deutsch.png",
            "en-us": "./commands/images/agent/Reyna/Reyna-Englisch.png",
            "en-gb": "./commands/images/agent/Reyna/Reyna-Englisch.png",
            "fr": "./commands/images/agent/Reyna/Reyna-Französisch.png",
            "pt-br": "./commands/images/agent/Reyna/Reyna-Portugisisch.png",
            "jp": "./commands/images/agent/Reyna/Reyna-Japanisch.png"
        },
        role: {
            discordid: "<:duelist:868802702258352178>"
        }
    },
    killjoy: {
        name: 'killjoy',
        stats: "commands/images/stats/Killjoy.png",
        small: "commands/images/game/Killjoy.png",
        lang: {
            "de": "./commands/images/agent/Killjoy/Killjoy-Deutsch.png",
            "en-us": "./commands/images/agent/Killjoy/Killjoy-Englisch.png",
            "en-gb": "./commands/images/agent/Killjoy/Killjoy-Englisch.png",
            "fr": "./commands/images/agent/Killjoy/Killjoy-Französisch.png",
            "pt-br": "./commands/images/agent/Killjoy/Killjoy-Portugisisch.png",
            "jp": "./commands/images/agent/Killjoy/Killjoy-Japanisch.png"
        },
        role: {
            discordid: "<:sentinel:868802869967597568>"
        }
    },
    skye: {
        name: 'skye',
        stats: "commands/images/stats/Skye.png",
        small: "commands/images/game/Skye.png",
        lang: {
            "de": "./commands/images/agent/Skye/Skye-Deutsch.png",
            "en-us": "./commands/images/agent/Skye/Skye-Englisch.png",
            "en-gb": "./commands/images/agent/Skye/Skye-Englisch.png",
            "fr": "./commands/images/agent/Skye/Skye-Französisch.png",
            "pt-br": "./commands/images/agent/Skye/Skye-Portugisisch.png",
            "jp": "./commands/images/agent/Skye/Skye-Japanisch.png"
        },
        role: {
            discordid: "<:initiator:868802616732303362>"
        }
    },
    yoru: {
        name: 'Yoru',
        stats: "commands/images/stats/Yoru.png",
        small: "commands/images/game/Yoru.png",
        lang: {
            "de": "./commands/images/agent/Yoru/Yoru-Deutsch.png",
            "en-us": "./commands/images/agent/Yoru/Yoru-Englisch.png",
            "en-gb": "./commands/images/agent/Yoru/Yoru-Englisch.png",
            "fr": "./commands/images/agent/Yoru/Yoru-Französisch.png",
            "pt-br": "./commands/images/agent/Yoru/Yoru-Portugisisch.png",
            "jp": "./commands/images/agent/Yoru/Yoru-Japanisch.png"
        },
        role: {
            discordid: "<:duelist:868802702258352178>"
        }
    },
    "kay/o": {
        name: 'Kay/O',
        stats: "commands/images/stats/Kayo.png",
        small: "commands/images/game/Kayo.png",
        lang: {
            "de": "./commands/images/agent/Kayo/Kayo-Deutsch.png",
            "en-us": "./commands/images/agent/Kayo/Kayo-Englisch.png",
            "en-gb": "./commands/images/agent/Kayo/Kayo-Englisch.png",
            "fr": "./commands/images/agent/Kayo/Kayo-Französisch.png",
            "pt-br": "./commands/images/agent/Kayo/Kayo-Portugisisch.png",
            "jp": "./commands/images/agent/Kayo/Kayo-Japanisch.png"
        },
        role: {
            discordid: "<:initiator:868802616732303362>"
        }
    },
    "5f8d3a7f-467b-97f3-062c-13acf203c006": "Breach",
    "f94c3b30-42be-e959-889c-5aa313dba261": "Raze",
    "6f2a04ca-43e0-be17-7f36-b3908627744d": "Skye",
    "117ed9e3-49f3-6512-3ccf-0cada7e3823b": "Cypher",
    "ded3520f-4264-bfed-162d-b080e2abccf9": "Sova",
    "320b2a48-4d9b-a075-30f1-1f93a9b638fa": "Sova",
    "1e58de9c-4950-5125-93e9-a0aee9f98746": "Killjoy",
    "707eab51-4836-f488-046a-cda6bf494859": "Viper",
    "eb93336a-449b-9c1b-0a54-a891f7921d69": "Phoenix",
    "9f0d8ba9-4140-b941-57d3-a7ad57c6b417": "Brimstone",
    "7f94d92c-4234-0a36-9646-3a87eb8b5c89": "Yoru",
    "569fdd95-4d10-43ab-ca70-79becc718b46": "Sage",
    "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc": "Reyna",
    "8e253930-4c05-31dd-1b6c-968525494517": "Omen",
    "add6443a-41bd-e414-f6ad-e58d267f4e95": "Jett",
    "41fb69c1-4189-7b37-f117-bcaf1e96f1bf": "Astra",
    "601dbbe7-43ce-be57-2a40-4abd24953621": "KAY/O"
}

const ranks = {
    0: {
        image: "4.png",
        discordid: "<:unrated:862004031248924693>"
    },
    1: {
        image: "4.png",
        discordid: "<:unrated:862004031248924693>"
    },
    2: {
        image: "4.png",
        discordid: "<:unrated:862004031248924693>"
    },
    3: {
        image: "iron1.png",
        discordid: "<:iron1:862004162098102272>"
    },
    4: {
        image: "iron2.png",
        discordid: "<:iron2:862004185036488715>"
    },
    5: {
        image: "iron3.png",
        discordid: "<:iron3:862004206718025738>"
    },
    6: {
        image: "bronze1.png",
        discordid: "<:bronze1:862004343054008331>"
    },
    7: {
        image: "bronze2.png",
        discordid: "<:bronze2:862004376272109608>"
    },
    8: {
        image: "bronze3.png",
        discordid: "<:bronze3:862004410775371777>"
    },
    9: {
        image: "silver1.png",
        discordid: "<:silver1:862004807896268832>"
    },
    10: {
        image: "silver2.png",
        discordid: "<:silver2:862004860655501342>"
    },
    11: {
        image: "silver3.png",
        discordid: "<:silver3:862004895708086302>"
    },
    12: {
        image: "gold1.png",
        discordid: "<:gold1:862004921763364874>"
    },
    13: {
        image: "gold2.png",
        discordid: "<:gold2:862004943708094525>"
    },
    14: {
        image: "gold3.png",
        discordid: "<:gold3:862004966636781608>"
    },
    15: {
        image: "platin1.png",
        discordid: "<:plat1:862005172687470622>"
    },
    16: {
        image: "platin2.png",
        discordid: "<:plat2:862005201301143573>"
    },
    17: {
        image: "platin3.png",
        discordid: "<:plat3:862005224645853185>"
    },
    18: {
        image: "diamond1.png",
        discordid: "<:dia1:862005255628652554>"
    },
    19: {
        image: "diamond2.png",
        discordid: "<:dia2:862005278207508551>"
    },
    20: {
        image: "diamond3.png",
        discordid: "<:dia3:862005298193891378>"
    },
    21: {
        image: "immortal1.png",
        discordid: "<:immortal1:862005437264429056>"
    },
    22: {
        image: "immortal2.png",
        discordid: "<:immortal2:862005462580985856>"
    },
    23: {
        image: "immortal3.png",
        discordid: "<:immortal3:862005493840478208>"
    },
    24: {
        image: "radiant.png",
        discordid: "<:radiant:862005538392506408>"
    }
}

const maps = {
    "ascent": {
        maplayout: "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/displayicon.png",
        splash: "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/splash.png"
    },
    "split": {
        maplayout: "https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/displayicon.png",
        splash: "https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/splash.png"
    },
    "bind": {
        maplayout: "https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/displayicon.png",
        splash: "https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/splash.png"
    },
    "breeze": {
        maplayout: "https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/displayicon.png",
        splash: "https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/splash.png"
    },
    "icebox": {
        maplayout: "https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/displayicon.png",
        splash: "https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/splash.png"
    },
    "haven": {
        maplayout: "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/displayicon.png",
        splash: "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/splash.png"
    },
    "/Game/Maps/Triad/Triad": "Haven",
    "/Game/Maps/Port/Port": "Icebox",
    "/Game/Maps/Duality/Duality": "Bind",
    "/Game/Maps/Bonsai/Bonsai": "Split",
    "/Game/Maps/Ascent/Ascent": "Ascent",
    "/Game/Maps/Foxtrot/Foxtrot": "Breeze"
}

const modes = {
    Escalation: {
        name: "Escalation",
        path: "commands/images/stats/escalation.png",
        game: "escalation"
    },
    "Spike Rush": {
        name: "Spike Rush",
        path: "commands/images/stats/spikerush.png",
        game: "spikerush"
    },
    "Deathmatch": {
        name: "Deathmatch",
        path: "commands/images/stats/deathmatch.png",
        game: "deathmatch"
    },
    "Competitive": {
        name: "Competitive",
        path: "commands/images/stats/competitive.png",
        game: "competitive"
    },
    "Unrated": {
        name: "Unrated",
        path: "commands/images/stats/unrated.png",
        game: "unrated"
    },
    "Replication": {
        name: "Replication",
        path: "commands/images/stats/replication.png",
        game: "replication"
    }
}

const ranked = {
    "de": {
        link: "commands/images/ranked/Ranked-Deutsch.png"
    },
    "en-us": {
       link: "commands/images/ranked/Ranked-Englisch.png"
    },
    "en-gb": {
       link: "commands/images/ranked/Ranked-Englisch.png"
    },
    "jp": {
        link: "commands/images/ranked/Ranked-Japanisch.png"
    },
    "pt-br": {
        link: "commands/images/ranked/Ranked-Portugisisch.png"
    },
    "fr": {
        link: "commands/images/ranked/Ranked-Französisch.png"
    }
}

const agentid = {
    "5f8d3a7f-467b-97f3-062c-13acf203c006": "Breach",
    "f94c3b30-42be-e959-889c-5aa313dba261": "Raze",
    "6f2a04ca-43e0-be17-7f36-b3908627744d": "Skye",
    "117ed9e3-49f3-6512-3ccf-0cada7e3823b": "Cypher",
    "ded3520f-4264-bfed-162d-b080e2abccf9": "Sova",
    "320b2a48-4d9b-a075-30f1-1f93a9b638fa": "Sova",
    "1e58de9c-4950-5125-93e9-a0aee9f98746": "Killjoy",
    "707eab51-4836-f488-046a-cda6bf494859": "Viper",
    "eb93336a-449b-9c1b-0a54-a891f7921d69": "Phoenix",
    "9f0d8ba9-4140-b941-57d3-a7ad57c6b417": "Brimstone",
    "7f94d92c-4234-0a36-9646-3a87eb8b5c89": "Yoru",
    "569fdd95-4d10-43ab-ca70-79becc718b46": "Sage",
    "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc": "Reyna",
    "8e253930-4c05-31dd-1b6c-968525494517": "Omen",
    "add6443a-41bd-e414-f6ad-e58d267f4e95": "Jett",
    "41fb69c1-4189-7b37-f117-bcaf1e96f1bf": "Astra",
    "601dbbe7-43ce-be57-2a40-4abd24953621": "KAY/O"
}

const regions = {
    "na": {
        patchurl: "https://api.henrikdev.xyz/valorant/v1/status/na"
    }, 
    "eu": {
        patchurl: "https://api.henrikdev.xyz/valorant/v1/status/eu"
    }, 
    "ap": {
        patchurl: "https://api.henrikdev.xyz/valorant/v1/status/ap"
    }, 
    "oce": {
        patchurl: "https://api.henrikdev.xyz/valorant/v1/status/ap"
    }, 
    "br": {
        patchurl: "https://api.henrikdev.xyz/valorant/v1/status/na"
    }, 
    "kr": {
        patchurl: "https://api.henrikdev.xyz/valorant/v1/status/kr"
    }, 
    "la": {
        patchurl: "https://api.henrikdev.xyz/valorant/v1/status/na"
    }, 
    "latam": {
        patchurl: "https://api.henrikdev.xyz/valorant/v1/status/na"
    }
}

const weapons = {
    "de": {
        query: "de-DE"
    },
    "en-us": {
        query: "en-US"
    },
    "en-gb": {
        query: "en-US"
    },
    "pt-br": {
        query: "pt-BR"
    },
    "jp": {
        query: "ja-JP"
    },
    "fr": {
        query: "fr-FR"
    },
    "EWallPenetrationDisplayType::High": "High",
    "EWallPenetrationDisplayType::Medium": "Medium",
    "EWallPenetrationDisplayType::Low": "Low"
}

module.exports = {
    agents,
    bot,
    linkjson,
    Canvas,
    fs,
    fetchWebsite,
    getGuildBlacklist,
    getGuildSettings,
    getSettings,
    checkGuild,
    addSettings,
    capitalize,
    MessageAttachment,
    addGuildBlacklist,
    removeGuildBlacklist,
    getGuildBlacklist_js,
    Permissions,
    Client,
    system,
    pretty,
    text,
    axios,
    getPreGameData,
    errorhandler,
    websites,
    ranks,
    moment,
    help,
    getUser,
    addUser,
    deleteUser,
    maps,
    ranked,
    getGuild,
    updateGuild,
    checkPrivacy,
    agentid, 
    basedata,
    modes,
    randomize,
    errorhandlerinteraction,
    checkPrivacyInteraction,
    regions,
    weapons
}