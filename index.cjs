const {Client, Intents, Collection, Options} = require("discord.js")
const {readFileSync, readdirSync, writeFileSync} = require("fs")
let Utils;
(async function () {
    Utils = (await import("./methods.js")).default
    for(let i = 0; normalcommands.length > i; i++) {
        const command = await import(`./commands/normal/${normalcommands[i]}?update=${Date.now()}`);
        client.ncommands.set(command.name, command);
    }
    for(let i = 0; slashcommands.length > i; i++) {
        const command = await import(`./commands/slash/${slashcommands[i]}?update=${Date.now()}`);
        console.log(command.name)
        client.scommands.set(command.name, command);
    }
    for(let i = 0; buttonscommand.length > i; i++) {
        const cmd = await import(`./commands/buttons/${buttonscommand[i]}?update=${Date.now()}`)
        client.buttoncommands.set(cmd.name, cmd)
    }
})()
const path = require("path")
const basedata = JSON.parse(readFileSync("./basedata.json"))
const api = JSON.parse(readFileSync("./api.json"))
const client = new Client({
    http: {
        version: 9
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
    makeCache: Options.cacheWithLimits({
        MessageManager: {
            sweepInterval: 1800,
            maxSize: 25
        },
        PresenceManager: 0,
    }),
})
client.ncommands = new Collection()
client.scommands = new Collection()
client.buttoncommands = new Collection()
const normalcommands = readdirSync('./commands/normal').filter(file => file.endsWith('.js'))
const slashcommands = readdirSync('./commands/slash').filter(file => file.endsWith('.js'))
const buttonscommand = readdirSync('./commands/buttons').filter(file => file.endsWith('.js'))

client.on("ready", async () => {
    let guildsize
    client.user.setPresence({activities: [{name: `Bot startup | Shard: ${client.shard.ids[0]}`}], status: 'dnd'})
    process.on("message", async message => {
        if(message == "startup") {
            guildsize = await client.shard.fetchClientValues('guilds.cache.size')
            client.user.setPresence({activities: [{name: `VALORANT | ${guildsize.reduce((prev, val) => prev + val, 0)} Servers | Shard: ${client.shard.ids[0]} | /help`, type: "COMPETING"}], status: 'online'})
        }
    })
    setInterval(async () => {
        guildsize = await client.shard.fetchClientValues('guilds.cache.size')
        client.user.setPresence({activities: [{name: `VALORANT | ${guildsize.reduce((prev, val) => prev + val, 0)} Servers | Shard: ${client.shard.ids[0]} | /help`, type: "COMPETING"}], status: 'online'})
    }, 300000)
})

client.on("guildCreate", async g => {
    const updatedGuild = await Utils.guildSettings(g)
    const channels = g.channels.cache.filter(c => c.type == 'text' && c.viewable && c.permissionsFor(g.me).has('SEND_MESSAGES')).sort((a, b) => a.position - b.position)
    if(channels[0]) {
        channels[0].send({
            embeds: [Utils.embedBuilder({
                title: 'Language Selection',
                desc: `Hey, based on your prefered locale (\`${g.preferredLocale}\`) and the available bot languages (\`en-gb/en-us/de/fr/ja-jp/pt-br/es/vi\`), your bot language was set to \`${updatedGuild.lang}\`.To change the language, do \`/settings language [LANGUAGE CODE]\``,
                footer: "VALORANT LABS [SERVER JOINED]"
            })],
            components: [{
                type: "ACTION_ROW",
                components: [{
                    type: "BUTTON",
                    url: "https://discord.gg/b5FmTqG",
                    style: "LINK",
                    label: "Support Server"
                }]
            }]
        })
    }
})

client.on("interactionCreate", async interaction => {
    const guilddata = await Utils.guildSettings(interaction.guild)
    const blacklist = guilddata.blacklist ? await Utils.guildBlacklist(interaction.guild) : null
    await interaction.deferReply({ephemeral: blacklist && blacklist.includes(`<#${interaction.channelId}>`) ? true : false}).catch(error => {console.log(error)})
    if(!interaction.isCommand()) {
        const args = interaction.customId.split(";")
        if(interaction.isButton()) return client.buttoncommands.get(args[0]).execute(interaction, args, guilddata)
    }
    if(interaction.commandName == "shard-restart") {
        client.shard.send(`restart-${interaction.options.get("shard").value}`)
        return interaction.reply({content: "Restarted"})
    }
    api[interaction.commandName]++
    api['all']++
    writeFileSync('./api.json', JSON.stringify(api, null, 2))
    if(!client.scommands.has(interaction.commandName)) {
        return interaction.editReply({
            embeds: [Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].errors.cmdundefined_title,
                desc: Utils.translations[guilddata.lang].errors.cmdundefined_desc,
                footer: "VALORANT LABS [COMMAND UNKNOWN]"
            })],
            components: [{
                type: "ACTION_ROW",
                components: [{
                    type: "BUTTON",
                    url: Utils.translations[guilddata.lang].cmdurl,
                    style: "LINK",
                    label: Utils.translations[guilddata.lang].cmd
                }]
            }]
        })
    }
    client.scommands.get(interaction.commandName).execute({interaction: interaction, guilddata: guilddata})
})

