import {MongoClient} from 'mongodb'
import {readFileSync, writeFileSync, unlinkSync} from "fs"
import {brotliDecompressSync, brotliCompressSync, constants} from "zlib"
import axios from "axios"
import axiosRetry from "axios-retry"
import system from "systeminformation"
import pretty from "pretty-bytes"
import {EnumResolvers, PermissionFlagsBits, Attachment} from 'discord.js.dev'
import moment from "moment"
import Canvas from "canvas"
import randomize from 'randomatic'

Canvas.registerFont('assets/fonts/product_sans.ttf', {family: 'product_sans'})
Canvas.registerFont('assets/fonts/valorant_font.ttf', {family: 'valorant_font'})
Canvas.registerFont('assets/fonts/umeboshi_.ttf', {family: 'japan2'})
Canvas.registerFont('assets/fonts/anton.ttf', {family: 'anton'})
Canvas.registerFont('assets/fonts/DINNextLTPro-Bold.ttf', {family: 'DinNext'})

const basedata = JSON.parse(readFileSync("./basedata.json"))
const mongoclient = new MongoClient(basedata.mongoaccess)
mongoclient.connect()
const translations = JSON.parse(readFileSync("./translations.json"))
let valpapiagents = await axios.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true").catch(error => {return error})
let valpapigamemodes = await axios.get("https://valorant-api.com/v1/gamemodes").catch(error => {return error})

setInterval(async () => {
    valpapiagents = await axios.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true").catch(error => {return error})
    valpapigamemodes = await axios.get("https://valorant-api.com/v1/gamemodes").catch(error => {return error})
}, 60000 * 5)

axiosRetry(axios, {
    retries: 2,
    shouldResetTimeout: true,
    retryCondition: (error) => {
        return error.code === "ECONNABORTED" || error.code === "ECONNRESET" || error.code === "ERR_REQUEST_ABORTED";
    },
})

