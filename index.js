import {Client, Intents, Collection, Options} from "discord.js"
import {readFileSync} from "fs"
const basedata = JSON.parse(readFileSync("./basedata.json"))
const api = JSON.parse(readFileSync("./api.json"))
import {getGuildSettings, fetchWebsite, checkGuild, bot, addSettings, getGuildBlacklist_js, getSettings} from "./functions.js"
import * as path from "path"

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
for(let i = 0; normalcommands.length > i; i++) {
    const command = require(`./commands/normal/${normalcommands[i]}`);
    client.ncommands.set(command.name, command);
}
for(let i = 0; slashcommands.length > i; i++) {
    const command = require(`./commands/slash/${slashcommands[i]}`);
    client.scommands.set(command.name, command);
}
for(let i = 0; buttonscommand.length > i; i++) {
    const cmd = require(`./commands/buttons/${buttonscommand[i]}`)
    client.buttoncommands.set(cmd.name, cmd)
}

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
    const locales = {
        de: "de",
        fr: "fr",
        "en-GB": "en-gb",
        "en-US": "en-us",
        ja: "jp",
        "pt-BR": "pt-br",
        "es-ES": "es",
        vi: "vi"
    }
    /*if(await checkGuild(g.id) == 0) await addSettings(locales[g.preferredLocale] == undefined ? "en-us" : locales[g.preferredLocale], g.id)
    const channels = g.channels.cache.filter(c => c.type == 'text' && c.viewable && c.permissionsFor(g.me).has('SEND_MESSAGES')).sort((a, b) => a.position - b.position)
    if(channels[0]) {
        channels[0].send({
            embeds: [{
                color: 0xff4654,
                title: 'Language Selection',
                description: `Hey, based on your prefered locale (\`${g.preferredLocale}\`) and the available bot languages (\`en-gb/en-us/de/fr/jp/pt-br/es\`), your bot language was set to \`${locales[g.preferredLocale] == undefined ? "en-us" : locales[g.preferredLocale]}\`. To change the language, do \`/settings language [LANGUAGE CODE]\``,
                fields: [
                    {name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'VALORANT LABS [SERVER JOINED]'
                }
            }]
        })
    }*/
})

client.login(basedata.discordtoken)