client.on("message", async message => {
    if(message.author.id == "346345363990380546" && message.content == "/reload" && message.channel.parent == "732290187090067476") {
        const normalcommand = readdirSync('./commands/normal').filter(file => file.endsWith('.js'))
        const slashcommands = readdirSync('./commands/slash').filter(file => file.endsWith('.js'))
        const buttonscommands = readdirSync('./commands/buttons').filter(file => file.endsWith('.js'))
        for(let i = 0; normalcommand.length > i; i++) {
            normalcommand[i] = path.join("file:///", __dirname, `/commands/normal/${normalcommand[i]}?update=${Date.now()}`)
        }
        for(let i = 0; slashcommands.length > i; i++) {
            slashcommands[i] = path.join("file:///", __dirname, `/commands/slash/${slashcommands[i]}?update=${Date.now()}`)
        }
        for(let i = 0; buttonscommands.length > i; i++) {
            buttonscommands[i] = path.join("file:///", __dirname, `/commands/buttons/${buttonscommands[i]}?update=${Date.now()}`)
        }
        console.log(normalcommand)
        await client.shard.broadcastEval(async (c, {normalcommands, slashcommands, buttoncommands}) => {
            c.ncommands.sweep(() => true)
            c.buttoncommands.sweep(() => true)
            c.scommands.sweep(() => true)
            for(let i = 0; normalcommands.length > i; i++) {
                const command = await import(normalcommands[i]);
                c.ncommands.set(command.name, command);
            }
            for(let i = 0; slashcommands.length > i; i++) {
                const command = await import(slashcommands[i]);
                console.log(command)
                c.scommands.set(command.name, command);
            }
            for(let i = 0; buttoncommands.length > i; i++) {
                const cmd = await import(buttoncommands[i]);
                c.buttoncommands.set(cmd.name, cmd)
            }
        }, {context: {normalcommands: normalcommand, slashcommands: slashcommands, buttoncommands: buttonscommands}})
        return message.reply({content: "Reloaded"})
    }
    const guilddata = await Utils.guildSettings(message.guild)
    console.log(guilddata)
    if(!message.content.startsWith(guilddata.prefix)) return
    const blacklist = guilddata.blacklist ? await Utils.guildBlacklist(interaction.guild) : null
    const args = message.content.substring(guilddata.prefix.length).split(' ')
    const cmd = args.shift()
    if(blacklist && blacklist.includes(`<#${message.channelId}>`)) {
        return message.reply({
            embeds: [Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].errors.cmdblacklist_title,
                desc: Utils.translations[guilddata.lang].errors.cmdblacklist_desc,
                footer: "VALORANT LABS [BLACKLIST]"
            })]
        }).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 7500)
        })
    }
    api[cmd]++
    api['all']++
    writeFileSync('./api.json', JSON.stringify(api, null, 2))
    console.log(client.ncommands, client.ncommands.has(cmd), cmd)
    if(!client.ncommands.has(cmd)) {
        return message.reply({
            embeds: [Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].errors.cmdundefined_title,
                desc: Utils.translations[guilddata.lang].errors.cmdundefined_desc,
                footer: "VALORANT LABS [COMMAND UNKNOWN]"
            })],
            components: [{
                type: "ACTION_ROW",
                components: [{
                    type: "BUTTON",
                    url: Utils.translations[guilddata.lang].cmdurl,
                    style: "LINK",
                    label: Utils.translations[guilddata.lang].cmd
                }]
            }]
        })
    }
    if(!["help", "stats"].some(item => item == cmd)) return message.reply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].errors.deprecation_title, desc: Utils.translations[guilddata.lang].errors.deprecation_desc, footer: "VALORANT LABS [DEPRECATED]"})]})
    client.ncommands.get(cmd).execute({message: message, args: args, guilddata: guilddata})
})

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error)
})

client.login(basedata.discordtoken)