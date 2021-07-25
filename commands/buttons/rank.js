const { axios, errorhandler, linkjson, errorhandlerinteraction } = require("../../functions.js")
module.exports.execute = async (interaction, args, guilddata) => {
    interaction.defer()
    var puuid = await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURI(args[1])}/${encodeURI(args[2])}`).catch(error => {return error})
    if(puuid.response) return errorhandlerinteraction(interaction, puuid.response.status, "stats", guilddata)
    var mmr = await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${puuid.data.data.region}/${puuid.data.data.puuid}`).catch(error => {return error})
    if(mmr.response) return errorhandlerinteraction(interaction, mmr.response.status, "stats", guilddata)
    if(mmr.status == 204) {
        interaction.message.edit({embeds: [{
            title: `MMR: ${args[1]}#${args[2]}`,
            description: linkjson[guilddata.lang].mmr204,
            thumbnail: {
                url: `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png`
            },
            fields: [
                {name: "Tier", value: "N.A"},
                {name: "Progress in tier", value: "N.A"},
                {name: "Last MMR change", value: "N.A"},
                {name: "Elo", value: "N.A"}
            ],
            color: 0xff4654, 
            timestamp: new Date().toISOString(), 
            footer: {text: `VALORANT LABS [MMR]`}
        }], components: []})
        interaction.deleteReply()
        return
    }
    interaction.message.edit({embeds: [{
        title: `MMR: ${args[1]}#${args[2]}`,
        thumbnail: {
            url: `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/${mmr.data.data.currenttier}/largeicon.png`
        },
        fields: [
            {name: "Tier", value: mmr.data.data.currenttierpatched},
            {name: "Progress in tier", value: String(mmr.data.data.ranking_in_tier)},
            {name: "Last MMR change", value: String(mmr.data.data.mmr_change_to_last_game)},
            {name: "Elo", value: String(mmr.data.data.elo)}
        ],
        color: 0xff4654, 
        timestamp: new Date().toISOString(), 
        footer: {text: `VALORANT LABS [MMR]`}
    }], components: []})
    interaction.deleteReply()
}

module.exports.name = "rank"
