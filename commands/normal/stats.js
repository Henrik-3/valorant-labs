import axios from "axios"
import {default as Utils} from "../../methods.js"
export async function execute({message, guilddata, args} = {}) {
    const link = await Utils.getLink(message.author.id)
    let req = await Promise.allSettled([Utils.axios.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true").catch(error => {return error}), Utils.axios.get("https://valorant-api.com/v1/gamemodes").catch(error => {return error})])
    req = req.map(item => {return item.value})
    console.log(req)
    const agent = req.find(item => item.config.url.includes("agents"))
    const modes = req.find(item => item.config.url.includes("gamemodes"))
    const components = []
    let dbstats;
    let matchlist
    console.time()
    if(link && !args.length) {
        dbstats = await Utils.getStatsDB({name: link.ingamename, tag: link.ingametag})
        console.timeLog()
        if(dbstats.status != 200) return Utils.errorhandler({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, message: message})
        matchlist = dbstats.stats.type == "official" ? await axios.get(`https://${dbstats.stats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.stats.puuid}`, {headers: {"X-Riot-Token": Utils.riottoken}}).catch(error => {return error}) : await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.stats.region}/${dbstats.stats.ingamepuuid}`).catch(error => {return error})
    }
    console.timeLog()

    if(matchlist.response) return Utils.errorhandler({type: "matchlist", status: matchlist.response.status, message: message, lang: guilddata.lang})
    const missingmatches = matchlist.data.history.filter(item => item.gameStartTimeMillis > dbstats.stats.last_update)

    const attachment = await Utils.buildImage({dbstats: dbstats, agent: agent, modes: modes})
    if(!missingmatches.length) {
        for(let i = 0; dbstats.matches.length > i; i++) {
            components.push({
                label: dbstats.matches[i].gamekey,
                value: dbstats.matches[i].id,
                description: `${dbstats.matches[i].map} | ${dbstats.matches[i].mode} | ${dbstats.matches[i].agent}`
            })
        }
    }
    console.log(components)
    const newmessage = await message.reply({files: [attachment], embeds: missingmatches.length ? [{title: Utils.translations[guilddata.lang].stats.missing_matches_title, description: Utils.translations[guilddata.lang].stats.missing_matches_desc, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MMR]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}] : [], components: components.length ? [{type: "ACTION_ROW", components: [{type: "SELECT_MENU", customId: `game`, maxValues: 1, minValues: 0, options: components, placeholder: Utils.translations[guilddata.lang].stats.game_select}]}] : []})
    console.timeEnd()
    if(missingmatches.length) Utils.patchStats({ingamepuuid: dbstats.stats.ingamepuuid, puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, matches: missingmatches, message: newmessage, region: dbstats.stats.region, stats: dbstats.stats, lang: guilddata.lang, agent: agent, modes: modes})
}
export const name = "stats"