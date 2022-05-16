import Utils from "../../methods.js"
export async function execute({message, guilddata, args} = {}) {
    const link = await Utils.getLink(message.author.id)
    const agent = Utils.getAgents()
    const modes = Utils.getGamemodes()
    const components = []
    let dbstats;
    let matchlist
    console.time()
    if(link && !args.length) {
        dbstats = await Utils.getStatsDB({name: link.ingamename, tag: link.ingametag})
        console.timeLog()
        if(dbstats.status != 200) return Utils.errorhandler({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, message: message})
        matchlist = dbstats.stats.type == "official" ? await Utils.axios.get(`https://${dbstats.stats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.stats.puuid}`, {headers: {"X-Riot-Token": Utils.riottoken}}).catch(error => {return error}) : await Utils.axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.stats.region}/${dbstats.stats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && args.length) {
        if(!args.some(item => item.includes("#"))) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.invalidriotid_title, desc: Utils.translations[guilddata.lang].stats.invalidriotid_desc, footer: "VALORANT LABS [INVALID RIOT ID]"})]})//TODO
        dbstats = await Utils.getStatsDB({name: args[0].split("#")[0], tag: args[0].split("#")[1]})
        console.timeLog()
        if(dbstats.status != 200) return Utils.errorhandlerinteraction({status: dbstats.status, lang: guilddata.lang, type: "account", puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, interaction: interaction})
        matchlist = dbstats.stats.type == "official" ? await Utils.axios.get(`https://${dbstats.stats.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${dbstats.stats.puuid}`, {headers: {"X-Riot-Token": Utils.riottoken}}).catch(error => {return error}) : await Utils.axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${dbstats.stats.region}/${dbstats.stats.ingamepuuid}`).catch(error => {return error})
    }
    if(!link && !args.length) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.noriotid_title, desc: Utils.translations[guilddata.lang].stats.noriotid_desc, footer: "VALORANT LABS [NO RIOT ID]"})]})
    console.timeLog()

    if(matchlist.response) return Utils.errorhandler({type: "matchlist", status: matchlist.response.status, message: message, lang: guilddata.lang})
    const missingmatches = matchlist.data.history.filter(item => item.gameStartTimeMillis > dbstats.stats.last_update)

    const attachment = await Utils.buildStatsImage({dbstats: dbstats, agent: agent, modes: modes})
    if(!missingmatches.length) {
        for(let i = 0; dbstats.matches.length > i; i++) {
            components.push({
                label: dbstats.matches[i].gamekey,
                value: dbstats.matches[i].gamekey,
                description: `${dbstats.matches[i].map} | ${dbstats.matches[i].mode} | ${dbstats.matches[i].agent} | ${moment(dbstats.matches[i].start).format("lll")}`,
                emoji: Object.values(Utils.gamemodes).find(item => item.name == dbstats.matches[i].mode).emoji
            })
        }
    }
    const newmessage = await message.reply({files: [attachment], embeds: missingmatches.length ? [Utils.embedBuilder({title: Utils.translations[guilddata.lang].stats.missing_matches_title, desc: Utils.translations[guilddata.lang].stats.missing_matches_desc, footer: 'VALORANT LABS [STATS]'})] : [], components: components.length ? [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("SELECT_MENU"), customId: `game`, maxValues: 1, minValues: 0, options: components, placeholder: Utils.translations[guilddata.lang].stats.game_select}]}] : []})
    console.timeEnd()
    if(missingmatches.length) Utils.patchStats({ingamepuuid: dbstats.stats.ingamepuuid, puuid: dbstats.puuid, name: dbstats.name, tag: dbstats.tag, matches: missingmatches, message: newmessage, region: dbstats.stats.region, stats: dbstats.stats, lang: guilddata.lang, agent: agent, modes: modes})
}
export const name = "stats"