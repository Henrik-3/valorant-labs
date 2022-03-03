import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    return interaction.editReply({
        embeds: [{
            title: "Unofficial-VALORANT-API",
            author: {
                name: "Created by Henrik3",
                url: "https://github.com/Henrik-3"
            },
            description: "Unofficial Valorant API using the VALORANT Ingame API",
            color: 0xff4654,
            image: "https://opengraph.githubassets.com/3bbac063af945bc9eed6be07446a8760a5b892eea59e7d1e515b7770ef13b6/Henrik-3/unofficial-valorant-api",
            url: "https://github.com/Henrik-3/unofficial-valorant-api"
        }]
    })
}
export const name = "api"