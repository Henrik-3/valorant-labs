import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    switch(interaction.options._subcommand) {
        case "get":
            const link = await Utils.getLink(interaction.user.id)
            if(!link) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].link.nolink_title, description: Utils.translations[guilddata.lang].link.nolink_desc, footer: 'VALORANT LABS [LINK UNKNOWN]'})], components: [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), style: Utils.EnumResolvers.resolveButtonStyle("DANGER"), customId: "link;generate", label: Utils.translations[guilddata.lang].link.generate_link}]}]})
            return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].link.clink_title, desc: Utils.translations[guilddata.lang].link.clink_desc, footer: 'VALORANT LABS [LINK GET]'})]})
        case "add":
            return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].link.addlink_title, description: Utils.translations[guilddata.lang].link.addlink_desc, footer: 'VALORANT LABS [LINK ADD]'})], components: [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), style: Utils.EnumResolvers.resolveButtonStyle("DANGER"), customId: "link;generate", label: Utils.translations[guilddata.lang].link.generate_link}]}]})
        case "remove":
            await Utils.deleteLink(interaction.user.id)
            return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].link.removelink_title, desc: Utils.translations[guilddata.lang].link.removelink_desc, footer: 'VALORANT LABS [LINK REMOVE]'})]})
    }
}
export const name = "link"