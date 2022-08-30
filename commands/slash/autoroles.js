import {patchGuild, getAutoRoles, embedBuilder, translations, roles, firstletter, ButtonStyle, ComponentType, perms} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
    switch (interaction.options._subcommand) {
        case 'setup': {
            return patchGuild({
                interaction,
                key: 'autoroles',
                value: interaction.options.get('rank').value,
                additionaldata: interaction.options.get('role').value,
                guilddata,
            });
        }
        case 'get': {
            return getAutoRoles(interaction, guilddata);
        }
        case 'send': {
            if (guilddata.autoroles?.length != 9) {
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].autorole.setup_missing_roles_title,
                            desc: translations[guilddata.lang].autorole.setup_missing_roles_desc,
                            additionalFields: roles.map(item => {
                                return {
                                    name: firstletter(item),
                                    value: guilddata.autoroles.some(item1 => item1.name == item)
                                        ? translations[guilddata.lang].autorole.correct
                                        : translations[guilddata.lang].autorole.wrong,
                                };
                            }),
                            footer: 'VALORANT LABS [MISSING ROLES]',
                        }),
                    ],
                });
            } else {
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
            }
            if (!interaction.channel.permissionsFor(interaction.client.user.id).has(perms.SendMessages))
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].autorole.message_send_error_title,
                            desc: translations[guilddata.lang].autorole.message_send_error_desc,
                            additionalFields: uneditableroles,
                            footer: 'VALORANT LABS [ROLE PERMISSION ERROR]',
                        }),
                    ],
                });
            interaction.channel.send({
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
            });
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].autorole.created_title,
                        desc: translations[guilddata.lang].autorole.created_desc,
                        footer: 'VALORANT LABS [AUTOROLE CREATED]',
                    }),
                ],
                ephemeral: true,
            });
        }
    }
}
export const name = 'autoroles';
