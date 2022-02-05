const {Client, Intents, Collection, Options} = require("discord.js")
const {readFileSync, readdirSync, writeFileSync} = require("fs")
let Utils;
(async function () {
    Utils = (await import("./methods.js")).default
    for(let i = 0; normalcommands.length > i; i++) {
        const command = await import(`./commands/normal/${normalcommands[i]}`);
        client.ncommands.set(command.name, command);
    }
    for(let i = 0; slashcommands.length > i; i++) {
        const command = await import(`./commands/slash/${slashcommands[i]}`);
        client.scommands.set(command.name, command);
    }
    for(let i = 0; buttonscommand.length > i; i++) {
        const cmd = await import(`./commands/buttons/${buttonscommand[i]}`)
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
    console.log(Utils)
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
            embeds: [{
                color: 0xff4654,
                title: 'Language Selection',
                description: `Hey, based on your prefered locale (\`${g.preferredLocale}\`) and the available bot languages (\`en-gb/en-us/de/fr/ja-jp/pt-br/es/vi\`), your bot language was set to \`${updatedGuild.lang}\`.To change the language, do \`/settings language [LANGUAGE CODE]\``,
                timestamp: new Date().toISOString(),
                footer: {text: 'VALORANT LABS [SERVER JOINED]'}
            }],
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
    const blacklist = guilddata.blacklist ? await Utils.guildBlacklist(interaction.guildId) : null
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
            embeds: [{
                color: 0xff4654,
                title: Utils.translations[guilddata.lang].errors.cmdundefined_title,
                description: Utils.translations[guilddata.lang].errors.cmdundefined_desc,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'VALORANT LABS [UNKNOWN CMD]'
                }
            }],
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
            normalcommand[i] = path.join(__dirname, `/commands/normal/${normalcommand[i]}`)
        }
        for(let i = 0; slashcommands.length > i; i++) {
            slashcommands[i] = path.join(__dirname, `/commands/slash/${slashcommands[i]}`)
        }
        for(let i = 0; buttonscommands.length > i; i++) {
            buttonscommands[i] = path.join(__dirname, `/commands/buttons/${buttonscommands[i]}`)
        }
        await client.shard.broadcastEval((c, {normalcommands, slashcommands, buttoncommands, dir}) => {
            c.ncommands.sweep(() => true)
            c.buttoncommands.sweep(() => true)
            c.scommands.sweep(() => true)
            for(const file of normalcommands) {
                delete require.cache[require.resolve(`${file}`)]
                const command = require(`${file}`, {"flag": 'rs+'});
                c.ncommands.set(command.name, command);
            }
            for(const file of slashcommands) {
                delete require.cache[require.resolve(`${file}`)]
                const command = require(`${file}`, {"flag": 'rs+'});
                c.scommands.set(command.name, command);
            }
            for(const button of buttoncommands) {
                delete require.cache[require.resolve(`${button}`)]
                const cmd = require(`${button}`, {"flag": 'rs+'})
                c.buttoncommands.set(cmd.name, cmd)
            }
        }, {context: {normalcommands: normalcommand, slashcommands: slashcommands, buttoncommands: buttonscommands}})
        return message.reply({content: "Reloaded"})
    }
    const guilddata = await Utils.guildSettings(message.guild)
    console.log(guilddata)
    if(!message.content.startsWith(guilddata.prefix)) return
    const blacklist = guilddata.blacklist ? await Utils.guildBlacklist(interaction.guildId) : null
    const args = message.content.substring(guilddata.prefix.length).split(' ')
    const cmd = args.shift()
    if(blacklist && blacklist.includes(`<#${message.channelId}>`)) {
        return message.reply({
            embeds: [{
                color: 0xff4654,
                title: Utils.translations[guilddata.lang].errors.cmdblacklist_title,
                description: Utils.translations[guilddata.lang].errors.cmdblacklist_desc,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'VALORANT LABS [BLACKLIST CMD]'
                }
            }]
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
            embeds: [{
                color: 0xff4654,
                title: Utils.translations[guilddata.lang].errors.cmdundefined_title,
                description: Utils.translations[guilddata.lang].errors.cmdundefined_desc,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'VALORANT LABS [UNKNOWN CMD]'
                }
            }],
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
    if(!["help", "stats"].some(item => item == cmd)) return message.reply({embeds: [{title: Utils.translations[guilddata.lang].deprecation_title, description: Utils.translations[guilddata.lang].deprecation_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: "VALORANT LABS [DEPRECATION]"}}]})
    client.ncommands.get(cmd).execute({message: message, args: args, guilddata: guilddata})
})

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error)
})

client.login(basedata.discordtoken)