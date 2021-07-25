module.exports.execute = async (message, args, guilddata) => {
    message.reply({embeds: [{
        title: "Unofficial-VALORANT-API",
        author: {
            name: "Created by Henrik3#1451",
            url: "https://github.com/Henrik-3"
        },
        description: "Unofficial Valorant API using the VALORANT Ingame API",
        color: 0xff4654,
        image: "https://opengraph.githubassets.com/3bbac063af945bc9eed6be07446a8760a5b892eea59e7d1e515b7770ef13b6/Henrik-3/VALORANT-Overlay",
        url: "https://github.com/Henrik-3/unofficial-valorant-api"
    }]})
}
module.exports.name = "api"