export default {
    EnumResolvers,
    perms: PermissionFlagsBits,
    sysinfo: system,
    pretty,
    axios,
    translations,
    topgg: basedata.dbltoken,
    riottoken: basedata.riottoken,
    valodb: mongoclient.db("VALORANT-LABS"),
    moment,
    canvas: Canvas,
    attachment: Attachment,
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
            path: "escalation.png",
            emoji: {
                name: "escalation",
                id: "958441833627787350",
                animated: false
            }
        },
        spikerush: {
            name: "Spike Rush",
            path: "spikerush.png",
            emoji: {
                name: "spikerush",
                id: "958441833627779202",
                animated: false
            }
        },
        deathmatch: {
            name: "Deathmatch",
            path: "deathmatch.png",
            emoji: {
                name: "deathmatch",
                id: "958441493612355704",
                animated: false
            }
        },
        competitive: {
            name: "Competitive",
            path: "competitive.png",
            emoji: {
                name: "unrated",
                id: "958441359126167613",
                animated: false
            }
        },
        unrated: {
            name: "Unrated",
            path: "unrated.png",
            emoji: {
                name: "unrated",
                id: "958441359126167613",
                animated: false
            }
        },
        onefa: {
            name: "Replication",
            path: "replication.png",
            emoji: {
                name: "replication",
                id: "958441833636192386",
                animated: false
            }
        },
        "": {
            name: "Custom Game",
            path: "unrated.png",
            emoji: {
                name: "unrated",
                id: "958441359126167613",
                animated: false
            }
        },
        newmap: {
            name: "New Map",
            path: "unrated.png",
            emoji: {
                name: "unrated",
                id: "958441359126167613",
                animated: false
            }
        },
        snowball: {
            name: "Snowball Fight",
            path: "snowball.png",
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
    ranks: {
        0: {
            images: "4.png",
            discordid: "<:unrated:862004031248924693>"
        },
        1: {
            image: "4.png",
            discordid: "<:unrated:862004031248924693>"
        },
        2: {
            image: "4.png",
            discordid: "<:unrated:862004031248924693>"
        },
        3: {
            image: "iron1.png",
            discordid: "<:iron1:862004162098102272>"
        },
        4: {
            image: "iron2.png",
            discordid: "<:iron2:862004185036488715>"
        },
        5: {
            image: "iron3.png",
            discordid: "<:iron3:862004206718025738>"
        },
        6: {
            image: "bronze1.png",
            discordid: "<:bronze1:862004343054008331>"
        },
        7: {
            image: "bronze2.png",
            discordid: "<:bronze2:862004376272109608>"
        },
        8: {
            image: "bronze3.png",
            discordid: "<:bronze3:862004410775371777>"
        },
        9: {
            image: "silver1.png",
            discordid: "<:silver1:862004807896268832>"
        },
        10: {
            image: "silver2.png",
            discordid: "<:silver2:862004860655501342>"
        },
        11: {
            image: "silver3.png",
            discordid: "<:silver3:862004895708086302>"
        },
        12: {
            image: "gold1.png",
            discordid: "<:gold1:862004921763364874>"
        },
        13: {
            image: "gold2.png",
            discordid: "<:gold2:862004943708094525>"
        },
        14: {
            image: "gold3.png",
            discordid: "<:gold3:862004966636781608>"
        },
        15: {
            image: "platin1.png",
            discordid: "<:plat1:862005172687470622>"
        },
        16: {
            image: "platin2.png",
            discordid: "<:plat2:862005201301143573>"
        },
        17: {
            image: "platin3.png",
            discordid: "<:plat3:862005224645853185>"
        },
        18: {
            image: "diamond1.png",
            discordid: "<:dia1:862005255628652554>"
        },
        19: {
            image: "diamond2.png",
            discordid: "<:dia2:862005278207508551>"
        },
        20: {
            image: "diamond3.png",
            discordid: "<:dia3:862005298193891378>"
        },
        21: {
            image: "immortal1.png",
            discordid: "<:immortal1:862005437264429056>"
        },
        22: {
            image: "immortal2.png",
            discordid: "<:immortal2:862005462580985856>"
        },
        23: {
            image: "immortal3.png",
            discordid: "<:immortal3:862005493840478208>"
        },
        24: {
            image: "radiant.png",
            discordid: "<:radiant:862005538392506408>"
        }
    },
    uuidv4: function () {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    getDB: function (name) {
        return mongoclient.db("VALORANT-LABS").collection(name)
    },
    guildSettings: async function (guild) {
        return (await this.getDB("settings").findOneAndUpdate({gid: guild.id}, {$setOnInsert: {news: false, onews: false, serverstatus: false, lang: this.locales[guild.preferredLocale] ? this.locales[guild.preferredLocale] : "en-us", blacklist: false, prefix: "v?", background: false}}, {upsert: true, returnDocument: "after"})).value
    },
    guildBlacklist: async function (guild) {
        const request = await this.getDB("blacklist").findOne({gid: guild.id})
        if(!request) return null
        return request.entrys.length ? request.entrys : null
    },
    getLink: async function (id) {
        const request = await this.getDB("link").findOne({user_id: id})
        return request ? request : null
    },
    getGameKey: async function (id) {
        const request = await this.getDB("games").findOne({gamekey: id})
        return request ? request : null
    },
    getStatsDB: async function (account) {
        const puuid = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURI(account.name)}/${encodeURI(account.tag)}`, {headers: {"X-Riot-Token": this.riottoken}}).catch(error => {return error})
        if(puuid.response) return {status: puuid.response.status}
        const link = await this.getDB("rso").findOne({puuid: puuid.data.puuid})
        if(!link) return {status: 451, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine}
        const stats = await this.getDB("userstats").findOne({puuid: puuid.data.puuid})
        return {status: 200, ...stats, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine}
    },
    getGamemodes: function () {
        return valpapigamemodes.data.data
    },
    getAgents: function () {
        return valpapiagents.data.data
    },
    embedBuilder: function ({title, desc, user, additionalFields = [], color, thumbnail, image, footer} = {}) {
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
    buildStatsImage: async function ({dbstats, agent, modes, bgcanvas} = {}) {
        const canvas = this.canvas.createCanvas(3840, 2160)
        const ctx = canvas.getContext("2d")
        const background = bgcanvas ? bgcanvas : await this.canvas.loadImage("assets/backgrounds/VALORANT_stats.png")
        const gradient = ctx.createLinearGradient(0, 0, 200, 0)
        gradient.addColorStop(0, "#D60808")
        gradient.addColorStop(1, "#FF6690")
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        const rank = dbstats.ingamepuuid ? await this.axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${dbstats.region}/${dbstats.ingamepuuid}`).catch(error => {return error}) : null
        let rank_image
        if(rank == null || rank.response || (rank.data && rank.data.data.currenttier == null)) {
            rank_image = await this.canvas.loadImage("https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/0/largeicon.png")
        } else {
            rank_image = await this.canvas.loadImage(`https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/${rank.data.data.currenttier}/largeicon.png`)
            this.buildText({ctx: ctx, text: rank.data.data.mmr_change_to_last_game > 0 ? `+${rank.data.data.mmr_change_to_last_game}` : rank.data.data.mmr_change_to_last_game, size: 50, x: 1200, y: 820})
        }

        ctx.drawImage(rank_image, 1075, 600, 200, 200)
        this.buildText({ctx: ctx, text: `${dbstats.name}#${dbstats.tag}`, size: 130, x: 1920, y: 255, color: gradient, align: "center"})
        this.buildText({ctx: ctx, text: dbstats.stats.kills, size: 80, x: 405, y: 610, color: "#ff4654"})
        this.buildText({ctx: ctx, text: dbstats.stats.deaths, size: 80, x: 460, y: 740, color: "#ff4654"})
        this.buildText({ctx: ctx, text: dbstats.stats.assists, size: 80, x: 490, y: 872, color: "#ff4654"})
        this.buildText({ctx: ctx, text: (dbstats.stats.kills / dbstats.stats.deaths).toFixed(2), size: 80, x: 330, y: 1005, color: "#ff4654"})
        this.buildText({ctx: ctx, text: ((dbstats.stats.kills + dbstats.stats.assists) / dbstats.stats.deaths).toFixed(2), size: 80, x: 420, y: 1135, color: "#ff4654"})

        const est = dbstats.stats.matches * (35 * 60000)
        this.buildText({ctx: ctx, text: dbstats.stats.matches, size: 80, x: 1750, y: 610, color: "#ff4654"})
        this.buildText({ctx: ctx, text: dbstats.stats.wins, size: 80, x: 1600, y: 740, color: "#ff4654"})
        this.buildText({ctx: ctx, text: `${((dbstats.stats.wins / dbstats.stats.matches) * 100).toFixed(2)}%`, size: 80, x: 1650, y: 872, color: "#ff4654"})
        this.buildText({ctx: ctx, text: dbstats.stats.aces, size: 80, x: 1600, y: 1005, color: "#ff4654"})
        this.buildText({ctx: ctx, text: `${this.moment.duration(est).days()}D ${this.moment.duration(est).hours()}H ${this.moment.duration(est).minutes()}M ${this.moment.duration(est).seconds()}S`, size: 80, x: 1375, y: 1150, color: "#00ffff", align: "left"})

        const best_agent = dbstats.agents.filter(item => item.agent != "").sort((agent1, agent2) => agent2.playtime - agent1.playtime)[0]
        if(best_agent) {
            if(!agent.response) {
                const a_img = await this.canvas.loadImage(agent.find(item => item.displayName == best_agent.agent).fullPortrait)
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
        const matches = Array.from(dbstats.matches)
        matches.length = matches.length >= 3 ? 3 : matches.length
        for(let i = 0; matches.length > i; i++) {
            this.buildText({ctx: ctx, text: matches[i].map, size: 110, x: 825, y: mapk[i]})
            this.buildText({ctx: ctx, text: matches[i].mode, size: 90, x: 825, y: modek[i]})
            const mode_data = modes.find(item => item.displayName == (matches[i].mode == "Competitive" || matches[i].mode == "Unrated" ? "Normal" : matches[i].mode))
            if(mode_data) {
                const mode_img = await this.canvas.loadImage(mode_data.displayIcon)
                ctx.drawImage(mode_img, 700, modeimgk[i], 100, 100)
            }
            const agent_img = await this.canvas.loadImage(agent.find(item => item.displayName == matches[i].agent).displayIcon)
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
        return new this.attachment(canvas.toBuffer(), `valorant-stats-${dbstats.name}-${dbstats.tag}.png`, {description: "VALORANT LABS Stats"})
    },
    patchStats: async function ({dbstats, mmatches, message, lang, agent, modes, bgcanvas} = {}) {
        const reqs = []
        for(let i = 0; mmatches.length > i; i++) {
            reqs.push(dbstats.ingamepuuid ? axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/match/${dbstats.region}/${mmatches[i].matchId}`, {timeout: 2000}).catch(error => {return error}) : axios.get(`https://${dbstats.region}.api.riotgames.com/val/match/v1/matches/${mmatches[i].matchId}`, {headers: {"X-Riot-Token": this.riottoken}, timeout: 2000}).catch(error => {return error}))
        }
        let fmatches = await Promise.allSettled(reqs)
        fmatches = fmatches.map(item => {return item.value})
        for(let i = 0; fmatches.length > i; i++) {
            console.log(fmatches[i])
            if(!fmatches[i].response && !fmatches.code) {
                if(dbstats.ingamepuuid) {
                    if(fmatches[i].data.data.metadata.mode != "Deathmatch") {
                        if(fmatches[i].data.data.metadata.mode != "Custom Game") {
                            const player = fmatches[i].data.data.players.all_players.find(item => item.puuid == dbstats.ingamepuuid)
                            const team = fmatches[i].data.data.teams[player.team.toLowerCase()]
                            dbstats.stats.matches += 1
                            dbstats.stats.kills = !isNaN(player.stats.kills) ? Number(player.stats.kills) + Number(dbstats.stats.kills) : 0
                            dbstats.stats.deaths = !isNaN(player.stats.deaths) ? Number(player.stats.deaths) + Number(dbstats.stats.deaths) : 0
                            dbstats.stats.assists = !isNaN(player.stats.assists) ? Number(player.stats.assists) + Number(dbstats.stats.assists) : 0
                            dbstats.stats.headshots = !isNaN(player.stats.headshots) ? Number(player.stats.headshots) + Number(dbstats.stats.headshots) : 0
                            let aces = 0
                            let quadras = 0
                            let triples = 0
                            for(let j = 0; fmatches[i].data.data.rounds.length > j; j++) {
                                for(let k = 0; fmatches[i].data.data.rounds[j].player_stats.length > k; k++) {
                                    if(fmatches[i].data.data.rounds[j].player_stats[k].player_puuid == dbstats.ingamepuuid) {
                                        if(fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length == 3) triples += 1
                                        if(fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length == 4) quadras += 1
                                        if(fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length >= 5) aces += 1
                                    }
                                }
                            }
                            dbstats.stats.aces = !isNaN(dbstats.stats.aces) ? Number(aces) + Number(dbstats.stats.aces) : 0
                            dbstats.stats.triples = !isNaN(dbstats.stats.triples) ? Number(triples) + Number(dbstats.stats.triples) : 0
                            dbstats.stats.quadras = !isNaN(dbstats.stats.quadras) ? Number(quadras) + Number(dbstats.stats.quadras) : 0
                            if(team.has_won) dbstats.stats.wins += 1

                            const dbagent = dbstats.agents.find(item => item.agent == player.character)
                            const dbindex = dbstats.agents.findIndex(item => item.agent == player.character)
                            if(dbindex != -1) dbstats.agents.splice(dbindex, 1)
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
                            dbstats.agents.push(agent)

                            const dbcheck = await this.getDB("games").findOne({matchid: fmatches[i].data.data.metadata.matchid})
                            if(dbcheck) dbstats.matches.push({won: team.has_won, gamekey: dbcheck.gamekey, id: fmatches[i].data.data.metadata.matchid, start: fmatches[i].data.data.metadata.game_start * 1000, agent: player.character, mode: fmatches[i].data.data.metadata.mode, map: fmatches[i].data.data.metadata.map, teamblue_won: team.has_won, teamblue_rounds: team.rounds_won, teamred_won: team.has_won == true ? false : true, teamred_rounds: team.rounds_lost, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                            if(!dbcheck) {
                                let rid = randomize("Aa0", 8)
                                let available = false

                                while(!available) {
                                    const ridcheck = await this.getDB("games").findOne({gamekey: rid})
                                    if(!ridcheck) {
                                        this.getDB("games").insertOne({gamekey: rid, matchid: fmatches[i].data.data.metadata.matchid})
                                        dbstats.matches.push({won: team.has_won, gamekey: rid, id: fmatches[i].data.data.metadata.matchid, start: fmatches[i].data.data.metadata.game_start * 1000, agent: player.character, mode: fmatches[i].data.data.metadata.mode, map: fmatches[i].data.data.metadata.map, teamblue_won: team.has_won, teamblue_rounds: team.rounds_won, teamred_won: team.has_won == true ? false : true, teamred_rounds: team.rounds_lost, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                                        available = true
                                    } else {
                                        rid = randomize("Aa0", 8)
                                    }
                                }
                            }
                        }
                    } else {
                        if(fmatches[i].data.data.metadata.mode != "Custom Game") {
                            const player = fmatches[i].data.data.players.all_players.find(item => item.puuid == dbstats.ingamepuuid)
                            const team = fmatches[i].data.data.players.all_players.sort((item2, item1) => item2.score - item1.score)[0]

                            const dbcheck = await this.getDB("games").findOne({matchid: fmatches[i].data.data.metadata.matchid})
                            if(dbcheck) dbstats.matches.push({won: team.puuid == dbstats.ingamepuuid ? true : false, gamekey: dbcheck.gamekey, id: fmatches[i].data.data.metadata.matchid, start: fmatches[i].data.data.metadata.game_start * 1000, agent: player.character, mode: fmatches[i].data.data.metadata.mode, map: fmatches[i].data.data.metadata.map, teamblue_won: team.puuid == dbstats.ingamepuuid ? true : false, teamblue_rounds: team.puuid == dbstats.ingamepuuid ? 1 : 0, teamred_won: team.puuid != dbstats.ingamepuuid ? true : false, teamred_rounds: team.puuid != dbstats.ingamepuuid ? 1 : 0, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                            if(!dbcheck) {
                                let rid = randomize("Aa0", 8)
                                let available = false

                                while(!available) {
                                    const ridcheck = await this.getDB("games").findOne({gamekey: rid})
                                    if(!ridcheck) {
                                        this.getDB("games").insertOne({gamekey: rid, matchid: fmatches[i].data.data.metadata.matchid})
                                        dbstats.matches.push({won: team.puuid == dbstats.ingamepuuid ? true : false, gamekey: rid, id: fmatches[i].data.data.metadata.matchid, start: fmatches[i].data.data.metadata.game_start * 1000, agent: player.character, mode: fmatches[i].data.data.metadata.mode, map: fmatches[i].data.data.metadata.map, teamblue_won: team.puuid == dbstats.ingamepuuid ? true : false, teamblue_rounds: team.puuid == dbstats.ingamepuuid ? 1 : 0, teamred_won: team.puuid != dbstats.ingamepuuid ? true : false, teamred_rounds: team.puuid != dbstats.ingamepuuid ? 1 : 0, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                                        available = true
                                    } else {
                                        rid = randomize("Aa0", 8)
                                    }
                                }
                            }
                        }
                    }
                }
                if(!dbstats.ingamepuuid) {
                    if(fmatches[i].data.matchInfo.queueId != "deathmatch") {
                        if(fmatches[i].data.matchInfo.queueId != "") {
                            const player = fmatches[i].data.players.find(item => item.puuid == puuid)
                            const team = fmatches[i].data.teams.find(item => item.teamId == player.teamId)
                            dbstats.stats.matches += 1
                            dbstats.stats.kills = !isNaN(player.stats.kills) ? Number(player.stats.kills) + Number(dbstats.stats.kills) : 0
                            dbstats.stats.deaths = !isNaN(player.stats.deaths) ? Number(player.stats.deaths) + Number(dbstats.stats.deaths) : 0
                            dbstats.stats.assists = !isNaN(player.stats.assists) ? Number(player.stats.assists) + Number(dbstats.stats.assists) : 0
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
                            dbstats.stats.headshots = !isNaN(player.stats.headshots) ? Number(headshots) + Number(stats.headshots) : 0
                            dbstats.stats.aces = !isNaN(dbstats.stats.aces) ? Number(aces) + Number(dbstats.stats.aces) : 0
                            dbstats.stats.triples = !isNaN(dbstats.stats.triples) ? Number(triples) + Number(dbstats.stats.triples) : 0
                            dbstats.stats.quadras = !isNaN(dbstats.stats.quadras) ? Number(quadras) + Number(dbstats.stats.quadras) : 0
                            if(team.won) stats.wins += 1

                            //TODO
                            const agentid = this.agents.find(item => item.id == player.characterId)
                            console.log(player.character, puuid, dbstats.stats)
                            const dbagent = dbstats.agents.find(item => item.agent == agentid.name)
                            const dbindex = dbstats.agents.findIndex(item => item.agent == agentid.name)
                            if(dbindex != -1) dbstats.agents.splice(dbindex, 1)
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
                            dbstats.agents.push(agent)

                            const dbcheck = await this.getDB("games").findOne({matchid: fmatches[i].data.matchInfo.matchId})
                            if(dbcheck) dbstats.matches.push({won: team.won, gamekey: dbcheck.gamekey, id: fmatches[i].data.matchInfo.matchId, start: fmatches[i].data.matchInfo.gameStartMillis, agent: agentid.name, mode: this.gamemodes[fmatches[i].data.data.metadata.mode].name, map: this.maps[fmatches[i].data.data.metadata.map], teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: !team.won, teamred_rounds: team.roundsPlayed - team.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                            if(!dbcheck) {
                                let rid = randomize("Aa0", 8)
                                let available = false

                                while(!available) {
                                    const ridcheck = await this.getDB("games").findOne({gamekey: rid})
                                    if(!ridcheck) {
                                        this.getDB("games").insertOne({gamekey: rid, matchid: fmatches[i].data.matchInfo.matchId})
                                        dbstats.matches.push({won: team.won, gamekey: rid, id: fmatches[i].data.matchInfo.matchId, start: fmatches[i].data.matchInfo.gameStartMillis, agent: agentid.name, mode: this.gamemodes[fmatches[i].data.data.metadata.mode].name, map: this.maps[fmatches[i].data.data.metadata.map], teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: !team.won, teamred_rounds: team.roundsPlayed - team.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
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

                            const dbcheck = await this.getDB("games").findOne({matchid: fmatches[i].data.matchInfo.matchId})
                            if(dbcheck) dbstats.matches.push({won: team.won, gamekey: dbcheck.gamekey, id: fmatches[i].data.matchInfo.matchId, start: fmatches[i].data.matchInfo.gameStartMillis, agent: agentid.name, mode: this.gamemodes[fmatches[i].data.data.metadata.mode].name, map: this.maps[fmatches[i].data.data.metadata.map], teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: !team.won, teamred_rounds: team.roundsPlayed - team.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
                            if(!dbcheck) {
                                let rid = randomize("Aa0", 8)
                                let available = false

                                while(!available) {
                                    const ridcheck = await this.getDB("games").findOne({gamekey: rid})
                                    if(!ridcheck) {
                                        this.getDB("games").insertOne({gamekey: rid, matchid: fmatches[i].data.matchInfo.matchId})
                                        dbstats.matches.push({won: team.won, gamekey: rid, id: fmatches[i].data.matchInfo.matchId, start: fmatches[i].data.matchInfo.gameStartMillis, agent: agentid.name, mode: this.gamemodes[fmatches[i].data.data.metadata.mode].name, map: this.maps[fmatches[i].data.data.metadata.map], teamblue_won: team.won, teamblue_rounds: team.roundsWon, teamred_won: !team.won, teamred_rounds: team.roundsPlayed - team.roundsWon, kills: player.stats.kills, deaths: player.stats.deaths, assists: player.stats.assists})
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
        if(!dbstats.region) dbstats.region = dbstats.region
        dbstats.last_update = Date.now()
        const patchedmatches = dbstats.matches.filter(item => item != null).sort((match1, match2) => match2.start - match1.start)
        if(patchedmatches.length > 10) patchedmatches.length = 10
        dbstats.matches = patchedmatches
        //await this.getDB("userstats").updateOne({puuid: stats.puuid}, {$set: stats})
        const attachment = await this.buildStatsImage({dbstats, agent, modes, bgcanvas})
        const components = []
        for(let i = 0; dbstats.matches.length > i; i++) {
            components.push({
                label: dbstats.matches[i].gamekey,
                value: dbstats.matches[i].gamekey,
                description: `${dbstats.matches[i].map} | ${dbstats.matches[i].mode} | ${dbstats.matches[i].agent} | ${moment(dbstats.matches[i].start).format("lll")}`,
                emoji: Object.values(this.gamemodes).find(item => item.name == dbstats.matches[i].mode).emoji
            })
        }
        message.edit({embeds: [], files: [attachment], components: [{type: this.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: this.EnumResolvers.resolveComponentType("SELECT_MENU"), customId: `game`, maxValues: 1, minValues: 0, options: [...new Set(components)], placeholder: this.translations[lang].stats.game_select}]}]})
    },
    buildGameImage: async function ({id, guilddata, matchid, bgcanvas} = {}) {
        const gamekey = matchid ? true : await this.getGameKey(id)
        if(!gamekey) return {error: null, unknown: true, embed: null, image: null}
        const match = await this.axios.get(`https://api.henrikdev.xyz/valorant/v2/match/${matchid ? matchid : gamekey.matchid}`).catch(error => {return error})
        if(match.response) return {error: match.response, unknown: null, embed: null, image: null}
        switch(match.data.data.metadata.mode) {
            case "Deathmatch":
                const fields = []
                const sorted_array = match.data.data.players.all_players.sort((player2, player1) => player2.stats.score - player1.stats.score)
                for(let i = 0; sorted_array.length > i; i++) {
                    const rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/eu/${sorted_array[i].puuid}`).catch(error => {return error})
                    fields.push({name: `${sorted_array[i].name}#${sorted_array[i].tag}`, value: `${(rank.response != null || rank.data.data.currenttier == null) ? this.ranks[0].discordid : this.ranks[rank.data.data.currenttier].discordid} | Score: ${sorted_array[i].stats.score} | KDA: ${sorted_array[i].stats.kills}/${sorted_array[i].stats.deaths}/${sorted_array[i].stats.assists}`})
                }
                return {
                    error: null,
                    unknown: null,
                    embed: [this.embedBuilder({
                        title: `Game ${id} | ID: ${match.data.data.metadata.matchid}`,
                        desc: `Mode: Deathmatch | Map: ${match.data.data.metadata.map} | Length: ${moment.duration(match.data.data.metadata.game_length).minutes()}m ${moment.duration(match.data.data.metadata.game_length).seconds()}s | Started at: ${moment(match.data.data.metadata.game_start * 1000).format("LLLL")}`,
                        thumbnail: "https://media.valorant-api.com/gamemodes/a8790ec5-4237-f2f0-e93b-08a8e89865b2/displayicon.png",
                        additionalFields: fields.reverse(),
                        footer: 'VALORANT LABS [GAME]'
                    })],
                    image: null
                }
            default:
                const canvas = this.canvas.createCanvas(3840, 2160)
                const ctx = canvas.getContext("2d")
                const background = bgcanvas ? bgcanvas : await this.canvas.loadImage("assets/backgrounds/VALORANT_game.png")
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
                moment.locale(this.translations[guilddata.lang].moment)
                const mode_image = await this.canvas.loadImage(`./assets/modes/${Object.values(this.gamemodes).find(item => item.name == match.data.data.metadata.mode).path}`)
                ctx.drawImage(mode_image, 550, 975, 250, 250)
                this.buildText({ctx: ctx, text: `${match.data.data.metadata.mode} | ${match.data.data.metadata.map} | ${match.data.data.metadata.cluster} | ${match.data.data.metadata.game_version.split("-")[0]} -${match.data.data.metadata.game_version.split("-")[1]}`, size: 100, x: 950, y: 1075})
                this.buildText({ctx: ctx, text: `${moment.duration(match.data.data.metadata.game_length).minutes()}m ${moment.duration(match.data.data.metadata.game_length).seconds()}s | ${moment(match.data.data.metadata.game_start * 1000).format("LLLL")}`, size: 100, x: 950, y: 1200, color: "#ffffff"})
                const red_players = match.data.data.players.red.sort((player2, player1) => player1.stats.score - player2.stats.score)
                const blue_players = match.data.data.players.blue.sort((player2, player1) => player1.stats.score - player2.stats.score)
                this.buildText({ctx: ctx, text: match.data.data.teams.blue.rounds_won, size: 90, x: 3450, y: 1050, color: '#00ffff', align: 'right'})
                this.buildText({ctx: ctx, text: match.data.data.teams.red.rounds_won, size: 90, x: 3450, y: 1200, color: "#ff4654", align: 'right'})
                let x_blue_name = 390
                let x_blue_level = 382
                let x_blue_score = 370
                let x_blue_kills = 590
                let x_blue_kd = 110
                let x_blue_rank = 600
                let x_blue_agent = 185
                let x_red_name = 390
                let x_red_level = 382
                let x_red_score = 370
                let x_red_kills = 590
                let x_red_kd = 110
                let x_red_rank = 600
                let x_red_agent = 185
                for(let i = 0; red_players.length > i; i++) {
                    const player = await Canvas.loadImage(`https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/${red_players[i].currenttier}/largeicon.png`)
                    ctx.drawImage(player, x_red_rank, 1320, 75, 75)
                    const agent = await Canvas.loadImage(this.getAgents().find(item => item.displayName.toLowerCase() == red_players[i].character.toLowerCase()).fullPortraitV2)
                    ctx.drawImage(agent, x_red_agent, 1480, 405, 405)
                    this.buildText({ctx: ctx, text: `${red_players[i].name} #${red_players[i].tag}`, size: 40, x: x_red_name, y: 1450, color: "#fff", align: "center"})
                    this.buildText({ctx: ctx, text: red_players[i].stats.score, size: 60, x: x_red_score, y: 2025, color: "#fff", align: "center"})
                    this.buildText({ctx: ctx, text: red_players[i].stats.kills, size: 60, x: x_red_kills, y: 2025, color: "#fff", align: "center"})
                    this.buildText({ctx: ctx, text: (red_players[i].stats.kills / red_players[i].stats.deaths).toFixed(2), size: 60, x: x_red_kd, y: 2025, color: "#fff", align: "left"})
                    this.buildText({ctx: ctx, text: red_players[i].level, size: 30, x: x_red_level, y: 1385, color: "#fff", align: "center"})
                    x_red_rank += 768
                    x_red_name += 768
                    x_red_score += 768
                    x_red_kills += 768
                    x_red_kd += 768
                    x_red_level += 768
                    x_red_agent += 768
                }
                for(let i = 0; blue_players.length > i; i++) {
                    const player = await Canvas.loadImage(`https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/${blue_players[i].currenttier}/largeicon.png`)
                    ctx.drawImage(player, x_blue_rank, 110, 75, 75)
                    const agent = await Canvas.loadImage(this.getAgents().find(item => item.displayName.toLowerCase() == blue_players[i].character.toLowerCase()).fullPortraitV2)
                    ctx.drawImage(agent, x_blue_agent, 270, 405, 405)
                    this.buildText({ctx: ctx, text: `${blue_players[i].name} #${blue_players[i].tag}`, size: 40, x: x_blue_name, y: 240, color: "#fff", align: "center"})
                    this.buildText({ctx: ctx, text: blue_players[i].stats.score, size: 60, x: x_blue_score, y: 815, color: "#fff", align: "center"})
                    this.buildText({ctx: ctx, text: blue_players[i].stats.kills, size: 60, x: x_blue_kills, y: 815, color: "#fff", align: "center"})
                    this.buildText({ctx: ctx, text: (blue_players[i].stats.kills / blue_players[i].stats.deaths).toFixed(2), size: 60, x: x_blue_kd, y: 815, color: "#fff", align: "left"})
                    this.buildText({ctx: ctx, text: blue_players[i].level, size: 30, x: x_blue_level, y: 170, color: "#fff", align: "center"})
                    x_blue_rank += 768
                    x_blue_name += 768
                    x_blue_score += 768
                    x_blue_kills += 768
                    x_blue_kd += 768
                    x_blue_level += 768
                    x_blue_agent += 768
                }
                const attachment = new this.attachment(canvas.toBuffer(), `valorant-game.png`, {description: "VALORANT LABS Game"})
                return {error: null, unknown: null, embed: null, image: attachment}
        }
    },
    buildBackground: async function (data, type) {
        const canvas = this.canvas.createCanvas(3840, 2160)
        const ctx = canvas.getContext("2d")
        console.log(data)
        const background = await this.canvas.loadImage(data)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        const stats = await this.canvas.loadImage(`assets/backgrounds/VALORANT_${type}_template.png`)
        ctx.drawImage(stats, 0, 0, canvas.width, canvas.height)
        return canvas
    },
    getCustomBackground: function (uuid) {
        return brotliDecompressSync(readFileSync(`./settings/backgrounds/${uuid}.png`))
    },
    buildMMRImage: async function ({mmrdata, bgcanvas} = {}) {
        const canvas = this.canvas.createCanvas(3840, 2160)
        const ctx = canvas.getContext("2d")
        const background = bgcanvas ? bgcanvas : await this.canvas.loadImage("assets/backgrounds/VALORANT_mmr.png")
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        const season = Object.values(mmrdata.by_season).find(item => !item.error).act_rank_wins
        const squareroot = Math.ceil(Math.sqrt(season.length))
        const rowcount = squareroot >= 8 ? 7 : squareroot
        for(let i = 0; rowcount > i; i++) {
            const tierCount = i * 2 + 1
            let tiers = season.slice(tierCount)
            tiers = tiers.splice(0, tierCount)
            for(let k = 0; tiers.length > k; k++) {
                const triangle = k % 2 == 0 ? tiers.upwards : tiers.downwards
                /*
                let triangle = shouldPointUpwards ? tier.upwards : tier.downwards
                guard let triangle = triangle else {continue }
                
                var context = context
                context.translateBy(x: CGFloat(index - rowNumber - 1) * 0.5, y: 0)
                
                context.draw(triangle, in: CGRect(origin: .zero, size: .one))*/
            }
        }
    },
    getBlacklist: async function (guildId) {
        const request = await this.getDB("blacklist").findOne({gid: guildId})
        return request ? request.entrys : null
    },
    addBlacklist: async function (data) {
        const res = await this.getDB("blacklist").findOne({gid: data.guild})
        const newarray = res ? res.entrys : []
        if(newarray.includes(data.channel)) return null
        newarray.push(data.channel)
        await this.getDB("blacklist").updateOne({gid: data.guild}, {$set: {entrys: newarray}}, {upsert: true})
        return newarray
    },
    removeBlacklist: async function (data) {
        const res = await this.getDB("blacklist").findOne({gid: data.guild})
        if(!res) return undefined
        if(!res.entrys.includes(data.channel)) return null
        const indexnum = res.entrys.findIndex(item => item == data.channel)
        res.entrys.splice(indexnum, 1)
        await this.getDB("blacklist").updateOne({gid: data.guild}, {$set: {entrys: res.entrys}}, {upsert: false})
        return res.entrys.length == 0 ? undefined : res.entrys
    },
    errorhandler: async function (error) {
        console.log(error)
        if(error.status == 451) return error.message.reply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[451].title, desc: this.translations[error.lang].response[451][error.type].description, footer: "VALORANT LABS [ERROR 451]"})], components: [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].response[451].component_login, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: `https://valorantlabs.xyz/v1/login?puuid=${error.puuid}`}, {type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].response[451].component_update, style: Utils.EnumResolvers.resolveButtonStyle("DANGER"), customId: `update;${error.puuid}`}, {type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].response[451].component_rank, style: Utils.EnumResolvers.resolveButtonStyle("DANGER"), customId: `rank;${error.name};${error.tag}`}]}]})
        if(!this.translations[error.lang].response[error.status]) return error.message.reply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[500].title, desc: this.translations[error.lang].response[500][error.type].description, footer: "VALORANT LABS [ERROR 500]"})], components: [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].support, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: "https://discord.gg/Zr5eF5D"}]}]})
        if(!this.translations[error.lang].response[error.status][error.type]) return error.message.reply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[error.status].title, desc: this.translations[error.lang].response[error.status]["account"].description, footer: `VALORANT LABS [ERROR ${error.status}]`})], components: [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].support, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: "https://discord.gg/Zr5eF5D"}]}]})
        return error.message.reply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[error.status].title, desc: this.translations[error.lang].response[error.status][error.type].description, footer: `VALORANT LABS [ERROR ${error.status}]`})], components: [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].support, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: "https://discord.gg/Zr5eF5D"}]}]})
    },
    errorhandlerinteraction: async function (error) {
        if(error.status == 451) return error.interaction.editReply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[451].title, desc: this.translations[error.lang].response[451][error.type].description, footer: "VALORANT LABS [ERROR 451]"})], components: [{type: EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].response[451].component_login, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: `https://valorantlabs.xyz/v1/login?puuid=${error.puuid}`}, {type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].response[451].component_update, style: Utils.EnumResolvers.resolveButtonStyle("DANGER"), customId: `update;${error.puuid}`}, {type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].response[451].component_rank, style: Utils.EnumResolvers.resolveButtonStyle("DANGER"), customId: `rank;${error.name};${error.tag}`}]}]})
        if(!this.translations[error.lang].response[error.status]) return error.interaction.editReply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[500].title, desc: this.translations[error.lang].response[500][error.type].description, footer: "VALORANT LABS [ERROR 500]"})], components: [{type: EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].support, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: "https://discord.gg/Zr5eF5D"}]}]})
        if(!this.translations[error.lang].response[error.status][error.type]) return error.interaction.editReply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[error.status].title, desc: this.translations[error.lang].response[error.status]["account"].description, footer: `VALORANT LABS [ERROR ${error.status}]`})], components: [{type: EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].support, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: "https://discord.gg/Zr5eF5D"}]}]})
        return error.interaction.editReply({embeds: [this.embedBuilder({title: this.translations[error.lang].response[error.status].title, desc: this.translations[error.lang].response[error.status][error.type].description, footer: `VALORANT LABS [ERROR ${error.status}]`})], components: [{type: EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: EnumResolvers.resolveComponentType("BUTTON"), label: this.translations[error.lang].support, style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: "https://discord.gg/Zr5eF5D"}]}]})
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
    patchGuild: async function ({interaction, key, value} = {}) {
        let doc
        let command = true
        switch(key) {
            case "prefix": {
                doc = (await this.getDB("settings").findOneAndUpdate({gid: interaction.guild.id}, {$set: {prefix: value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "language": {
                doc = (await this.getDB("settings").findOneAndUpdate({gid: interaction.guild.id}, {$set: {lang: value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "patchnotes": {
                doc = (await this.getDB("settings").findOneAndUpdate({gid: interaction.guild.id}, {$set: {news: value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "othernews": {
                doc = (await this.getDB("settings").findOneAndUpdate({gid: interaction.guild.id}, {$set: {onews: value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "serverstatus": {
                doc = (await this.getDB("settings").findOneAndUpdate({gid: interaction.guild.id}, {$set: {serverstatus: value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "blacklist": {
                doc = (await this.getDB("settings").findOneAndUpdate({gid: interaction.guild.id}, {$set: {blacklist: Boolean(value)}}, {upsert: false, returnDocument: "after"})).value
                break
            }
            case "background": {
                if(value == false) {
                    doc = (await this.getDB("settings").findOneAndUpdate({gid: interaction.guild.id}, {$set: {background: value}}, {upsert: false, returnDocument: "before"})).value
                    unlinkSync(`./settings/backgrounds/${doc.background}.png`)
                    doc.background = "false"
                } else {
                    command = false
                    doc = await this.getDB("settings").findOne({gid: interaction.guild.id})
                    await interaction.editReply({
                        embeds: [
                            this.embedBuilder({
                                title: translations[doc.lang].settings.imggeneration_title,
                                desc: translations[doc.lang].settings.imggeneration_desc
                            })
                        ]
                    })
                    const dbstats = await this.getDB("userstats").findOne({ingamepuuid: "54942ced-1967-5f66-8a16-1e0dae875641"})
                    dbstats.name = "Henrik3"
                    dbstats.tag = "VALO"
                    const bgcanvas = await Promise.allSettled([this.buildBackground(interaction.options.getAttachment("image").url, "stats"), this.buildBackground(interaction.options.getAttachment("image").url, "game")])
                    const images = await Promise.allSettled([this.buildStatsImage({dbstats, agent: this.getAgents(), modes: this.getGamemodes(), bgcanvas: bgcanvas[0].value}), this.buildGameImage({matchid: "d6007c31-b293-41c3-b1f6-0e797978447b", guilddata: doc, bgcanvas: bgcanvas[1].value})])
                    console.log(images[0])
                    return interaction.editReply({
                        files: [images[0].value, images[1].value.image],
                        embeds: [this.embedBuilder({title: translations[doc.lang].settings.imggenerated_title, desc: translations[doc.lang].settings.imggenerated_desc, footer: interaction.options.getAttachment("image").url})],
                        components: [{
                            type: EnumResolvers.resolveComponentType("ACTION_ROW"),
                            components: [
                                {type: EnumResolvers.resolveComponentType("BUTTON"), style: EnumResolvers.resolveButtonStyle("SUCCESS"), label: translations[doc.lang].settings.imggenerated_label_accept, customId: `settings;background;accept`},
                                {type: EnumResolvers.resolveComponentType("BUTTON"), style: EnumResolvers.resolveButtonStyle("DANGER"), label: translations[doc.lang].settings.imggenerated_label_deny, customId: `settings;background;deny`}
                            ]
                        }]
                    })
                }
                break
            }
            case "_background": {
                const background = await this.axios.get(interaction.message.embeds[0].footer.text, {responseType: "arraybuffer"}).catch(error => {return error})
                if(background.response) {
                    command = false
                    doc = await this.getDB("settings").findOne({gid: interaction.guild.id})
                    return interaction.editReply({
                        embeds: [
                            this.embedBuilder({
                                title: translations[doc.lang].settings.imgsaveerror_title,
                                desc: translations[doc.lang].settings.imgsaveerror_desc + `\n\n\`\`\`${background.response.data}\`\`\``,
                            })
                        ]
                    })
                }
                const compressed = brotliCompressSync(background.data, {params: {[constants.BROTLI_PARAM_QUALITY]: 6}})
                writeFileSync(`./settings/backgrounds/${value}.png`, compressed)
                doc = (await this.getDB("settings").findOneAndUpdate({gid: interaction.guild.id}, {$set: {background: value}}, {upsert: false, returnDocument: "after"})).value
                break
            }
        }
        if(command) return interaction.editReply({
            embeds: [this.embedBuilder({
                title: "VALORANT LABS Settings",
                desc: `Settings for ${interaction.guild.name}`,
                additionalFields: [{name: "Prefix", value: String(doc.prefix)}, {name: "Patchnotes", value: String(doc.news)}, {name: "Othernews", value: String(doc.onews)}, {name: "Serverstatus", value: String(doc.serverstatus)}, {name: "Language", value: String(doc.lang)}, {name: "Blacklist", value: String(doc.blacklist)}, {name: "Background", value: String(doc.background)}],
                footer: 'VALORANT LABS [SETTINGS]'
            })],
            components: [],
            attachments: []
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