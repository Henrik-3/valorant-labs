import {MongoClient} from 'mongodb'
import {readFileSync} from "fs"
import axios from "axios"
import axiosRetry from "axios-retry"
import system from "systeminformation"
import pretty from "pretty-bytes"
import {Message, Permissions, MessageAttachment} from 'discord.js'
import moment from "moment"
import Canvas from "canvas"
import {match} from 'assert'
import randomize from 'randomatic'

Canvas.registerFont('assets/product_sans.ttf', {family: 'product_sans'})
Canvas.registerFont('assets/valorant_font.ttf', {family: 'valorant_font'})
Canvas.registerFont('assets/umeboshi_.ttf', {family: 'japan2'})
Canvas.registerFont('assets/anton.ttf', {family: 'anton'})
Canvas.registerFont('assets/DINNextLTPro-Bold.ttf', {family: 'DinNext'})

const basedata = JSON.parse(readFileSync("./basedata.json"))
const mongoclient = new MongoClient(basedata.mongoaccess)
mongoclient.connect()
const translations = JSON.parse(readFileSync("./translations.json"))

axiosRetry(axios, {
    retries: 2,
    shouldResetTimeout: true,
    retryCondition: (error) => {
        return error.code === "ECONNABORTED" || error.code === "ECONNRESET" || error.code === "ERR_REQUEST_ABORTED";
    },
})

