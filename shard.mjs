import {ShardingManager} from 'discord.js';
import {AutoPoster} from 'topgg-autoposter';
import {getDB, translations, patchStats, riottoken, getAgents, getGamemodes, shard_status_update, fetchWebsite} from './methods.js';
import {readFileSync, writeFileSync} from 'fs';
import * as f from 'fastify';
import axios from 'axios';
import path from 'path';
import randomize from 'randomatic';
const fastify = f.fastify({logger: {level: 'error'}});
const basedata = JSON.parse(readFileSync('./basedata.json'));
const __dirname = path.resolve();

const manager = new ShardingManager('./index.js', {
    token: basedata.discordtokenreal,
    totalShards: 10,
    respawn: true,
});
const poster = AutoPoster(basedata.dbltoken, manager);

let restart = false;
setInterval(async () => {
    fetchWebsite(manager);
    shard_status_update(manager);
}, 150000);

manager.on('shardCreate', async shard => {
    shard.on('message', async message => {
        if (typeof message == 'string' && message.startsWith('restart')) {
            manager.shards.get(Number(message.split('-')[1])).respawn();
            restart = true;
            setTimeout(function () {
                restart = false;
            }, 60000);
        }
    });
    shard.on('ready', async rshard => {
        console.log('Ready', shard.id);
        if (manager.shards.size == manager.totalShards && restart == false) {
            fetchWebsite(manager);
            shard_status_update(manager);
            manager.shards.forEach(sshard => {
                sshard.send('startup');
            });
        }
    });
    console.log(`Launched shard ${shard.id}`);
});

fastify.register(await import('fastify-cors'), {});

fastify.register(await import('fastify-static'), {
    root: path.join(__dirname, 'website', 'build'),
});

fastify.get('/', async (req, res) => {
    const usage = readFileSync('./website/build/index.html', {encoding: 'utf-8'});
    res.type('text/html').send(usage);
});

fastify.get('/v1/guild-available/:guild', async (req, res) => {
    const gcheck = await manager.broadcastEval(
        (client, {guild}) => {
            try {
                const check = client.guilds.cache.has(guild);
                return check ? client.guilds.cache.get(guild) : false;
            } catch (e) {}
        },
        {context: {guild: req.params.guild}}
    );
    if (gcheck.some(item => typeof item == 'object')) return res.code(200).send({status: 200, data: gcheck.find(item => typeof item == 'object')});
    res.code(404).send({status: 404, message: 'Guild unavailable'});
});

fastify.get('/v1/shard-state', async (req, res) => {
    const sharddata = await manager.broadcastEval(client => {
        return {status: client.ws.status, ping: client.ws.ping, server: client.guilds.cache.size};
    });
    res.send(sharddata);
});

fastify.get('/v1/pagedata', async (req, res) => {
    if (req.query.type == 'landingpage') {
        const guild = (await manager.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0);
        const commands = JSON.parse(readFileSync('./api.json'));
        const utils = JSON.parse(readFileSync('./utils.json', {encoding: 'utf-8'}));
        const parselang = {
            de: 'German',
            en: 'English',
            jp: 'Japanese',
            'pt-br': 'Portuguese',
            fr: 'French',
            es: 'Spanish',
            vi: 'Vietname',
        };
        return res.code(200).send({
            guild: guild,
            cmds: commands.all,
            cmdlist: utils.cmds,
            langlist: utils.langlist,
            translations: utils.translations,
            clang: req.query.lang != undefined ? (parselang[req.query.lang] != undefined ? parselang[req.query.lang] : 'English') : 'English',
        });
    } else if (req.query.type == 'translation') {
        const translations = JSON.parse(readFileSync('./lang.json', {encoding: 'utf-8'}));
        const utils = JSON.parse(readFileSync('./utils.json', {encoding: 'utf-8'}));
        return res.code(200).send({langtranslations: translations, translations: utils.translations});
    } else if (req.query.type == 'shards') {
        const sharddata = await manager.broadcastEval(client => {
            return {status: client.ws.status, ping: client.ws.ping, server: client.guilds.cache.size};
        });
        res.send(sharddata);
    } else {
        return res.send('ok');
    }
});

