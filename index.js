import {Client, GatewayIntentBits, Collection, Options} from 'discord.js.dev';
import {readFileSync, readdirSync, writeFileSync} from 'fs';
import {perms, embedBuilder, guildBlacklist, guildSettings, translations, ActivityType, ComponentType, ButtonStyle} from './methods.js';
import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import axios from 'axios';

const basedata = JSON.parse(readFileSync('./basedata.json'));
const api = JSON.parse(readFileSync('./api.json'));
const __dirname = dirname(fileURLToPath(import.meta.url));
const client = new Client({
    rest: {
        version: '9',
    },
    ws: {
        version: '9',
    },
    intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
    makeCache: Options.cacheWithLimits({
        MessageManager: {
            sweepInterval: 1800,
            maxSize: 25,
        },
        PresenceManager: 0,
    }),
});
client.ncommands = new Collection();
client.scommands = new Collection();
client.buttoncommands = new Collection();
client.selectcommands = new Collection();
client.modals = new Collection();
client.context = new Collection();
const normalcommands = readdirSync('./commands/normal').filter(file => file.endsWith('.js'));
const slashcommands = readdirSync('./commands/slash').filter(file => file.endsWith('.js'));
const buttoncommand = readdirSync('./commands/buttons').filter(file => file.endsWith('.js'));
const selectcommands = readdirSync('./commands/select').filter(file => file.endsWith('.js'));
const modalcommands = readdirSync('./commands/modals').filter(file => file.endsWith('.js'));
const contextcommands = readdirSync('./commands/context').filter(file => file.endsWith('.js'));

for (let i = 0; normalcommands.length > i; i++) {
    const command = await import(`./commands/normal/${normalcommands[i]}?update=${Date.now()}`);
    console.log(command.name);
    client.ncommands.set(command.name, command);
}
for (let i = 0; slashcommands.length > i; i++) {
    const command = await import(`./commands/slash/${slashcommands[i]}?update=${Date.now()}`);
    client.scommands.set(command.name, command);
}
for (let i = 0; buttoncommand.length > i; i++) {
    const cmd = await import(`./commands/buttons/${buttoncommand[i]}?update=${Date.now()}`);
    client.buttoncommands.set(cmd.name, cmd);
}
for (let i = 0; selectcommands.length > i; i++) {
    const cmd = await import(`./commands/select/${selectcommands[i]}?update=${Date.now()}`);
    client.selectcommands.set(cmd.name, cmd);
}
for (let i = 0; modalcommands.length > i; i++) {
    const cmd = await import(`./commands/modals/${modalcommands[i]}?update=${Date.now()}`);
    client.modals.set(cmd.name, cmd);
}
for (let i = 0; contextcommands.length > i; i++) {
    const cmd = await import(`./commands/context/${contextcommands[i]}?update=${Date.now()}`);
    client.context.set(cmd.name, cmd);
}

client.on('ready', async () => {
    console.log('tes');
    /*if(client.shard.ids[0] == 0) {
        const competitivetiers = await axios.get("https://valorant-api.com/v1/competitivetiers")
        const tiers = competitivetiers.data.data.find(item => item.uuid == "e4e9a692-288f-63ca-7835-16fbf6234fda").tiers
        for(let i = 0; tiers.length > i; i++) {
            if(tiers[i].rankTriangleDownIcon) {
                const down = await axios.get(tiers[i].rankTriangleDownIcon, {responseType: "arraybuffer"})
                const up = await axios.get(tiers[i].rankTriangleUpIcon, {responseType: "arraybuffer"})
                writeFileSync(`./assets/mmr/${i}_down.png`, down.data)
                writeFileSync(`./assets/mmr/${i}_up.png`, up.data)
            }
        }
    }*/
    let guildsize;
    client.user.setPresence({activities: [{name: `Bot startup | Shard: ${client.shard.ids[0]}`}], status: 'dnd'});
    process.on('message', async message => {
        if (message == 'startup') {
            guildsize = await client.shard.fetchClientValues('guilds.cache.size');
            client.user.setPresence({
                activities: [
                    {name: `VALORANT | ${guildsize.reduce((prev, val) => prev + val, 0)} Servers | Shard: ${client.shard.ids[0]} | /help`, type: ActivityType.Competing},
                ],
                status: 'online',
            });
        }
    });
    setInterval(async () => {
        guildsize = await client.shard.fetchClientValues('guilds.cache.size');
        client.user.setPresence({
            activities: [
                {name: `VALORANT | ${guildsize.reduce((prev, val) => prev + val, 0)} Servers | Shard: ${client.shard.ids[0]} | /help`, type: ActivityType.Competing},
            ],
            status: 'online',
        });
    }, 300000);
});

