import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const link = await Utils.getLink(interaction.user.id)
    const agent = Utils.getAgents()
    const modes = Utils.getGamemodes()
    const components = []
    let dbstats;
    let matchlist
    console.time()
    if(link && !interaction.options.get("riot-id")) {
        dbstats = await Utils.getStatsDB({name: link.ingamename, tag: link.ingametag})
        console.timeLog()
        if(dbstats.status != 200) return Utils.errorhandlerinteraction({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, interaction: interaction})
        matchlist = dbstats.type == "official" ? await Utils.axios.get(`https://${dbstats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.puuid}`, {headers: {"X-Riot-Token": Utils.riottoken}}).catch(error => {return error}) : await Utils.axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.region}/${dbstats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && interaction.options.get("riot-id")) {
        if(!interaction.options.get("riot-id").value.includes("#")) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.invalidriotid_title, desc: Utils.translations[guilddata.lang].stats.invalidriotid_desc, footer: "VALORANT LABS [INVALID RIOT ID]"})]})//TODO
        dbstats = await Utils.getStatsDB({name: interaction.options.get("riot-id").value.split("#")[0], tag: interaction.options.get("riot-id").value.split("#")[1]})
        console.timeLog()
        if(dbstats.status != 200) return Utils.errorhandlerinteraction({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, interaction: interaction})
        matchlist = dbstats.type == "official" ? await Utils.axios.get(`https://${dbstats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.puuid}`, {headers: {"X-Riot-Token": Utils.riottoken}}).catch(error => {return error}) : await Utils.axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.region}/${dbstats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && !interaction.options.get("riot-id")) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.noriotid_title, desc: Utils.translations[guilddata.lang].stats.noriotid_desc, footer: "VALORANT LABS [NO RIOT ID]"})]})
    console.timeLog()

    if(matchlist.response) return Utils.errorhandlerinteraction({type: "matchlist", status: matchlist.response.status, interaction: interaction, lang: guilddata.lang})
    const missingmatches = matchlist.data.history.filter(item => item.gameStartTimeMillis > 1652819697000)

    const bgcanvas = guilddata.background_stats ? await Utils.buildBackground(Utils.getCustomBackground(guilddata.background_stats), "stats") : null
    const attachment = await Utils.buildStatsImage({dbstats, agent, modes, bgcanvas})
    if(!missingmatches.length) {
        for(let i = 0; dbstats.matches.length > i; i++) {
            components.push({
                label: dbstats.matches[i].gamekey,
                value: dbstats.matches[i].id,
                description: `${dbstats.matches[i].map} | ${dbstats.matches[i].mode} | ${dbstats.matches[i].agent} | ${moment(dbstats.matches[i].start).format("lll")}`,
                emoji: Object.values(Utils.gamemodes).find(item => item.name == dbstats.matches[i].mode).emoji
            })
        }
    }
    const newmessage = await interaction.editReply({files: [attachment], embeds: missingmatches.length ? [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.missing_matches_title, desc: Utils.translations[guilddata.lang].stats.missing_matches_desc, footer: 'VALORANT LABS [STATS]'})] : [], components: components.length ? [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("SELECT_MENU"), customId: `game`, maxValues: 1, minValues: 0, options: components, placeholder: Utils.translations[guilddata.lang].stats.game_select}]}] : []})
    console.timeEnd()
    if(missingmatches.length) Utils.patchStats({dbstats, mmatches: missingmatches, message: newmessage, lang: guilddata.lang, agent, modes, bgcanvas})
}
export const name = "stats"