import {MongoClient} from 'mongodb';
import {readFileSync, writeFileSync, unlinkSync} from 'fs';
import {brotliDecompressSync, brotliCompressSync, constants} from 'zlib';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import system from 'systeminformation';
import pretty from 'pretty-bytes';
import {PermissionFlagsBits, Attachment, ComponentType, ButtonStyle, TextInputStyle, ActivityType} from 'discord.js.dev';
import moment from 'moment';
import Canvas from 'canvas';
import randomize from 'randomatic';

Canvas.registerFont('assets/fonts/product_sans.ttf', {family: 'product_sans'});
Canvas.registerFont('assets/fonts/valorant_font.ttf', {family: 'valorant_font'});
Canvas.registerFont('assets/fonts/umeboshi_.ttf', {family: 'japan2'});
Canvas.registerFont('assets/fonts/anton.ttf', {family: 'anton'});
Canvas.registerFont('assets/fonts/DINNextLTPro-Bold.ttf', {family: 'DinNext'});

const basedata = JSON.parse(readFileSync('./basedata.json'));
const mongoclient = new MongoClient(basedata.mongoaccess);
mongoclient.connect();
const translations = JSON.parse(readFileSync('./translations.json'));
let valpapiagents = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true').catch(error => {
    return error;
});
let valpapigamemodes = await axios.get('https://valorant-api.com/v1/gamemodes').catch(error => {
    return error;
});

setInterval(async () => {
    valpapiagents = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true').catch(error => {
        return error;
    });
    valpapigamemodes = await axios.get('https://valorant-api.com/v1/gamemodes').catch(error => {
        return error;
    });
}, 60000 * 5);

axiosRetry(axios, {
    retries: 2,
    shouldResetTimeout: true,
    retryCondition: error => {
        return error.code === 'ECONNABORTED' || error.code === 'ECONNRESET' || error.code === 'ERR_REQUEST_ABORTED';
    },
});

