import {patchStats, getAgents, getGamemodes, getStatsDB, errorhandler, axios, embedBuilder, gamemodes, buildBackground, getCustomBackground, translations, buildStatsImage, riottoken} from "../../methods.js"
export async function execute({message, guilddata, args} = {}) {
    const link = await getDB("linkv2").findOne({userid: message.author.id})
    const agent = getAgents()
    const modes = getGamemodes()
    const components = []
    let dbstats;
    let matchlist
    console.time()
    if(link && !args.length) {
        dbstats = await getStatsDB({name: link.ingamename, tag: link.ingametag})
        console.timeLog()
        if(dbstats.status != 200) return errorhandler({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, message})
        matchlist = dbstats.type == "official" ? await axios.get(`https://${dbstats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.puuid}`, {headers: {"X-Riot-Token": riottoken}}).catch(error => {return error}) : await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.region}/${dbstats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && args.length) {
        if(!args.some(item => item.includes("#"))) return interaction.editReply({embeds: [embedBuilder({title: translations[guilddata.lang].stats.invalidriotid_title, desc: Uts.translations[guilddata.lang].stats.invalidriotid_desc, footer: "VALORANT LABS [INVALID RIOT ID]"})]})//TODO
        dbstats = await getStatsDB({name: args[0].split("#")[0], tag: args[0].split("#")[1]})
        console.timeLog()
        if(dbstats.status != 200) return errorhandler({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, message})
        matchlist = dbstats.type == "official" ? await axios.get(`https://${dbstats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.puuid}`, {headers: {"X-Riot-Token": riottoken}}).catch(error => {return error}) : await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.region}/${dbstats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && !args.length) return interaction.editReply({embeds: [embedBuilder({title: translations[guilddata.lang].stats.noriotid_title, desc: translations[guilddata.lang].stats.noriotid_desc, footer: "VALORANT LABS [NO RIOT ID]"})]})
    console.timeLog()

    if(matchlist.response) return errorhandler({type: "matchlist", status: matchlist.response.status, message, lang: guilddata.lang})
    const missingmatches = matchlist.data.history.filter(item => item.gameStartTimeMillis > dbstats.last_update)

    const bgcanvas = guilddata.background_stats ? await buildBackground(getCustomBackground(guilddata.background_stats), "stats") : null
    const attachment = await buildStatsImage({dbstats, agent, modes, bgcanvas})
    if(!missingmatches.length) {
        for(let i = 0; dbstats.matches.length > i; i++) {
            components.push({
                label: dbstats.matches[i].gamekey,
                value: dbstats.matches[i].gamekey,
                description: `${dbstats.matches[i].map} | ${dbstats.matches[i].mode} | ${dbstats.matches[i].agent} | ${moment(dbstats.matches[i].start).format("lll")}`,
                emoji: Object.values(gamemodes).find(item => item.name == dbstats.matches[i].mode).emoji
            })
        }
    }
    const newmessage = await message.reply({
        files: [attachment], embeds: missingmatches.length ? [embedBuilder({title: translations[guilddata.lang].stats.missing_matches_title, desc: translations[guilddata.lang].stats.missing_matches_desc, footer: 'VALORANT LABS [STATS]'})] : [], components: components.length ? [{
            type: ComponentType.ActionRow, components: [{type: ComponentType.SelectMenu, customId: `game`, maxValues: 1, minValues: 0, options: components, placeholder: translations[guilddata.lang].stats.game_select}]
        }] : []
    })
    console.timeEnd()
    if(missingmatches.length) patchStats({...dbstats, matches: missingmatches, message: newmessage, lang: guilddata.lang, agent, modes})
}
export const name = "stats"