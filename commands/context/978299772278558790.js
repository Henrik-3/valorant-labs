import Utils from "../../methods.js"
export async function execute({interaction, args, guilddata} = {}) {
    if(interaction.targetMessage.author.id != interaction.client.id || interaction.targetMessage.embeds[0]?.footer.text != "VALORANT LABS [AUTOROLE SYSTEM]") return interaction.reply({
        embeds: [
            Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].autorole.message_edit_error_title,
                desc: Utils.translations[guilddata.lang].autorole.message_edit_error_desc,
                footer: "VALORANT LABS [NO AUTOROLE MESSAGE]"
            })
        ],
        ephemeral: true
    })
    if(!interaction.member.permissions.has(Utils.perms.ManageGuild)) return interaction.reply({
        embeds: [
            Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].blacklist.blacklistperms_title,
                desc: Utils.translations[guilddata.lang].blacklist.blacklistperms_desc,
                footer: "VALORANT LABS [NO PERMISSION]"
            })
        ],
        ephemeral: true
    })
    interaction.showModal({
        title: Utils.translations[guilddata.lang].autorole.modal_edit_title,
        customId: `editautorole;${interaction.channelId};${interaction.targetMesage.id}`,
        components: [
            {
                type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"),
                components: [
                    {
                        type: 4,
                        customId: "title",
                        style: 1, //Short,
                        label: Utils.translations[guilddata.lang].autorole.modal_title,
                        required: false,
                        value: interaction.targetMesage.embeds[0].title
                    },
                ]
            },
            {
                type: EnumResolvers.resolveComponentType("ACTION_ROW"),
                components: [
                    {
                        type: 4,
                        customId: "desc",
                        style: 2, //Long,
                        label: Utils.translations[guilddata.lang].autorole.modal_desc,
                        required: false,
                        value: interaction.targetMesage.embeds[0].description
                    },
                ]
            },
            {
                type: EnumResolvers.resolveComponentType("ACTION_ROW"),
                components: [
                    {
                        type: 4,
                        customId: "color",
                        style: 1, //Long,
                        label: Utils.translations[guilddata.lang].autorole.modal_color,
                        required: false,
                        placeholder: "#ff4654"
                    }
                ]
            },
        ]
    })
}
export const name = "978299772278558790"