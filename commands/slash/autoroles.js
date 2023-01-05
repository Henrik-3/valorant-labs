import {embedBuilder, getTranslations, roles, firstletter, ButtonStyle, ComponentType, perms, getFunction} from '../../methods.js';
//rework
export async function execute({interaction, guilddata} = {}) {
    const translations = getTranslations();
    const patchGuild = getFunction('patchGuild');
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
export const name = 'autoroles';
