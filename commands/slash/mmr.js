import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const dbcheck = await Utils.getDB("topggvote").findOne({userid: interaction.user.id})
    if(!dbcheck) {
        const topggusage = await Utils.getDB("rate-limit-key").findOne({key: "topgg"})
        if(topggusage && topggusage.current >= 55) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].mmr["429_title"], desc: Utils.translations[guilddata.lang].mmr["429_desc"], footer: 'VALORANT LABS [MMR TOP.GG ERROR]'})]})
        const topggvote = await Utils.axios.get(`https://top.gg/api/bots/702201518329430117/check?userId=${interaction.user.id}`, {headers: {"Authorization": Utils.topgg}}).catch(error => {return error})
        await Utils.getDB("rate-limit-key").updateOne({key: "topgg"}, {$inc: {current: 1}})
        if(topggvote.response) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].mmr["500_title"], desc: Utils.translations[guilddata.lang].mmr["500_desc"], footer: 'VALORANT LABS [MMR TOP.GG ERROR]'})]})
        if(topggvote.data.voted != 1) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].mmr.not_voted_title, desc: Utils.translations[guilddata.lang].mmr.not_voted_desc, footer: 'VALORANT LABS [MMR NOT VOTED]'})], components: [{type: 1, components: [{type: 2, url: "https://top.gg/bot/702201518329430117/vote", style: 5, label: "top.gg"}]}]})
        await Utils.getDB("topggvote").insertOne({userid: interaction.user.id, createdAt: new Date()})
    }
    const link = await Utils.getLink(interaction.user.id)
    if(!link && !interaction.options.get("riot-id")) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].mmr.no_link_title, desc: Utils.translations[guilddata.lang].mmr.no_link_desc, additionalFields: [{name: `/mmr`, value: Utils.translations[guilddata.lang].mmr.base}, {name: `/mmr riot-id`, value: Utils.translations[guilddata.lang].mmr.options}], footer: 'VALORANT LABS [MMR TOP.GG ERROR]'})], components: [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: Utils.translations[guilddata.lang].support, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: "https://discord.gg/Zr5eF5D"}]}]})
    const account_details = interaction.options.get("riot-id") == null ? link : {ingamename: interaction.options.get("riot-id").value.split("#")[0], ingametag: interaction.options.get("riot-id").value.split("#")[1]}
    const puuid = await Utils.axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${account_details.ingamename}/${account_details.ingametag}?asia=true`).catch(error => {return error})
    if(puuid.response) return Utils.errorhandlerinteraction({interaction: interaction, status: puuid.response.status, type: "account", lang: guilddata.lang})
    const mmrdb = await Utils.getDB("mmr").findOne({puuid: puuid.data.data.puuid})
    const mmr = mmrdb ? mmrdb : await Utils.axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${puuid.data.data.region}/${puuid.data.data.puuid}`).catch(error => {return error})
    if(mmr.response) return Utils.errorhandlerinteraction({interaction: interaction, status: mmr.response.status, type: "stats", lang: guilddata.lang})
    const bgcanvas = guilddata.background ? await Utils.buildBackground(Utils.getCustomBackground(guilddata.background), "mmr") : null
    Utils.getDB("mmr").insertOne({puuid: puuid.data.data.puuid, data: mmr.data, createdAt: new Date()})
    const attachment = await Utils.buildMMRImage({mmrdata: mmr.data.data, bgcanvas})
    /*const fields = []
    for(let i = 0; Object.keys(mmr.data.data.by_season).length > i; i++) {
        const cdata = {name: Object.keys(mmr.data.data.by_season)[i], value: Object.values(mmr.data.data.by_season)[i]}
        if(cdata.value.error) fields.push({name: cdata.name, value: "```There is no data for that episode/act```"})
        if(!cdata.value.error) fields.push({name: cdata.name, value: "```Wins: " + cdata.value.wins + "\nNumber of games: " + cdata.value.number_of_games + "\nWinrate: " + ((cdata.value.wins / cdata.value.number_of_games) * 100).toFixed(2) + "%\nFinal rank: " + cdata.value.final_rank_patched + "\nHighest rank: " + (cdata.value.act_rank_wins.filter(item => item.tier != 0)[0] != undefined ? cdata.value.act_rank_wins.filter(item => item.tier != 0)[0].patched_tier : "Unrated") + "\nLowest rank: " + (cdata.value.act_rank_wins.filter(item => item.tier != 0)[cdata.value.act_rank_wins.filter(item => item.tier != 0).length - 1] != undefined ? cdata.value.act_rank_wins.filter(item => item.tier != 0)[cdata.value.act_rank_wins.filter(item => item.tier != 0).length - 1].patched_tier : "Unrated") + "```", inline: true})
    }
    return interaction.editReply({
        embeds: [Utils.embedBuilder({
            title: `MMR: ${puuid.data.data.name}#${puuid.data.data.tag}`,
            desc: `**Tier:** ${mmr.data.data.current_data.currenttier == 0 ? "Unrated" : mmr.data.data.current_data.currenttierpatched}\n**Progress in tier:** ${mmr.data.data.current_data.currenttier == 0 ? "0" : mmr.data.data.current_data.ranking_in_tier}\n**Last MMR Change:** ${mmr.data.data.current_data.currenttier == 0 ? "None" : mmr.data.data.current_data.mmr_change_to_last_game}\n**Elo:** ${mmr.data.data.current_data.currenttier == 0 ? "0" : mmr.data.data.current_data.elo}\n**Games needed for rating:** ${mmr.data.data.current_data.games_needed_for_rating}`,
            additionalFields: fields,
            footer: 'VALORANT LABS [MMR]'
        })]
    })*/
}
export const name = "mmr"