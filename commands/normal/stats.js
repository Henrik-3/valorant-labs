import {default as Utils} from "../../methods.js"
export async function execute(data) {
    const link = await Utils.getLink(data.message.author.id)
    if(link && !data.args.length) {
        let edit_msg
        const dbstats = await Utils.getStatsDB({name: link.ingamename, tag: link.ingame})
        if(dbstats.status != 200) return Utils.errorhandler({status: dbstats.status, lang: data.guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag})
        const matchlist = dbstats.stats.type == "official" ? await axios.get(`https://${dbstats.stats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.stats.puuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error}) : await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.stats.region}/${dbstats.stats.ingamepuuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})

    }
}
export const name = "stats"