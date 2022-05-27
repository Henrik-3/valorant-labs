import {getDB, translations, embedBuilder, ButtonStyle, ComponentType} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    switch(interaction.options._subcommand) {
        case "get":
            const link = await getDB("linkv2").findOne({userid: interaction.user.id})
            if(!link) return interaction.editReply({embeds: [embedBuilder({title: translations[guilddata.lang].link.nolink_title, desc: translations[guilddata.lang].link.nolink_desc, footer: 'VALORANT LABS [LINK UNKNOWN]'})], components: [{type: ComponentType.ActionRow, components: [{type: ComponentType.Button, style: ButtonStyle.Danger, customId: "link;generate", label: translations[guilddata.lang].link.generate_link}]}]})
            return interaction.editReply({embeds: [embedBuilder({title: translations[guilddata.lang].link.clink_title, desc: translations[guilddata.lang].link.clink_desc, footer: 'VALORANT LABS [LINK GET]'})]})
        case "add":
            return interaction.editReply({embeds: [embedBuilder({title: translations[guilddata.lang].link.addlink_title, desc: translations[guilddata.lang].link.addlink_desc, footer: 'VALORANT LABS [LINK ADD]'})], components: [{type: ComponentType.ActionRow, components: [{type: ComponentType.Button, style: ButtonStyle.Danger, customId: "link;generate", label: translations[guilddata.lang].link.generate_link}]}]})
        case "remove":
            await getDB("linkv2").deleteOne({userid: interaction.user.id})
            return interaction.editReply({embeds: [embedBuilder({title: translations[guilddata.lang].link.removelink_title, desc: translations[guilddata.lang].link.removelink_desc, footer: 'VALORANT LABS [LINK REMOVE]'})]})
    }
}
export const name = "link"