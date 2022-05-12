import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const website = await Utils.axios.get(Utils.translations[guilddata.lang].patchurl).catch(error => {return error})
    interaction.editReply({
        embeds: [Utils.embedBuilder({
            title: website.data.data[0].title,
            image: website.data.data[0].banner_url,
            footer: "VALORANT LABS [PATCH NOTES]",
        })],
        components: [{
            type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"),
            components: [{
                type: Utils.EnumResolvers.resolveComponentType("BUTTON"),
                style: Utils.EnumResolvers.resolveButtonStyle("LINK"),
                url: website.data.data[0].url,
                label: website.data.data[0].title
            }]
        }]
    })
}
export const name = "patch"