import {embedBuilder, perms, getTranslations, getFunction, roles, firstletter, ComponentType, ButtonStyle} from '../../methods.js';

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
    const patchGuild = getFunction('patchGuild');
    const competitive = getCompetitiveTiers();
    switch (args[1]) {
        case 'role': {
            const rank = competitive.find(i => i.tier == Number(args[2]));
            return patchGuild({
                interaction,
                key: 'autoroles',
                value: rank.divisionName.toLowerCase(),
                additionaldata: interaction.values[0],
                guilddata,
            });
        }
    }
}
export const name = 'autoroles';
