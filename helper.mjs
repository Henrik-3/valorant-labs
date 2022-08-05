import {Client, GatewayIntentBits, ComponentType, ButtonStyle, Options, TextInputStyle, EmbedBuilder, InteractionType} from 'discord.js.dev';
import {readFileSync} from 'fs';
import {MongoClient} from 'mongodb';

const basedata = JSON.parse(readFileSync('./basedata.json'));
const mongoclient = new MongoClient(basedata.mongoaccess);
mongoclient.connect();
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    makeCache: Options.cacheWithLimits({
        MessageManager: 2,
        PresenceManager: 0,
    }),
});

const uuidv4 = function () {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};
const getDB = function ({db, col}) {
    return mongoclient.db(db).collection(col);
};
const select_icon = {
    valorant: {
        id: '722028690053136434',
        name: 'VALORANT',
    },
    multiversus: {
        id: '1002656740736782436',
        name: 'MVS2',
    },
};

client.once('ready', async () => {
    console.log('ready');
});

client.on('messageCreate', async message => {
    if (
        message.content.toLowerCase().includes('http') &&
        !['tracker.gg', 'github.com', 'discord.com', 'discord.gg', 'discordapp.com', 'riotgames', 'valorantlabs', 'topgg', 'top.gg'].some(item =>
            message.content.toLowerCase().includes(item)
        ) &&
        message.author.id != '346345363990380546' &&
        message.author.id != '702201518329430117'
    ) {
        client.channels.cache.get('910573199761244211').send({
            content: `Message: ${Util.removeMentions(message.content)}\nChannel: <#${message.channelId}>\nMember: <@${message.author.id}> | ${message.author.id}`,
        });
        return message.delete();
    }
    if (message.content == 'create' && message.author.id == '346345363990380546') {
        message.channel.send({
            embeds: [
                {
                    title: 'Verification',
                    description: 'Press the button below to get access to the server. This measure is for the prevention of bots',
                    color: 0xffffff,
                    footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                },
            ],
            components: [
                {type: ComponentType.ActionRow, components: [{type: ComponentType.Button, style: ButtonStyle.Secondary, label: '✅ Verify', customId: 'verify'}]},
            ],
        });
    }
    if (message.content == 'roles' && message.author.id == '346345363990380546') {
        message.channel.send({
            embeds: [
                {
                    title: 'Role Selection',
                    description:
                        'Select the roles with the buttons down below for which you want to receive notifications. When you already have the role and press again on the role button, the role will get removed again',
                    color: 0xffffff,
                    footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                },
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {type: ComponentType.Button, style: ButtonStyle.Secondary, label: 'VALORANT API', customId: 'val_api'},
                        {type: ComponentType.Button, style: ButtonStyle.Secondary, label: 'VALORANT LABS', customId: 'val_labs'},
                    ],
                },
            ],
        });
        message.delete();
    }
    if (message.content == 'keys' && message.author.id == '346345363990380546') {
        message.channel.send({
            embeds: [
                {
                    title: 'API Key Generation',
                    description: `Klick on the \`Generate\` Button below beginn the process of the key generation. If you need a higher Rate Limit klick on \`Upgrade RL\`.`,
                    color: 0xffffff,
                    fields: [
                        {
                            name: 'No Key',
                            value: `\`\`\`- 30req/min (2 uncached accounts/hour)\n- Suitable for: Twitch Bots | Educational purposes (How do i code etc)\`\`\``,
                        },
                        {
                            name: 'Basic Key',
                            value: `\`\`\`- 90req/min (unlimited uncached accounts/hour)\n- Suitable for: Private Discord Bots (Servers) / Websites\`\`\``,
                        },
                        {
                            name: 'Production Key',
                            value: `\`\`\`- Rate Limit you requested\n- Suitable for: Production Discord Bots / Websites\n- PLEASE MAKE SURE THAT YOU ALSO REQUEST AN OFFICIAL VALORANT API KEY AT RIOT TO GET RSO IF YOU HAVE A STATS FEATURE FOR EXAMPLE\`\`\``,
                        },
                    ],
                    footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                },
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            style: ButtonStyle.Success,
                            label: 'Generate',
                            customId: 'generate',
                            emoji: {name: 'icons_newmembers', id: '964425853410893874'},
                        },
                        {
                            type: ComponentType.Button,
                            style: ButtonStyle.Secondary,
                            label: 'Upgrade RL',
                            customId: 'upgrade',
                            disabled: false,
                            emoji: {name: 'icons_upvote', id: '909715386843430933'},
                        },
                        {
                            type: ComponentType.Button,
                            style: ButtonStyle.Secondary,
                            label: 'Show keys',
                            customId: 'showkeys',
                            disabled: false,
                            emoji: {name: 'icons_settings', id: '859388128040976384'},
                        },
                    ],
                },
            ],
        });
        message.delete();
    }
    if (message.crosspostable) message.crosspost();
});