client.on('guildCreate', async g => {
    const updatedGuild = await guildSettings(g);
    const channels = g.channels.cache
        .filter(c => c.type == 'text' && c.viewable && c.permissionsFor(g.me).has(perms.SendMessages))
        .sort((a, b) => a.position - b.position);
    if (channels[0]) {
        channels[0].send({
            embeds: [
                embedBuilder({
                    title: 'Language Selection',
                    desc: `Hey, based on your prefered locale (\`${g.preferredLocale}\`) and the available bot languages (\`en-gb/en-us/de/fr/ja-jp/pt-br/es/vi\`), your bot language was set to \`${updatedGuild.lang}\`.To change the language, do \`/settings language [LANGUAGE CODE]\``,
                    footer: 'VALORANT LABS [SERVER JOINED]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            url: 'https://discord.gg/b5FmTqG',
                            style: ButtonStyle.Link,
                            label: 'Support Server',
                        },
                    ],
                },
            ],
        });
    }
});

client.on('interactionCreate', async interaction => {
    const guilddata = await guildSettings(interaction.guild);
    const blacklist = guilddata.blacklist ? await guildBlacklist(interaction.guild) : null;
    if (!interaction.isCommand() || interaction.isMessageContextMenuCommand()) {
        const args = interaction.customId?.split(';');
        if (interaction.isButton()) return client.buttoncommands.get(args[0]).execute({interaction, args, guilddata});
        if (interaction.isModalSubmit()) return client.modals.get(args[0]).execute({interaction, args, guilddata});
        if (interaction.isSelectMenu()) return client.selectcommands.get(args[0]).execute({interaction, args, guilddata});
        if (interaction.isMessageContextMenuCommand()) return client.context.get(interaction.commandId).execute({interaction, args, guilddata});
    }
    if (interaction.commandName == 'shard-restart') {
        client.shard.send(`restart-${interaction.options.get('shard').value}`);
        return interaction.reply({content: 'Restarted'});
    }
    api[interaction.commandName]++;
    api['all']++;
    writeFileSync('./api.json', JSON.stringify(api, null, 2));
    if (!client.scommands.has(interaction.commandName)) {
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].errors.cmdundefined_title,
                    desc: translations[guilddata.lang].errors.cmdundefined_desc,
                    footer: 'VALORANT LABS [COMMAND UNKNOWN]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            url: translations[guilddata.lang].cmdurl,
                            style: ButtonStyle.Link,
                            label: translations[guilddata.lang].cmd,
                        },
                    ],
                },
            ],
        });
    }
    if (!['feedback'].some(item => item == interaction.commandName))
        await interaction
            .deferReply({
                ephemeral:
                    (blacklist && blacklist.includes(`<#${interaction.channelId}>`)) ||
                    ['autoroles', 'blacklist', 'settings'].some(item => item == interaction.commandName)
                        ? true
                        : false,
            })
            .catch(error => {
                console.log(error);
            });
    client.scommands.get(interaction.commandName).execute({interaction: interaction, guilddata: guilddata});
});

