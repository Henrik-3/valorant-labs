import {MongoClient} from 'mongodb'
import {readFileSync} from "fs"
import axios from "axios"
import system from "systeminformation"
import pretty from "pretty-bytes"
import {Message, Permissions} from 'discord.js'
import moment from "moment"
const basedata = JSON.parse(readFileSync("./basedata.json"))
const mongoclient = new MongoClient(basedata.mongoaccess)
mongoclient.connect()
const translations = JSON.parse(readFileSync("./translations.json"))

export default {
    perms: Permissions.FLAGS,
    sysinfo: system,
    pretty: pretty,
    axios: axios,
    translations: translations,
    topgg: basedata.dbltoken,
    valodb: mongoclient.db("VALORANT-LABS"),
    moment: moment,
    clusters: {
        na: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/na"
        },
        latam: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/latam"
        },
        br: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/br"
        },
        eu: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/eu"
        },
        kr: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/kr"
        },
        ap: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/ap"
        },
        oce: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/ap"
        }
    },
    locales: {
        de: "de",
        fr: "fr",
        "en-GB": "en-gb",
        "en-US": "en-us",
        ja: "jp",
        "pt-BR": "pt-br",
        "es-ES": "es",
        vi: "vi"
    },
    agents: [
        {
            name: "astra",
            id: "41fb69c1-4189-7b37-f117-bcaf1e96f1bf",
            discord_id: "<:controller:868803058711277598>"
        }
    ],
    guildSettings: async function (guild) {
        return (await this.valodb.collection("settings").findOneAndUpdate({gid: guild.id}, {$setOnInsert: {news: false, onews: false, serverstatus: false, lang: this.locales[guild.preferredLocale] ? this.locales[guild.preferredLocale] : "en-us", blacklist: false, prefix: "v?"}}, {upsert: true, returnDocument: "after"})).value
    },
    guildBlacklist: async function (guild) {
        const request = await this.valodb.collection("settings").findOne({gid: guild.id})
        if(!request) return null
        return request.entrys.length ? request.entrys : null
    },
    getLink: async function (id) {
        const request = await this.valodb.collection("link").findOne({user_id: id})
        return request ? request : null
    },
    getStatsDB: async function (account) {
        const puuid = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURI(account.name)}/${encodeURI(account.tag)}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
        if(puuid.response) return {status: puuid.response.status}
        const link = this.valodb.collection("rso").findOne({puuid: puuid.data.puuid})
        if(!link) return {status: 451, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine}
        const stats = this.valodb.collection("userstats").findOne({puuid: puuid.data.puuid})
        return {status: 200, stats: stats, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine}
    },
    getBlacklist: async function (guildId) {
        const request = await this.valodb.collection("blacklist").findOne({gid: guildId})
        return request ? request.entrys : null
    },
    addBlacklist: async function (data) {
        const res = await this.valodb.collection("blacklist").findOne({gid: data.guild})
        const newarray = res ? res.entrys : []
        if(newarray.includes(data.channel)) return null
        newarray.push(data.channel)
        await this.valodb.collection("blacklist").updateOne({gid: data.guild}, {$set: {entrys: newarray}}, {upsert: true})
        return newarray
    },
    removeBlacklist: async function (data) {
        const res = await this.valodb.collection("blacklist").findOne({gid: data.guild})
        if(!res) return undefined
        if(!res.entrys.includes(data.channel)) return null
        const indexnum = res.entrys.findIndex(item => item == data.channel)
        res.entrys.splice(indexnum, 1)
        await this.valodb.collection("blacklist").updateOne({gid: data.guild}, {$set: {entrys: res.entrys}}, {upsert: false})
        return res.entrys.length == 0 ? undefined : res.entrys
    },
    errorhandler: async function (error) {
        if(error.status == 451) return error.message.reply({embeds: [{title: this.translations[error.lang].response[451][error.type].title, description: this.translations[error.lang].response[451][error.type].description, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: "VALORANT LABS [ERROR 451]", icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].response[451].component_login, style: "LINK", url: `https://valorantlabs.xyz/v1/login?puuid=${error.puuid}`}, {type: "BUTTON", label: this.translations[error.lang].response[451].component_update, style: "DANGER", customId: `update;${error.puuid}`}, {type: "BUTTON", label: this.translations[error.lang].response[451].component_rank, style: "DANGER", customId: `rank;${error.name};${error.tag}`}]}]})
        if(!this.translations[error.lang].response[error.status]) return error.message.reply({embeds: [{title: this.translations[error.lang].response[500][error.type].title, description: this.translations[error.lang].response[500][error.type].description, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: "VALORANT LABS [ERROR 500]", icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
        return error.message.reply({embeds: [{title: this.translations[error.lang].response[error.status][error.type].title, description: this.translations[error.lang].response[error.status][error.type].description, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [ERROR ${error.status}]`, icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    },
    errorhandlerinteraction: async function (error) {
        if(error.status == 451) return error.interaction.editReply({embeds: [{title: this.translations[error.lang].response[451][error.type].title, description: this.translations[error.lang].response[451][error.type].description, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: "VALORANT LABS [ERROR 451]", icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].response[451].component_login, style: "LINK", url: `https://valorantlabs.xyz/v1/login?puuid=${error.puuid}`}, {type: "BUTTON", label: this.translations[error.lang].response[451].component_update, style: "DANGER", customId: `update;${error.puuid}`}, {type: "BUTTON", label: this.translations[error.lang].response[451].component_rank, style: "DANGER", customId: `rank;${error.name};${error.tag}`}]}]})
        if(!this.translations[error.lang].response[error.status]) return error.interaction.editReply({embeds: [{title: this.translations[error.lang].response[500][error.type].title, description: this.translations[error.lang].response[500][error.type].description, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: "VALORANT LABS [ERROR 500]", icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
        if(!this.translations[error.lang].response[error.status][error.type]) return error.interaction.editReply({embeds: [{title: this.translations[error.lang].response[error.status]["account"].title, description: this.translations[error.lang].response[error.status]["account"].description, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [ERROR ${error.status}]`, icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
        return error.interaction.editReply({embeds: [{title: this.translations[error.lang].response[error.status][error.type].title, description: this.translations[error.lang].response[error.status][error.type].description, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [ERROR ${error.status}]`, icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    },
    getGuild: async function (interaction) {
        const settings = await this.guildSettings(interaction.guild)
        return interaction.editReply({
            embeds: [{
                color: 0xff4654,
                title: "VALORANT LABS Settings",
                description: `Settings for ${interaction.guild.name}`,
                fields: [
                    {name: "Prefix", value: String(settings.prefix)},
                    {name: "Patchnotes", value: String(settings.news)},
                    {name: "Othernews", value: String(settings.onews)},
                    {name: "Serverstatus", value: String(settings.serverstatus)},
                    {name: "Language", value: String(settings.lang)},
                    {name: "Blacklist", value: String(settings.blacklist)}
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'VALORANT LABS [SETTINGS]',
                    icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
                }
            }]
        })
    },
    patchGuild: async function (data) {
        let doc
        switch(data.key) {
            case "prefix": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {prefix: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "language": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {lang: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "patchnotes": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {news: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "othernews": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {onews: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "serverstatus": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {serverstatus: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "blacklist": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {blacklist: Boolean(data.value)}}, {upsert: false, returnDocument: "after"})).value
                break
            }
        }
        return data.interaction.editReply({
            embeds: [{
                color: 0xff4654,
                title: "VALORANT LABS Settings",
                description: `Settings for ${data.interaction.guild.name}`,
                fields: [{name: "Prefix", value: String(doc.prefix)}, {name: "Patchnotes", value: String(doc.news)}, {name: "Othernews", value: String(doc.onews)}, {name: "Serverstatus", value: String(doc.serverstatus)}, {name: "Language", value: String(doc.lang)}, {name: "Blacklist", value: String(doc.blacklist)}],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'VALORANT LABS [SETTINGS]',
                    icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
                }
            }]
        })
    }
}