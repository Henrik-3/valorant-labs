import {default as Utils} from "../../methods.js"
export async function execute(data) {
    const dbcheck = await Utils.valodb.collection("topggvote").findOne({userid: interaction.user.id})
    if(!dbcheck) {
        const topggusage = await Utils.valodb.collection("rate-limit-key").findOne({key: "topgg"})
        if(topggusage.current >= 55) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].mmr["429_title"], description: Utils.translations[data.guilddata.lang].mmr["429_desc"], color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MMR TOP.GG ERROR]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
        const topggvote = await axios.get(`https://top.gg/api/bots/702201518329430117/check?userId=${interaction.user.id}`, {headers: {"Authorization": basedata.dbltoken}}).catch(error => {return error})
        await Utils.valodb.collection("rate-limit-key").updateOne({key: "topgg"}, {$inc: {current: 1}})
        if(topggusage.response) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].mmr["500_title"], description: Utils.translations[data.guilddata.lang].mmr["500_desc"], color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MMR TOP.GG ERROR]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
        if(topggusage.data.voted != 1) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].mmr.not_voted_title, description: Utils.translations[data.guilddata.lang].mmr.not_voted_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MMR NOT VOTED]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: 1, components: [{type: 2, url: "https://top.gg/bot/702201518329430117/vote", style: 5, label: "top.gg"}]}]})
        await Utils.valodb.collection("topggvote").insertOne({userid: interaction.user.id, createdAt: new Date()})
    }
    const link = Utils.getLink(interaction.user.id)
    if(!link && !interaction.options.get("riot-id")) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].mmr.no_link_title, description: Utils.translations[data.guilddata.lang].mmr.no_link_desc, fields: [{name: `/mmr`, value: Utils.translations[data.guilddata.lang].mmr.base}, {name: `/mmr riot-id`, value: Utils.translations[data.guilddata.lang].mmr.options}], color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MMR TOP.GG ERROR]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: Utils.translations[data.guilddata.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    const account_details = interaction.options.get("riot-id") == null ? linkcheck : {ingamename: interaction.options.get("riot-id").value.split("#")[0], ingametag: interaction.options.get("riot-id").value.split("#")[1]}
    const puuid = await Utils.axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${account_details.ingamename}/${account_details.ingametag}?asia=true`).catch(error => {return error})
    if(puuid.response) return errorhandlerinteraction(interaction, puuid.response.status, "stats", guilddata)
    const mmr = await Utils.axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${puuid.data.data.region}/${puuid.data.data.puuid}`).catch(error => {return error})
    if(mmr.response) return errorhandlerinteraction(interaction, mmr.response.status, "stats", guilddata)
    const fields = []
    for(let i = 0; Object.keys(mmr.data.data.by_season).length > i; i++) {
        const cdata = {name: Object.keys(mmr.data.data.by_season)[i], value: Object.values(mmr.data.data.by_season)[i]}
        if(cdata.value.error) fields.push({name: cdata.name, value: "```There is no data for that episode/act```"})
        if(!cdata.value.error) fields.push({name: cdata.name, value: "```Wins: " + cdata.value.wins + "\nNumber of games: " + cdata.value.number_of_games + "\nWinrate: " + ((cdata.value.wins / cdata.value.number_of_games) * 100).toFixed(2) + "%\nFinal rank: " + cdata.value.final_rank_patched + "\nHighest rank: " + (cdata.value.act_rank_wins.filter(item => item.tier != 0)[0] != undefined ? cdata.value.act_rank_wins.filter(item => item.tier != 0)[0].patched_tier : "Unrated") + "\nLowest rank: " + (cdata.value.act_rank_wins.filter(item => item.tier != 0)[cdata.value.act_rank_wins.filter(item => item.tier != 0).length - 1] != undefined ? cdata.value.act_rank_wins.filter(item => item.tier != 0)[cdata.value.act_rank_wins.filter(item => item.tier != 0).length - 1].patched_tier : "Unrated") + "```"})
    }
    return data.interaction.editReply({
        embeds: [{
            title: `MMR: ${puuid.data.data.name}#${puuid.data.data.tag}`,
            description: `**Tier:** ${mmr.data.data.current_data.currenttier == 0 ? "Unrated" : mmr.data.data.current_data.currenttierpatched}\n**Progress in tier:** ${mmr.data.data.current_data.currenttier == 0 ? "0" : mmr.data.data.current_data.ranking_in_tier}\n**Last MMR Change:** ${mmr.data.data.current_data.currenttier == 0 ? "None" : mmr.data.data.current_data.mmr_change_to_last_game}\n**Elo:** ${mmr.data.data.current_data.currenttier == 0 ? "0" : mmr.data.data.current_data.elo}\n**Games needed for rating:** ${mmr.data.data.current_data.games_needed_for_rating}`,
            color: 0xff4654,
            timestamp: new Date().toISOString(),
            fields: fields,
            footer: {
                text: 'VALORANT LABS [MMR]',
                icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
            }
        }]
    })
}
export const name = "agent"