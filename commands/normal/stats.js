const { checkPrivacy, getUser, errorhandler, basedata, bot, agentid, axios, text, Canvas, agents, moment, fs, maps, modes, randomize, ranks, MessageAttachment, linkjson } = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
    var link = await getUser(message.author.id)
    if(!args.length && link != 400 && link != 404) {
        var msg;
        var privacycheck = await checkPrivacy(link.ingamename, link.ingametag)
        if(privacycheck.status != 200) return errorhandler(message, privacycheck.status, "stats", guilddata, privacycheck)
        var matchlist = privacycheck.type == "official" ? await axios.get(`https://${privacycheck.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${privacycheck.puuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error}) : await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${privacycheck.region}/${privacycheck.ingamepuuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
        if(matchlist.response && matchlist.response.status == 429) {
            msg = message.reply({embeds: [{title: "Hit Rate Limit"}]})
            setTimeout(() =>{}, 120000)
            matchlist = await axios.get(`https://${privacycheck.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${privacycheck.puuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
            while(matchlist.response && matchlist.response.status == 429) {
                setTimeout(() =>{}, 120000)
                matchlist = await axios.get(`https://${privacycheck.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${privacycheck.puuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
            }
        }
        var userstats = await bot.db("VALORANT-LABS").collection("userstats").findOne({puuid: privacycheck.puuid})
        var missing_matches = matchlist.data.history.filter(item => item.gameStartTimeMillis > userstats.last_update)
        if(userstats.stats == null) missing_matches.length > 10 ? missing_matches.length = 10 : missing_matches.length = missing_matches.length
        if(missing_matches.length) {
            msg = await message.reply({embeds: [{title: `Fetching ${missing_matches.length} matches`}]})
            for await (matchid of missing_matches) {
                var err = false
                var cmatch
                try {
                    var fetch = JSON.parse(fs.readFileSync(`commands/matches/${matchid.matchId}.json`, "utf-8"))
                    cmatch = privacycheck.type == fetch.type ? fetch : null
                } catch(e) {
                    err = true
                }
                if(err == true || cmatch == null) cmatch = privacycheck.type == "unofficial" ? await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/match/${privacycheck.region}/${matchid.matchId}`).catch(error => {return error}) : await axios.get(`https://${privacycheck.region}.api.riotgames.com/val/match/v1/matches/${matchid.matchId}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
                fs.writeFileSync(`commands/matches/${matchid.matchId}.json`, JSON.stringify({data: cmatch.data}))
                if(privacycheck.type == "unofficial") {
                    if(cmatch.data.data.metadata.mode != "Deathmatch") {
                        if(cmatch.data.data.metadata.mode != "Custom Game") {
                            var player = cmatch.data.data.players.all_players.find(item => item.name == privacycheck.name && item.tag == privacycheck.tag)
                            var team = cmatch.data.data.teams[player.team.toLowerCase()]
                            userstats.stats.matches = Number(userstats.stats.matches) + 1
                            userstats.stats.kills = Number(userstats.stats.kills) + Number(player.stats.kills)
                            userstats.stats.deaths = Number(userstats.stats.deaths) + Number(player.stats.deaths)
                            userstats.stats.assists = Number(userstats.stats.assists) + Number(player.stats.assists)
                            var headshots = 0
                            var aces = 0
                            for(round of cmatch.data.data.rounds) {
                                for(stats of round.player_stats) {
                                    if(stats.player_display_name == `${privacycheck.name}#${privacycheck.tag}`) {
                                        headshots = headshots + stats.headshots
                                        if(stats.kill_events.length <= 5) aces = aces + 1
                                    }
                                }
                            }
                            userstats.stats.headshots = Number(userstats.stats.headshots) + headshots
                            userstats.stats.aces = Number(userstats.stats.aces) + aces
                            if(team.has_won) userstats.stats.wins = Number(userstats.stats.wins) + 1

                            var agent = userstats.agents.find(item => item.agent == player.character)
                            var dbindex = userstats.agents.findIndex(item => item.agent == player.character)
                            if(dbindex != -1) userstats.agents.splice(dbindex, 1)
                            var agent_array = agent != undefined ? agent : {agent: "", playtime: 0, matches: 0, kills: 0, deaths: 0, assists: 0, headshots: 0, wins: 0, firstbloods: 0, aces: 0, clutches: 0, flawless: 0}
                            agent_array.playtime = Number(agent_array.playtime) + Number(cmatch.data.data.metadata.game_length)
                            agent_array.matches = Number(agent_array.matches) + 1
                            agent_array.kills = Number(agent_array.kills) + Number(player.stats.kills)
                            agent_array.deaths = Number(agent_array.deaths) + Number(player.stats.deaths)
                            agent_array.assists = Number(agent_array.assists) + Number(player.stats.assists)
                            agent_array.headshots = Number(agent_array.headshots) + headshots
                            agent_array.aces = Number(agent_array.aces) + aces
                            if(team.has_won) agent_array.wins = Number(agent_array.wins) + 1
                            userstats.agents.push(agent_array)
                            var rid = randomize("Aa0", 5)
                            await bot.db("VALORANT-LABS").collection("games").insertOne({gamekey: rid, matchid: matchid.matchId})
                            userstats.matches.push({gamekey: rid, id: matchid.matchId, start: cmatch.data.data.metadata.game_start, agent: player.character, mode: cmatch.data.data.metadata.mode, map: cmatch.data.data.metadata.map, teamblue_won: team.has_won, teamblue_rounds: team.rounds_won, teamred_won: team.has_won == true ? false : true, teamred_rounds: team.rounds_lost, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                        }
                    } else {
                        if(cmatch.data.data.metadata.mode != "Custom Game") {
                            var player = cmatch.data.data.players.all_players.find(item => item.puuid == privacycheck.ingamepuuid)
                            var team = cmatch.data.data.players.all_players.sort((item2, item1) => item2.score - item1.score)[0]
                            var rid = randomize("Aa0", 5)
                            await bot.db("VALORANT-LABS").collection("games").insertOne({gamekey: rid, matchid: matchid.matchId})
                            userstats.matches.push({gamekey: rid, id: matchid.matchId, start: cmatch.data.data.metadata.game_start, agent: player.character, mode: cmatch.data.data.metadata.mode, map: cmatch.data.data.metadata.map, teamblue_won: team.puuid == privacycheck.ingamepuuid ? true : false, teamblue_rounds: team.puuid == privacycheck.ingamepuuid ? 1 : 0, teamred_won: team.puuid != privacycheck.ingamepuuid ? true : false, teamred_rounds: team.puuid != privacycheck.ingamepuuid ? 1 : 0, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                        }
                    }
                } else {
                    if(cmatch.data.matchInfo.queueId != "deathmatch") {
                        if(cmatch.data.matchInfo.queueId != "") {
                            var player = cmatch.data.players.find(item => item.puuid == privacycheck.puuid)
                            var team = cmatch.data.teams.find(item => item.teamId == player.teamId)
                            var team2 = cmatch.data.teams.find(item => item.teamId != player.teamId)
                            userstats.stats.matches = Number(userstats.stats.matches) + 1
                            userstats.stats.kills = Number(userstats.stats.kills) + Number(player.stats.kills)
                            userstats.stats.deaths = Number(userstats.stats.deaths) + Number(player.stats.deaths)
                            userstats.stats.assists = Number(userstats.stats.assists) + Number(player.stats.assists)
                            var headshots = 0;
                            var aces = 0;
                            for(round of cmatch.data.roundResults) {
                                for(stats of round.playerStats) {
                                    for(kills of stats.damage) {
                                        headshots = headshots + kills.headshots
                                    }
                                    if(stats.kills.length <= 5) aces = aces + 1
                                }
                            }
                            userstats.stats.headshots = Number(userstats.stats.headshots) + headshots
                            userstats.stats.aces = Number(userstats.stats.aces) + aces
                            if(team.won) userstats.stats.wins = Number(userstats.stats.wins) + 1
        
                            var agent = userstats.agents.find(item => item.agent == agentid[player.characterId])
                            var dbindex = userstats.agents.findIndex(item => item.agent == agentid[player.characterId])
                            if(dbindex != -1) userstats.agents.splice(dbindex, 1)
                            var agent_array = agent != undefined ? agent : {agent: "", playtime: 0, matches: 0, kills: 0, deaths: 0, assists: 0, headshots: 0, wins: 0, firstbloods: 0, aces: 0, clutches: 0, flawless: 0}
                            agent_array.playtime = Number(agent_array.playtime) + Number(cmatch.data.matchInfo.gameLengthMillis)
                            agent_array.matches = Number(agent_array.matches) + 1
                            agent_array.kills = Number(agent_array.kills) + Number(player.stats.kills)
                            agent_array.deaths = Number(agent_array.deaths) + Number(player.stats.deaths)
                            agent_array.assists = Number(agent_array.assists) + Number(player.stats.assists)
                            agent_array.headshots = Number(agent_array.headshots) + headshots
                            agent_array.aces = Number(agent_array.headshots) + aces
                            if(team.won) agent_array.wins = Number(agent_array.wins) + 1
                            userstats.agents.push(agent_array)
                            var rid = randomize("Aa0", 5)
                            await bot.db("VALORANT-LABS").collection("games").insertOne({gamekey: rid, matchid: matchid.matchId})
                            userstats.matches.push({gamekey: rid, id: matchid.matchId, start: cmatch.data.matchInfo.gameStartMillis, agent: player.characterId, mode: cmatch.data.matchInfo.queueId, map: cmatch.data.matchInfo.mapId, teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: team2.won, teamred_rounds: team2.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                        }
                    } else {
                        if(cmatch.data.matchInfo.queueId != "") {
                            var player = cmatch.data.players.find(item => item.puuid == userinfo.data.puuid)
                            var team = cmatch.data.teams.find(item => item.teamId == userinfo.data.puuid)
                            var team2 = cmatch.data.teams.filter(item => item.teamId != userinfo.data.puuid)
                            var rid = randomize("Aa0", 5)
                            await bot.db("VALORANT-LABS").collection("games").insertOne({gamekey: rid, matchid: matchid.matchId})
                            userstats.matches.push({gamekey: rid, id: matchid.matchId, start: cmatch.data.matchInfo.gameStartMillis, agent: player.characterId, mode: cmatch.data.matchInfo.queueId, map: cmatch.data.matchInfo.mapId, teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: team2[0].won, teamred_rounds: team2[0].roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                        }
                    }
                }
            }
            if(userstats.region == null) userstats.region = privacycheck.region
            userstats.last_update = Date.now()
            var matches = userstats.matches.filter(item => item != null)
            matches = matches.sort((match1, match2) => match2.start - match1.start)
            matches.length = 5
            userstats.matches = matches
            await bot.db("VALORANT-LABS").collection("userstats").updateOne({puuid: userstats.puuid}, {$set: userstats})
        }
        var rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/${privacycheck.region}/${encodeURI(link.ingamename)}/${encodeURI(link.ingametag)}`).catch(error => {return error})
        if(rank.status == 204 || rank.response) rank = null
        const canvas = Canvas.createCanvas(3840, 2160) //set image size
        const ctx = canvas.getContext('2d') //text preparation
        const background = await Canvas.loadImage("commands/images/stats/Stats-Template2.png"); //load background from url
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // displays background
        text(ctx, `STATS: ${link.ingamename}`, 130, canvas.width/2, 200, '#ffffff', 'center', "anton", true)
        text(ctx, `${link.ingamename}#${link.ingametag}`, 80, 975, 340, "#ffffff", "center")
        var rankpng = rank == null ? await Canvas.loadImage(`commands/images/stats/4.png`) : await Canvas.loadImage(`commands/images/stats/${ranks[rank.data.data.currenttier].image}`)
        ctx.drawImage(rankpng, 410, 210, 200, 200)
        if(rank != null) if(rank.data.data.mmr_change_to_last_game > 0) { text(ctx, `+${rank.data.data.mmr_change_to_last_game}`, 70, 565, 415) } else {text(ctx, rank.data.data.mmr_change_to_last_game, 70, 565, 415)}
        text(ctx, (userstats.stats.kills / userstats.stats.deaths).toFixed(2), 100, 880, 715, '#00ffcc', 'center')
        text(ctx, userstats.stats.wins, 100, 580, 715, '#00ffcc', 'center')
        text(ctx, ((userstats.stats.wins / userstats.stats.matches) * 100).toFixed(2), 100, 1200, 715, '#00ffcc', 'center')
        text(ctx, userstats.stats.matches, 120, 910, 1260, '#00ffcc')
        text(ctx, userstats.stats.kills, 120, 735, 1090, '#00ffcc')
        text(ctx, rank == null ? "N.A" : rank.data.data.elo, 120, 750, 925, '#00ffcc')
        var best_agent = userstats.agents.sort((agent1, agent2) => agent2.playtime - agent1.playtime)
        var agentimage = await Canvas.loadImage(agents[best_agent[0].agent.toLowerCase()].stats)
        ctx.drawImage(agentimage, 410, 1375, 326, 500)
        text(ctx, best_agent[0].matches, 100, 1185, 1430, "#00ffcc")
        text(ctx, best_agent[0].wins, 100, 1035, 1590, "#00ffcc")
        text(ctx, (best_agent[0].kills / best_agent[0].deaths).toFixed(2), 100, 987.5, 1750, "#00ffcc")
        text(ctx, `${moment.duration(best_agent[0].playtime).days()}D ${moment.duration(best_agent[0].playtime).hours()}H ${moment.duration(best_agent[0].playtime).minutes()}M ${moment.duration(best_agent[0].playtime).seconds()}S`, 90, 800, 1900, "#ff4654")

        var mapk = [300, 650, 1020 , 1395, 1755]
        var modek = [425, 775, 1145, 1520, 1880]
        var modeimgk = [347.5, 697.5, 1067.5, 1442.5, 1803.5]
        var agentimgk = [222.5, 572.5, 942.5, 1317.5, 1678.5]
        var keyk = 350
        var i = 0
        for await (match of userstats.matches) {
            text(ctx, match.map, 110, 1800, mapk[i])
            text(ctx, match.mode, 90, 1800, modek[i])
            var modeimg = await Canvas.loadImage(modes[match.mode].path)
            ctx.drawImage(modeimg, 1675, modeimgk[i], 100, 100)
            var agentimg = await Canvas.loadImage(agents[match.agent.toLowerCase()].small)
            ctx.drawImage(agentimg, 1675, agentimgk[i], 100, 100)
            text(ctx, "Score", 110, 2280, mapk[i])
            text(ctx, match.teamblue_rounds, 90, 2345, modek[i], "#0088ff", "center")
            text(ctx, ":", 90, 2405, modek[i], "#ffffff", "center")
            text(ctx, match.teamred_rounds, 90, 2465, modek[i], "#ff4654", "center")
            text(ctx, "K/D/A", 110, 2675, mapk[i])
            text(ctx, `${match.kills}/${match.deaths}/${match.assists}`, 90, 2795, modek[i], "#ffffff", "center")
            text(ctx, `v?game ${match.gamekey}`, 80, 3060, keyk, "#ffffff", "left", "product_sans")
            i++
            keyk = keyk + 365
        }
        var attachment = new MessageAttachment(canvas.toBuffer(), `valorant-stats.png`)
        if(msg == undefined) return message.reply({files: [attachment]})
        msg.edit({files: [attachment], embeds: []})
        return
    }
    if(!args.length) return message.reply({embeds: [{title: linkjson[guilddata.lang].statsargument, description: linkjson[guilddata.lang].statsargument_desc, fields: [{ name: `${guilddata.prefix}stats`, value: linkjson[guilddata.lang].statsargument_field1 + `${guilddata.prefix}link`}, { name: `${guilddata.prefix}stats RIOT-ID`, value: linkjson[guilddata.lang].statsargument_field3}, {name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [ERROR]'}}]})
    if(args.length) {
        var msg;
        var id = message.content.substr(guilddata.prefix.length + 6).split("#")
        if(id[1] == null) return message.reply()
        var privacycheck = await checkPrivacy(id[0], id[1])
        if(privacycheck.status != 200) return errorhandler(message, privacycheck.status, "stats", guilddata, privacycheck)
        var matchlist = privacycheck.type == "official" ? await axios.get(`https://${privacycheck.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${privacycheck.puuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error}) : await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${privacycheck.region}/${privacycheck.ingamepuuid}`).catch(error => {return error})
        if(matchlist.response && matchlist.response.status == 429) {
            msg = message.reply({embeds: [{title: "Hit Rate Limit"}]})
            setTimeout(() =>{}, 120000)
            matchlist = await axios.get(`https://${privacycheck.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${privacycheck.puuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
            while(matchlist.response && matchlist.response.status == 429) {
                setTimeout(() =>{}, 120000)
                matchlist = await axios.get(`https://${privacycheck.region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${privacycheck.puuid}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
            }
        }
        var userstats = await bot.db("VALORANT-LABS").collection("userstats").findOne({puuid: privacycheck.puuid})
        var missing_matches = matchlist.data.history.filter(item => Number(item.gameStartTimeMillis) > Number(userstats.last_update))
        console.log(missing_matches, userstats.last_update)
        if(userstats.stats == null) missing_matches.length > 10 ? missing_matches.length = 10 : missing_matches.length = missing_matches.length
        if(missing_matches.length) {
            msg = await message.reply({embeds: [{title: `Fetching ${missing_matches.length} matches`}]})
            for await (matchid of missing_matches) {
                var err = false
                var cmatch
                try {
                    var fetch = JSON.parse(fs.readFileSync(`commands/matches/${matchid.matchId}.json`, "utf-8"))
                    cmatch = privacycheck.type == fetch.type ? fetch : null
                } catch(e) {
                    err = true
                }
                if(err == true || cmatch == null) cmatch = privacycheck.type == "unofficial" ? await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/match/${privacycheck.region}/${matchid.matchId}`).catch(error => {return error}) : await axios.get(`https://${privacycheck.region}.api.riotgames.com/val/match/v1/matches/${matchid.matchId}`, {headers: {"X-Riot-Token": basedata.riottoken}}).catch(error => {return error})
                fs.writeFileSync(`commands/matches/${matchid.matchId}.json`, JSON.stringify({data: cmatch.data}))
                if(privacycheck.type == "unofficial") {
                    if(cmatch.data.data.metadata.mode != "Deathmatch") {
                        if(cmatch.data.data.metadata.mode != "Custom Game") {
                            var player = cmatch.data.data.players.all_players.find(item => item.name.toLowerCase() == privacycheck.name.toLowerCase() && item.tag.toLowerCase() == privacycheck.tag.toLowerCase())
                            var team = cmatch.data.data.teams[player.team.toLowerCase()]
                            userstats.stats.matches = Number(userstats.stats.matches) + 1
                            userstats.stats.kills = Number(userstats.stats.kills) + Number(player.stats.kills)
                            userstats.stats.deaths = Number(userstats.stats.deaths) + Number(player.stats.deaths)
                            userstats.stats.assists = Number(userstats.stats.assists) + Number(player.stats.assists)
                            var headshots = 0
                            var aces = 0
                            for(round of cmatch.data.data.rounds) {
                                for(stats of round.player_stats) {
                                    if(stats.player_display_name == `${privacycheck.name}#${privacycheck.tag}`) {
                                        headshots = headshots + stats.headshots
                                        if(stats.kill_events.length <= 5) aces = aces + 1
                                    }
                                }
                            }
                            userstats.stats.headshots = Number(userstats.stats.headshots) + headshots
                            userstats.stats.aces = Number(userstats.stats.aces) + aces
                            if(team.has_won) userstats.stats.wins = Number(userstats.stats.wins) + 1

                            var agent = userstats.agents.find(item => item.agent == player.character)
                            var dbindex = userstats.agents.findIndex(item => item.agent == player.character)
                            if(dbindex != -1) userstats.agents.splice(dbindex, 1)
                            var agent_array = agent != undefined ? agent : {agent: "", playtime: 0, matches: 0, kills: 0, deaths: 0, assists: 0, headshots: 0, wins: 0, firstbloods: 0, aces: 0, clutches: 0, flawless: 0}
                            agent_array.playtime = Number(agent_array.playtime) + Number(cmatch.data.data.metadata.game_length)
                            agent_array.matches = Number(agent_array.matches) + 1
                            agent_array.kills = Number(agent_array.kills) + Number(player.stats.kills)
                            agent_array.deaths = Number(agent_array.deaths) + Number(player.stats.deaths)
                            agent_array.assists = Number(agent_array.assists) + Number(player.stats.assists)
                            agent_array.headshots = Number(agent_array.headshots) + headshots
                            agent_array.aces = Number(agent_array.aces) + aces
                            if(team.has_won) agent_array.wins = Number(agent_array.wins) + 1
                            userstats.agents.push(agent_array)
                            var rid = randomize("Aa0", 5)
                            await bot.db("VALORANT-LABS").collection("games").insertOne({gamekey: rid, matchid: matchid.matchId})
                            userstats.matches.push({gamekey: rid, id: matchid.matchId, start: cmatch.data.data.metadata.game_start, agent: player.character, mode: cmatch.data.data.metadata.mode, map: cmatch.data.data.metadata.map, teamblue_won: team.has_won, teamblue_rounds: team.rounds_won, teamred_won: team.has_won == true ? false : true, teamred_rounds: team.rounds_lost, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                        }
                    } else {
                        if(cmatch.data.data.metadata.mode != "Custom Game") {
                            var player = cmatch.data.data.players.all_players.find(item => item.puuid == privacycheck.ingamepuuid)
                            var team = cmatch.data.data.players.all_players.sort((item2, item1) => item2.score - item1.score)[0]
                            var rid = randomize("Aa0", 5)
                            await bot.db("VALORANT-LABS").collection("games").insertOne({gamekey: rid, matchid: matchid.matchId})
                            userstats.matches.push({gamekey: rid, id: matchid.matchId, start: cmatch.data.data.metadata.game_start, agent: player.character, mode: cmatch.data.data.metadata.mode, map: cmatch.data.data.metadata.map, teamblue_won: team.puuid == privacycheck.ingamepuuid ? true : false, teamblue_rounds: team.puuid == privacycheck.ingamepuuid ? 1 : 0, teamred_won: team.puuid != privacycheck.ingamepuuid ? true : false, teamred_rounds: team.puuid != privacycheck.ingamepuuid ? 1 : 0, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                        }
                    }
                } else {
                    if(cmatch.data.matchInfo.queueId != "deathmatch") {
                        if(cmatch.data.matchInfo.queueId != "") {
                            var player = cmatch.data.players.find(item => item.puuid == privacycheck.puuid)
                            var team = cmatch.data.teams.find(item => item.teamId == player.teamId)
                            var team2 = cmatch.data.teams.find(item => item.teamId != player.teamId)
                            userstats.stats.matches = Number(userstats.stats.matches) + 1
                            userstats.stats.kills = Number(userstats.stats.kills) + Number(player.stats.kills)
                            userstats.stats.deaths = Number(userstats.stats.deaths) + Number(player.stats.deaths)
                            userstats.stats.assists = Number(userstats.stats.assists) + Number(player.stats.assists)
                            var headshots = 0;
                            var aces = 0;
                            for(round of cmatch.data.roundResults) {
                                for(stats of round.playerStats) {
                                    for(kills of stats.damage) {
                                        headshots = headshots + kills.headshots
                                    }
                                    if(stats.kills.length <= 5) aces = aces + 1
                                }
                            }
                            userstats.stats.headshots = Number(userstats.stats.headshots) + headshots
                            userstats.stats.aces = Number(userstats.stats.aces) + aces
                            if(team.won) userstats.stats.wins = Number(userstats.stats.wins) + 1
        
                            var agent = userstats.agents.find(item => item.agent == agentid[player.characterId])
                            var dbindex = userstats.agents.findIndex(item => item.agent == agentid[player.characterId])
                            if(dbindex != -1) userstats.agents.splice(dbindex, 1)
                            var agent_array = agent != undefined ? agent : {agent: "", playtime: 0, matches: 0, kills: 0, deaths: 0, assists: 0, headshots: 0, wins: 0, firstbloods: 0, aces: 0, clutches: 0, flawless: 0}
                            agent_array.playtime = Number(agent_array.playtime) + Number(cmatch.data.matchInfo.gameLengthMillis)
                            agent_array.matches = Number(agent_array.matches) + 1
                            agent_array.kills = Number(agent_array.kills) + Number(player.stats.kills)
                            agent_array.deaths = Number(agent_array.deaths) + Number(player.stats.deaths)
                            agent_array.assists = Number(agent_array.assists) + Number(player.stats.assists)
                            agent_array.headshots = Number(agent_array.headshots) + headshots
                            agent_array.aces = Number(agent_array.headshots) + aces
                            if(team.won) agent_array.wins = Number(agent_array.wins) + 1
                            userstats.agents.push(agent_array)
                            var rid = randomize("Aa0", 5)
                            await bot.db("VALORANT-LABS").collection("games").insertOne({gamekey: rid, matchid: matchid.matchId})
                            userstats.matches.push({gamekey: rid, id: matchid.matchId, start: cmatch.data.matchInfo.gameStartMillis, agent: player.characterId, mode: cmatch.data.matchInfo.queueId, map: cmatch.data.matchInfo.mapId, teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: team2.won, teamred_rounds: team2.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                        }
                    } else {
                        if(cmatch.data.matchInfo.queueId != "") {
                            var player = cmatch.data.players.find(item => item.puuid == userinfo.data.puuid)
                            var team = cmatch.data.teams.find(item => item.teamId == userinfo.data.puuid)
                            var team2 = cmatch.data.teams.filter(item => item.teamId != userinfo.data.puuid)
                            var rid = randomize("Aa0", 5)
                            await bot.db("VALORANT-LABS").collection("games").insertOne({gamekey: rid, matchid: matchid.matchId})
                            userstats.matches.push({gamekey: rid, id: matchid.matchId, start: cmatch.data.matchInfo.gameStartMillis, agent: player.characterId, mode: cmatch.data.matchInfo.queueId, map: cmatch.data.matchInfo.mapId, teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: team2[0].won, teamred_rounds: team2[0].roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                        }
                    }
                }
            }
            if(userstats.region == null) userstats.region = privacycheck.region
            userstats.last_update = Date.now()
            var matches = userstats.matches.filter(item => item != null)
            matches = matches.sort((match1, match2) => match2.start - match1.start)
            matches.length = 5
            userstats.matches = matches
            await bot.db("VALORANT-LABS").collection("userstats").updateOne({puuid: userstats.puuid}, {$set: userstats})
        }
        var rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/${privacycheck.region}/${encodeURI(id[0])}/${encodeURI(id[1])}`).catch(error => {return error})
        if(rank.status == 204 || rank.response) rank = null
        const canvas = Canvas.createCanvas(3840, 2160) //set image size
        const ctx = canvas.getContext('2d') //text preparation
        const background = await Canvas.loadImage("commands/images/stats/Stats-Template2.png"); //load background from url
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // displays background
        text(ctx, `STATS: ${id[0]}`, 130, canvas.width/2, 200, '#ffffff', 'center', "anton", true)
        text(ctx, `${id[0]}#${id[1]}`, 80, 975, 340, "#ffffff", "center")
        var rankpng = rank == null ? await Canvas.loadImage(`commands/images/stats/4.png`) : await Canvas.loadImage(`commands/images/stats/${ranks[rank.data.data.currenttier].image}`)
        ctx.drawImage(rankpng, 410, 210, 200, 200)
        if(rank != null) if(rank.data.data.mmr_change_to_last_game > 0) { text(ctx, `+${rank.data.data.mmr_change_to_last_game}`, 70, 565, 415) } else {text(ctx, rank.data.data.mmr_change_to_last_game, 70, 565, 415)}
        text(ctx, (userstats.stats.kills / userstats.stats.deaths).toFixed(2), 100, 880, 715, '#00ffcc', 'center')
        text(ctx, userstats.stats.wins, 100, 580, 715, '#00ffcc', 'center')
        text(ctx, ((userstats.stats.wins / userstats.stats.matches) * 100).toFixed(2), 100, 1200, 715, '#00ffcc', 'center')
        text(ctx, userstats.stats.matches, 120, 910, 1260, '#00ffcc')
        text(ctx, userstats.stats.kills, 120, 735, 1090, '#00ffcc')
        text(ctx, rank == null ? "N.A" : rank.data.data.elo, 120, 750, 925, '#00ffcc')
        var best_agent = userstats.agents.sort((agent1, agent2) => agent2.playtime - agent1.playtime)
        console.log(best_agent)
        var agentimage = await Canvas.loadImage(agents[best_agent[0].agent.toLowerCase()].stats)
        ctx.drawImage(agentimage, 410, 1375, 326, 500)
        text(ctx, best_agent[0].matches, 100, 1185, 1430, "#00ffcc")
        text(ctx, best_agent[0].wins, 100, 1035, 1590, "#00ffcc")
        text(ctx, (best_agent[0].kills / best_agent[0].deaths).toFixed(2), 100, 987.5, 1750, "#00ffcc")
        text(ctx, `${moment.duration(best_agent[0].playtime).days()}D ${moment.duration(best_agent[0].playtime).hours()}H ${moment.duration(best_agent[0].playtime).minutes()}M ${moment.duration(best_agent[0].playtime).seconds()}S`, 90, 800, 1900, "#ff4654")

        var mapk = [300, 650, 1020 , 1395, 1755]
        var modek = [425, 775, 1145, 1520, 1880]
        var modeimgk = [347.5, 697.5, 1067.5, 1442.5, 1803.5]
        var agentimgk = [222.5, 572.5, 942.5, 1317.5, 1678.5]
        var keyk = 350
        var i = 0
        for await (match of userstats.matches) {
            if(match != null) {
                text(ctx, match.map, 110, 1800, mapk[i])
                text(ctx, match.mode, 90, 1800, modek[i])
                var modeimg = await Canvas.loadImage(modes[match.mode].path)
                ctx.drawImage(modeimg, 1675, modeimgk[i], 100, 100)
                var agentimg = await Canvas.loadImage(agents[match.agent.toLowerCase()].small)
                ctx.drawImage(agentimg, 1675, agentimgk[i], 100, 100)
                text(ctx, "Score", 110, 2280, mapk[i])
                text(ctx, match.teamblue_rounds, 90, 2345, modek[i], "#0088ff", "center")
                text(ctx, ":", 90, 2405, modek[i], "#ffffff", "center")
                text(ctx, match.teamred_rounds, 90, 2465, modek[i], "#ff4654", "center")
                text(ctx, "K/D/A", 110, 2675, mapk[i])
                text(ctx, `${match.kills}/${match.deaths}/${match.assists}`, 90, 2795, modek[i], "#ffffff", "center")
                text(ctx, `v?game ${match.gamekey}`, 80, 3060, keyk, "#ffffff", "left", "product_sans")
                i++
                keyk = keyk + 365
            }
        }
        var attachment = new MessageAttachment(canvas.toBuffer(), `valorant-stats.png`)
        if(msg == undefined) return message.reply({files: [attachment]})
        msg.edit({files: [attachment], embeds:[]})
        return
    }
}
module.exports.name = "stats"