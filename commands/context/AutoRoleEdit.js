import {embedBuilder, getTranslations, ComponentType, ButtonStyle, perms} from '../../methods.js';
export async function execute({interaction, args, guilddata} = {}) {
    console.log(interaction.targetMessage.author.id);
    const translations = getTranslations();
    if (interaction.targetMessage.author.id != interaction.client.id && interaction.targetMessage.embeds[0]?.footer?.text != 'VALORANT LABS [AUTOROLE SYSTEM]')
        return interaction.reply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].autorole.message_edit_error_title,
                    desc: translations[guilddata.lang].autorole.message_edit_error_desc,
                    footer: 'VALORANT LABS [NO AUTOROLE MESSAGE]',
                }),
            ],
            ephemeral: true,
        });
    if (!interaction.member.permissions.has(perms.ManageGuild))
        return interaction.reply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].blacklist.blacklistperms_title,
                    desc: translations[guilddata.lang].blacklist.blacklistperms_desc,
                    footer: 'VALORANT LABS [NO PERMISSION]',
                }),
            ],
            ephemeral: true,
        });
    return interaction.reply({
        ephemeral: true,
        embeds: [interaction.targetMessage.embeds[0]],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        label: translations[guilddata.lang].embeds.title,
                        customId: `embed;edit;title`,
                        style: ButtonStyle.Secondary,
                    },
                    {
                        type: ComponentType.Button,
                        label: translations[guilddata.lang].embeds.desc,
                        customId: `embed;edit;description`,
                        style: ButtonStyle.Secondary,
                    },
                    {
                        type: ComponentType.Button,
                        label: translations[guilddata.lang].embeds.color,
                        customId: `embed;edit;color`,
                        style: ButtonStyle.Secondary,
                    },
                    {
                        type: ComponentType.Button,
                        label: translations[guilddata.lang].embeds.thumbnail,
                        customId: `embed;edit;thumbnail`,
                        style: ButtonStyle.Secondary,
                    },
                    {
                        type: ComponentType.Button,
                        label: translations[guilddata.lang].embeds.image,
                        customId: `embed;edit;image`,
                        style: ButtonStyle.Secondary,
                    },
                ],
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        label: translations[guilddata.lang].embeds.fields,
                        customId: `embed;edit;fields;sub;appedit-${interaction.targetMessage.id}`,
                        style: ButtonStyle.Secondary,
                    },
                    {
                        type: ComponentType.Button,
                        label: translations[guilddata.lang].embeds.content,
                        customId: `embed;edit;content`,
                        disabled: !interaction.member.permissions.has(perms.ManageGuild),
                        style: ButtonStyle.Secondary,
                    },
                ],
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        label: translations[guilddata.lang].embeds.send,
                        customId: `embed;appedit;${interaction.targetMessage.id}`,
                        style: ButtonStyle.Success,
                    },
                ],
            },
        ],
    });
}
export const name = 'Edit AutoRole';