client.on('messageCreate', async message => {
    if (message.author.id == '346345363990380546' && message.content == '/reload' && message.channel.parent == '732290187090067476') {
        const normalcommand = readdirSync('./commands/normal').filter(file => file.endsWith('.js'));
        const slashcommands = readdirSync('./commands/slash').filter(file => file.endsWith('.js'));
        const buttoncommands = readdirSync('./commands/buttons').filter(file => file.endsWith('.js'));
        const selectcommands = readdirSync('./commands/select').filter(file => file.endsWith('.js'));
        const modalcommands = readdirSync('./commands/modals').filter(file => file.endsWith('.js'));
        const contextcommands = readdirSync('./commands/context').filter(file => file.endsWith('.js'));
        for (let i = 0; normalcommand.length > i; i++) {
            normalcommand[i] = path.join('file:///', __dirname, `/commands/normal/${normalcommand[i]}?update=${Date.now()}`);
        }
        for (let i = 0; slashcommands.length > i; i++) {
            slashcommands[i] = path.join('file:///', __dirname, `/commands/slash/${slashcommands[i]}?update=${Date.now()}`);
        }
        for (let i = 0; buttoncommands.length > i; i++) {
            buttoncommands[i] = path.join('file:///', __dirname, `/commands/buttons/${buttoncommands[i]}?update=${Date.now()}`);
        }
        for (let i = 0; selectcommands.length > i; i++) {
            selectcommands[i] = path.join('file:///', __dirname, `./commands/select/${selectcommands[i]}?update=${Date.now()}`);
        }
        for (let i = 0; modalcommands.length > i; i++) {
            modalcommands[i] = path.join('file:///', __dirname, `./commands/modals/${modalcommands[i]}?update=${Date.now()}`);
        }
        for (let i = 0; contextcommands.length > i; i++) {
            contextcommands[i] = path.join('file:///', __dirname, `./commands/context/${contextcommands[i]}?update=${Date.now()}`);
        }
        await client.shard.broadcastEval(
            async (c, {normalcommands, slashcommands, buttoncommands, selectcommands, modalcommands, contextcommands}) => {
                c.ncommands.sweep(() => true);
                c.buttoncommands.sweep(() => true);
                c.scommands.sweep(() => true);
                c.selectcommands.sweep(() => true);
                c.modals.sweep(() => true);
                for (let i = 0; normalcommands.length > i; i++) {
                    const command = await import(normalcommands[i]);
                    c.ncommands.set(command.name, command);
                }
                for (let i = 0; slashcommands.length > i; i++) {
                    const command = await import(slashcommands[i]);
                    c.scommands.set(command.name, command);
                }
                for (let i = 0; buttoncommands.length > i; i++) {
                    const cmd = await import(buttoncommands[i]);
                    c.buttoncommands.set(cmd.name, cmd);
                }
                for (let i = 0; selectcommands.length > i; i++) {
                    const cmd = await import(selectcommands[i]);
                    c.selectcommands.set(cmd.name, cmd);
                }
                for (let i = 0; modalcommands.length > i; i++) {
                    const cmd = await import(modalcommands[i]);
                    c.modals.set(cmd.name, cmd);
                }
                for (let i = 0; contextcommands.length > i; i++) {
                    const cmd = await import(contextcommands[i]);
                    c.context.set(cmd.name, cmd);
                }
            },
            {context: {normalcommands, slashcommands, buttoncommands, selectcommands, modalcommands, contextcommands}}
        );
        return message.reply({content: 'Reloaded'});
    }
    const guilddata = await guildSettings(message.guild);
    if (!message.content.startsWith(guilddata.prefix)) return;
    const blacklist = guilddata.blacklist ? await guildBlacklist(message.guild) : null;
    const args = message.content.substring(guilddata.prefix.length).split(' ');
    const cmd = args.shift();
    if (blacklist && blacklist.includes(`<#${message.channelId}>`)) {
        return message
            .reply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].errors.cmdblacklist_title,
                        desc: translations[guilddata.lang].errors.cmdblacklist_desc,
                        footer: 'VALORANT LABS [BLACKLIST]',
                    }),
                ],
            })
            .then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 7500);
            });
    }
    api[cmd]++;
    api['all']++;
    writeFileSync('./api.json', JSON.stringify(api, null, 2));
    console.log(client.ncommands, client.ncommands.has(cmd), cmd);
    if (!client.ncommands.has(cmd)) {
        return message.reply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].errors.cmdundefined_title,
                    desc: translations[guilddata.lang].errors.cmdundefined_desc,
                    footer: 'VALORANT LABS [COMMAND UNKNOWN]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            url: translations[guilddata.lang].cmdurl,
                            style: ButtonStyle.Link,
                            label: translations[guilddata.lang].cmd,
                        },
                    ],
                },
            ],
        });
    }
    if (!['help', 'stats'].some(item => item == cmd))
        return message.reply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].errors.deprecation_title,
                    desc: translations[guilddata.lang].errors.deprecation_desc,
                    footer: 'VALORANT LABS [DEPRECATED]',
                }),
            ],
        });
    client.ncommands.get(cmd).execute({message: message, args: args, guilddata: guilddata});
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error(error);
});

client.login(basedata.discordtoken);