fastify.post('/v1/topgg/vote', async (req, res) => {
    const user = await manager.broadcastEval(
        async (c, {user}) => {
            return await c.users.fetch(user);
        },
        {shard: 0, context: {user: req.body.user}}
    );
    await manager.broadcastEval(
        (c, {embed}) => {
            if (c.channels.cache.has('913842504611266560')) return c.channels.cache.get('913842504611266560').send({embeds: [embed]});
        },
        {
            context: {
                embed: {
                    title: 'New Vote',
                    description: `ID: ${user.id} | Username: ${user.tag} | <t:${Math.round(+new Date() / 1000)}:F>`,
                    color: 16777215,
                    thumbnail: {
                        url: user.avatar != null ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : null,
                    },
                },
            },
        }
    );
    res.send('ok');
});

fastify.get('/invite', async (req, res) => {
    res.redirect(
        'https://discord.com/oauth2/authorize?client_id=702201518329430117&permissions=2416307264&redirect_uri=https%3A%2F%2Fdiscord.gg%2FZr5eF5D&scope=bot%20applications.commands'
    );
});

fastify.get('/invite/guilded', async (req, res) => {
    res.redirect('https://www.guilded.gg/b/5f089b0d-fa2c-4335-91c6-54df79f5d6e1');
});

fastify.post('/v1/translations', async (req, res) => {
    const newObject = {};
    for (let i = 0; req.body.length > i; i++) {
        newObject[req.body[i].name] = req.body[i].value;
    }
    writeFileSync(`./translations/${randomize('Aa0', 6)}.json`, JSON.stringify(newObject, null, 2));
    res.code(200).send('ok');
});

fastify.get('/v1/rso/redirect/:state', async (req, res) => {
    res.redirect(
        301,
        `https://auth.riotgames.com/login#client_id=valorantlabs&redirect_uri=https%3A%2F%2Fvalorantlabs.xyz%2Foauth-finished.html&response_type=code&scope=openid%20offline_access&prompt=login&state=${req.params.state}`
    );
});

