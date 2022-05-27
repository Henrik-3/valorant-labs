import {embedBuilder, translations} from "../../methods.js"
export async function execute({interaction, args, guilddata} = {}) {
    interaction.client.channels.cache.get(args[1]).messages.edit(args[2], {
        embeds: [
            embedBuilder({
                title: interaction.fields.fields.has("title") ? interaction.fields.getTextInputValue("title") : null,
                desc: interaction.fields.fields.has("desc") ? interaction.fields.getTextInputValue("desc") : null,
                color: interaction.fields.fields.has("color") ? interaction.fields.getTextInputValue("color").includes("#") ? parseInt(interaction.fields.getTextInputValue("color").replace("#", ""), 16) : interaction.fields.getTextInputValue("color") : null,
                footer: "VALORANT LABS [AUTOROLE SYSTEM]"
            })
        ]
    })
    return interaction.reply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].autorole.message_edit_title,
                desc: translations[guilddata.lang].autorole.message_edit_desc,
                footer: "VALORANT LABS [FEEDBACK SEND]"
            })
        ]
    })
}
export const name = "editautorole"