client.on('interactionCreate', async interaction => {
    if (!['upgrade', 'generate', 'generate;', 'upgrade;', 'applicationaccept', 'applicationdeny'].some(item => interaction.customId == item))
        await interaction.deferReply({ephemeral: true});
    if (interaction.isButton()) {
        switch (interaction.customId) {
            case 'val_api': {
                if (interaction.member._roles.includes('910576659156062229')) {
                    interaction.member.roles.remove('910576659156062229');
                    return interaction.editReply({
                        ephemeral: true,
                        embeds: [
                            {
                                title: `Role removed`,
                                description: `The <@&910576659156062229> role was removed. To get the role back, please click again on the button`,
                                color: 0xffffff,
                                footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                            },
                        ],
                    });
                }
                interaction.member.roles.add('910576659156062229');
                return interaction.editReply({
                    ephemeral: true,
                    embeds: [
                        {
                            title: `Role given`,
                            description: `The <@&910576659156062229> role was added. To remove the role, please click again on the button`,
                            color: 0xffffff,
                            footer: {
                                text: 'HenrikDev Systems',
                                icon_url: 'https://cdn.discordapp.com/avatars/737704450478833735/c3560a9b6cf6725758236abe144d3f98.webp?size=512',
                            },
                        },
                    ],
                });
            }
            case 'val_labs': {
                if (interaction.member._roles.includes('910576761232830515')) {
                    interaction.member.roles.remove('910576761232830515');
                    return interaction.editReply({
                        ephemeral: true,
                        embeds: [
                            {
                                title: `Role removed`,
                                description: `The <@&910576761232830515> role was removed. To get the role back, please click again on the button`,
                                color: 0xffffff,
                                footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                            },
                        ],
                    });
                }
                interaction.member.roles.add('910576761232830515');
                return interaction.editReply({
                    ephemeral: true,
                    embeds: [
                        {
                            title: `Role given`,
                            description: `The <@&910576761232830515> role was added. To remove the role, please click again on the button`,
                            color: 0xffffff,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                });
            }
            case 'verify': {
                interaction.member.roles.add('704232182067232788');
                return interaction.editReply({content: 'Role given'});
            }
            case 'generate': {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [
                        {
                            title: 'Please select the API Key type',
                            description: 'Please select the API Key type u like to apply for',
                            color: 0xffffff,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.SelectMenu,
                                    customId: `generate;`,
                                    maxValues: 1,
                                    options: [
                                        {
                                            value: 'valorant',
                                            label: 'VALORANT',
                                            emoji: {
                                                id: '722028690053136434',
                                                name: 'VALORANT',
                                            },
                                        },
                                        {
                                            value: 'multiversus',
                                            label: 'MultiVersus',
                                            emoji: {
                                                id: '1002656740736782436',
                                                name: 'MVS2',
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                });
            }
            case 'upgrade': {
                const key = await getDB({db: 'API', col: 'tokens'}).find({userid: interaction.user.id}).toArray();
                if (!key || !key.length)
                    return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            {
                                title: 'No application available',
                                description: "You haven't created an application with that account yet, please create a new one first",
                                color: 0xff4654,
                                footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                            },
                        ],
                    });
                return interaction.reply({
                    ephemeral: true,
                    embeds: [
                        {
                            title: 'Please select the API Key',
                            description: 'Please select the API Key you want to upgrade',
                            color: 0xffffff,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.SelectMenu,
                                    customId: `upgrade;`,
                                    maxValues: 1,
                                    options: key.map(i => {
                                        return {
                                            value: i.token,
                                            label: i.name,
                                            emoji: select_icon[i.type],
                                        };
                                    }),
                                },
                            ],
                        },
                    ],
                });
            }
            case 'applicationaccept': {
                return interaction.showModal({
                    title: 'Accept Key',
                    customId: `applicationacceptconfirm;${interaction.message.embeds[0].title.split(' ')[2].trim()};${interaction.message.id}`,
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'info',
                                    style: TextInputStyle.Paragraph,
                                    label: 'Additional Information',
                                    required: false,
                                },
                            ],
                        },
                    ],
                });
            }
            case 'applicationdeny': {
                return interaction.showModal({
                    title: 'Deny Key',
                    customId: `applicationdenyconfirm;${interaction.message.embeds[0].title.split(' ')[2].trim()};${interaction.message.id}`,
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'info',
                                    style: TextInputStyle.Paragraph,
                                    label: 'Additional Information',
                                    required: true,
                                },
                            ],
                        },
                    ],
                });
            }
            case 'showkeys': {
                const keys = await getDB({db: 'API', col: 'tokens'}).find({userid: interaction.user.id}).toArray();
                return interaction.editReply({
                    embeds: [
                        {
                            title: 'Key Overview',
                            description: 'Overviews over all keys you have',
                            fields: keys.map(i => {
                                return {
                                    name: i.name,
                                    value: `__Type__: ${i.type}\n__Limit__: ${i.limit}req/min\n__Token__: ||${i.token}||`,
                                    inline: true,
                                };
                            }),
                            color: 0x00ff93,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                });
            }
        }
    }
    if (interaction.type == InteractionType.ModalSubmit) {
        const args = interaction.customId.split(';');
        switch (args[0]) {
            case 'genkey': {
                client.channels.cache.get('983100719840256090').send({
                    embeds: [
                        {
                            title: `New Application ${args[1]}`,
                            fields: [
                                {name: 'Product Name', value: interaction.fields.getTextInputValue('title')},
                                {name: 'Type', value: args[2]},
                                {name: 'Details', value: interaction.fields.getTextInputValue('desc')},
                                {
                                    name: 'Additional Information',
                                    value: interaction.fields.getTextInputValue('addinfo') ? interaction.fields.getTextInputValue('addinfo') : 'Not available',
                                },
                            ],
                            color: 0xffffff,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Success,
                                    label: 'Accept',
                                    customId: 'applicationaccept',
                                },
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Danger,
                                    label: 'Deny',
                                    customId: 'applicationdeny',
                                },
                            ],
                        },
                    ],
                });
                return interaction.editReply({
                    embeds: [
                        {
                            title: 'Application send',
                            description:
                                'The application was send, you will get a DM Notification when the request was reviewed. Please make sure the Bot is able to send you Private Messages',
                            color: 0xff4654,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                });
            }
            case 'upkey': {
                const key = await mongoclient.db('API').collection('tokens').findOne({token: args[2]});
                client.channels.cache.get('983100719840256090').send({
                    embeds: [
                        {
                            title: `Upgrade Application ${args[1]}`,
                            fields: [
                                {name: 'Product Name', value: key.name},
                                {name: 'Details', value: key.details},
                                {name: 'Type', value: key.type},
                                {name: 'Current limit', value: key.limit},
                                {
                                    name: 'Requested limit',
                                    value: interaction.fields.getTextInputValue('limit'),
                                },
                                {
                                    name: 'Why?',
                                    value: interaction.fields.getTextInputValue('why'),
                                },
                                {
                                    name: 'Additional Information',
                                    value: interaction.fields.getTextInputValue('addinfo') ? interaction.fields.getTextInputValue('addinfo') : 'Not available',
                                },
                            ],
                            color: 0xffffff,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Success,
                                    label: 'Accept',
                                    customId: 'applicationupgradeaccept',
                                },
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Danger,
                                    label: 'Deny',
                                    customId: 'applicationupgradedeny',
                                },
                            ],
                        },
                    ],
                });
                return interaction.editReply({
                    embeds: [
                        {
                            title: 'Upgrade Application send',
                            description:
                                'The application was send, you will get a DM Notification when the request was reviewed. Please make sure the Bot is able to send you Private Messages',
                            color: 0xff4654,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                });
            }
            case 'applicationdenyconfirm': {
                const user = await client.users.fetch(interaction.customId.split(';')[1]);
                const message = await client.channels.cache.get('983100719840256090').messages.fetch(interaction.customId.split(';')[2]);
                user.send({
                    embeds: [
                        {
                            title: 'Application declined',
                            description: `Your application for the VALORANT API got declined`,
                            fields: [
                                {
                                    name: 'Reason',
                                    value: interaction.fields.getTextInputValue('info'),
                                },
                            ],
                            color: 0xff4654,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                });
                console.log(interaction.customId.split(';')[2]);
                message.edit({
                    embeds: [
                        EmbedBuilder.from(message.embeds[0])
                            .setColor(0xff4654)
                            .addFields([{name: 'Reason', value: interaction.fields.getTextInputValue('info')}]),
                    ],
                    components: [],
                });
                return interaction.editReply({content: 'Deny'});
            }
            case 'applicationacceptconfirm': {
                const user = await client.users.fetch(interaction.customId.split(';')[1]);
                const message = await client.channels.cache.get('983100719840256090').messages.fetch(interaction.customId.split(';')[2]);
                const tokens = `HDEV-${uuidv4()}`;
                getDB({db: 'API', col: 'tokens'}).insertOne({
                    userid: user.id,
                    token: tokens,
                    limit: 90,
                    name: message.embeds[0].fields.find(i => i.name == 'Product Name').value,
                    details: message.embeds[0].fields.find(i => i.name == 'Details').value,
                    info: message.embeds[0].fields.find(i => i.name == 'Additional Information').value,
                    type: message.embeds[0].fields.find(i => i.name == 'Type') ? message.embeds[0].fields.find(i => i.name == 'Type').value : 'valorant',
                    admin: false,
                });
                user.send({
                    embeds: [
                        {
                            title: 'Application accepted',
                            description: 'Your application for the VALORANT API got accepted',
                            fields: [
                                {name: 'Key', value: tokens},
                                {name: 'Rate Limit', value: '90req/min'},
                                {
                                    name: 'Additional Information',
                                    value: interaction.fields.getTextInputValue('info') ? interaction.fields.getTextInputValue('info') : 'None',
                                },
                            ],
                            color: 0x00ff93,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                });
                message.edit({
                    embeds: [
                        EmbedBuilder.from(message.embeds[0])
                            .setColor(0x00ff93)
                            .addFields([{name: 'Reason', value: interaction.fields.getTextInputValue('info') ? interaction.fields.getTextInputValue('info') : 'None'}]),
                    ],
                    components: [],
                });
                return interaction.editReply({content: 'Accept'});
            }
        }
    }
    if (interaction.isSelectMenu()) {
        const args = interaction.customId.split(';');
        switch (args[0]) {
            case 'generate': {
                const key = await getDB({db: 'API', col: 'tokens'}).findOne({userid: interaction.user.id, type: interaction.values[0]});
                if (key)
                    return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            {
                                title: 'You already have an application',
                                description: "You already have an application for that API type, you can't create a second one",
                                color: 0xff4654,
                                footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                            },
                        ],
                    });
                return interaction.showModal({
                    title: 'Generate API Key',
                    customId: `genkey;${interaction.user.id};${interaction.values[0]}`,
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'title',
                                    style: TextInputStyle.Short,
                                    label: 'Product Name',
                                    required: true,
                                },
                            ],
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'desc',
                                    style: TextInputStyle.Paragraph,
                                    label: 'Product Description',
                                    max_length: 1000,
                                    required: true,
                                },
                            ],
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'addinfo',
                                    style: TextInputStyle.Paragraph,
                                    label: 'Additional information you want to provide',
                                    max_length: 1000,
                                    required: false,
                                },
                            ],
                        },
                    ],
                });
            }
            case 'upgrade': {
                const key = await getDB({db: 'API', col: 'tokens'}).findOne({token: interaction.values[0]});
                return interaction.showModal({
                    title: 'Upgrade API Key',
                    customId: `upkey;${interaction.user.id};${interaction.values[0]}`,
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'limit',
                                    style: TextInputStyle.Short,
                                    label: 'Request limit you want (req/min)',
                                    required: true,
                                    value: key.limit,
                                },
                            ],
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'why',
                                    style: TextInputStyle.Paragraph,
                                    max_length: 1000,
                                    label: 'Why do you need a higher rate limit?',
                                    required: true,
                                },
                            ],
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'addinfo',
                                    style: TextInputStyle.Paragraph,
                                    max_length: 1000,
                                    label: 'Additional information you want to provide',
                                    required: false,
                                },
                            ],
                        },
                    ],
                });
            }
        }
    }
});

client.login(basedata.henrikdevsystem);
