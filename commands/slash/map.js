import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const request = await Utils.axios.get(`https://valorant-api.com/v1/maps`).catch(error => {return error})
    const cmap = request.data.data.find(item => item.displayName.toLowerCase() == interaction.options.get("map").value)
    return interaction.editReply({
        embeds: [Utils.embedBuilder({
            title: cmap.displayName,
            thumbnail: cmap.splash,
            desc: cmap.coordinates ? cmap.coordinates : "N.A",
            image: cmap.displayIcon,
            footer: `VALORANT LABS [MAP ${interaction.options.get("map").value.toUpperCase()}]`
        })]
    })
}
export const name = "map"