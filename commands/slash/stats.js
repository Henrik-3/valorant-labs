import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const link = await Utils.getLink(interaction.user.id)
    const agent = Utils.getAgents()
    const modes = Utils.getGamemodes()
    const components = []
    let dbstats;
    let matchlist
    console.time()
    if(link && !interaction.options.get("riot-id").value) {
        dbstats = await Utils.getStatsDB({name: link.ingamename, tag: link.ingametag})
        console.timeLog()
        if(dbstats.status != 200) return Utils.errorhandlerinteraction({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, interaction: interaction})
        matchlist = dbstats.stats.type == "official" ? await Utils.axios.get(`https://${dbstats.stats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.stats.puuid}`, {headers: {"X-Riot-Token": Utils.riottoken}}).catch(error => {return error}) : await Utils.axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.stats.region}/${dbstats.stats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && interaction.options.get("riot-id").value) {
        if(!interaction.options.get("riot-id").value.includes("#")) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.invalidriotid_title, desc: Utils.translations[guilddata.lang].stats.invalidriotid_desc, footer: "VALORANT LABS [INVALID RIOT ID]"})]})//TODO
        dbstats = await Utils.getStatsDB({name: interaction.options.get("riot-id").value.split("#")[0], tag: interaction.options.get("riot-id").value.split("#")[1]})
        console.timeLog()
        if(dbstats.status != 200) return Utils.errorhandlerinteraction({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, interaction: interaction})
        matchlist = dbstats.stats.type == "official" ? await Utils.axios.get(`https://${dbstats.stats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.stats.puuid}`, {headers: {"X-Riot-Token": Utils.riottoken}}).catch(error => {return error}) : await Utils.axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.stats.region}/${dbstats.stats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && !interaction.options.get("riot-id").value) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.noriotid_title, desc: Utils.translations[guilddata.lang].stats.noriotid_desc, footer: "VALORANT LABS [NO RIOT ID]"})]})
    console.timeLog()

    if(matchlist.response) return Utils.errorhandlerinteraction({type: "matchlist", status: matchlist.response.status, interaction: interaction, lang: guilddata.lang})
    const missingmatches = matchlist.data.history.filter(item => item.gameStartTimeMillis > 1652215799772)

    const attachment = await Utils.buildStatsImage({dbstats: dbstats, agent: agent, modes: modes})
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
    const newmessage = await interaction.editReply({files: [attachment], embeds: missingmatches.length ? [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.missing_matches_title, desc: Utils.translations[guilddata.lang].stats.missing_matches_desc, footer: 'VALORANT LABS [MMR]'})] : [], components: components.length ? [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: "SELECT_MENU", customId: `game`, maxValues: 1, minValues: 0, options: components, placeholder: Utils.translations[guilddata.lang].stats.game_select}]}] : []})
    console.timeEnd()
    if(missingmatches.length) Utils.patchStats({ingamepuuid: dbstats.stats.ingamepuuid, puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, matches: missingmatches, message: newmessage, region: dbstats.stats.region, stats: dbstats.stats, lang: guilddata.lang, agent: agent, modes: modes})
}
export const name = "stats"