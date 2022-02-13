import {default as Utils} from "../../methods.js"
export async function execute(data) {
    const request = await Utils.axios.get(`https://valorant-api.com/v1/maps`).catch(error => {return error})
    const cmap = request.data.data.find(item => item.displayName.toLowerCase() == data.interaction.options.get("map").value)
    return data.interaction.editReply({
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
                text: `VALORANT LABS [MAP ${interaction.options.get("map").value.toUpperCase()}]`
            }
        }]
    })
}
export const name = "agent"