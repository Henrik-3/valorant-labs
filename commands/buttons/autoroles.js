import {uuidv4, getDB, embedBuilder, getTranslations, axios, roles, firstletter, getFunction, ComponentType, ranks, ChannelType, ButtonStyle} from '../../methods.js';

export async function execute({interaction, args, guilddata} = {}) {
    const translations = getTranslations();
    const errorhandlerinteraction = getFunction('errorhandlerinteraction');
    const getAutoRoles = getFunction('getAutoRoles');
    if (['generate', 'update', 'remove'].some(i => i == args[1])) await interaction.deferReply({ephemeral: true});
    else await interaction.deferUpdate({ephemeral: true});
    switch (args[1]) {
        case 'generate': {
            const uuid = uuidv4();
            await getDB('state').insertOne({userid: interaction.user.id, guild: interaction.guildId, code: uuid, expireAt: new Date(), type: 'autorole'});
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].link.link_generated_title,
                        desc: translations[guilddata.lang].link.link_generated_desc + `https://valorantlabs.xyz/v1/rso/redirect/${uuid}`,
                        footer: 'VALORANT LABS [LINK GENERATED]',
                    }),
                ],
            });
        }
        case 'update': {
            const link = await getDB('linkv2').findOne({userid: interaction.user.id});
            if (!link)
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].link.nolink_title,
                            desc: translations[guilddata.lang].link.nolink_desc,
                            footer: 'VALORANT LABS [NO LINK V2]',
                        }),
                    ],
                });
            const mmr = await axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${link.region}/${link.puuid}?asia=true`).catch(error => {
                return error;
            });
            if (mmr.response) return errorhandlerinteraction({interaction, status: mmr.response, type: 'mmr', lang: guilddata.lang, data: mmr.response.data});
            if (mmr.data.data.current_data.currenttier == null || mmr.data.data.current_data.games_needed_for_rating != 0 || mmr.data.data.current_data.old) {
                await interaction.member.roles.remove(guilddata.autoroles.map(item => item.id));
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].mmr.no_rank_title,
                            desc: translations[guilddata.lang].mmr.no_rank_desc,
                            footer: 'VALORANT LABS [MMR ERROR]',
                        }),
                    ],
                });
            }
            const uneditableroles = [];
            roles.forEach(item => {
                const role = interaction.guild.roles.cache.get(guilddata.autoroles.find(item1 => item1.name == item).id);
                if (!role.editable) uneditableroles.push({name: firstletter(item), value: `<@&${role.id}>`});
            });
            if (uneditableroles.length)
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].autorole.roles_error_title,
                            desc: translations[guilddata.lang].autorole.roles_error_desc,
                            additionalFields: uneditableroles,
                            footer: 'VALORANT LABS [ROLE PERMISSION ERROR]',
                        }),
                    ],
                });
            await interaction.member.roles
                .remove(
                    guilddata.autoroles
                        .filter(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() != item.name)
                        .map(item => {
                            return item.id;
                        })
                )
                .catch(error => {
                    if (error.code == 50013)
                        return interaction.editReply({
                            embeds: [
                                embedBuilder({
                                    title: translations[guilddata.lang].autorole_permission_title,
                                    desc: translations[guilddata.lang].autorole_permission_desc,
                                    footer: 'VALORANT LABS [NO PERMISSION]',
                                }),
                            ],
                        });
                });
            await interaction.member.roles.add(
                guilddata.autoroles.find(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == item.name).id
            );
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].autorole.role_given_title,
                        desc: translations[guilddata.lang].autorole.role_given_desc,
                    }),
                ],
            });
        }
        case 'remove': {
            await interaction.member.roles
                .remove(
                    guilddata.autoroles.map(item => {
                        return item.id;
                    })
                )
                .catch(error => {
                    if (error.code == 50013)
                        return interaction.editReply({
                            embeds: [
                                embedBuilder({
                                    title: translations[guilddata.lang].autorole_permission_title,
                                    desc: translations[guilddata.lang].autorole_permission_desc,
                                    footer: 'VALORANT LABS [NO PERMISSION]',
                                }),
                            ],
                        });
                });
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].autorole.role_removed_title,
                        desc: translations[guilddata.lang].autorole.role_removed_desc,
                    }),
                ],
            });
        }
        case 'settings': {
            const autoroles_data = await getAutoRoles({interaction, guilddata});
            const mapping = {
                0: 0,
                1: 5,
                2: 8,
                3: 11,
                4: 14,
                5: 17,
                6: 20,
                7: 23,
                8: 26,
                9: 27,
            };
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: `AutoRoles @${interaction.guild.name}`,
                        desc: translations[guilddata.lang].autorolettings_desc,
                        additionalFields: autoroles_data,
                        footer: 'VALORANT LABS [AUTOROLES]',
                    }),
                ],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.StringSelect,
                                customId: `autoroles;settings`,
                                maxValues: 1,
                                minValues: 1,
                                placeholder: translations[guilddata.lang].autoroleettings_placeholder,
                                options: autoroles_data.map((i, index) => {
                                    const crank = ranks[mapping[index]];
                                    return {
                                        emoji: {
                                            id: i.value.startsWith('<@&')
                                                ? crank.discordid.substring(2, crank.discordid.length - 1).split(':')[1]
                                                : crank.graydiscordid.substring(2, crank.graydiscordid.length - 1).split(':')[1],
                                        },
                                        label: i.name,
                                        value: String(index),
                                        description: i.value.startsWith('<@&')
                                            ? translations[guilddata.lang].autoroleettings_set
                                            : translations[guilddata.lang].autoroleettings_not_set,
                                    };
                                }),
                            },
                        ],
                    },
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Danger,
                                label: translations[guilddata.lang].autorole.back_to_overview,
                                customId: `autoroles;overview`,
                            },
                        ],
                    },
                ],
                attachments: [],
            });
        }
        case 'message': {
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: `AutoRoles @${interaction.guild.name}`,
                        desc: translations[guilddata.lang].autorole.message_desc,
                        footer: 'VALORANT LABS [AUTOROLES]',
                    }),
                ],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.ChannelSelect,
                                customId: `autoroles;message`,
                                maxValues: 1,
                                minValues: 1,
                                placeholder: translations[guilddata.lang].autorole.message_placeholder,
                                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText],
                            },
                        ],
                    },
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Danger,
                                label: translations[guilddata.lang].autorole.back_to_overview,
                                customId: `autoroles;overview`,
                            },
                        ],
                    },
                ],
                attachments: [],
            });
        }
        case 'overview': {
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].autorole.overview_title,
                        desc: translations[guilddata.lang].autorole.overview_desc,
                        footer: 'VALORANT LABS [AUTOROLE OVERVIEW]',
                    }),
                ],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Danger,
                                label: translations[guilddata.lang].autorole.overview_button_settings,
                                customId: `autoroles;settings`,
                            },
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Danger,
                                label: translations[guilddata.lang].autorole.overview_button_message,
                                customId: `autoroles;message`,
                            },
                        ],
                    },
                ],
            });
        }
    }
}
export const name = 'autoroles';