export {pretty, axios, translations, moment, ComponentType, ButtonStyle, TextInputStyle, ActivityType};
export const perms = PermissionFlagsBits;
export const sysinfo = system;
export const topgg = basedata.dbltoken;
export const roles = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'immortal', 'radiant'];
export const riottoken = basedata.riottoken;
export const clusters = {
    na: {
        status: 'https://api.henrikdev.xyz/valorant/v1/status/na',
        page: 'https://status.riotgames.com/valorant?region=na',
    },
    latam: {
        status: 'https://api.henrikdev.xyz/valorant/v1/status/latam',
        page: 'https://status.riotgames.com/valorant?region=latam',
    },
    br: {
        status: 'https://api.henrikdev.xyz/valorant/v1/status/br',
        page: 'https://status.riotgames.com/valorant?region=br',
    },
    eu: {
        status: 'https://api.henrikdev.xyz/valorant/v1/status/eu',
        page: 'https://status.riotgames.com/valorant?region=eu',
    },
    kr: {
        status: 'https://api.henrikdev.xyz/valorant/v1/status/kr',
        page: 'https://status.riotgames.com/valorant?region=kr',
    },
    ap: {
        status: 'https://api.henrikdev.xyz/valorant/v1/status/ap',
        page: 'https://status.riotgames.com/valorant?region=ap',
    },
    oce: {
        status: 'https://api.henrikdev.xyz/valorant/v1/status/ap',
        page: 'https://status.riotgames.com/valorant?region=ap',
    },
};
export const locales = {
    de: 'de',
    fr: 'fr',
    'en-GB': 'en-gb',
    'en-US': 'en-us',
    ja: 'jp',
    'pt-BR': 'pt-br',
    'es-ES': 'es',
    vi: 'vi',
};
export const agents = [
    {
        name: 'Astra',
        id: '41fb69c1-4189-7b37-f117-bcaf1e96f1bf',
        discord_id: '<:controller:868803058711277598>',
    },
    {
        name: 'Breach',
        id: '5f8d3a7f-467b-97f3-062c-13acf203c006',
        discord_id: '<:initiator:868802616732303362>',
    },
    {
        name: 'Brimstone',
        id: '9f0d8ba9-4140-b941-57d3-a7ad57c6b417',
        discord_id: '<:controller:868803058711277598>',
    },
    {
        name: 'Cypher',
        id: '117ed9e3-49f3-6512-3ccf-0cada7e3823b',
        discord_id: '<:sentinel:868802869967597568>',
    },
    {
        name: 'Fade',
        id: 'dade69b4-4f5a-8528-247b-219e5a1facd6',
        discord_id: '<:initiator:868802616732303362>',
    },
    {
        name: 'Jett',
        id: 'add6443a-41bd-e414-f6ad-e58d267f4e95',
        discord_id: '<:duelist:868802702258352178>',
    },
    {
        name: 'Omen',
        id: '8e253930-4c05-31dd-1b6c-968525494517',
        discord_id: '<:controller:868803058711277598>',
    },
    {
        name: 'Phoenix',
        id: 'eb93336a-449b-9c1b-0a54-a891f7921d69',
        discord_id: '<:duelist:868802702258352178>',
    },
    {
        name: 'Raze',
        id: 'f94c3b30-42be-e959-889c-5aa313dba261',
        discord_id: '<:duelist:868802702258352178>',
    },
    {
        name: 'Sage',
        id: '569fdd95-4d10-43ab-ca70-79becc718b46',
        discord_id: '<:sentinel:868802869967597568>',
    },
    {
        name: 'Sova',
        id: '320b2a48-4d9b-a075-30f1-1f93a9b638fa',
        discord_id: '<:initiator:868802616732303362>',
    },
    {
        name: 'Viper',
        id: '707eab51-4836-f488-046a-cda6bf494859',
        discord_id: '<:controller:868803058711277598>',
    },
    {
        name: 'Reyna',
        id: 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc',
        discord_id: '<:duelist:868802702258352178>',
    },
    {
        name: 'Killjoy',
        id: '1e58de9c-4950-5125-93e9-a0aee9f98746',
        discord_id: '<:sentinel:868802869967597568>',
    },
    {
        name: 'Skye',
        id: '6f2a04ca-43e0-be17-7f36-b3908627744d',
        discord_id: '<:initiator:868802616732303362>',
    },
    {
        name: 'Yoru',
        id: '7f94d92c-4234-0a36-9646-3a87eb8b5c89',
        discord_id: '<:duelist:868802702258352178>',
    },
    {
        name: 'Kay/O',
        id: '601dbbe7-43ce-be57-2a40-4abd24953621',
        discord_id: '<:initiator:868802616732303362>',
    },
    {
        name: 'Chamber',
        id: '22697a3d-45bf-8dd7-4fec-84a9e28c69d7',
        discord_id: '<:initiator:868802616732303362>',
    },
    {
        name: 'Neon',
        id: 'bb2a4828-46eb-8cd1-e765-15848195d751',
        discord_id: '<:duelist:868802702258352178>',
    },
];
export const weapons = {
    'EWallPenetrationDisplayType::High': 'High',
    'EWallPenetrationDisplayType::Medium': 'Medium',
    'EWallPenetrationDisplayType::Low': 'Low',
};
export const gamemodes = {
    ggteam: {
        name: 'Escalation',
        path: 'escalation.png',
        emoji: {
            name: 'escalation',
            id: '958441833627787350',
            animated: false,
        },
    },
    spikerush: {
        name: 'Spike Rush',
        path: 'spikerush.png',
        emoji: {
            name: 'spikerush',
            id: '958441833627779202',
            animated: false,
        },
    },
    deathmatch: {
        name: 'Deathmatch',
        path: 'deathmatch.png',
        emoji: {
            name: 'deathmatch',
            id: '958441493612355704',
            animated: false,
        },
    },
    competitive: {
        name: 'Competitive',
        path: 'competitive.png',
        emoji: {
            name: 'unrated',
            id: '958441359126167613',
            animated: false,
        },
    },
    unrated: {
        name: 'Unrated',
        path: 'unrated.png',
        emoji: {
            name: 'unrated',
            id: '958441359126167613',
            animated: false,
        },
    },
    onefa: {
        name: 'Replication',
        path: 'replication.png',
        emoji: {
            name: 'replication',
            id: '958441833636192386',
            animated: false,
        },
    },
    '': {
        name: 'Custom Game',
        path: 'unrated.png',
        emoji: {
            name: 'unrated',
            id: '958441359126167613',
            animated: false,
        },
    },
    newmap: {
        name: 'New Map',
        path: 'unrated.png',
        emoji: {
            name: 'unrated',
            id: '958441359126167613',
            animated: false,
        },
    },
    snowball: {
        name: 'Snowball Fight',
        path: 'snowball.png',
        emoji: {
            name: 'snowball',
            id: '958441833661358131',
            animated: false,
        },
    },
};
export const maps = {
    '/Game/Maps/Triad/Triad': 'Haven',
    '/Game/Maps/Port/Port': 'Icebox',
    '/Game/Maps/Duality/Duality': 'Bind',
    '/Game/Maps/Bonsai/Bonsai': 'Split',
    '/Game/Maps/Ascent/Ascent': 'Ascent',
    '/Game/Maps/Foxtrot/Foxtrot': 'Breeze',
    '/Game/Maps/Canyon/Canyon': 'Fracture',
};
export const ranks = {
    0: {
        mmr: 'assets/background/VALORANT_mmr.png',
        color: '#c5c5c5',
        discordid: '<:unrated:862004031248924693>',
    },
    1: {
        mmr: 'assets/background/VALORANT_mmr.png',
        color: '#c5c5c5',
        discordid: '<:unrated:862004031248924693>',
    },
    2: {
        mmr: 'assets/background/VALORANT_mmr.png',
        color: '#c5c5c5',
        discordid: '<:unrated:862004031248924693>',
    },
    3: {
        mmr: 'assets/background/VALORANT_mmr_iron.png',
        color: '#5a5959',
        discordid: '<:iron1:862004162098102272>',
    },
    4: {
        mmr: 'assets/background/VALORANT_mmr_iron.png',
        color: '#5a5959',
        discordid: '<:iron2:862004185036488715>',
    },
    5: {
        mmr: 'assets/background/VALORANT_mmr_iron.png',
        color: '#5a5959',
        discordid: '<:iron3:862004206718025738>',
    },
    6: {
        mmr: 'assets/background/VALORANT_mmr_bronze.png',
        color: '#924e30',
        discordid: '<:bronze1:862004343054008331>',
    },
    7: {
        mmr: 'assets/background/VALORANT_mmr_bronze.png',
        color: '#924e30',
        discordid: '<:bronze2:862004376272109608>',
    },
    8: {
        mmr: 'assets/background/VALORANT_mmr_bronze.png',
        color: '#924e30',
        discordid: '<:bronze3:862004410775371777>',
    },
    9: {
        mmr: 'assets/background/VALORANT_mmr_silver.png',
        color: '#c5c4c4',
        discordid: '<:silver1:862004807896268832>',
    },
    10: {
        mmr: 'assets/background/VALORANT_mmr_silver.png',
        color: '#c5c4c4',
        discordid: '<:silver2:862004860655501342>',
    },
    11: {
        mmr: 'assets/background/VALORANT_mmr_silver.png',
        color: '#c5c4c4',
        discordid: '<:silver3:862004895708086302>',
    },
    12: {
        mmr: 'assets/background/VALORANT_mmr_gold.png',
        color: '#dbb815',
        discordid: '<:gold1:862004921763364874>',
    },
    13: {
        mmr: 'assets/background/VALORANT_mmr_gold.png',
        color: '#dbb815',
        discordid: '<:gold2:862004943708094525>',
    },
    14: {
        mmr: 'assets/background/VALORANT_mmr_gold.png',
        color: '#dbb815',
        discordid: '<:gold3:862004966636781608>',
    },
    15: {
        mmr: 'assets/background/VALORANT_mmr_platinum.png',
        color: '#38abc2',
        discordid: '<:plat1:862005172687470622>',
    },
    16: {
        mmr: 'assets/background/VALORANT_mmr_platinum.png',
        color: '#38abc2',
        discordid: '<:plat2:862005201301143573>',
    },
    17: {
        mmr: 'assets/background/VALORANT_mmr_platinum.png',
        color: '#38abc2',
        discordid: '<:plat3:862005224645853185>',
    },
    18: {
        mmr: 'assets/background/VALORANT_mmr_diamond.png',
        color: '#bb77f0',
        discordid: '<:dia1:862005255628652554>',
    },
    19: {
        mmr: 'assets/background/VALORANT_mmr_diamond.png',
        color: '#bb77f0',
        discordid: '<:dia2:862005278207508551>',
    },
    20: {
        mmr: 'assets/background/VALORANT_mmr_diamond.png',
        color: '#bb77f0',
        discordid: '<:dia3:862005298193891378>',
    },
    21: {
        mmr: 'assets/background/VALORANT_mmr_immortal.png',
        color: '#da3f76',
        discordid: '<:immortal1:862005437264429056>',
    },
    22: {
        mmr: 'assets/background/VALORANT_mmr_immortal.png',
        color: '#da3f76',
        discordid: '<:immortal2:862005462580985856>',
    },
    23: {
        mmr: 'assets/background/VALORANT_mmr_immortal.png',
        color: '#da3f76',
        discordid: '<:immortal3:862005493840478208>',
    },
    24: {
        mmr: 'assets/background/VALORANT_mmr_radiant.png',
        color: '#d3d058',
        discordid: '<:radiant:862005538392506408>',
    },
};
export const shard_status_codes = {
    0: 'ONLINE',
    1: 'CONNECTING',
    2: 'RECONNECTING',
    3: 'IDLE',
    4: 'NEARLY',
    5: 'DISCONNECTED',
    6: 'WAITING_FOR_GUILDS',
    7: 'IDENTIFYING',
    8: 'RESUMING',
};
export const fetchWebsite = async function (manager) {
    const types = ['patchnotes', 'othernews', 'maintenance', 'incidents'];
    const ccodes = ['de', 'en-us', 'en-gb', 'jp', 'pt-br', 'fr', 'es', 'vi'];
    const nstatus = ['news', 'onews', 'serverstatus', 'serverstatus'];
    for (let i = 0; types.length > i; i++) {
        if (i == 0 || i == 1) {
            for (let k = 0; ccodes.length > k; k++) {
                const website = await axios.get(i == 0 ? translations[ccodes[k]].patchurl : translations[ccodes[k]].websiteurl).catch(error => {
                    return error;
                });
                if (!website.response) {
                    const db = await getDB('websitecheck').findOne({code: ccodes[k]});
                    const article = website.data.data.filter(item => (i == 0 ? moment(item.date).unix() > db.patchnotes : moment(item.date).unix() > db.datewebsite));
                    if (article.length) {
                        getDB('websitecheck').updateOne(
                            {code: ccodes[k]},
                            {$set: i == 0 ? {patchnotes: moment(article[0].date).unix()} : {datewebsite: moment(article[0].date).unix()}}
                        );
                        let fetch = await getDB('settings')
                            .find({lang: ccodes[k]}, i == 0 ? {gid: 1, lang: 1, news: 1} : {gid: 1, lang: 1, onews: 1})
                            .toArray();
                        //fetch = fetch.filter(item => item[nstatus[i]] !== false && item[nstatus[i]] !== "false")
                        article.forEach(article => {
                            fetch.forEach(guild => {
                                if (guild[nstatus[i]]) {
                                    manager.broadcastEval(
                                        (client, {channelid, title, external_link, url, banner_url}) => {
                                            try {
                                                if (client.channels.cache.has(channelid)) {
                                                    client.channels.cache
                                                        .get(channelid)
                                                        .send({
                                                            embeds: [
                                                                {
                                                                    color: 0xff4654,
                                                                    title: title,
                                                                    url: external_link != null ? external_link : url,
                                                                    image: {
                                                                        url: banner_url,
                                                                    },
                                                                    footer: {
                                                                        text: 'VALORANT LABS [AUTONEWS WEBSITE]',
                                                                        icon_url: 'https://valorantlabs.xyz/css/valorant-logo.png',
                                                                    },
                                                                },
                                                            ],
                                                            components: [
                                                                {
                                                                    type: 1,
                                                                    components: [
                                                                        {
                                                                            type: 2,
                                                                            style: 5,
                                                                            url: external_link != null ? external_link : url,
                                                                            label: title,
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        })
                                                        .catch(error => error);
                                                }
                                            } catch (e) {}
                                        },
                                        {
                                            context: {
                                                channelid: guild[nstatus[i]].replace(/[^0-9]/g, ''),
                                                title: article.title,
                                                external_link: article.external_link,
                                                url: article.url,
                                                banner_url: article.banner_url,
                                            },
                                        }
                                    );
                                }
                            });
                        });
                    }
                }
            }
        }
        if (i == 2 || i == 3) {
            for (let k = 0; ccodes.length > k; k++) {
                const website = await axios.get(translations[ccodes[k]].statusurl).catch(error => {
                    return error;
                });
                if (!website.response) {
                    if (i == 2 ? website.data.data.maintenances.length : website.data.data.incidents.length) {
                        let article = i == 2 ? website.data.data.maintenances[0] : website.data.data.incidents[0];
                        article.updates[0].created_at = Date.parse(article.updates[0].created_at);
                        const db = await getDB('websitecheck').findOne({code: ccodes[k]});
                        if (
                            i == 2
                                ? moment(article.updates[0].created_at).unix() > db.datestatusmaintenance
                                : moment(article.updates[0].created_at).unix() > db.datestatusincidents
                        ) {
                            i == 2
                                ? bot
                                      .db('VALORANT-LABS')
                                      .collection('websitecheck')
                                      .updateOne({code: ccodes[k]}, {$set: {datestatusmaintenance: moment(article.updates[0].created_at).unix()}})
                                : bot
                                      .db('VALORANT-LABS')
                                      .collection('websitecheck')
                                      .updateOne({code: ccodes[k]}, {$set: {datestatusincidents: moment(article.updates[0].created_at).unix()}});
                            const fetch = await getDB('settings').find({lang: ccodes[k]}, {gid: 1, lang: 1, serverstatus: 1}).toArray();
                            fetch.forEach(guild => {
                                if (guild.serverstatus) {
                                    manager.broadcastEval(
                                        (client, {channelid, desc, t, create, platform, postedat, platforms}) => {
                                            try {
                                                if (client.channels.cache.has(channelid)) {
                                                    client.channels.cache
                                                        .get(channelid)
                                                        .send({
                                                            embeds: [
                                                                {
                                                                    title: t,
                                                                    color: 0xff4654,
                                                                    description: desc,
                                                                    fields: [
                                                                        {name: postedat, value: create, inline: true},
                                                                        {name: platforms, value: platform, inline: true},
                                                                    ],
                                                                    timestamp: new Date().toISOString(),
                                                                    footer: {
                                                                        text: 'VALORANT LABS [STATUS UPDATE]',
                                                                        icon_url: 'https://valorantlabs.xyz/css/valorant-logo.png',
                                                                    },
                                                                },
                                                            ],
                                                        })
                                                        .catch(error => error);
                                                }
                                            } catch (e) {}
                                        },
                                        {
                                            context: {
                                                channelid: guild.serverstatus.replace(/[^0-9]/g, ''),
                                                desc:
                                                    article.updates[0].translations.find(c => c.locale == websites[ccodes[k]].locale).content != undefined
                                                        ? article.updates[0].translations.find(c => c.locale == websites[ccodes[k]].locale).content
                                                        : article.updates[0].translations.find(c => c.locale == 'en_US').content,
                                                t:
                                                    article.titles.find(c => c.locale == websites[ccodes[k]].locale).content != undefined
                                                        ? article.titles.find(c => c.locale == websites[ccodes[k]].locale).content
                                                        : article.titles.find(c => c.locale == 'en_US').content,
                                                create: moment(article.created_at).format('LLLL'),
                                                platform: article.platforms[0],
                                                postedat: translations[guild.lang].status.postedat,
                                                platforms: translations[guild.lang].status.platforms,
                                            },
                                        }
                                    );
                                }
                            });
                        }
                    }
                }
            }
        }
    }
};
export const shard_status_update = async function (manager) {
    const sharddata = await manager.broadcastEval(client => {
        return {status: client.ws.status, ping: client.ws.ping, mem: process.memoryUsage().heapUsed};
    });
    const fields = [];
    for (let i = 0; sharddata.length > i; i++) {
        fields.push({
            name: `Shard ${i}`,
            value: `Status: ${shard_status_codes[sharddata[i].status]} | Ping: ${sharddata[i].ping} | Memory: ${pretty(sharddata[i].mem, {locale: 'en'})}`,
        });
    }
    manager.broadcastEval(
        (client, {efields}) => {
            if (client.channels.cache.has('911626508433506344'))
                client.channels.cache.get('911626508433506344').messages.edit('911665315396587550', {
                    content: '',
                    embeds: [
                        {
                            title: 'Bot shard status',
                            fields: efields,
                            color: 0xffffff,
                            timestamp: new Date().toISOString(),
                            footer: {text: 'VALORANT LABS [SHARD STATUS]', icon_url: 'https://valorantlabs.xyz/css/valorant-logo.png'},
                        },
                    ],
                });
        },
        {context: {efields: fields}}
    );
};
export const uuidv4 = function () {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};
export const getDB = function (name) {
    return mongoclient.db('VALORANT-LABS').collection(name);
};
export const guildSettings = async function (guild) {
    return (
        await getDB('settings').findOneAndUpdate(
            {gid: guild.id},
            {
                $setOnInsert: {
                    news: false,
                    onews: false,
                    serverstatus: false,
                    lang: locales[guild.preferredLocale] ? locales[guild.preferredLocale] : 'en-us',
                    blacklist: false,
                    prefix: 'v?',
                    background_stats: false,
                    background_game: false,
                    background_mmr: false,
                    autoroles: [],
                },
            },
            {upsert: true, returnDocument: 'after'}
        )
    ).value;
};
export const guildBlacklist = async function (guild) {
    const request = await getDB('blacklist').findOne({gid: guild.id});
    if (!request) return null;
    return request.entrys.length ? request.entrys : null;
};
export const getLink = async function ({user} = {}) {
    const db = await getDB('linkv2').findOne({userid: user.id});
    if (!db) return null;
    const riot = await axios
        .get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${db.rpuuid}`, {headers: {'X-Riot-Token': riottoken}})
        .catch(error => {
            return error;
        });
    return riot.response ? {error: riot.response.status, data: riot.response.data} : {error: false, name: riot.data.gameName, tag: riot.data.tagLine};
};
export const getGameKey = async function (id) {
    const request = await getDB('games').findOne({gamekey: id});
    return request ? request : null;
};
export const getStatsDB = async function (account) {
    const puuid = await axios
        .get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURI(account.name)}/${encodeURI(account.tag)}`, {
            headers: {'X-Riot-Token': riottoken},
        })
        .catch(error => {
            return error;
        });
    if (puuid.response) return {status: puuid.response.status, data: puuid.response.data};
    const region = await axios
        .get(`https://europe.api.riotgames.com/riot/account/v1/active-shards/by-game/val/by-puuid/${puuid.data.puuid}`, {headers: {'X-Riot-Token': riottoken}})
        .catch(error => {
            return error;
        });
    if (region.response) return {status: region.response.status, data: region.response.data};
    const link = await getDB('rso').findOne({puuid: puuid.data.puuid});
    if (!link) return {status: 451, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine};
    const stats = await getDB('userstats').findOne({puuid: puuid.data.puuid});
    return {status: 200, ...stats, region: region.data.activeShard, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine};
};
export const getGamemodes = function () {
    return valpapigamemodes.data.data;
};
export const getAgents = function () {
    return valpapiagents.data.data;
};
export const embedBuilder = function ({title, desc, user, additionalFields = [], color, thumbnail, image, footer, url} = {}) {
    return {
        title: title,
        description: desc ? desc : null,
        author: user
            ? {
                  name: user.tag,
                  iconURL: user.avatarURL(),
              }
            : null,
        fields: additionalFields,
        thumbnail: {
            url: thumbnail ? thumbnail : null,
        },
        image: {
            url: image ? image : null,
        },
        color: color ? color : 0xff4654,
        timestamp: new Date().toISOString(),
        footer: {
            text: footer ? footer : 'VALORANT LABS',
            icon_url: 'https://valorantlabs.xyz/css/valorant-logo.png',
        },
    };
};
export const buildStatsImage = async function ({dbstats, agent, modes, bgcanvas} = {}) {
    const canvas = Canvas.createCanvas(3840, 2160);
    const ctx = canvas.getContext('2d');
    const background = bgcanvas ? bgcanvas : await Canvas.loadImage('assets/background/VALORANT_stats.png');
    const gradient = ctx.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0, '#D60808');
    gradient.addColorStop(1, '#FF6690');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const rank = dbstats.ingamepuuid
        ? await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${dbstats.region}/${dbstats.ingamepuuid}`).catch(error => {
              return error;
          })
        : null;
    let rank_image;
    if (rank == null || rank.response || (rank.data && rank.data.data.currenttier == null)) {
        rank_image = await Canvas.loadImage('https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/0/largeicon.png');
    } else {
        rank_image = await Canvas.loadImage(
            `https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/${rank.data.data.currenttier}/largeicon.png`
        );
        buildText({
            ctx,
            text: rank.data.data.mmr_change_to_last_game > 0 ? `+${rank.data.data.mmr_change_to_last_game}` : rank.data.data.mmr_change_to_last_game,
            size: 50,
            x: 1200,
            y: 820,
        });
        buildText({
            ctx,
            text: rank.data.data.elo,
            size: 75,
            x: 1085,
            y: 575,
        });
    }

    ctx.drawImage(rank_image, 1075, 600, 200, 200);
    buildText({ctx, text: `${dbstats.name}#${dbstats.tag}`, size: 130, x: 1920, y: 255, color: gradient, align: 'center'});
    buildText({ctx, text: dbstats.stats?.kills, size: 80, x: 405, y: 610, color: '#ff4654'});
    buildText({ctx, text: dbstats.stats?.deaths, size: 80, x: 460, y: 740, color: '#ff4654'});
    buildText({ctx, text: dbstats.stats?.assists, size: 80, x: 490, y: 872, color: '#ff4654'});
    buildText({ctx, text: (dbstats.stats?.kills / dbstats.stats?.deaths).toFixed(2), size: 80, x: 330, y: 1005, color: '#ff4654'});
    buildText({ctx, text: ((dbstats.stats?.kills + dbstats.stats?.assists) / dbstats.stats?.deaths).toFixed(2), size: 80, x: 420, y: 1135, color: '#ff4654'});

    const est = dbstats.stats?.matches * (35 * 60000);
    buildText({ctx, text: dbstats.stats?.matches, size: 80, x: 1750, y: 610, color: '#ff4654'});
    buildText({ctx, text: dbstats.stats?.wins, size: 80, x: 1600, y: 740, color: '#ff4654'});
    buildText({ctx, text: `${((dbstats.stats?.wins / dbstats.stats?.matches) * 100).toFixed(2)}%`, size: 80, x: 1650, y: 872, color: '#ff4654'});
    buildText({ctx, text: dbstats.stats?.aces, size: 80, x: 1600, y: 1005, color: '#ff4654'});
    buildText({
        ctx,
        text: `${moment.duration(est).days()}D ${moment.duration(est).hours()}H ${moment.duration(est).minutes()}M ${moment.duration(est).seconds()}S`,
        size: 80,
        x: 1375,
        y: 1150,
        color: '#00ffff',
        align: 'left',
    });

    const best_agent = dbstats.agents.filter(item => item.agent != '').sort((agent1, agent2) => agent2.playtime - agent1.playtime)[0];
    if (best_agent) {
        if (!agent.response) {
            const a_img = await Canvas.loadImage(agent.find(item => item.displayName.toLowerCase() == best_agent.agent.toLowerCase()).fullPortrait);
            ctx.drawImage(a_img, 2475, 475, 725, 725);
            buildText({ctx, text: (best_agent.kills / best_agent.deaths).toFixed(2), size: 80, x: 3535, y: 690, align: 'center', color: '#ff4654'});
            buildText({ctx, text: best_agent.matches, size: 80, x: 3535, y: 865, align: 'center', color: '#ff4654'});
            buildText({ctx, text: best_agent.wins, size: 80, x: 3540, y: 1040, align: 'center', color: '#ff4654'});
            buildText({
                ctx,
                text: `${moment.duration(best_agent.playtime).days()}D ${moment.duration(best_agent.playtime).hours()}H ${moment
                    .duration(best_agent.playtime)
                    .minutes()}M ${moment.duration(best_agent.playtime).seconds()}S`,
                size: 80,
                x: 3125,
                y: 1150,
                color: '#00ffff',
            });
        }
    }

    const mapk = [1390, 1657.5, 1922.5];
    const modek = [1502.5, 1768, 2035];
    const modeimgk = [1425, 1690, 1958];
    const agentimgk = [1310, 1576.6, 1842];
    let keyk = 1425;
    const matches = Array.from(dbstats.matches);
    matches.length = matches.length >= 3 ? 3 : matches.length;
    for (let i = 0; matches.length > i; i++) {
        buildText({ctx, text: matches[i].map, size: 110, x: 825, y: mapk[i]});
        buildText({ctx, text: matches[i].mode, size: 90, x: 825, y: modek[i]});
        const mode_data = modes.find(
            item => item.displayName.toLowerCase() == (matches[i].mode == 'Competitive' || matches[i].mode == 'Unrated' ? 'Standard' : matches[i].mode).toLowerCase()
        );
        if (mode_data) {
            const mode_img = await Canvas.loadImage(mode_data.displayIcon);
            ctx.drawImage(mode_img, 700, modeimgk[i], 100, 100);
        }
        console.log(matches[i]);
        const agent_img = await Canvas.loadImage(agent.find(item => item.displayName.toLowerCase() == matches[i].agent.toLowerCase()).displayIcon);
        ctx.drawImage(agent_img, 700, agentimgk[i], 100, 100);
        buildText({ctx, text: 'Score', size: 110, x: 1525, y: mapk[i]});
        buildText({ctx, text: matches[i].teamblue_rounds, size: 90, x: 1595, y: modek[i], color: '#0088ff', align: 'center'});
        buildText({ctx, text: ':', size: 90, x: 1675, y: modek[i], align: 'center'});
        buildText({ctx, text: matches[i].teamred_rounds, size: 90, x: 1750, y: modek[i], color: '#ff4654', align: 'center'});
        buildText({ctx, text: 'K/D/A', size: 110, x: 2050, y: mapk[i]});
        buildText({ctx, text: `${matches[i].kills}/${matches[i].deaths}/${matches[i].assists}`, size: 90, x: 2200, y: modek[i], align: 'center'});
        buildText({ctx, text: `/game ${matches[i].gamekey}`, size: 80, x: 2500, y: keyk});
        keyk += 266.6;
    }
    return new Attachment(canvas.toBuffer(), `valorant-stats-${dbstats.name}-${dbstats.tag}.png`, {description: 'VALORANT LABS Stats'});
};
export const patchStats = async function ({dbstats, mmatches, message, lang, agent, modes, bgcanvas} = {}) {
    const reqs = [];
    if (!dbstats.stats) {
        dbstats.false;
        dbstats.last_update = Date.now();
        dbstats.agents = [];
        dbstats.matches = [];
        dbstats.stats = {};
    }
    !dbstats.ingamepuuid ? (mmatches.length = mmatches.length > 15 ? 15 : mmatches.length) : null;
    for (let i = 0; mmatches.length > i; i++) {
        reqs.push(
            dbstats.ingamepuuid
                ? axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/match/${dbstats.region}/${mmatches[i].matchId}`, {timeout: 2000}).catch(error => {
                      return error;
                  })
                : axios
                      .get(`https://${dbstats.region}.api.riotgames.com/val/match/v1/matches/${mmatches[i].matchId}`, {
                          headers: {'X-Riot-Token': riottoken},
                          timeout: 2000,
                      })
                      .catch(error => {
                          return error;
                      })
        );
    }
    let fmatches = await Promise.allSettled(reqs);
    fmatches = fmatches.map(item => {
        return item.value;
    });
    for (let i = 0; fmatches.length > i; i++) {
        if (!fmatches[i].response && !fmatches.code) {
            if (dbstats.ingamepuuid) {
                if (!fmatches[i].data.data) console.error(fmatches[i], mmatches[i].matchId);
                if (fmatches[i].data.data.metadata.mode != 'Deathmatch') {
                    if (fmatches[i].data.data.metadata.mode != 'Custom Game') {
                        const player = fmatches[i].data.data.players.all_players.find(item => item.puuid == dbstats.ingamepuuid);
                        let team;
                        try {
                            team = fmatches[i].data.data.teams[player.team.toLowerCase()];
                        } catch (e) {
                            console.error(
                                dbstats.ingamepuuid,
                                dbstats.puuid,
                                fmatches[i].data.data.players.all_players.map(i => {
                                    return i.puuid;
                                }),
                                fmatches[i].data.data.metadata.matchid,
                                e
                            );
                        }
                        dbstats.stats.matches = !dbstats.stats?.matches ? 1 : dbstats.stats?.matches + 1;
                        dbstats.stats.kills = !isNaN(player.stats.kills) ? Number(player.stats.kills) + Number(dbstats.stats?.kills ? dbstats.stats?.kills : 0) : 0;
                        dbstats.stats.deaths = !isNaN(player.stats.deaths) ? Number(player.stats.deaths) + Number(dbstats.stats?.deaths ? dbstats.stats?.deaths : 0) : 0;
                        dbstats.stats.assists = !isNaN(player.stats.assists)
                            ? Number(player.stats.assists) + Number(dbstats.stats?.assists ? dbstats.stats?.assists : 0)
                            : 0;
                        dbstats.stats.headshots = !isNaN(player.stats.headshots)
                            ? Number(player.stats.headshots) + Number(dbstats.stats?.headshots ? dbstats.stats?.headshots : 0)
                            : 0;
                        let aces = 0;
                        let quadras = 0;
                        let triples = 0;
                        for (let j = 0; fmatches[i].data.data.rounds.length > j; j++) {
                            for (let k = 0; fmatches[i].data.data.rounds[j].player_stats.length > k; k++) {
                                if (fmatches[i].data.data.rounds[j].player_stats[k].player_puuid == dbstats.ingamepuuid) {
                                    if (fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length == 3) triples += 1;
                                    if (fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length == 4) quadras += 1;
                                    if (fmatches[i].data.data.rounds[j].player_stats[k].kill_events.length >= 5) aces += 1;
                                }
                            }
                        }
                        dbstats.stats.aces = Number(aces) + Number(dbstats.stats?.aces ? dbstats.stats?.aces : 0);
                        dbstats.stats.triples = Number(triples) + Number(dbstats.stats?.triples ? dbstats.stats?.triples : 0);
                        dbstats.stats.quadras = Number(quadras) + Number(dbstats.stats?.quadras ? dbstats.stats?.quadras : 0);
                        if (team.has_won) dbstats.stats.wins = !dbstats.stats?.wins ? 1 : dbstats.stats?.wins + 1;
                        if (!team.has_won) dbstats.stats.wins = !dbstats.stats?.wins ? 0 : dbstats.stats?.wins + 0;

                        const dbagent = dbstats.agents.find(item => item.agent == player.character);
                        const dbindex = dbstats.agents.findIndex(item => item.agent == player.character);
                        if (dbindex != -1) dbstats.agents.splice(dbindex, 1);
                        const agent = dbindex != -1 ? dbagent : {};
                        agent.agent = player.character;
                        agent.playtime = !isNaN(fmatches[i].data.data.metadata.game_length)
                            ? Number(agent.playtime ? agent.playtime : 0) + Number(fmatches[i].data.data.metadata.game_length)
                            : 0;
                        agent.matches = !agent.matches ? 1 : agent.matches + 1;
                        agent.kills = !isNaN(player.stats.kills) ? Number(agent.kills ? agent.kills : 0) + Number(player.stats.kills) : 0;
                        agent.deaths = !isNaN(player.stats.deaths) ? Number(agent.deaths ? agent.deaths : 0) + Number(player.stats.deaths) : 0;
                        agent.assists = !isNaN(player.stats.assists) ? Number(agent.assists ? agent.assists : 0) + Number(player.stats.assists) : 0;
                        agent.headshots = !isNaN(player.stats.headshots) ? Number(agent.headshots ? agent.headshots : 0) + Number(player.stats.headshots) : 0;
                        agent.aces = Number(agent.aces ? agent.aces : 0) + Number(aces);
                        agent.triples = Number(agent.triples ? agent.triples : 0) + Number(triples);
                        agent.quadras = Number(agent.quadras ? agent.quadras : 0) + Number(quadras);
                        if (team.has_won) agent.wins = !agent.wins ? 1 : agent.wins + 1;
                        if (!team.has_won) agent.wins = !agent.wins ? 0 : agent.wins + 0;
                        dbstats.agents.push(agent);

                        const dbcheck = await getDB('games').findOne({matchid: fmatches[i].data.data.metadata.matchid});
                        if (dbcheck)
                            dbstats.matches.push({
                                won: team.has_won,
                                gamekey: dbcheck.gamekey,
                                id: fmatches[i].data.data.metadata.matchid,
                                start: fmatches[i].data.data.metadata.game_start * 1000,
                                agent: player.character,
                                mode: fmatches[i].data.data.metadata.mode,
                                map: fmatches[i].data.data.metadata.map,
                                teamblue_won: team.has_won,
                                teamblue_rounds: team.rounds_won,
                                teamred_won: team.has_won == true ? false : true,
                                teamred_rounds: team.rounds_lost,
                                kills: player.stats.kills,
                                deaths: player.stats.deaths,
                                assists: player.stats.assists,
                            });
                        if (!dbcheck) {
                            let rid = randomize('Aa0', 8);
                            let available = false;

                            while (!available) {
                                const ridcheck = await getDB('games').findOne({gamekey: rid});
                                if (!ridcheck) {
                                    getDB('games').insertOne({gamekey: rid, matchid: fmatches[i].data.data.metadata.matchid, createdAt: new Date()});
                                    dbstats.matches.push({
                                        won: team.has_won,
                                        gamekey: rid,
                                        id: fmatches[i].data.data.metadata.matchid,
                                        start: fmatches[i].data.data.metadata.game_start * 1000,
                                        agent: player.character,
                                        mode: fmatches[i].data.data.metadata.mode,
                                        map: fmatches[i].data.data.metadata.map,
                                        teamblue_won: team.has_won,
                                        teamblue_rounds: team.rounds_won,
                                        teamred_won: team.has_won == true ? false : true,
                                        teamred_rounds: team.rounds_lost,
                                        kills: player.stats.kills,
                                        deaths: player.stats.deaths,
                                        assists: player.stats.assists,
                                    });
                                    available = true;
                                } else {
                                    rid = randomize('Aa0', 8);
                                }
                            }
                        }
                    }
                } else {
                    if (fmatches[i].data.data.metadata.mode != 'Custom Game') {
                        const player = fmatches[i].data.data.players.all_players.find(item => item.puuid == dbstats.ingamepuuid);
                        const team = fmatches[i].data.data.players.all_players.sort((item2, item1) => item2.score - item1.score)[0];
                        const dbcheck = await getDB('games').findOne({matchid: fmatches[i].data.data.metadata.matchid});
                        if (dbcheck)
                            dbstats.matches.push({
                                won: team.puuid == dbstats.ingamepuuid ? true : false,
                                gamekey: dbcheck.gamekey,
                                id: fmatches[i].data.data.metadata.matchid,
                                start: fmatches[i].data.data.metadata.game_start * 1000,
                                agent: player.character,
                                mode: fmatches[i].data.data.metadata.mode,
                                map: fmatches[i].data.data.metadata.map,
                                teamblue_won: team.puuid == dbstats.ingamepuuid ? true : false,
                                teamblue_rounds: team.puuid == dbstats.ingamepuuid ? 1 : 0,
                                teamred_won: team.puuid != dbstats.ingamepuuid ? true : false,
                                teamred_rounds: team.puuid != dbstats.ingamepuuid ? 1 : 0,
                                kills: player.stats.kills,
                                deaths: player.stats.deaths,
                                assists: player.stats.assists,
                            });
                        if (!dbcheck) {
                            let rid = randomize('Aa0', 8);
                            let available = false;

                            while (!available) {
                                const ridcheck = await getDB('games').findOne({gamekey: rid});
                                if (!ridcheck) {
                                    getDB('games').insertOne({gamekey: rid, matchid: fmatches[i].data.data.metadata.matchid, createdAt: new Date()});
                                    dbstats.matches.push({
                                        won: team.puuid == dbstats.ingamepuuid ? true : false,
                                        gamekey: rid,
                                        id: fmatches[i].data.data.metadata.matchid,
                                        start: fmatches[i].data.data.metadata.game_start * 1000,
                                        agent: player.character,
                                        mode: fmatches[i].data.data.metadata.mode,
                                        map: fmatches[i].data.data.metadata.map,
                                        teamblue_won: team.puuid == dbstats.ingamepuuid ? true : false,
                                        teamblue_rounds: team.puuid == dbstats.ingamepuuid ? 1 : 0,
                                        teamred_won: team.puuid != dbstats.ingamepuuid ? true : false,
                                        teamred_rounds: team.puuid != dbstats.ingamepuuid ? 1 : 0,
                                        kills: player.stats.kills,
                                        deaths: player.stats.deaths,
                                        assists: player.stats.assists,
                                    });
                                    available = true;
                                } else {
                                    rid = randomize('Aa0', 8);
                                }
                            }
                        }
                    }
                }
            }
            if (!dbstats.ingamepuuid) {
                if (fmatches[i].data.matchInfo.queueId != 'deathmatch') {
                    if (fmatches[i].data.matchInfo.queueId != '') {
                        const player = fmatches[i].data.players.find(item => item.puuid == dbstats.puuid);
                        const team = fmatches[i].data.teams.find(item => item.teamId == player.teamId);
                        dbstats.stats.matches = !dbstats.stats?.matches ? 1 : dbstats.stats?.matches + 1;
                        dbstats.stats.kills = !isNaN(player.stats.kills) ? Number(player.stats.kills) + Number(dbstats.stats?.kills ? dbstats.stats?.kills : 0) : 0;
                        dbstats.stats.deaths = !isNaN(player.stats.deaths) ? Number(player.stats.deaths) + Number(dbstats.stats?.deaths ? dbstats.stats?.deaths : 0) : 0;
                        dbstats.stats.assists = !isNaN(player.stats.assists)
                            ? Number(player.stats.assists) + Number(dbstats.stats?.assists ? dbstats.stats?.assists : 0)
                            : 0;
                        let headshots = 0;
                        let aces = 0;
                        let quadras = 0;
                        let triples = 0;
                        for (let j = 0; fmatches[i].data.roundResults.length > j; j++) {
                            for (let k = 0; fmatches[i].data.roundResults[j].playerStats.length > k; k++) {
                                if (fmatches[i].data.roundResults[j].playerStats[k].puuid == dbstats.puuid) {
                                    for (let f = 0; fmatches[i].data.roundResults[j].playerStats[k].damage.length > f; f++) {
                                        headshots += fmatches[i].data.roundResults[j].playerStats[k].damage[f].headshots;
                                    }
                                    if (fmatches[i].data.roundResults[j].playerStats[k].kills.length == 3) triples += 1;
                                    if (fmatches[i].data.roundResults[j].playerStats[k].kills.length == 4) quadras += 1;
                                    if (fmatches[i].data.roundResults[j].playerStats[k].kills.length >= 5) aces += 1;
                                }
                            }
                        }
                        dbstats.stats.headshots = !isNaN(player.stats.headshots)
                            ? Number(headshots) + Number(dbstats.stats?.headshots ? dbstats.stats?.headshots : 0)
                            : 0;
                        dbstats.stats.aces = Number(aces) + Number(dbstats.stats?.aces ? dbstats.stats?.aces : 0);
                        dbstats.stats.triples = Number(triples) + Number(dbstats.stats?.triples ? dbstats.stats?.triples : 0);
                        dbstats.stats.quadras = Number(quadras) + Number(dbstats.stats?.quadras ? dbstats.stats?.quadras : 0);
                        if (team.won) dbstats.stats.wins = !dbstats.stats?.wins ? 1 : dbstats.stats?.wins + 1;
                        if (!team.won) dbstats.stats.wins = !dbstats.stats?.wins ? 0 : dbstats.stats?.wins + 0;

                        const agentid = agents.find(item => item.id == player.characterId);
                        const dbagent = dbstats.agents.find(item => item.agent == agentid.name);
                        const dbindex = dbstats.agents.findIndex(item => item.agent == agentid.name);
                        if (dbindex != -1) dbstats.agents.splice(dbindex, 1);
                        const agent = dbindex != -1 ? dbagent : {};
                        agent.agent = agentid.name;
                        agent.playtime = !isNaN(fmatches[i].data.matchInfo.gameLengthMillis)
                            ? Number(agent.playtime ? agent.playtime : 0) + Number(fmatches[i].data.matchInfo.gameLengthMillis)
                            : 0;
                        agent.matches = !agent.matches ? 1 : agent.matches + 1;
                        agent.kills = !isNaN(player.stats.kills) ? Number(agent.kills ? agent.kills : 0) + Number(player.stats.kills) : 0;
                        agent.deaths = !isNaN(player.stats.deaths) ? Number(agent.deaths ? agent.deaths : 0) + Number(player.stats.deaths) : 0;
                        agent.assists = !isNaN(player.stats.assists) ? Number(agent.assists ? agent.assists : 0) + Number(player.stats.assists) : 0;
                        agent.headshots = !isNaN(player.stats.headshots) ? Number(agent.headshots ? agent.headshots : 0) + Number(player.stats.headshots) : 0;
                        agent.aces = Number(agent.aces ? agent.aces : 0) + Number(aces);
                        agent.triples = Number(agent.triples ? agent.triples : 0) + Number(triples);
                        agent.quadras = Number(agent.quadras ? agent.quadras : 0) + Number(quadras);
                        if (team.won) agent.wins = !agent.wins ? 1 : agent.wins + 1;
                        if (!team.won) agent.wins = !agent.wins ? 0 : agent.wins + 0;
                        dbstats.agents.push(agent);

                        const dbcheck = await getDB('games').findOne({matchid: fmatches[i].data.matchInfo.matchId});
                        if (dbcheck)
                            dbstats.matches.push({
                                won: team.won,
                                gamekey: dbcheck.gamekey,
                                id: fmatches[i].data.matchInfo.matchId,
                                start: fmatches[i].data.matchInfo.gameStartMillis,
                                agent: agentid.name,
                                mode: gamemodes[fmatches[i].data.matchInfo.queueId].name,
                                map: maps[fmatches[i].data.matchInfo.mapId],
                                teamblue_won: team.won,
                                teamblue_rounds: team.roundsWon,
                                teamred_won: !team.won,
                                teamred_rounds: team.roundsPlayed - team.roundsWon,
                                kills: player.stats.kills,
                                deaths: player.stats.deaths,
                                assists: player.stats.assists,
                            });
                        if (!dbcheck) {
                            let rid = randomize('Aa0', 8);
                            let available = false;

                            while (!available) {
                                const ridcheck = await getDB('games').findOne({gamekey: rid});
                                if (!ridcheck) {
                                    getDB('games').insertOne({gamekey: rid, matchid: fmatches[i].data.matchInfo.matchId, createdAt: new Date()});
                                    dbstats.matches.push({
                                        won: team.won,
                                        gamekey: rid,
                                        id: fmatches[i].data.matchInfo.matchId,
                                        start: fmatches[i].data.matchInfo.gameStartMillis,
                                        agent: agentid.name,
                                        mode: gamemodes[fmatches[i].data.matchInfo.queueId].name,
                                        map: maps[fmatches[i].data.matchInfo.mapId],
                                        teamblue_won: team.won,
                                        teamblue_rounds: team.roundsWon,
                                        teamred_won: !team.won,
                                        teamred_rounds: team.roundsPlayed - team.roundsWon,
                                        kills: player.stats.kills,
                                        deaths: player.stats.deaths,
                                        assists: player.stats.assists,
                                    });
                                    available = true;
                                } else {
                                    rid = randomize('Aa0', 8);
                                }
                            }
                        }
                    }
                } else {
                    if (fmatches[i].data.matchInfo.queueId != '') {
                        const player = fmatches[i].data.players.find(item => item.puuid == dbstats.puuid);
                        const agentid = agents.find(item => item.id == player.characterId);
                        const team = fmatches[i].data.teams.find(item => item.teamId == dbstats.puuid);

                        const dbcheck = await getDB('games').findOne({matchid: fmatches[i].data.matchInfo.matchId});
                        if (dbcheck)
                            dbstats.matches.push({
                                won: team.won,
                                gamekey: dbcheck.gamekey,
                                id: fmatches[i].data.matchInfo.matchId,
                                start: fmatches[i].data.matchInfo.gameStartMillis,
                                agent: agentid.name,
                                mode: gamemodes[fmatches[i].data.matchInfo.queueId].name,
                                map: maps[fmatches[i].data.matchInfo.mapId],
                                teamblue_won: team.won,
                                teamblue_rounds: team.roundsWon,
                                teamred_won: !team.won,
                                teamred_rounds: team.roundsPlayed - team.roundsWon,
                                kills: player.stats.kills,
                                deaths: player.stats.deaths,
                                assists: player.stats.assists,
                            });
                        if (!dbcheck) {
                            let rid = randomize('Aa0', 8);
                            let available = false;

                            while (!available) {
                                const ridcheck = await getDB('games').findOne({gamekey: rid});
                                if (!ridcheck) {
                                    getDB('games').insertOne({gamekey: rid, matchid: fmatches[i].data.matchInfo.matchId, createdAt: new Date()});
                                    dbstats.matches.push({
                                        won: team.won,
                                        gamekey: rid,
                                        id: fmatches[i].data.matchInfo.matchId,
                                        start: fmatches[i].data.matchInfo.gameStartMillis,
                                        agent: agentid.name,
                                        mode: gamemodes[fmatches[i].data.matchInfo.queueId].name,
                                        map: maps[fmatches[i].data.matchInfo.mapId],
                                        teamblue_won: team.won,
                                        teamblue_rounds: team.roundsWon,
                                        teamred_won: !team.won,
                                        teamred_rounds: team.roundsPlayed - team.roundsWon,
                                        kills: player.stats.kills,
                                        deaths: player.stats.deaths,
                                        assists: player.stats.assists,
                                    });
                                    available = true;
                                } else {
                                    rid = randomize('Aa0', 8);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (!dbstats.region) dbstats.region = dbstats.region;
    dbstats.last_update = Date.now();
    const patchedmatches = dbstats.matches.filter(item => item != null).sort((match1, match2) => match2.start - match1.start);
    if (patchedmatches.length > 10) patchedmatches.length = 10;
    dbstats.matches = patchedmatches;
    await getDB('userstats').updateOne({puuid: dbstats.puuid}, {$set: dbstats}, {upsert: true});
    if (message) {
        const attachment = await buildStatsImage({dbstats, agent, modes, bgcanvas});
        const components = [];
        for (let i = 0; dbstats.matches.length > i; i++) {
            components.push({
                label: dbstats.matches[i].gamekey,
                value: dbstats.matches[i].gamekey,
                description: `${dbstats.matches[i].map} | ${dbstats.matches[i].mode} | ${dbstats.matches[i].agent} | ${moment(dbstats.matches[i].start).format('lll')}`,
                emoji: Object.values(gamemodes).find(item => item.name == dbstats.matches[i].mode).emoji,
            });
        }
        message.edit({
            embeds: [],
            files: [attachment],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.SelectMenu,
                            customId: `game`,
                            maxValues: 1,
                            minValues: 0,
                            options: [...new Set(components)],
                            placeholder: translations[lang].stats.game_select,
                        },
                    ],
                },
            ],
        });
    }
};
export const buildGameImage = async function ({id, guilddata, matchid, bgcanvas} = {}) {
    const gamekey = matchid ? true : await getGameKey(id);
    if (!gamekey) return {error: null, unknown: true, embed: null, image: null};
    const match = await axios.get(`https://api.henrikdev.xyz/valorant/v2/match/${matchid ? matchid : gamekey.matchid}`).catch(error => {
        return error;
    });
    if (match.response) return {error: match.response, unknown: null, embed: null, image: null};
    switch (match.data.data.metadata.mode) {
        case 'Deathmatch':
            const fields = [];
            const sorted_array = match.data.data.players.all_players.sort((player2, player1) => player2.stats.score - player1.stats.score);
            for (let i = 0; sorted_array.length > i; i++) {
                const rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/eu/${sorted_array[i].puuid}`).catch(error => {
                    return error;
                });
                fields.push({
                    name: `${sorted_array[i].name}#${sorted_array[i].tag}`,
                    value: `${rank.response != null || rank.data.data.currenttier == null ? ranks[0].discordid : ranks[rank.data.data.currenttier].discordid} | Score: ${
                        sorted_array[i].stats.score
                    } | KDA: ${sorted_array[i].stats.kills}/${sorted_array[i].stats.deaths}/${sorted_array[i].stats.assists}`,
                });
            }
            return {
                error: null,
                unknown: null,
                embed: [
                    embedBuilder({
                        title: `Game ${id} | ID: ${match.data.data.metadata.matchid}`,
                        desc: `Mode: Deathmatch | Map: ${match.data.data.metadata.map} | Length: ${moment
                            .duration(match.data.data.metadata.game_length)
                            .minutes()}m ${moment.duration(match.data.data.metadata.game_length).seconds()}s | Started at: ${moment(
                            match.data.data.metadata.game_start * 1000
                        ).format('LLLL')}`,
                        thumbnail: 'https://media.valorant-api.com/gamemodes/a8790ec5-4237-f2f0-e93b-08a8e89865b2/displayicon.png',
                        additionalFields: fields.reverse(),
                        footer: 'VALORANT LABS [GAME]',
                    }),
                ],
                image: null,
            };
        default:
            const canvas = Canvas.createCanvas(3840, 2160);
            const ctx = canvas.getContext('2d');
            const background = bgcanvas ? bgcanvas : await Canvas.loadImage('assets/background/VALORANT_game.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            moment.locale(translations[guilddata.lang].moment);
            const mode_image = await Canvas.loadImage(`./assets/modes/${Object.values(gamemodes).find(item => item.name == match.data.data.metadata.mode).path}`);
            ctx.drawImage(mode_image, 550, 975, 250, 250);
            buildText({
                ctx,
                text: `${match.data.data.metadata.mode} | ${match.data.data.metadata.map} | ${match.data.data.metadata.cluster} | ${
                    match.data.data.metadata.game_version.split('-')[0]
                } -${match.data.data.metadata.game_version.split('-')[1]}`,
                size: 100,
                x: 950,
                y: 1075,
            });
            buildText({
                ctx,
                text: `${moment.duration(match.data.data.metadata.game_length).minutes()}m ${moment.duration(match.data.data.metadata.game_length).seconds()}s | ${moment(
                    match.data.data.metadata.game_start * 1000
                ).format('LLLL')}`,
                size: 100,
                x: 950,
                y: 1200,
                color: '#ffffff',
            });
            const red_players = match.data.data.players.red.sort((player2, player1) => player1.stats.score - player2.stats.score);
            const blue_players = match.data.data.players.blue.sort((player2, player1) => player1.stats.score - player2.stats.score);
            buildText({ctx, text: match.data.data.teams.blue.rounds_won, size: 90, x: 3450, y: 1050, color: '#00ffff', align: 'right'});
            buildText({ctx, text: match.data.data.teams.red.rounds_won, size: 90, x: 3450, y: 1200, color: '#ff4654', align: 'right'});
            let x_blue_name = 390;
            let x_blue_level = 382;
            let x_blue_score = 370;
            let x_blue_kills = 590;
            let x_blue_kd = 110;
            let x_blue_rank = 600;
            let x_blue_agent = 185;
            let x_red_name = 390;
            let x_red_level = 382;
            let x_red_score = 370;
            let x_red_kills = 590;
            let x_red_kd = 110;
            let x_red_rank = 600;
            let x_red_agent = 185;
            for (let i = 0; red_players.length > i; i++) {
                const player = await Canvas.loadImage(
                    `https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/${red_players[i].currenttier}/largeicon.png`
                );
                ctx.drawImage(player, x_red_rank, 1320, 75, 75);
                const agent = await Canvas.loadImage(getAgents().find(item => item.displayName.toLowerCase() == red_players[i].character.toLowerCase()).fullPortraitV2);
                ctx.drawImage(agent, x_red_agent, 1480, 405, 405);
                buildText({ctx, text: `${red_players[i].name} #${red_players[i].tag}`, size: 40, x: x_red_name, y: 1450, color: '#fff', align: 'center'});
                buildText({ctx, text: red_players[i].stats.score, size: 60, x: x_red_score, y: 2025, color: '#fff', align: 'center'});
                buildText({ctx, text: red_players[i].stats.kills, size: 60, x: x_red_kills, y: 2025, color: '#fff', align: 'center'});
                buildText({
                    ctx,
                    text: (red_players[i].stats.kills / red_players[i].stats.deaths).toFixed(2),
                    size: 60,
                    x: x_red_kd,
                    y: 2025,
                    color: '#fff',
                    align: 'left',
                });
                buildText({ctx, text: red_players[i].level, size: 30, x: x_red_level, y: 1385, color: '#fff', align: 'center'});
                x_red_rank += 768;
                x_red_name += 768;
                x_red_score += 768;
                x_red_kills += 768;
                x_red_kd += 768;
                x_red_level += 768;
                x_red_agent += 768;
            }
            for (let i = 0; blue_players.length > i; i++) {
                const player = await Canvas.loadImage(
                    `https://media.valorant-api.com/competitivetiers/e4e9a692-288f-63ca-7835-16fbf6234fda/${blue_players[i].currenttier}/largeicon.png`
                );
                ctx.drawImage(player, x_blue_rank, 110, 75, 75);
                const agent = await Canvas.loadImage(getAgents().find(item => item.displayName.toLowerCase() == blue_players[i].character.toLowerCase()).fullPortraitV2);
                ctx.drawImage(agent, x_blue_agent, 270, 405, 405);
                buildText({ctx, text: `${blue_players[i].name} #${blue_players[i].tag}`, size: 40, x: x_blue_name, y: 240, color: '#fff', align: 'center'});
                buildText({ctx, text: blue_players[i].stats.score, size: 60, x: x_blue_score, y: 815, color: '#fff', align: 'center'});
                buildText({ctx, text: blue_players[i].stats.kills, size: 60, x: x_blue_kills, y: 815, color: '#fff', align: 'center'});
                buildText({
                    ctx,
                    text: (blue_players[i].stats.kills / blue_players[i].stats.deaths).toFixed(2),
                    size: 60,
                    x: x_blue_kd,
                    y: 815,
                    color: '#fff',
                    align: 'left',
                });
                buildText({ctx, text: blue_players[i].level, size: 30, x: x_blue_level, y: 170, color: '#fff', align: 'center'});
                x_blue_rank += 768;
                x_blue_name += 768;
                x_blue_score += 768;
                x_blue_kills += 768;
                x_blue_kd += 768;
                x_blue_level += 768;
                x_blue_agent += 768;
            }
            const attachment = new Attachment(canvas.toBuffer(), `valorant-game.png`, {description: 'VALORANT LABS Game'});
            return {error: null, unknown: null, embed: null, image: attachment};
    }
};
export const buildBackground = async function (data, type) {
    const canvas = Canvas.createCanvas(3840, 2160);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(data);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const stats = await Canvas.loadImage(`assets/background/VALORANT_${type}_template.png`);
    ctx.drawImage(stats, 0, 0, canvas.width, canvas.height);
    return canvas;
};
export const getCustomBackground = function (uuid) {
    return brotliDecompressSync(readFileSync(`./settings/backgrounds/${uuid}.png`));
};
export const buildMMRImage = async function ({mmrdata, bgcanvas, seasonid} = {}) {
    const canvas = Canvas.createCanvas(3840, 2160);
    const ctx = canvas.getContext('2d');
    let seasonvalue;
    let seasonkey;
    let entries;
    if (!seasonid) {
        entries = Object.entries(mmrdata.by_season).find(item => !item[1].error && item[1].wins != 0);
        if (entries[1] == undefined) console.error(mmrdata);
        seasonvalue = entries[1].act_rank_wins.filter(item => item.tier != 0);
        seasonkey = entries[0];
    } else {
        entries = Object.entries(mmrdata.by_season).find(item => item[0] == seasonid && item[1].wins != 0);
        if (entries[1] == undefined) console.error(mmrdata);
        seasonvalue = entries[1].act_rank_wins.filter(item => item.tier != 0);
        seasonkey = entries[0];
    }
    const multiplier = {
        triangle: 1.25,
        x: 1375.5,
        y: 200,
    };
    const background = bgcanvas ? bgcanvas : await Canvas.loadImage(ranks[seasonvalue[0].tier ? seasonvalue[0].tier : 0].mmr);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const wins = entries[1].wins;
    const color = ranks[seasonvalue[0].tier].color;
    let border;
    if (wins < 9) border = await Canvas.loadImage('assets/mmr/border0.png');
    else if (9 <= wins && wins < 25) border = await Canvas.loadImage('assets/mmr/border1.png');
    else if (25 <= wins && wins < 50) border = await Canvas.loadImage('assets/mmr/border2.png');
    else if (50 <= wins && wins < 75) border = await Canvas.loadImage('assets/mmr/border3.png');
    else if (75 <= wins && wins < 100) border = await Canvas.loadImage('assets/mmr/border4.png');
    else border = await Canvas.loadImage('assets/mmr/border5.png');
    ctx.drawImage(border, 1135, 200, 1765, 1765);

    buildText({
        ctx,
        text: seasonkey.toUpperCase(),
        size: 200,
        x: multiplier.x + ((125 * multiplier.triangle) / 2) * 8.25,
        y: 325,
        color: color,
        align: 'center',
        font: 'anton',
    });
    buildText({
        ctx,
        text: seasonvalue[0].patched_tier.toUpperCase(),
        size: 200,
        x: multiplier.x + ((125 * multiplier.triangle) / 2) * 8.25,
        y: 2025,
        color: color,
        align: 'center',
        font: 'anton',
    });
    buildText({ctx, text: mmrdata.current_data.currenttierpatched, size: 125, x: 400, y: 1245, color: color, align: 'left', font: 'anton'});
    buildText({ctx, text: mmrdata.current_data.ranking_in_tier + ' RR', size: 125, x: 675, y: 1445, color: color, align: 'left', font: 'anton'});
    buildText({ctx, text: mmrdata.current_data.mmr_change_to_last_game, size: 125, x: 800, y: 1645, color: color, align: 'left', font: 'anton'});
    buildText({ctx, text: mmrdata.current_data.elo, size: 125, x: 325, y: 1845, color: color, align: 'left', font: 'anton'});

    //TODO
    buildText({ctx, text: entries[1].wins, size: 110, x: 3700, y: 437.5, color: color, align: 'right', font: 'anton'});
    buildText({ctx, text: entries[1].number_of_games, size: 110, x: 3700, y: 737.5, color: color, align: 'right', font: 'anton'});
    buildText({
        ctx,
        text: `${((entries[1].wins / entries[1].number_of_games) * 100).toFixed(2)}%`,
        size: 110,
        x: 3700,
        y: 1037.5,
        color: color,
        align: 'right',
        font: 'anton',
    });
    buildText({ctx, text: seasonvalue[0].patched_tier, size: 110, x: 3700, y: 1337.5, color: color, align: 'right', font: 'anton'});
    buildText({ctx, text: seasonvalue[seasonvalue.length - 1].patched_tier, size: 110, x: 3700, y: 1637.5, color: color, align: 'right', font: 'anton'});
    buildText({ctx, text: entries[1].final_rank_patched, size: 110, x: 3700, y: 1937.5, color: color, align: 'right', font: 'anton'});

    const squareroot = Math.ceil(Math.sqrt(wins));
    const rowcount = squareroot >= 8 ? 7 : squareroot;
    for (let i = 0; rowcount > i; i++) {
        const tierCount = i * 2 + 1;
        let tiers = seasonvalue.splice(0, tierCount);
        for (let k = 0; tiers.length > k; k++) {
            const triangle = k % 2 == 0 ? `assets/mmr/${tiers[k].tier}_up.png` : `assets/mmr/${tiers[k].tier}_down.png`;
            const triangleimage = await Canvas.loadImage(triangle);
            const x = (125 * multiplier.triangle) / 2 + 2.75;
            ctx.drawImage(
                triangleimage,
                k * x + (rowcount - i) * x + (multiplier.x + ((125 * multiplier.triangle) / 2) * (7 - rowcount)),
                i * (111 * multiplier.triangle + 2.75) + (multiplier.y + 400),
                125 * multiplier.triangle,
                111 * multiplier.triangle
            );
        }
    }
    return new Attachment(canvas.toBuffer(), `valorant-mmr.png`, {description: 'VALORANT LABS MMR'});
};
export const getBlacklist = async function (guildId) {
    const request = await getDB('blacklist').findOne({gid: guildId});
    return request ? request.entrys : null;
};
export const addBlacklist = async function (data) {
    const res = await getDB('blacklist').findOne({gid: data.guild});
    const newarray = res ? res.entrys : [];
    if (newarray.includes(data.channel)) return null;
    newarray.push(data.channel);
    await getDB('blacklist').updateOne({gid: data.guild}, {$set: {entrys: newarray}}, {upsert: true});
    return newarray;
};
export const removeBlacklist = async function (data) {
    const res = await getDB('blacklist').findOne({gid: data.guild});
    if (!res) return undefined;
    if (!res.entrys.includes(data.channel)) return null;
    const indexnum = res.entrys.findIndex(item => item == data.channel);
    res.entrys.splice(indexnum, 1);
    await getDB('blacklist').updateOne({gid: data.guild}, {$set: {entrys: res.entrys}}, {upsert: false});
    return res.entrys.length == 0 ? undefined : res.entrys;
};
export const errorhandler = async function ({message, status, type, lang, data, name, tag} = {}) {
    if (status == 451) {
        const uuid = uuidv4();
        await getDB('state').insertOne({userid: message.author.id, code: uuid, expireAt: new Date(), type: 'stats'});
        return message.reply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[451].title,
                    desc: translations[lang].response[451].description,
                    footer: 'VALORANT LABS [ERROR 451]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_login,
                            style: ButtonStyle.Link,
                            url: `https://valorantlabs.xyz/v1/rso/redirect/${uuid}`,
                        },
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_update,
                            style: ButtonStyle.Danger,
                            customId: `stats;update;${name};${tag}`,
                        },
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_rank,
                            style: ButtonStyle.Danger,
                            customId: `mmr;${name};${tag}`,
                        },
                    ],
                },
            ],
        });
    }
    if (!translations[lang].response[status])
        return message.reply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[500].title,
                    desc: translations[lang].response[500][type] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                    footer: 'VALORANT LABS [ERROR 500]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle - Link, url: 'https://discord.gg/Zr5eF5D'}],
                },
            ],
        });
    if (!translations[lang].response[status][type])
        return message.reply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[status].title,
                    desc: translations[lang].response[status]['default'] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                    footer: `VALORANT LABS [ERROR ${status}]`,
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
                },
            ],
        });
    return message.reply({
        embeds: [
            embedBuilder({
                title: translations[lang].response[status].title,
                desc: translations[lang].response[status][type] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                footer: `VALORANT LABS [ERROR ${status}]`,
            }),
        ],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
            },
        ],
    });
};
export const errorhandlerinteraction = async function ({interaction, status, type, lang, data, name, tag} = {}) {
    if (status == 451) {
        const uuid = uuidv4();
        await getDB('state').insertOne({userid: interaction.user.id, code: uuid, expireAt: new Date(), type: 'stats'});
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[451].title,
                    desc: translations[lang].response[451].description,
                    footer: 'VALORANT LABS [ERROR 451]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_login,
                            style: ButtonStyle.Link,
                            url: `https://valorantlabs.xyz/v1/rso/redirect/${uuid}`,
                        },
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_update,
                            style: ButtonStyle.Danger,
                            customId: `stats;update;${name};${tag}`,
                        },
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_rank,
                            style: ButtonStyle.Danger,
                            customId: `mmr;${name};${tag}`,
                        },
                    ],
                },
            ],
        });
    }
    if (!translations[lang].response[status])
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[500].title,
                    desc: translations[lang].response[500][type] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                    footer: 'VALORANT LABS [ERROR 500]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
                },
            ],
        });
    if (!translations[lang].response[status][type])
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[status].title,
                    desc: translations[lang].response[status]['default'] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                    footer: `VALORANT LABS [ERROR ${status}]`,
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
                },
            ],
        });
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[lang].response[status].title,
                desc: translations[lang].response[status][type] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                footer: `VALORANT LABS [ERROR ${status}]`,
            }),
        ],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
            },
        ],
    });
};
export const getGuild = async function (interaction) {
    const settings = await guildSettings(interaction.guild);
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: 'VALORANT LABS Settings',
                desc: `Settings for ${interaction.guild.name}`,
                additionalFields: [
                    {name: 'Prefix', value: String(settings.prefix)},
                    {name: 'Patchnotes', value: String(settings.news)},
                    {name: 'Othernews', value: String(settings.onews)},
                    {name: 'Serverstatus', value: String(settings.serverstatus)},
                    {name: 'Language', value: String(settings.lang)},
                    {name: 'Blacklist', value: String(settings.blacklist)},
                    {name: 'Background - Stats', value: String(settings.background_stats)},
                    {name: 'Background - Game', value: String(settings.background_game)},
                    {name: 'Background - MMR', value: String(settings.background_mmr)},
                ],
                footer: 'VALORANT LABS [SETTINGS]',
            }),
        ],
        components: [],
        attachments: [],
    });
};
export const getAutoRoles = async function (interaction, guilddata) {
    const settings = guilddata ? guilddata : await guildSettings(interaction.guild);
    const formattedarray = settings.autoroles.map(item => {
        return {
            name: firstletter(item.name),
            value: `<@&${item.id}>`,
        };
    });
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: 'VALORANT LABS Auto Role System',
                desc: `Auto Role System Settings for ${interaction.guild.name}`,
                additionalFields: formattedarray,
                footer: 'VALORANT LABS [AUTO ROLE]',
            }),
        ],
        components: [],
        attachments: [],
    });
};
export const patchGuild = async function ({interaction, key, value, additionaldata, guilddata} = {}) {
    let doc;
    switch (key) {
        case 'prefix': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {prefix: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'language': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {lang: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'patchnotes': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {news: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'othernews': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {onews: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'serverstatus': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {serverstatus: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'blacklist': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {blacklist: Boolean(value)}}, {upsert: false, returnDocument: 'after'}))
                .value;
            break;
        }
        case 'background': {
            if (value == false) {
                doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {background: value}}, {upsert: false, returnDocument: 'before'}))
                    .value;
                unlinkSync(`./settings/backgrounds/${doc.background}.png`);
                doc.background = false;
            } else {
                doc = await getDB('settings').findOne({gid: interaction.guild.id});
                await interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[doc.lang].settings.imggeneration_title,
                            desc: translations[doc.lang].settings.imggeneration_desc,
                        }),
                    ],
                });
                let bgcanvas;
                let image;
                switch (interaction.options.get('type').value) {
                    case 'stats': {
                        const dbstats = await getDB('userstats').findOne({ingamepuuid: '54942ced-1967-5f66-8a16-1e0dae875641'});
                        dbstats.name = 'Henrik3';
                        dbstats.tag = 'VALO';
                        bgcanvas = await buildBackground(interaction.options.getAttachment('image').url, 'stats');
                        image = await buildStatsImage({dbstats, agent: getAgents(), modes: getGamemodes(), bgcanvas});
                        break;
                    }
                    case 'game': {
                        bgcanvas = await buildBackground(interaction.options.getAttachment('image').url, 'game');
                        image = (await buildGameImage({matchid: 'd6007c31-b293-41c3-b1f6-0e797978447b', guilddata: doc, bgcanvas})).image;
                        break;
                    }
                    case 'mmr': {
                        const mmrdata = await getDB('mmr').findOne({puuid: '54942ced-1967-5f66-8a16-1e0dae875641'});
                        bgcanvas = await buildBackground(interaction.options.getAttachment('image').url, 'mmr');
                        image = await buildMMRImage({mmrdata, bgcanvas, seasonid: 'e1a2'});
                        break;
                    }
                }
                return interaction.editReply({
                    files: [image],
                    embeds: [
                        embedBuilder({
                            title: translations[doc.lang].settings.imggenerated_title,
                            desc: translations[doc.lang].settings.imggenerated_desc,
                            footer: interaction.options.getAttachment('image').url,
                        }),
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Success,
                                    label: translations[doc.lang].settings.imggenerated_label_accept,
                                    customId: `settings;background;${interaction.options.get('type').value};accept`,
                                },
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Danger,
                                    label: translations[doc.lang].settings.imggenerated_label_deny,
                                    customId: `settings;background;${interaction.options.get('type').value};deny`,
                                },
                            ],
                        },
                    ],
                });
            }
            break;
        }
        case '_background': {
            const background = await axios.get(interaction.message.embeds[0].footer.text, {responseType: 'arraybuffer'}).catch(error => {
                return error;
            });
            if (background.response) {
                doc = await getDB('settings').findOne({gid: interaction.guild.id});
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[doc.lang].settings.imgsaveerror_title,
                            desc: translations[doc.lang].settings.imgsaveerror_desc + `\n\n\`\`\`${background.response.data}\`\`\``,
                        }),
                    ],
                });
            }
            const compressed = brotliCompressSync(background.data, {params: {[constants.BROTLI_PARAM_QUALITY]: 6}});
            writeFileSync(`./settings/backgrounds/${value}.png`, compressed);
            if (additionaldata == 'stats')
                doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {background_stats: value}}, {upsert: false, returnDocument: 'after'}))
                    .value;
            if (additionaldata == 'game')
                doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {background_game: value}}, {upsert: false, returnDocument: 'after'}))
                    .value;
            if (additionaldata == 'mmr')
                doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {background_mmr: value}}, {upsert: false, returnDocument: 'after'}))
                    .value;
            break;
        }
        case 'autoroles': {
            const autoroleupdate = {};
            autoroleupdate[`autoroles.${guilddata.autoroles?.findIndex(item => item.name == value)}`] = {id: additionaldata, name: value};
            doc = guilddata.autoroles?.some(item => item.name == value)
                ? (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: autoroleupdate}, {upsert: false, returnDocument: 'after'})).value
                : (
                      await getDB('settings').findOneAndUpdate(
                          {gid: interaction.guild.id},
                          {$push: {autoroles: {id: additionaldata, name: value}}},
                          {upsert: false, returnDocument: 'after'}
                      )
                  ).value;
            return getAutoRoles(interaction);
        }
    }
    getGuild(interaction);
};
export const buildText = async function ({ctx, text, size, x, y, color, align, font, rotate} = {}) {
    ctx.font = `${size}px ${font ? font : 'DinNext'}`;
    ctx.fillStyle = color ? color : '#ffffff';
    ctx.textAlign = align ? align : 'left';
    if (rotate) {
        ctx.save();
        ctx.translate(200, 1080);
        ctx.rotate(-0.5 * Math.PI);
        ctx.fillText(text, x, y);
    } else {
        ctx.fillText(text, x, y);
    }
};
export const firstletter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
