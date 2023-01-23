import {embedBuilder, perms, getTranslations, roles, firstletter, ComponentType, ButtonStyle} from '../../methods.js';

export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferUpdate({ephemeral: true});
    if (!interaction.member.permissions.has(perms.ManageGuild))
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].settings.perms_title,
                    desc: translations[guilddata.lang].settings.perms_desc,
                    footer: 'VALORANT LABS [SETTINGS PERMISSION ERROR]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [{type: ComponentType.Button, label: translations[guilddata.lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
                },
            ],
        });
    const translations = getTranslations();
    switch (args[1]) {
        case 'message': {
            const uneditableroles = [];
            roles.forEach(i => {
                const role = interaction.guild.roles.cache.get(guilddata.autoroles.find(k => k.name == i)?.id);
                if (role && !role?.editable) uneditableroles.push({name: firstletter(i), value: `<@&${role.id}>`, inline: true});
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
                    components: [
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
                });
            if (!interaction.client.channels.cache.get(interaction.values[0]).permissionsFor(interaction.client.user.id).has(perms.SendMessages))
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].autorole.message_send_error_title,
                            desc: translations[guilddata.lang].autorole.message_send_error_desc,
                            footer: 'VALORANT LABS [ROLE PERMISSION ERROR]',
                        }),
                    ],
                    components: [
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
                });
            if (!roles.every(i => guilddata.autoroles.some(k => k.name == i)))
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].autorole.roles_missing_title,
                            desc: translations[guilddata.lang].autorole.roles_missing_desc,
                            additionalFields: uneditableroles,
                            footer: 'VALORANT LABS [ROLE PERMISSION ERROR]',
                        }),
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Success,
                                    label: translations[guilddata.lang].autorole.cancel,
                                    customId: `autoroles;settings`,
                                },
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Danger,
                                    label: translations[guilddata.lang].autorole.continue,
                                    customId: `autoroles;send;${interaction.values[0]}`,
                                },
                            ],
                        },
                    ],
                });
            await interaction.client.channels.cache
                .get(interaction.values[0])
                .send({
                    embeds: [
                        embedBuilder({
                            title: 'VALORANT LABS Auto Role System',
                            desc: translations[guilddata.lang].autorole.send_desc,
                            footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                        }),
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Success,
                                    customId: 'autoroles;generate',
                                    label: translations[guilddata.lang].autorole.add,
                                },
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Secondary,
                                    customId: 'autoroles;update',
                                    label: translations[guilddata.lang].autorole.update,
                                },
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Danger,
                                    customId: 'autoroles;remove',
                                    label: translations[guilddata.lang].autorole.remove,
                                },
                            ],
                        },
                    ],
                })
                .catch(e => {
                    return interaction.editReply({
                        embeds: [
                            embedBuilder({
                                title: translations[guilddata.lang].autorole.message_send_error_title,
                                desc: translations[guilddata.lang].autorole.message_send_error_desc,
                                footer: 'VALORANT LABS [ROLE PERMISSION ERROR]',
                            }),
                        ],
                        components: [
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
                    });
                });
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].autorole.created_title,
                        desc: translations[guilddata.lang].autorole.created_desc,
                        footer: 'VALORANT LABS [AUTOROLE CREATED]',
                    }),
                ],
                components: [
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
            });
        }
    }
}
export const name = 'autoroles';
