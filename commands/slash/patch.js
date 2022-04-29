import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const website = await Utils.axios.get(Utils.translations[guilddata.lang].patchurl).catch(error => {return error})
    interaction.editReply({
        embeds: [Utils.embedBuilder({
            title: website.data.data[0].title,
            image: website.data.data[0].banner_url,
            footer: "VALORANT LABS [PATCH NOTES]",
        })],
        components: [{
            type: "ACTION_ROW",
            components: [{
                type: "BUTTON",
                style: "LINK",
                url: website.data.data[0].url,
                label: website.data.data[0].title
            }]
        }]
    })
}
export const name = "patch"