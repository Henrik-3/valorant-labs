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
    const bgcanvas = guilddata.background_mmr ? await Utils.buildBackground(Utils.getCustomBackground(guilddata.background_mmr), "mmr") : null
    if(!mmrdb) await Utils.getDB("mmr").insertOne({puuid: puuid.data.data.puuid, data: mmr.data, createdAt: new Date()})
    const seasonsvalues = Object.entries(mmr.data.data.by_season).filter(item => !item[1].error)
    const seasonscomponents = []
    for(let i = 0; seasonsvalues.length > i; i++) {
        const emoji = Utils.ranks[seasonsvalues[i][1].final_rank].discordid.substring(2, Utils.ranks[seasonsvalues[i][1].final_rank].discordid.length - 1).split(":")
        seasonscomponents.push({
            label: seasonsvalues[i][0],
            value: seasonsvalues[i][0],
            description: `${seasonsvalues[i][1].act_rank_wins[seasonsvalues[i][1].act_rank_wins.length - 1].patched_tier} - ${seasonsvalues[i][1].act_rank_wins[0].patched_tier}`,
            emoji: {
                name: emoji[0],
                id: emoji[1]
            }
        })
    }
    const attachment = await Utils.buildMMRImage({mmrdata: mmr.data.data, bgcanvas})
    interaction.editReply({
        files: [attachment], components: [{
            type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("SELECT_MENU"), customId: `mmr;${puuid.data.data.region};${puuid.data.data.puuid}`, maxValues: 1, minValues: 0, options: seasonscomponents, placeholder: Utils.translations[guilddata.lang].mmr.season_select}]
        }]
    })
}
export const name = "mmr"