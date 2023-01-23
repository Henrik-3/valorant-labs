import {embedBuilder, perms, getTranslations, getCompetitiveTiers, roles, firstletter, ComponentType, ButtonStyle} from '../../methods.js';

export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferUpdate({ephemeral: true});
    const translations = getTranslations();
    const competitive = getCompetitiveTiers();
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
                    components: [
                        {type: ComponentType.Button, label: translations[guilddata.lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/X3GaVkX2YN'},
                    ],
                },
            ],
        });
    switch (args[1]) {
        case 'settings': {
            const rank = competitive.find(i => i.tier == Number(interaction.values[0]));
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: firstletter(rank.divisionName.toLowerCase()),
                        desc: translations[guilddata.lang].autorole.settings_role_desc,
                        thumbnail: rank.largeIcon,
                        footer: 'VALORANT LABS [AUTOROLE SETUP]',
                    }),
                ],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.RoleSelect,
                                style: ButtonStyle.Danger,
                                maxValues: 1,
                                minValues: 1,
                                placeholder: translations[guilddata.lang].autorole.settings_role_placeholder,
                                customId: `autoroles;role;${rank.divisionName.toLowerCase()}`,
                            },
                        ],
                    },
                ],
            });
        }
    }
}
export const name = 'autoroles';
