import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const website = await Utils.axios.get(Utils.translations[guilddata.lang].patchurl).catch(error => {return error})
    interaction.editReply({
        embeds: [{
            title: website.data.data[0].title,
            url: website.data.data[0].url,
            image: {
                url: website.data.data[0].banner_url
            },
            color: 0xff4654,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'VALORANT LABS [PATCH NOTES]',
                icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
            }
        }],
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