import {ComponentType, ButtonStyle, moment, getAgents, getLink, getGamemodes, getStatsDB, errorhandlerinteraction, gamemodes, axios, embedBuilder, translations, riottoken, buildBackground, getCustomBackground, patchStats, buildStatsImage} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const link = await getLink({user: interaction.user})
    const agent = getAgents()
    const modes = getGamemodes()
    const components = []
    let dbstats;
    let matchlist
    if(link && link.error) return errorhandlerinteraction({interaction, status: link.error, lang: guilddata.lang, type: "account"})
    if(link && !interaction.options.get("riot-id")) {
        dbstats = await getStatsDB({name: link.name, tag: link.tag})
        if(dbstats.status != 200) return errorhandlerinteraction({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, interaction: interaction})
        matchlist = dbstats.type == "official" ? await axios.get(`https://${dbstats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.puuid}`, {headers: {"X-Riot-Token": riottoken}}).catch(error => {return error}) : await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.region}/${dbstats.ingamepuuid}`).catch(error => {return error})
    }
    if((!link && interaction.options.get("riot-id")) || (link && interaction.options.get("riot-id"))) {
        if(!interaction.options.get("riot-id").value.includes("#")) return interaction.editReply({embeds: [embedBuilder({title: translations[guilddata.lang].stats.invalidriotid_title, desc: translations[guilddata.lang].stats.invalidriotid_desc, footer: "VALORANT LABS [INVALID RIOT ID]"})]})//TODO
        dbstats = await getStatsDB({name: interaction.options.get("riot-id").value.split("#")[0], tag: interaction.options.get("riot-id").value.split("#")[1]})
        if(dbstats.status != 200) return errorhandlerinteraction({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, interaction: interaction})
        matchlist = dbstats.type == "official" ? await axios.get(`https://${dbstats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.puuid}`, {headers: {"X-Riot-Token": riottoken}}).catch(error => {return error}) : await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.region}/${dbstats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && !interaction.options.get("riot-id")) return interaction.editReply({embeds: [embedBuilder({title: translations[guilddata.lang].stats.noriotid_title, desc: translations[guilddata.lang].stats.noriotid_desc, footer: "VALORANT LABS [NO RIOT ID]"})]})

    console.log(matchlist.response)
    if(matchlist.response) return errorhandlerinteraction({type: "matchlist", status: matchlist.response.status, interaction: interaction, lang: guilddata.lang})
    const missingmatches = matchlist.data.history.filter(item => item.gameStartTimeMillis > dbstats.last_update)

    const bgcanvas = guilddata.background_stats ? await buildBackground(getCustomBackground(guilddata.background_stats), "stats") : null
    const attachment = await buildStatsImage({dbstats, agent, modes, bgcanvas})
    if(!missingmatches.length) {
        for(let i = 0; dbstats.matches.length > i; i++) {
            components.push({
                label: dbstats.matches[i].gamekey,
                value: dbstats.matches[i].id,
                description: `${dbstats.matches[i].map} | ${dbstats.matches[i].mode} | ${dbstats.matches[i].agent} | ${moment(dbstats.matches[i].start).format("lll")}`,
                emoji: Object.values(gamemodes).find(item => item.name == dbstats.matches[i].mode).emoji
            })
        }
    }
    const newmessage = await interaction.editReply({files: [attachment], embeds: missingmatches.length ? [embedBuilder({title: translations[guilddata.lang].stats.missing_matches_title, desc: translations[guilddata.lang].stats.missing_matches_desc, footer: 'VALORANT LABS [STATS]'})] : [], components: components.length ? [{type: ComponentType.ActionRow, components: [{type: ComponentType.SelectMenu, customId: `game`, maxValues: 1, minValues: 0, options: components, placeholder: translations[guilddata.lang].stats.game_select}]}] : []})
    console.timeEnd()
    if(missingmatches.length) patchStats({dbstats, mmatches: missingmatches, message: newmessage, lang: guilddata.lang, agent, modes, bgcanvas})
}
export const name = "stats"