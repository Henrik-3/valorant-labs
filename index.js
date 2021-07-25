const { Client, Intents, Collection, Options, Interaction } = require("discord.js")
const basedata = require("./basedata.json")
const { getGuildSettings, fetchWebsite, checkGuild, bot, getGuildBlacklist, addSettings } = require("./functions.js")
const fs = require("fs")
var apistats = JSON.parse(fs.readFileSync('api.json'))
var linkjson = JSON.parse(fs.readFileSync('lang.json'))

const client = new Client({
  shardCount: 3,
  http: {
      version: 9
  },
  intents: [
      Intents.FLAGS.GUILDS, 
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGES
  ],
  makeCache: Options.cacheWithLimits({
		MessageManager: 100, 
		PresenceManager: 0,
	}),
})
client.ncommands = new Collection()
client.scommands = new Collection()
client.buttoncommands = new Collection()
const normalcommands = fs.readdirSync('./commands/normal').filter(file => file.endsWith('.js'))
const slashcommands = fs.readdirSync('./commands/slash').filter(file => file.endsWith('.js'))
const buttonscommand = fs.readdirSync('./commands/buttons').filter(file => file.endsWith('.js'))
for(const file of normalcommands) {
	const command = require(`./commands/normal/${file}`);
  console.log(command)
	client.ncommands.set(command.name, command);
}
for(const file of slashcommands) {
	const command = require(`./commands/slash/${file}`);
	client.scommands.set(command.name, command);
}
for(button of buttonscommand) {
  const cmd = require(`./commands/buttons/${button}`)
  client.buttoncommands.set(cmd.name, cmd)
}

process.on('unhandledRejection', (reason, p) => {
  console.log(p)
  client.guilds.cache.get("532548129090961409").channels.cache.get("734337131534876673").send({embeds: [{title: "Unhandled Rejection", description: `${reason} || ${p}`, color: 0xFFFFFF}]})
})

process.on('uncaughtException', (err) => {
  client.guilds.cache.get("532548129090961409").channels.cache.get("734337131534876673").send({embeds: [{title: "Uncaught Exception", description: `${err}`, color: 0xFFFFFF}]})
})

client.on("ready", async () => {
    client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} Servers | v?help`, type: "WATCHING" }], status: 'online' })
    setInterval(() => {
      client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} Servers | v?help`, type: "WATCHING" }], status: 'online' })
    }, 300000)
    console.log("Ready")
    client.guilds.cache.get("532548129090961409").channels.cache.get("734337131534876673").send("Online")
    setInterval(() => {
        fetchWebsite("patchnotes", "de", client)
        fetchWebsite("patchnotes", "en-us", client)
        fetchWebsite("patchnotes", "en-gb", client)
        fetchWebsite("patchnotes", "jp", client)
        fetchWebsite("patchnotes", "pt-br", client)
        fetchWebsite("patchnotes", "fr", client)

        fetchWebsite("othernews", "de", client)
        fetchWebsite("othernews", "en-us", client)
        fetchWebsite("othernews", "en-gb", client)
        fetchWebsite("othernews", "jp", client)
        fetchWebsite("othernews", "pt-br", client)
        fetchWebsite("othernews", "fr", client)

        fetchWebsite("maintenance", "de", client)
        fetchWebsite("maintenance", "en-us", client)
        fetchWebsite("maintenance", "en-gb", client)
        fetchWebsite("maintenance", "jp", client)
        fetchWebsite("maintenance", "pt-br", client)
        fetchWebsite("maintenance", "fr", client)

        fetchWebsite("incidents", "de", client)
        fetchWebsite("incidents", "en-us", client)
        fetchWebsite("incidents", "en-gb", client)
        fetchWebsite("incidents", "jp", client)
        fetchWebsite("incidents", "pt-br", client)
        fetchWebsite("incidents", "fr", client)
    }, 150000)
})

