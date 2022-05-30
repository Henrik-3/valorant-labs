import {embedBuilder, translations, ComponentType, TextInputStyle, perms} from '../../methods.js';
export async function execute({interaction, args, guilddata} = {}) {
    console.log(interaction.targetMessage.author.id);
    if (interaction.targetMessage.author.id != interaction.client.id && interaction.targetMessage.embeds[0]?.footer.text != 'VALORANT LABS [AUTOROLE SYSTEM]')
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
    interaction.showModal({
        title: translations[guilddata.lang].autorole.modal_edit_title,
        customId: `editautorole;${interaction.channelId};${interaction.targetMessage.id}`,
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.TextInput,
                        customId: 'title',
                        style: TextInputStyle.Short,
                        label: translations[guilddata.lang].autorole.modal_title,
                        required: false,
                        value: interaction.targetMessage.embeds[0].title,
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
                        label: translations[guilddata.lang].autorole.modal_desc,
                        required: false,
                        value: interaction.targetMessage.embeds[0].description,
                    },
                ],
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.TextInput,
                        customId: 'color',
                        style: TextInputStyle.Short,
                        label: translations[guilddata.lang].autorole.modal_color,
                        required: false,
                        placeholder: '#ff4654',
                    },
                ],
            },
        ],
    });
}
export const name = '978299772278558790';
