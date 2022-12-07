import {MongoClient} from 'mongodb';
import {readFileSync, writeFileSync, unlinkSync, readdirSync} from 'fs';
import {brotliDecompressSync, brotliCompressSync, constants} from 'zlib';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import system from 'systeminformation';
import pretty from 'pretty-bytes';
import {PermissionFlagsBits, ComponentType, ButtonStyle, TextInputStyle, ActivityType, AttachmentBuilder} from 'discord.js';
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
let translations = JSON.parse(readFileSync('./translations.json'));
let valpapiagents = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true').catch(error => {
    return error;
});
let valpapigamemodes = await axios.get('https://valorant-api.com/v1/gamemodes').catch(error => {
    return error;
});
let crosshairs = await axios.get('https://www.vcrdb.net/apiv3/get').catch(error => {
    return error;
});

setInterval(async () => {
    valpapiagents = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true').catch(error => {
        return error;
    });
    valpapigamemodes = await axios.get('https://valorant-api.com/v1/gamemodes').catch(error => {
        return error;
    });
    crosshairs = await axios.get('https://www.vcrdb.net/apiv3/get').catch(error => {
        return error;
    });
    translations = JSON.parse(readFileSync('./translations.json'));
    const methodfiles = readdirSync('./methods').filter(file => file.endsWith('.js'));
    for (let i = 0; methodfiles.length > i; i++) {
        const cmd = await import(`./methods/${methodfiles[i]}?update=${Date.now()}`);
        functions[methodfiles[i].split('.')[0]] = cmd[methodfiles[i].split('.')[0]];
    }
}, 60000 * 5);

axiosRetry(axios, {
    retries: 2,
    shouldResetTimeout: true,
    retryCondition: error => {
        return error.code === 'ECONNABORTED' || error.code === 'ECONNRESET' || error.code === 'ERR_REQUEST_ABORTED';
    },
});

export {
    pretty,
    axios,
    translations,
    moment,
    ComponentType,
    ButtonStyle,
    TextInputStyle,
    ActivityType,
    mongoclient,
    AttachmentBuilder,
    Canvas,
    randomize,
    unlinkSync,
    writeFileSync,
    brotliCompressSync,
    brotliDecompressSync,
};
export const perms = PermissionFlagsBits;
export const sysinfo = system;
export const topgg = basedata.dbltoken;
export const roles = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'ascendant', 'immortal', 'radiant'];
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
    pl: 'pl',
    it: 'it',
    tr: 'tr',
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
    {
        name: 'Harbor',
        id: '95b78ed7-463786d9-7e4171ba-8c293152',
        discord_id: '<:controller:868803058711277598>',
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
    swiftplay: {
        name: 'Swiftplay',
        path: 'swiftplay.png',
        emoji: {
            name: 'swiftplay',
            id: '1049838296194359297',
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
    '/Game/Maps/Pitt/Pitt': 'Pearl',
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
        mmr: 'assets/background/VALORANT_mmr_ascendant.png',
        color: '#6ae2af',
        discordid: '<:ascendant1:987519801868025886>',
    },
    22: {
        mmr: 'assets/background/VALORANT_mmr_ascendant.png',
        color: '#6ae2af',
        discordid: '<:ascendant2:987519799590522920>',
    },
    23: {
        mmr: 'assets/background/VALORANT_mmr_ascendant.png',
        color: '#6ae2af',
        discordid: '<:ascendant3:987519800521662525>',
    },
    24: {
        mmr: 'assets/background/VALORANT_mmr_immortal.png',
        color: '#da3f76',
        discordid: '<:immortal1:862005437264429056>',
    },
    25: {
        mmr: 'assets/background/VALORANT_mmr_immortal.png',
        color: '#da3f76',
        discordid: '<:immortal2:862005462580985856>',
    },
    26: {
        mmr: 'assets/background/VALORANT_mmr_immortal.png',
        color: '#da3f76',
        discordid: '<:immortal3:862005493840478208>',
    },
    27: {
        mmr: 'assets/background/VALORANT_mmr_radiant.png',
        color: '#d3d058',
        discordid: '<:radiant:862005538392506408>',
    },
};
export const old_ranks = {
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
export const functions = {};
export const sleep = ms => new Promise(r => setTimeout(r, ms));
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
export const getGamemodes = function () {
    return valpapigamemodes.data.data;
};
export const getAgents = function () {
    return valpapiagents.data.data;
};
export const getTranslations = function () {
    return translations;
};
export const getCrosshairs = function () {
    return crosshairs.data;
};
export const getFunction = function (name) {
    return functions[name];
};
export const updateFunctions = async function () {
    const methodfiles = readdirSync('./methods').filter(file => file.endsWith('.js'));
    for (let i = 0; methodfiles.length > i; i++) {
        const cmd = await import(`./methods/${methodfiles[i]}?update=${Date.now()}`);
        functions[methodfiles[i].split('.')[0]] = cmd[methodfiles[i].split('.')[0]];
    }
    console.log(functions);
};
export const embedBuilder = function ({title, desc, user, additionalFields = [], color, thumbnail, image, footer, url} = {}) {
    return {
        title: title,
        url,
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
export const getCustomBackground = function (uuid) {
    return brotliDecompressSync(readFileSync(`./settings/backgrounds/${uuid}.png`));
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
export const firstletter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