fastify.get('/oauth-finished.html', async (req, res) => {
    console.log(req.query);
    if (req.query.state) {
        const fstate = await getDB('state').findOne({code: req.query.state});
        if (!fstate) return res.code(400).send({error: 'The Link is older than one hour, please generate a new one'});
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', req.query.code);
        formData.append('redirect_uri', 'https://valorantlabs.xyz/oauth-finished.html');
        const tokens = await axios
            .post('https://auth.riotgames.com/token', formData, {
                headers: {Authorization: `Basic ${Buffer.from(basedata.client_secret).toString('base64')}`},
            })
            .catch(error => {
                return error;
            });
        const userinfo = await axios
            .get('https://europe.api.riotgames.com/riot/account/v1/accounts/me', {
                headers: {Authorization: `Bearer ${tokens.data.access_token}`},
            })
            .catch(error => {
                return error;
            });
        if (userinfo.response) return res.code(500).send({error: `There seems to be an error with the riot server | Status: ${userinfo.response.status}`});
        const region = await axios
            .get(`https://europe.api.riotgames.com/riot/account/v1/active-shards/by-game/val/by-puuid/${userinfo.data.puuid}`, {
                headers: {'X-Riot-Token': basedata.riottoken},
            })
            .catch(error => {
                return error;
            });
        if (region.response)
            return res.code(500).send({
                error: `There seems to be an error with region of your account | Status: ${region.response.status} | Message: ${region.response.message}`,
            });
        const db = await axios
            .get(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURI(userinfo.data.gameName)}/${encodeURI(userinfo.data.tagLine)}?asia=true`)
            .catch(error => {
                return error;
            });
        if (db.response)
            return res.code(500).send({
                error: `There seems to be an error with the requested account | Status: ${db.response.status} | Message: ${db.response.data.message}`,
            });
        if (fstate.type == 'autorole') {
            const guilddata = await getDB('settings').findOne({gid: fstate.guild});
            const mmr = await axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${region.data.activeShard}/${db.data.data.puuid}?asia=true`).catch(error => {
                return error;
            });
            if (mmr.response)
                return res.code(500).send({
                    error: `There seems to be an error with the mmr of that account | Status: ${mmr.response.status} | Message: ${mmr.response.data.message}`,
                });
            if (mmr.data.data.current_data.currenttier == null || mmr.data.data.current_data.games_needed_for_rating != 0)
                return res.code(500).send({error: translations[guilddata.lang].mmr.no_rank_desc});
            if (
                mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == 'ascendant' &&
                !guilddata.autoroles.some(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == item.name)
            )
                return res
                    .code(404)
                    .send({
                        message: "The new rank ASCENDANT isn't configured yet, please ask the owner or admin of the server to reconfigure/resend the autorole system",
                    });
            await manager.broadcastEval(
                async (c, {user, guild, ra, rm}) => {
                    if (c.guilds.cache.has(guild)) {
                        const member = await c.guilds.cache.get(guild).members.fetch(user);
                        await member.roles.remove(rm);
                        await member.roles.add(ra);
                    }
                },
                {
                    context: {
                        user: fstate.userid,
                        guild: fstate.guild,
                        ra: guilddata.autoroles.find(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == item.name).id,
                        rm: guilddata.autoroles
                            .filter(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() != item.name)
                            .map(item => {
                                return item.id;
                            }),
                    },
                }
            );
            getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
            getDB('linkv2').updateOne(
                {userid: fstate.userid},
                {$set: {puuid: db.data.data.puuid, rpuuid: userinfo.data.puuid, region: region.data.activeShard}},
                {upsert: true}
            );
            getDB('state').deleteOne({code: req.query.state});
            return res.code(200).send({message: `Your account was successfully linked and your role was given`});
        }
        if (fstate.type == 'link') {
            getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
            getDB('linkv2').updateOne(
                {userid: fstate.userid},
                {$set: {puuid: db.data.data.puuid, rpuuid: userinfo.data.puuid, region: region.data.activeShard}},
                {upsert: true}
            );
            getDB('state').deleteOne({code: req.query.state});
            return res.code(200).send({message: `Your account was successfully linked`});
        }
        if (fstate.type == 'stats') {
            const matchlist = await axios
                .get(`https://${region.data.activeShard}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${userinfo.data.puuid}`, {
                    headers: {'X-Riot-Token': riottoken},
                })
                .catch(error => {
                    return error;
                });
            if (matchlist.response)
                return res.code(500).send({
                    error: `There seems to be an issue with your matchlist | Status: ${matchlist.response.status} | Message: ${db.data.data.puuid}`,
                });
            patchStats({
                dbstats: {
                    puuid: userinfo.data.puuid,
                    ingamepuuid: db.data.data.puuid,
                    region: region.data.activeShard,
                    type: 'unofficial',
                    tracker: false,
                    last_update: Date.now(),
                    agents: [],
                    matches: [],
                    stats: {},
                },
                mmatches: matchlist.data.history,
                agent: getAgents(),
                modes: getGamemodes(),
            });
            getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
            getDB('linkv2').updateOne(
                {userid: fstate.userid},
                {$set: {puuid: db.data.data.puuid, rpuuid: userinfo.data.puuid, region: region.data.activeShard}},
                {upsert: true}
            );
            getDB('state').deleteOne({code: req.query.state});
            return res.redirect(301, 'https://discord.com/channels/@me');
        }
        return;
    }
});

fastify.get('/v1/login', async (req, res) => {
    if (!req.query.guild || !req.query.channel || !req.query.message || !req.query.puuid) res.code(400).send({status: 400, message: 'Missing Query String'});
    res.header('Set-Cookie', `guild=${req.query.guild}; Path=/`);
    res.header('Set-Cookie', `channel=${req.query.channel}; Path=/`);
    res.header('Set-Cookie', `message=${req.query.message}; Path=/`);
    res.header('Set-Cookie', `puuid=${req.query.puuid}; Path=/`);
    res.redirect(
        'https://auth.riotgames.com/login#client_id=valorantlabs&redirect_uri=https%3A%2F%2Fvalorantlabs.xyz%2Foauth-finished.html&response_type=code&scope=openid%20offline_access&ui_locales=en'
    );
});

fastify.listen(4200, '127.0.0.1', () => {
    console.log('API Online');
});
manager.spawn({timeout: -1});