export default {
    perms: Permissions.FLAGS,
    sysinfo: system,
    pretty: pretty,
    axios: axios,
    translations: translations,
    topgg: basedata.dbltoken,
    riottoken: basedata.riottoken,
    valodb: mongoclient.db("VALORANT-LABS"),
    moment: moment,
    canvas: Canvas,
    attachment: MessageAttachment,
    clusters: {
        na: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/na",
            page: "https://status.riotgames.com/valorant?region=na"
        },
        latam: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/latam",
            page: "https://status.riotgames.com/valorant?region=latam"
        },
        br: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/br",
            page: "https://status.riotgames.com/valorant?region=br"
        },
        eu: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/eu",
            page: "https://status.riotgames.com/valorant?region=eu"
        },
        kr: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/kr",
            page: "https://status.riotgames.com/valorant?region=kr"
        },
        ap: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/ap",
            page: "https://status.riotgames.com/valorant?region=ap"
        },
        oce: {
            status: "https://api.henrikdev.xyz/valorant/v1/status/ap",
            page: "https://status.riotgames.com/valorant?region=ap"
        }
    },
    locales: {
        de: "de",
        fr: "fr",
        "en-GB": "en-gb",
        "en-US": "en-us",
        ja: "jp",
        "pt-BR": "pt-br",
        "es-ES": "es",
        vi: "vi"
    },
    agents: [
        {
            name: "Astra",
            id: "41fb69c1-4189-7b37-f117-bcaf1e96f1bf",
            discord_id: "<:controller:868803058711277598>"
        },
        {
            name: "Breach",
            id: "5f8d3a7f-467b-97f3-062c-13acf203c006",
            discord_id: "<:initiator:868802616732303362>"
        },
        {
            name: "Brimstone",
            id: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417",
            discord_id: "<:controller:868803058711277598>"
        },
        {
            name: "Cypher",
            id: "117ed9e3-49f3-6512-3ccf-0cada7e3823b",
            discord_id: "<:sentinel:868802869967597568>"
        },
        {
            name: "Jett",
            id: "add6443a-41bd-e414-f6ad-e58d267f4e95",
            discord_id: "<:duelist:868802702258352178>"
        },
        {
            name: "Omen",
            id: "8e253930-4c05-31dd-1b6c-968525494517",
            discord_id: "<:controller:868803058711277598>"
        },
        {
            name: "Phoenix",
            id: "eb93336a-449b-9c1b-0a54-a891f7921d69",
            discord_id: "<:duelist:868802702258352178>"
        },
        {
            name: "Raze",
            id: "f94c3b30-42be-e959-889c-5aa313dba261",
            discord_id: "<:duelist:868802702258352178>"
        },
        {
            name: "Sage",
            id: "569fdd95-4d10-43ab-ca70-79becc718b46",
            discord_id: "<:sentinel:868802869967597568>"
        },
        {
            name: "Sova",
            id: "320b2a48-4d9b-a075-30f1-1f93a9b638fa",
            discord_id: "<:initiator:868802616732303362>"
        },
        {
            name: "Viper",
            id: "707eab51-4836-f488-046a-cda6bf494859",
            discord_id: "<:controller:868803058711277598>"
        },
        {
            name: "Reyna",
            id: "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
            discord_id: "<:duelist:868802702258352178>"
        },
        {
            name: "Killjoy",
            id: "1e58de9c-4950-5125-93e9-a0aee9f98746",
            discord_id: "<:sentinel:868802869967597568>"
        },
        {
            name: "Skye",
            id: "6f2a04ca-43e0-be17-7f36-b3908627744d",
            discord_id: "<:initiator:868802616732303362>"
        },
        {
            name: "Yoru",
            id: "7f94d92c-4234-0a36-9646-3a87eb8b5c89",
            discord_id: "<:duelist:868802702258352178>"
        },
        {
            name: "Kay/O",
            id: "601dbbe7-43ce-be57-2a40-4abd24953621",
            discord_id: "<:initiator:868802616732303362>"
        },
        {
            name: "Chamber",
            id: "22697a3d-45bf-8dd7-4fec-84a9e28c69d7",
            discord_id: "<:initiator:868802616732303362>"
        },
        {
            name: "Neon",
            id: "bb2a4828-46eb-8cd1-e765-15848195d751",
            discord_id: "<:duelist:868802702258352178>"
        }
    ],
    weapons: {
        "EWallPenetrationDisplayType::High": "High",
        "EWallPenetrationDisplayType::Medium": "Medium",
        "EWallPenetrationDisplayType::Low": "Low"
    },
    gamemodes: {
        ggteam: {
            name: "Escalation",
            emoji: {
                name: "escalation",
                id: "958441833627787350",
                animated: false
            }
        },
        spikerush: {
            name: "Spike Rush",
            emoji: {
                name: "spikerush",
                id: "958441833627779202",
                animated: false
            }
        },
        deathmatch: {
            name: "Deathmatch",
            emoji: {
                name: "deathmatch",
                id: "958441493612355704",
                animated: false
            }
        },
        competitive: {
            name: "Competitive",
            emoji: {
                name: "unrated",
                id: "958441359126167613",
                animated: false
            }
        },
        unrated: {
            name: "Unrated",
            emoji: {
                name: "unrated",
                id: "958441359126167613",
                animated: false
            }
        },
        onefa: {
            name: "Replication",
            emoji: {
                name: "replication",
                id: "958441833636192386",
                animated: false
            }
        },
        "": {
            name: "Custom Game",
            emoji: {
                name: "unrated",
                id: "958441359126167613",
                animated: false
            }
        },
        newmap: {
            name: "New Map",
            emoji: {
                name: "unrated",
                id: "958441359126167613",
                animated: false
            }
        },
        snowball: {
            name: "Snowball Fight",
            emoji: {
                name: "snowball",
                id: "958441833661358131",
                animated: false
            }
        }
    },
    maps: {
        "/Game/Maps/Triad/Triad": "Haven",
        "/Game/Maps/Port/Port": "Icebox",
        "/Game/Maps/Duality/Duality": "Bind",
        "/Game/Maps/Bonsai/Bonsai": "Split",
        "/Game/Maps/Ascent/Ascent": "Ascent",
        "/Game/Maps/Foxtrot/Foxtrot": "Breeze",
        "/Game/Maps/Canyon/Canyon": "Fracture"
    },
    guildSettings: async function (guild) {
        return (await this.valodb.collection("settings").findOneAndUpdate({gid: guild.id}, {$setOnInsert: {news: false, onews: false, serverstatus: false, lang: this.locales[guild.preferredLocale] ? this.locales[guild.preferredLocale] : "en-us", blacklist: false, prefix: "v?"}}, {upsert: true, returnDocument: "after"})).value
    },
    guildBlacklist: async function (guild) {
        const request = await this.valodb.collection("blacklist").findOne({gid: guild.id})
        if(!request) return null
        return request.entrys.length ? request.entrys : null
    },
    getLink: async function (id) {
        const request = await this.valodb.collection("link").findOne({user_id: id})
        return request ? request : null
    },
    getStatsDB: async function (account) {
        const puuid = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURI(account.name)}/${encodeURI(account.tag)}`, {headers: {"X-Riot-Token": this.riottoken}}).catch(error => {return error})
        if(puuid.response) return {status: puuid.response.status}
        const link = await this.valodb.collection("rso").findOne({puuid: puuid.data.puuid})
        if(!link) return {status: 451, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine}
        const stats = await this.valodb.collection("userstats").findOne({puuid: puuid.data.puuid})
        return {status: 200, stats: stats, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine, ingamepuuid: link.ingamepuuid}
    },
    embedBuilder: async function ({title, desc, user, additionalFields = [], color, thumbnail, image, footer} = {}) {
        return {
            title: title,
            description: desc ? desc : null,
            author: user ? {
                name: user.tag,
                iconURL: user.avatarURL()
            } : null,
            fields: additionalFields,
            thumbnail: {
                url: thumbnail ? thumbnail : null
            },
            image: {
                url: image ? image : null
            },
            color: color ? color : 0xff4654,
            timestamp: new Date().toISOString(),
            footer: {
                text: footer ? footer : "VALORANT LABS",
                icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
            }
        }
    },
    buildImage: async function ({dbstats, agent, modes} = {}) {
        const canvas = this.canvas.createCanvas(3840, 2160)
        const ctx = canvas.getContext("2d")
        const background = await this.canvas.loadImage("assets/VALORANT_stats.png")
        const gradient = ctx.createLinearGradient(0, 0, 200, 0)
        gradient.addColorStop(0, "#D60808")
        gradient.addColorStop(1, "#FF6690")
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        const rank = dbstats.ingamepuuid ? await this.axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${dbstats.stats.region}/${dbstats.ingamepuuid}`).catch(error => {return error}) : null
        let rank_image
        if(rank == null || rank.response || (rank.data && rank.data.data.currenttier == null)) {
            rank_image = await this.canvas.loadImage("https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/0/largeicon.png")
        } else {
            rank_image = await this.canvas.loadImage(`https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/${rank.data.data.currenttier}/largeicon.png`)
            this.buildText({ctx: ctx, text: rank.data.data.mmr_change_to_last_game > 0 ? `+${rank.data.data.mmr_change_to_last_game}` : `-${rank.data.data.mmr_change_to_last_game}`, size: 50, x: 1200, y: 820})
        }

        ctx.drawImage(rank_image, 1075, 600, 200, 200)
        this.buildText({ctx: ctx, text: `${dbstats.name}#${dbstats.tag}`, size: 130, x: 1920, y: 255, color: gradient, align: "center"})
        this.buildText({ctx: ctx, text: dbstats.stats.stats.kills, size: 80, x: 405, y: 610, color: "#ff4654"})
        this.buildText({ctx: ctx, text: dbstats.stats.stats.deaths, size: 80, x: 460, y: 740, color: "#ff4654"})
        this.buildText({ctx: ctx, text: dbstats.stats.stats.assists, size: 80, x: 490, y: 872, color: "#ff4654"})
        this.buildText({ctx: ctx, text: (dbstats.stats.stats.kills / dbstats.stats.stats.deaths).toFixed(2), size: 80, x: 330, y: 1005, color: "#ff4654"})
        this.buildText({ctx: ctx, text: ((dbstats.stats.stats.kills + dbstats.stats.stats.assists) / dbstats.stats.stats.deaths).toFixed(2), size: 80, x: 420, y: 1135, color: "#ff4654"})

        const est = dbstats.stats.stats.matches * (35 * 60000)
        this.buildText({ctx: ctx, text: dbstats.stats.stats.matches, size: 80, x: 1750, y: 610, color: "#ff4654"})
        this.buildText({ctx: ctx, text: dbstats.stats.stats.wins, size: 80, x: 1600, y: 740, color: "#ff4654"})
        this.buildText({ctx: ctx, text: `${((dbstats.stats.stats.wins / dbstats.stats.stats.matches) * 100).toFixed(2)}%`, size: 80, x: 1650, y: 872, color: "#ff4654"})
        this.buildText({ctx: ctx, text: dbstats.stats.stats.aces, size: 80, x: 1600, y: 1005, color: "#ff4654"})
        this.buildText({ctx: ctx, text: `${this.moment.duration(est).days()}D ${this.moment.duration(est).hours()}H ${this.moment.duration(est).minutes()}M ${this.moment.duration(est).seconds()}S`, size: 80, x: 1375, y: 1150, color: "#00ffff", align: "left"})

        const best_agent = dbstats.stats.agents.filter(item => item.agent != "").sort((agent1, agent2) => agent2.playtime - agent1.playtime)[0]
        if(best_agent) {
            if(!agent.response) {
                const a_img = await this.canvas.loadImage(agent.data.data.find(item => item.displayName == best_agent.agent).fullPortrait)
                ctx.drawImage(a_img, 2600, 525, 512, 512)
                this.buildText({ctx: ctx, text: (best_agent.kills / best_agent.deaths).toFixed(2), size: 80, x: 3535, y: 690, align: "center", color: "#ff4654"})
                this.buildText({ctx: ctx, text: best_agent.matches, size: 80, x: 3535, y: 865, align: "center", color: "#ff4654"})
                this.buildText({ctx: ctx, text: best_agent.wins, size: 80, x: 3535, y: 1040, align: "center", color: "#ff4654"})
                this.buildText({ctx: ctx, text: `${this.moment.duration(best_agent.playtime).days()}D ${this.moment.duration(best_agent.playtime).hours()}H ${this.moment.duration(best_agent.playtime).minutes()}M ${this.moment.duration(best_agent.playtime).seconds()}S`, size: 80, x: 3125, y: 1150, color: "#00ffff"})
            }
        }

        const mapk = [1390, 1657.5, 1922.5]
        const modek = [1502.5, 1768, 2035]
        const modeimgk = [1425, 1690, 1958]
        const agentimgk = [1310, 1576.6, 1842]
        let keyk = 1425
        const matches = Array.from(dbstats.stats.matches)
        matches.length = matches.length >= 3 ? 3 : matches.length
        for(let i = 0; matches.length > i; i++) {
            this.buildText({ctx: ctx, text: matches[i].map, size: 110, x: 825, y: mapk[i]})
            this.buildText({ctx: ctx, text: matches[i].mode, size: 90, x: 825, y: modek[i]})
            const mode_data = modes.data.data.find(item => item.displayName == matches[i].mode == "Competitive" || matches[i].mode == "Unrated" ? "Normal" : matches[i].mode)
            if(mode_data) {
                const mode_img = await this.canvas.loadImage(mode_data.displayIcon)
                ctx.drawImage(mode_img, 700, modeimgk[i], 100, 100)
            }
            const agent_img = await this.canvas.loadImage(agent.data.data.find(item => item.displayName == matches[i].agent).displayIcon)
            ctx.drawImage(agent_img, 700, agentimgk[i], 100, 100)
            this.buildText({ctx: ctx, text: "Score", size: 110, x: 1525, y: mapk[i]})
            this.buildText({ctx: ctx, text: matches[i].teamblue_rounds, size: 90, x: 1595, y: modek[i], color: "#0088ff", align: "center"})
            this.buildText({ctx: ctx, text: ":", size: 90, x: 1675, y: modek[i], align: "center"})
            this.buildText({ctx: ctx, text: matches[i].teamred_rounds, size: 90, x: 1750, y: modek[i], color: "#ff4654", align: "center"})
            this.buildText({ctx: ctx, text: "K/D/A", size: 110, x: 2050, y: mapk[i]})
            this.buildText({ctx: ctx, text: `${matches[i].kills}/${matches[i].deaths}/${matches[i].assists}`, size: 90, x: 2200, y: modek[i], align: "center"})
            this.buildText({ctx: ctx, text: `/game ${matches[i].gamekey}`, size: 80, x: 2600, y: keyk})
            keyk += 266.6
        }
        return new this.attachment(canvas.toBuffer(), `valorant-stats-${dbstats.name}-${dbstats.tag}.png`)
    },
    patchStats: async function ({ingamepuuid, puuid, name, tag, matches, message, region, stats, lang, agent, modes} = {}) {
        const reqs = []
        for(let i = 0; matches.length > i; i++) {
            reqs.push(ingamepuuid ? axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/match/${region}/${matches[i].matchId}`, {timeout: 2000}).catch(error => {return error}) : axios.get(`https://${region}.api.riotgames.com/val/match/v1/matches/${matches[i].matchId}`, {headers: {"X-Riot-Token": this.riottoken}, timeout: 2000}).catch(error => {return error}))
        }
        let fmatches = await Promise.allSettled(reqs)
        fmatches = fmatches.map(item => {return item.value})
        for(let i = 0; fmatches.length > i; i++) {
            console.log(fmatches[i])
            if(!fmatches[i].response && !fmatches.code) {
                if(ingamepuuid) {
                    if(fmatches[i].data.data.metadata.mode != "Deathmatch") {
                        if(fmatches[i].data.data.metadata.mode != "Custom Game") {
                            const player = fmatches[i].data.data.players.all_players.find(item => item.puuid == ingamepuuid)
                            const team = fmatches[i].data.data.teams[player.team.toLowerCase()]
                            stats.stats.matches += 1
                            stats.stats.kills = !isNaN(player.stats.kills) ? Number(player.stats.kills) + Number(stats.stats.kills) : 0
                            stats.stats.deaths = !isNaN(player.stats.deaths) ? Number(player.stats.deaths) + Number(stats.stats.deaths) : 0
                            stats.stats.assists = !isNaN(player.stats.assists) ? Number(player.stats.assists) + Number(stats.stats.assists) : 0
                            stats.stats.headshots = !isNaN(player.stats.headshots) ? Number(player.stats.headshots) + Number(stats.stats.headshots) : 0
                            let aces = 0
                            let quadras = 0
                            let triples = 0
                            for(let j = 0; fmatches[i].data.data.rounds.length > j; j++) {
                                for(let k = 0; fmatches[i].data.data.rounds[j].player_stats.length > k; k++) {
                                    if(fmatches[i].data.data.rounds[j].player_stats[k].player_puuid == ingamepuuid) {
                                        if(fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length == 3) triples += 1
                                        if(fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length == 4) quadras += 1
                                        if(fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length >= 5) aces += 1
                                    }
                                }
                            }
                            stats.stats.aces = !isNaN(stats.stats.aces) ? Number(aces) + Number(stats.stats.aces) : 0
                            stats.stats.triples = !isNaN(stats.stats.triples) ? Number(triples) + Number(stats.stats.triples) : 0
                            stats.stats.quadras = !isNaN(stats.stats.quadras) ? Number(quadras) + Number(stats.stats.quadras) : 0
                            if(team.has_won) stats.stats.wins += 1

                            const dbagent = stats.agents.find(item => item.agent == player.character)
                            const dbindex = stats.agents.findIndex(item => item.agent == player.character)
                            if(dbindex != -1) stats.agents.splice(dbindex, 1)
                            const agent = dbindex != -1 ? dbagent : {}
                            agent.agent = player.character
                            agent.playtime = !isNaN(fmatches[i].data.data.metadata.game_length) ? Number(agent.playtime) + Number(fmatches[i].data.data.metadata.game_length) : 0
                            agent.matches += 1
                            agent.kills = !isNaN(player.stats.kills) ? Number(agent.kills) + Number(player.stats.kills) : 0
                            agent.deaths = !isNaN(player.stats.deaths) ? Number(agent.deaths) + Number(player.stats.deaths) : 0
                            agent.assists = !isNaN(player.stats.assists) ? Number(agent.assists) + Number(player.stats.assists) : 0
                            agent.headshots = !isNaN(player.stats.headshots) ? Number(agent.headshots) + Number(player.stats.headshots) : 0
                            agent.aces = !isNaN(aces) ? Number(agent.aces) + Number(aces) : 0
                            if(team.has_won) agent.wins += 1
                            stats.agents.push(agent)

                            const dbcheck = await this.valodb.collection("games").findOne({matchid: fmatches[i].data.data.metadata.matchid})
                            if(dbcheck) stats.matches.push({won: team.has_won, gamekey: dbcheck.gamekey, id: fmatches[i].data.data.metadata.matchid, start: fmatches[i].data.data.metadata.game_start * 1000, agent: player.character, mode: fmatches[i].data.data.metadata.mode, map: fmatches[i].data.data.metadata.map, teamblue_won: team.has_won, teamblue_rounds: team.rounds_won, teamred_won: team.has_won == true ? false : true, teamred_rounds: team.rounds_lost, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                            if(!dbcheck) {
                                let rid = randomize("Aa0", 8)
                                let available = false

                                while(!available) {
                                    const ridcheck = await this.valodb.collection("games").findOne({gamekey: rid})
                                    if(!ridcheck) {
                                        this.valodb.collection("games").insertOne({gamekey: rid, matchid: fmatches[i].data.data.metadata.matchid})
                                        stats.matches.push({won: team.has_won, gamekey: rid, id: fmatches[i].data.data.metadata.matchid, start: fmatches[i].data.data.metadata.game_start * 1000, agent: player.character, mode: fmatches[i].data.data.metadata.mode, map: fmatches[i].data.data.metadata.map, teamblue_won: team.has_won, teamblue_rounds: team.rounds_won, teamred_won: team.has_won == true ? false : true, teamred_rounds: team.rounds_lost, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                                        available = true
                                    } else {
                                        rid = randomize("Aa0", 8)
                                    }
                                }
                            }
                        }
                    } else {
                        if(fmatches[i].data.data.metadata.mode != "Custom Game") {
                            const player = fmatches[i].data.data.players.all_players.find(item => item.puuid == ingamepuuid)
                            const team = fmatches[i].data.data.players.all_players.sort((item2, item1) => item2.score - item1.score)[0]

                            const dbcheck = await this.valodb.collection("games").findOne({matchid: fmatches[i].data.data.metadata.matchid})
                            if(dbcheck) stats.matches.push({won: team.puuid == ingamepuuid ? true : false, gamekey: dbcheck.gamekey, id: fmatches[i].data.data.metadata.matchid, start: fmatches[i].data.data.metadata.game_start * 1000, agent: player.character, mode: fmatches[i].data.data.metadata.mode, map: fmatches[i].data.data.metadata.map, teamblue_won: team.puuid == ingamepuuid ? true : false, teamblue_rounds: team.puuid == ingamepuuid ? 1 : 0, teamred_won: team.puuid != ingamepuuid ? true : false, teamred_rounds: team.puuid != ingamepuuid ? 1 : 0, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                            if(!dbcheck) {
                                let rid = randomize("Aa0", 8)
                                let available = false

                                while(!available) {
                                    const ridcheck = await this.valodb.collection("games").findOne({gamekey: rid})
                                    if(!ridcheck) {
                                        this.valodb.collection("games").insertOne({gamekey: rid, matchid: fmatches[i].data.data.metadata.matchid})
                                        stats.matches.push({won: team.puuid == ingamepuuid ? true : false, gamekey: rid, id: fmatches[i].data.data.metadata.matchid, start: fmatches[i].data.data.metadata.game_start * 1000, agent: player.character, mode: fmatches[i].data.data.metadata.mode, map: fmatches[i].data.data.metadata.map, teamblue_won: team.puuid == ingamepuuid ? true : false, teamblue_rounds: team.puuid == ingamepuuid ? 1 : 0, teamred_won: team.puuid != ingamepuuid ? true : false, teamred_rounds: team.puuid != ingamepuuid ? 1 : 0, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                                        available = true
                                    } else {
                                        rid = randomize("Aa0", 8)
                                    }
                                }
                            }
                        }
                    }
                }
                if(!ingamepuuid) {
                    if(fmatches[i].data.matchInfo.queueId != "deathmatch") {
                        if(fmatches[i].data.matchInfo.queueId != "") {
                            const player = fmatches[i].data.players.find(item => item.puuid == puuid)
                            const team = fmatches[i].data.teams.find(item => item.teamId == player.teamId)
                            stats.stats.matches += 1
                            stats.stats.kills = !isNaN(player.stats.kills) ? Number(player.stats.kills) + Number(stats.stats.kills) : 0
                            stats.stats.deaths = !isNaN(player.stats.deaths) ? Number(player.stats.deaths) + Number(stats.stats.deaths) : 0
                            stats.stats.assists = !isNaN(player.stats.assists) ? Number(player.stats.assists) + Number(stats.stats.assists) : 0
                            let headshots = 0
                            let aces = 0
                            let quadras = 0
                            let triples = 0
                            for(let j = 0; fmatches[i].data.roundResults.length > j; j++) {
                                for(let k = 0; fmatches[i].data.roundResults[j].playerStats.length > k; k++) {
                                    if(fmatches[i].data.roundResults[j].playerStats[k].puuid == puuid) {
                                        for(let f = 0; fmatches[i].data.roundResults[j].playerStats[k].damage.length > f; f++) {
                                            headshots += fmatches[i].data.roundResults[j].playerStats[k].damage[f].headshots
                                        }
                                        if(fmatches[i].data.roundResults[j].playerStats[k].kills.length == 3) triples += 1
                                        if(fmatches[i].data.roundResults[j].playerStats[k].kills.length == 4) quadras += 1
                                        if(fmatches[i].data.roundResults[j].playerStats[k].kills.length >= 5) aces += 1
                                    }
                                }
                            }
                            stats.stats.headshots = !isNaN(player.stats.headshots) ? Number(headshots) + Number(stats.stats.headshots) : 0
                            stats.stats.aces = !isNaN(stats.stats.aces) ? Number(aces) + Number(stats.stats.aces) : 0
                            stats.stats.triples = !isNaN(stats.stats.triples) ? Number(triples) + Number(stats.stats.triples) : 0
                            stats.stats.quadras = !isNaN(stats.stats.quadras) ? Number(quadras) + Number(stats.stats.quadras) : 0
                            if(team.won) stats.stats.wins += 1

                            //TODO
                            const agentid = this.agents.find(item => item.id == player.characterId)
                            console.log(player.character, puuid, stats)
                            const dbagent = stats.agents.find(item => item.agent == agentid.name)
                            const dbindex = stats.agents.findIndex(item => item.agent == agentid.name)
                            if(dbindex != -1) stats.agents.splice(dbindex, 1)
                            const agent = dbindex != -1 ? dbagent : {}
                            agent.agent = player.character
                            agent.playtime = !isNaN(fmatches[i].data.data.metadata.game_length) ? Number(agent.playtime) + Number(fmatches[i].data.data.metadata.game_length) : 0
                            agent.matches += 1
                            agent.kills = !isNaN(player.stats.kills) ? Number(agent.kills) + Number(player.stats.kills) : 0
                            agent.deaths = !isNaN(player.stats.deaths) ? Number(agent.deaths) + Number(player.stats.deaths) : 0
                            agent.assists = !isNaN(player.stats.assists) ? Number(agent.assists) + Number(player.stats.assists) : 0
                            agent.headshots = !isNaN(player.stats.headshots) ? Number(agent.headshots) + Number(player.stats.headshots) : 0
                            agent.aces = !isNaN(aces) ? Number(agent.aces) + Number(aces) : 0
                            if(team.won) agent.wins += 1
                            stats.agents.push(agent)

                            const dbcheck = await this.valodb.collection("games").findOne({matchid: fmatches[i].data.matchInfo.matchId})
                            if(dbcheck) stats.matches.push({won: team.won, gamekey: dbcheck.gamekey, id: fmatches[i].data.matchInfo.matchId, start: fmatches[i].data.matchInfo.gameStartMillis, agent: agentid.name, mode: this.gamemodes[fmatches[i].data.data.metadata.mode].name, map: this.maps[fmatches[i].data.data.metadata.map], teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: !team.won, teamred_rounds: team.roundsPlayed - team.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                            if(!dbcheck) {
                                let rid = randomize("Aa0", 8)
                                let available = false

                                while(!available) {
                                    const ridcheck = await this.valodb.collection("games").findOne({gamekey: rid})
                                    if(!ridcheck) {
                                        this.valodb.collection("games").insertOne({gamekey: rid, matchid: fmatches[i].data.matchInfo.matchId})
                                        stats.matches.push({won: team.won, gamekey: rid, id: fmatches[i].data.matchInfo.matchId, start: fmatches[i].data.matchInfo.gameStartMillis, agent: agentid.name, mode: this.gamemodes[fmatches[i].data.data.metadata.mode].name, map: this.maps[fmatches[i].data.data.metadata.map], teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: !team.won, teamred_rounds: team.roundsPlayed - team.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                                        available = true
                                    } else {
                                        rid = randomize("Aa0", 8)
                                    }
                                }
                            }
                        }
                    } else {
                        if(fmatches[i].data.matchInfo.queueId != "") {
                            const player = fmatches[i].data.players.find(item => item.puuid == puuid)
                            const team = fmatches[i].data.teams.player.find(item => item.teamId == puuid)

                            const dbcheck = await this.valodb.collection("games").findOne({matchid: fmatches[i].data.matchInfo.matchId})
                            if(dbcheck) stats.matches.push({won: team.won, gamekey: dbcheck.gamekey, id: fmatches[i].data.matchInfo.matchId, start: fmatches[i].data.matchInfo.gameStartMillis, agent: agentid.name, mode: this.gamemodes[fmatches[i].data.data.metadata.mode].name, map: this.maps[fmatches[i].data.data.metadata.map], teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: !team.won, teamred_rounds: team.roundsPlayed - team.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                            if(!dbcheck) {
                                let rid = randomize("Aa0", 8)
                                let available = false

                                while(!available) {
                                    const ridcheck = await this.valodb.collection("games").findOne({gamekey: rid})
                                    if(!ridcheck) {
                                        this.valodb.collection("games").insertOne({gamekey: rid, matchid: fmatches[i].data.matchInfo.matchId})
                                        stats.matches.push({won: team.won, gamekey: rid, id: fmatches[i].data.matchInfo.matchId, start: fmatches[i].data.matchInfo.gameStartMillis, agent: agentid.name, mode: this.gamemodes[fmatches[i].data.data.metadata.mode].name, map: this.maps[fmatches[i].data.data.metadata.map], teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: !team.won, teamred_rounds: team.roundsPlayed - team.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                                        available = true
                                    } else {
                                        rid = randomize("Aa0", 8)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(!stats.region) stats.region = region
        stats.last_update = Date.now()
        const patchedmatches = stats.matches.filter(item => item != null).sort((match1, match2) => match2.start - match1.start)
        if(patchedmatches.length > 10) patchedmatches.length = 10
        stats.matches = patchedmatches
        //await this.valodb.collection("userstats").updateOne({puuid: stats.puuid}, {$set: stats})
        const attachment = await this.buildImage({dbstats: {stats: stats, name: name, tag: tag}, agent: agent, modes: modes})
        const components = []
        for(let i = 0; stats.matches.length > i; i++) {
            components.push({
                label: stats.matches[i].gamekey,
                value: stats.matches[i].id,
                description: `${stats.matches[i].map} | ${stats.matches[i].mode} | ${stats.matches[i].agent} | ${moment(stats.matches[i].start).format("lll")}`,
                emoji: Object.values(this.gamemodes).find(item => item.name == stats.matches[i].mode).emoji
            })
        }
        console.log(components)
        message.edit({embeds: [], files: [attachment], components: [{type: "ACTION_ROW", components: [{type: "SELECT_MENU", customId: `game`, maxValues: 1, minValues: 0, options: components, placeholder: this.translations[lang].stats.game_select}]}]})
    },
    getBlacklist: async function (guildId) {
        const request = await this.valodb.collection("blacklist").findOne({gid: guildId})
        return request ? request.entrys : null
    },
    addBlacklist: async function (data) {
        const res = await this.valodb.collection("blacklist").findOne({gid: data.guild})
        const newarray = res ? res.entrys : []
        if(newarray.includes(data.channel)) return null
        newarray.push(data.channel)
        await this.valodb.collection("blacklist").updateOne({gid: data.guild}, {$set: {entrys: newarray}}, {upsert: true})
        return newarray
    },
    removeBlacklist: async function (data) {
        const res = await this.valodb.collection("blacklist").findOne({gid: data.guild})
        if(!res) return undefined
        if(!res.entrys.includes(data.channel)) return null
        const indexnum = res.entrys.findIndex(item => item == data.channel)
        res.entrys.splice(indexnum, 1)
        await this.valodb.collection("blacklist").updateOne({gid: data.guild}, {$set: {entrys: res.entrys}}, {upsert: false})
        return res.entrys.length == 0 ? undefined : res.entrys
    },
    errorhandler: async function (error) {
        console.log(error)
        if(error.status == 451) return error.message.reply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[451].title, desc: this.translations[error.lang].response[451][error.type].description, footer: "VALORANT LABS [ERROR 451]"})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].response[451].component_login, style: "LINK", url: `https://valorantlabs.xyz/v1/login?puuid=${error.puuid}`}, {type: "BUTTON", label: this.translations[error.lang].response[451].component_update, style: "DANGER", customId: `update;${error.puuid}`}, {type: "BUTTON", label: this.translations[error.lang].response[451].component_rank, style: "DANGER", customId: `rank;${error.name};${error.tag}`}]}]})
        if(!this.translations[error.lang].response[error.status]) return error.message.reply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[500].title, desc: this.translations[error.lang].response[500][error.type].description, footer: "VALORANT LABS [ERROR 500]"})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
        if(!this.translations[error.lang].response[error.status][error.type]) return error.message.reply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[error.status].title, desc: this.translations[error.lang].response[error.status]["account"].description, footer: `VALORANT LABS [ERROR ${error.status}]`})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
        return error.message.reply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[error.status].title, desc: this.translations[error.lang].response[error.status][error.type].description, footer: `VALORANT LABS [ERROR ${error.status}]`})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    },
    errorhandlerinteraction: async function (error) {
        if(error.status == 451) return error.interaction.editReply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[451].title, desc: this.translations[error.lang].response[451][error.type].description, footer: "VALORANT LABS [ERROR 451]"})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].response[451].component_login, style: "LINK", url: `https://valorantlabs.xyz/v1/login?puuid=${error.puuid}`}, {type: "BUTTON", label: this.translations[error.lang].response[451].component_update, style: "DANGER", customId: `update;${error.puuid}`}, {type: "BUTTON", label: this.translations[error.lang].response[451].component_rank, style: "DANGER", customId: `rank;${error.name};${error.tag}`}]}]})
        if(!this.translations[error.lang].response[error.status]) return error.interaction.editReply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[500].title, desc: this.translations[error.lang].response[500][error.type].description, footer: "VALORANT LABS [ERROR 500]"})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
        if(!this.translations[error.lang].response[error.status][error.type]) return error.interaction.editReply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[error.status].title, desc: this.translations[error.lang].response[error.status]["account"].description, footer: `VALORANT LABS [ERROR ${error.status}]`})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
        return error.interaction.editReply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[error.status].title, desc: this.translations[error.lang].response[error.status][error.type].description, footer: `VALORANT LABS [ERROR ${error.status}]`})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: this.translations[error.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    },
    getGuild: async function (interaction) {
        const settings = await this.guildSettings(interaction.guild)
        return interaction.editReply({
            embeds: [
                this.embedBuilder({
                    title: "VALORANT LABS Settings",
                    desc: `Settings for ${interaction.guild.name}`,
                    additionalFields: [
                        {name: "Prefix", value: String(settings.prefix)},
                        {name: "Patchnotes", value: String(settings.news)},
                        {name: "Othernews", value: String(settings.onews)},
                        {name: "Serverstatus", value: String(settings.serverstatus)},
                        {name: "Language", value: String(settings.lang)},
                        {name: "Blacklist", value: String(settings.blacklist)}
                    ],
                    footer: 'VALORANT LABS [SETTINGS]'
                })
            ]
        })
    },
    patchGuild: async function (data) {
        let doc
        switch(data.key) {
            case "prefix": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {prefix: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "language": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {lang: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "patchnotes": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {news: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "othernews": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {onews: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "serverstatus": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {serverstatus: data.value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "blacklist": {
                doc = (await this.valodb.collection("settings").findOneAndUpdate({gid: data.interaction.guild.id}, {$set: {blacklist: Boolean(data.value)}}, {upsert: false, returnDocument: "after"})).value
                break
            }
        }
        return data.interaction.editReply({
            embeds: [this.embedBuilder({
                title: "VALORANT LABS Settings",
                desc: `Settings for ${data.interaction.guild.name}`,
                additionalFields: [{name: "Prefix", value: String(doc.prefix)}, {name: "Patchnotes", value: String(doc.news)}, {name: "Othernews", value: String(doc.onews)}, {name: "Serverstatus", value: String(doc.serverstatus)}, {name: "Language", value: String(doc.lang)}, {name: "Blacklist", value: String(doc.blacklist)}],
                footer: 'VALORANT LABS [SETTINGS]'
            })]
        })
    },
    buildText: async function ({ctx, text, size, x, y, color, align, font, rotate} = {}) {
        ctx.font = `${size}px ${font ? font : "DinNext"}`
        ctx.fillStyle = color ? color : "#ffffff"
        ctx.textAlign = align ? align : "left"
        if(rotate) {
            ctx.save()
            ctx.translate(200, 1080)
            ctx.rotate(-0.5 * Math.PI)
            ctx.fillText(text, x, y)
        } else {
            ctx.fillText(text, x, y)
        }
    }
}