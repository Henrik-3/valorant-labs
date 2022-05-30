import {perms, embedBuilder, translations, getGuild, patchGuild, ComponentType, ButtonStyle} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
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
    if (interaction.options._subcommand == 'get') return getGuild(interaction);
    if (interaction.options._subcommand == 'deactivate') return patchGuild({interaction: interaction, key: interaction.options.get('value').value, value: false});
    return patchGuild({interaction: interaction, key: interaction.options._subcommand, value: interaction.options.get('value')?.value});
}
export const name = 'settings';
