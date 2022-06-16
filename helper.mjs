import {Client, GatewayIntentBits, ComponentType, ButtonStyle, Options, TextInputStyle} from 'discord.js.dev';
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
                    description:
                        'Klick on the `Generate` Button below beginn the process of the key generation. If you need a higher Rate Limit klick on `Upgrade RL`.\n\nBase Ratelimit: TBD',
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
                            label: 'Generate',
                            customId: 'generate',
                            emoji: {name: 'icons_newmembers', id: '964425853410893874'},
                        },
                        {
                            type: ComponentType.Button,
                            style: ButtonStyle.Secondary,
                            label: 'Upgrade RL',
                            customId: 'upgrade',
                            emoji: {name: 'icons_upvote', id: '909715386843430933'},
                        },
                    ],
                },
            ],
        });
        message.delete();
    }
});

client.on('interactionCreate', async interaction => {
    if (!['upgrade', 'generate'].some(item => interaction.customId.startsWith(item))) await interaction.deferReply({ephemeral: true});
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
                const key = await mongoclient.db('API').collection('tokens').findOne({userid: interaction.user.id});
                if (key)
                    return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            {
                                title: 'You already have an application',
                                description: "You already have an application, you can't create a second one",
                                color: 0xff4654,
                                footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                            },
                        ],
                    });
                return interaction.showModal({
                    title: 'Generate API Key',
                    customId: `genkey;${interaction.user.id}`,
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
                const key = await mongoclient.db('API').collection('tokens').findOne({userid: interaction.user.id});
                if (!key)
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
                return interaction.showModal({
                    title: 'Upgrade API Key',
                    customId: `upgradekey;${interaction.user.id}`,
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.TextInput,
                                    customId: 'limit',
                                    style: TextInputStyle.Short,
                                    label: 'Request limit you want (enter a request count in a 2min interval)',
                                    required: true,
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
    if (interaction.isModalSubmit()) {
        const args = interaction.customId.split(';');
        switch (args[0]) {
            case 'genkey': {
                console.log(interaction.fields.fields);
                client.channels.cache.get('983100719840256090').send({
                    embeds: [
                        {
                            title: `New Application ${args[1]}`,
                            fields: [
                                {name: 'Product Name', value: interaction.fields.getTextInputValue('title')},
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
            case 'upgradekey': {
                const key = await mongoclient.db('API').collection('tokens').findOne({userid: args[1]});
                client.channels.cache.get('983100719840256090').send({
                    embeds: [
                        {
                            title: `Upgrade Application ${args[1]}`,
                            fields: [
                                {name: 'Product Name', value: key.name},
                                {name: 'Details', value: key.details},
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
                                    value: interaction.fields.fields.has('addinfo') ? interaction.fields.getTextInputValue('addinfo') : 'Not available',
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
                            title: 'Upgrade Application send',
                            description:
                                'The application was send, you will get a DM Notification when the request was reviewed. Please make sure the Bot is able to send you Private Messages',
                            color: 0xff4654,
                            footer: {text: 'HenrikDev Systems', icon_url: 'https://cloud.henrikdev.xyz/valorant_labs_platinum0.png'},
                        },
                    ],
                });
            }
        }
    }
});

client.login(basedata.henrikdevsystem);
