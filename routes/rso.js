import {getFunction, getTranslations, getDB, axios, basedata, getManager, getAgents, getGamemodes} from '../shard.js';

export default async function (fastify, opts, done) {
    fastify.get('/oauth-finished.html', async (req, res) => {
        console.log(req.query);
        const patchStats = getFunction('patchStats');
        const translations = getTranslations();
        const manager = getManager();
        if (req.query.state) {
            const fstate = await getDB('state').findOne({code: req.query.state});
            if (!fstate)
                return res.redirect(
                    301,
                    `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                        JSON.stringify({
                            rank: null,
                            full: null,
                            error: `The Link is older than one hour, please generate a new one`,
                        })
                    )}`
                );
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
            if (userinfo.response)
                return res.redirect(
                    301,
                    `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                        JSON.stringify({
                            rank: null,
                            full: null,
                            error: `There seems to be an error with the riot server | Status: ${userinfo.response.status}`,
                        })
                    )}`
                );
            if (fstate.type == 'delete') {
                getDB('rso').deleteMany({puuid: userinfo.data.puuid});
                getDB('state').deleteOne({code: req.query.state});
                return res.redirect(
                    301,
                    `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                        JSON.stringify({
                            rank: null,
                            full: null,
                            error: null,
                            message: 'Your account was successfully set to a private state',
                        })
                    )}`
                );
            }
            const region = await axios
                .get(`https://europe.api.riotgames.com/riot/account/v1/active-shards/by-game/val/by-puuid/${userinfo.data.puuid}`, {
                    headers: {'X-Riot-Token': basedata.riottoken},
                })
                .catch(error => {
                    return error;
                });
            if (region.response)
                return res.redirect(
                    301,
                    `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                        JSON.stringify({
                            rank: null,
                            full: null,
                            error: `There seems to be an error with region of your account | Status: ${region.response.status} | Message: ${region.response.message}`,
                            message: null,
                        })
                    )}`
                );
            const db = await axios
                .get(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURI(userinfo.data.gameName)}/${encodeURI(userinfo.data.tagLine)}?asia=true`)
                .catch(error => {
                    return error;
                });
            if (db.response)
                return res.redirect(
                    301,
                    `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                        JSON.stringify({
                            rank: null,
                            full: null,
                            error: `There seems to be an error with the requested account | Status: ${db.response.status} | Message: ${db.response.data.message}`,
                            message: null,
                        })
                    )}`
                );
            if (fstate.type == 'autorole') {
                const guilddata = await getDB('settings').findOne({gid: fstate.guild});
                const mmr = await axios
                    .get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${region.data.activeShard}/${db.data.data.puuid}?asia=true`)
                    .catch(error => {
                        return error;
                    });
                if (mmr.response)
                    return res.redirect(
                        301,
                        `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                            JSON.stringify({
                                rank: null,
                                full: null,
                                error: `There seems to be an error with the mmr of that account | Status: ${mmr.response.status} | Message: ${mmr.response.data.message}`,
                                message: null,
                            })
                        )}`
                    );
                if (mmr.data.data.current_data.currenttier == null || mmr.data.data.current_data.games_needed_for_rating != 0) {
                    if (guilddata.autoroles.some(i => i.name == 'unranked')) {
                        await manager.broadcastEval(
                            async (c, {user, guild, ra, rm}) => {
                                if (c.guilds.cache.has(guild)) {
                                    const member = await c.guilds.cache
                                        .get(guild)
                                        .members.fetch(user)
                                        .catch(e => {
                                            console.log(e);
                                        });
                                    await member?.roles?.remove(rm).catch(e => {
                                        console.log(e);
                                    });
                                    await member?.roles?.add(ra).catch(e => {
                                        console.log(e);
                                    });
                                }
                            },
                            {
                                context: {
                                    user: fstate.userid,
                                    guild: fstate.guild,
                                    ra: guilddata.autoroles.find(i => i.name == 'unranked').id,
                                    rm: guilddata.autoroles.filter(i => i.name != 'unranked').map(i => i.id),
                                },
                            }
                        );
                    }
                    return res.redirect(
                        301,
                        `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                            JSON.stringify({
                                rank: null,
                                full: null,
                                error: translations[guilddata.lang].mmr.no_rank_desc,
                                message: null,
                            })
                        )}`
                    );
                }
                if (!guilddata.autoroles.some(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == item.name))
                    return res.redirect(
                        301,
                        `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                            JSON.stringify({
                                rank: null,
                                full: null,
                                error: "The rank you have isn't configured yet, please ask the owner or admin of the server to reconfigure/resend the autorole system",
                                message: null,
                            })
                        )}`
                    );
                await manager
                    .broadcastEval(
                        async (c, {user, guild, ra, rm}) => {
                            if (c.guilds.cache.has(guild)) {
                                const member = await c.guilds.cache
                                    .get(guild)
                                    .members.fetch(user)
                                    .catch(e => {
                                        console.log(e);
                                    });
                                await member.roles.remove(rm).catch(e => {
                                    console.log(e);
                                });
                                await member.roles.add(ra).catch(e => {
                                    console.log(e);
                                });
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
                    )
                    .catch(async e => {
                        await manager.broadcastEval(
                            (c, {embed}) => {
                                if (c.channels.cache.has('992792200918347876')) return c.channels.cache.get('992792200918347876').send({embeds: [embed]});
                            },
                            {
                                context: {
                                    embed: {
                                        title: 'Error',
                                        description: `\`\`\`${JSON.stringify(e)}\`\`\``,
                                        color: 16777215,
                                    },
                                },
                            }
                        );
                    });
                getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
                getDB('linkv2').updateOne(
                    {userid: fstate.userid},
                    {$set: {puuid: db.data.data.puuid, rpuuid: userinfo.data.puuid, region: region.data.activeShard}},
                    {upsert: true}
                );
                await getDB('linkv2-logs').insertOne({
                    userid: fstate.userid,
                    date: new Date(),
                    admin: null,
                    guild: {id: fstate.guild, name: null},
                    event: 'add',
                    type: 'autorole',
                    rank: {
                        name: mmr.data.data.current_data.currenttierpatched.split(' ')[0],
                        id: guilddata.autoroles.find(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == item.name).id,
                    },
                    riotid: userinfo.data.gameName && userinfo.data.tagLine ? `${userinfo.data.gameName}#${userinfo.data.tagLine}` : null,
                    rpuuid: userinfo.data.puuid,
                    puuid: db.data.data.puuid,
                });
                getDB('state').deleteOne({code: req.query.state});
                return res.redirect(
                    301,
                    `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                        JSON.stringify({
                            rank: mmr.data.data.current_data.currenttier,
                            full: null,
                            error: null,
                            message: `Your account was successfully linked and your role was given`,
                        })
                    )}`
                );
            }
            if (fstate.type == 'link') {
                getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
                getDB('linkv2').updateOne(
                    {userid: fstate.userid},
                    {$set: {puuid: db.data.data.puuid, rpuuid: userinfo.data.puuid, region: region.data.activeShard}},
                    {upsert: true}
                );
                await getDB('linkv2-logs').insertOne({
                    userid: fstate.userid,
                    date: new Date(),
                    admin: null,
                    guild: {id: fstate.guild, name: null},
                    event: 'add',
                    type: 'link',
                    rank: null,
                    riotid: userinfo.data.gameName && userinfo.data.tagLine ? `${userinfo.data.gameName}#${userinfo.data.tagLine}` : null,
                    rpuuid: userinfo.data.puuid,
                    puuid: db.data.data.puuid,
                });
                getDB('state').deleteOne({code: req.query.state});
                return res.redirect(
                    301,
                    `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                        JSON.stringify({
                            rank: null,
                            full: null,
                            error: null,
                            message: `Your account was successfully linked`,
                        })
                    )}`
                );
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
                    return res.redirect(
                        301,
                        `https://valorantlabs.xyz/rso/oauth?data=${btoa(
                            JSON.stringify({
                                rank: null,
                                full: null,
                                error: `There seems to be an issue with your matchlist | Status: ${matchlist.response.status} | PUUID: ${db.data.data.puuid}`,
                                message: null,
                            })
                        )}`
                    );
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
                await getDB('linkv2-logs').insertOne({
                    userid: fstate.userid,
                    date: new Date(),
                    admin: null,
                    guild: {id: fstate.guild, name: null},
                    event: 'add',
                    type: 'stats',
                    rank: null,
                    riotid: userinfo.data.gameName && userinfo.data.tagLine ? `${userinfo.data.gameName}#${userinfo.data.tagLine}` : null,
                    rpuuid: userinfo.data.puuid,
                    puuid: db.data.data.puuid,
                });
                getDB('state').deleteOne({code: req.query.state});
                return res.redirect(301, 'https://discord.com/channels/@me');
            }
            return;
        }
    });
}
