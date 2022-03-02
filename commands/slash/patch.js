import {default as Utils} from "../../methods.js"
export async function execute(data) {
    const website = await Utils.axios.get(Utils.translations[data.guilddata.lang].patchurl).catch(error => {return error})
    data.interaction.editReply({
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