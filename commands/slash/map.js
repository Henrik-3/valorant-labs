import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const request = await Utils.axios.get(`https://valorant-api.com/v1/maps`).catch(error => {return error})
    const cmap = request.data.data.find(item => item.displayName.toLowerCase() == interaction.options.get("map").value)
    return interaction.editReply({
        embeds: [{
            title: cmap.displayName,
            thumbnail: {
                url: cmap.splash
            },
            description: cmap.coordinates ? cmap.coordinates : "N.A",
            image: {
                url: cmap.displayIcon
            },
            color: 0xff4654,
            timestamp: new Date().toISOString(),
            footer: {
                text: `VALORANT LABS [MAP ${interaction.options.get("map").value.toUpperCase()}]`,
                icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
            }
        }]
    })
}
export const name = "map"