client.on('guildCreate', async g => {
    if(g.region == 'europe') { 
      if(await checkGuild(g.id) == 0) await addSettings("en-gb", g.id)
      const channels = g.channels.cache.array().filter(c => c.type == 'text' && c.viewable && c.permissionsFor(g.me).has('SEND_MESSAGES')).sort((a, b) => a.position - b.position)
      if (channels[0]) {
        channels[0].send({embeds: [{
            color: 0xff4654,
            title: 'Language Selection',
            description: 'Hey, based on your server location (`europe`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `en-gb`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br`',
            fields: [
              { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'VALORANT LABS [SERVER JOINED]'
            }
        }]})
      }
    } else if(g.region == 'us-central' || g.region == 'us-south' || g.region == 'us-west' || g.region == 'us-east') { 
    if(await checkGuild(g.id) == 0) await addSettings("en-us", g.id)
      const channels = g.channels.cache.array().filter(c => c.type == 'text' && c.viewable && c.permissionsFor(g.me).has('SEND_MESSAGES')).sort((a, b) => a.position - b.position)
      if (channels[0]) {
        channels[0].send({embeds: [{
            color: 0xff4654,
            title: 'Language Selection',
            description: 'Hey, based on your server location (`us`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `en-us`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br`',
            fields: [
              { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'VALORANT LABS [SERVER JOINED]'
            }
        }]})
      }
    } else if(g.region == 'brazil') { 
      if(await checkGuild(g.id) == 0) await addSettings("pt-br", g.id)
      const channels = g.channels.cache.array().filter(c => c.type == 'text' && c.viewable && c.permissionsFor(g.me).has('SEND_MESSAGES')).sort((a, b) => a.position - b.position)
      if (channels[0]) {
        channels[0].send({embeds: [{
            color: 0xff4654,
            title: 'Language Selection',
            description: 'Hey, based on your server location (`brazil`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `pt-br`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br`',
            fields: [
              { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'VALORANT LABS [SERVER JOINED]'
            }
        }]})
      }
    } else if(g.region == 'japan', g.id) { 
      if(await checkGuild(g.id) == 0) await addSettings("jp")
      const channels = g.channels.cache.array().filter(c => c.type == 'text' && c.viewable && c.permissionsFor(g.me).has('SEND_MESSAGES')).sort((a, b) => a.position - b.position)
      if (channels[0]) {
        channels[0].send({embeds: [{
            color: 0xff4654,
            title: 'Language Selection',
            description: 'Hey, based on your server location (`japan`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `jp`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br`',
            fields: [
              { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'VALORANT LABS [SERVER JOINED]'
            }
        }]})
      }
    } else {
      if(await checkGuild(g.id) == 0) await addSettings("en-us", g.id)
      const channels = g.channels.cache.array().filter(c => c.type == 'text' && c.viewable && c.permissionsFor(g.me).has('SEND_MESSAGES')).sort((a, b) => a.position - b.position)
      if (channels[0]) {
        channels[0].send({embeds: [{
          color: 0xff4654,
          title: 'Language Selection',
          description: 'Hey, based on your server location (`' + g.region + '`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `en-us`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br`',
          fields: [
            { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'VALORANT LABS [SERVER JOINED]'
          }
        }]})
      }
    }

    client.channels.cache.get('734337131534876673').send({embeds: [{
        title: `Neuer Server: ${g.name}`,
        color: '#00ff00',
        thumbnail: {
            url: g.iconURL(),
        },
        fields: [
            { name: 'ID', value: String(g.id), inline: true},
            { name: 'MemberCount', value: String(g.memberCount), inline: true},
            { name: 'Region', value: String(g.region), inline: true},
            { name: 'OwnerID', value: String(g.ownerId), inline: true},
            { name: 'Server Boost Level', value: String(g.premiumTier), inline: true},
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: 'VALORANT LABS [INVITE SYSTEM]'
        }
    }]})
})

client.on('guildDelete', async g => {
    client.channels.cache.get('734337131534876673').send({embeds: [{
        title: `Server verlassen: ${g.name}`,
        color: '#ff0000',
        thumbnail: {
            url: g.iconURL(),
        },
        fields: [
            { name: 'ID', value: g.id, inline: true},
            { name: 'MemberCount', value: String(g.memberCount), inline: true},
            { name: 'Region', value: g.region, inline: true},
            { name: 'OwnerID', value: g.ownerID, inline: true},
            { name: 'Server Boost Level', value: String(g.premiumTier), inline: true},
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: 'VALORANT LABS [INVITE SYSTEM]'
        }
    }]})
})

client.on("interactionCreate", async interaction => {
  if(!interaction.isCommand()) {
    var guilddata = await getGuildSettings(interaction.guildId)
    var args = interaction.customId.split(";")
    client.buttoncommands.get(args[0]).execute(interaction, args, guilddata);
  }
})

client.on("messageCreate", async message => {
    if(message.channel.type == "dm" && message.author.id != "706138094956707861" && message.author.id != "702201518329430117") return client.channels.cache.get('729387358247714938').send({embeds: [{color: "FFFFFF", title: `Nachricht von ${message.author.username}#${message.author.discriminator} | ID: ${message.author.id}`, description: message.content}]})
    var guilddata = await getGuildSettings(message.guild.id)
    if(!message.content.startsWith(guilddata.prefix)) return
    var args = message.content.substr(guilddata.prefix.length).split(' ')
    var cmd = args.shift()
    if(guilddata.blacklist === true) {
        var blacklist = await getGuildBlacklist(message.guild.id)
        if(blacklist.includes(`<#${message.channel.id}>`)) {
            message.reply({embeds: [{
                color: "ff4654",
                title: "I'm not allowed to write here",
                description: "If you think this is an error, contact the server admin",
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'VALORANT LABS [MESSAGE]'
                }
            }]})
            apistats[cmd]++
            apistats['all']++
            fs.writeFileSync('./api.json', JSON.stringify(apistats, null, 2))
        } else {
            if(!client.ncommands.has(cmd)) {
                message.reply({embeds: [{
                    color: "ff4654",
                    title: "This command does not exist",
                    description: `Use **${guilddata.prefix}help** to see all available commands`,
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: 'VALORANT LABS [MESSAGE]'
                    }
                }]})
                apistats[cmd]++
                apistats['all']++
                fs.writeFileSync('./api.json', JSON.stringify(apistats, null, 2))
                return
            }
            client.ncommands.get(cmd).execute(message, args, guilddata, bot);
            apistats[cmd]++
            apistats['all']++
            fs.writeFileSync('./api.json', JSON.stringify(apistats, null, 2))
        } 
        return
    }
    if(!client.ncommands.has(cmd)) {
        message.reply({embeds: [{
            color: "ff4654",
            title: "This command does not exist",
            description: `Use **${guilddata.prefix}help** to see all available commands`,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'VALORANT LABS [MESSAGE]'
            }
        }]})
        apistats[cmd]++
        apistats['all']++
        fs.writeFileSync('./api.json', JSON.stringify(apistats, null, 2))
        return
    }
    client.ncommands.get(cmd).execute(message, args, guilddata);
    apistats[cmd]++
    apistats['all']++
    fs.writeFileSync('./api.json', JSON.stringify(apistats, null, 2))
})


client.login(basedata.discordtoken)
