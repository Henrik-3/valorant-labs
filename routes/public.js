import {getManager, getDB, readFileSync, ApplicationCommandType, ApplicationCommandOptionType, getApplicationCommands} from '../shard.js';

export default async function (fastify, opts, done) {
    fastify.get('/v1/public/stats', async (req, res) => {
        const manager = getManager();
        const guilds = await manager.broadcastEval(client => {
            return {
                guilds: client.guilds.cache.size,
                member: client.guilds.cache.reduce((a, c) => a + c.memberCount, 0),
            };
        });
        console.log(guilds);
        return res.code(200).send({
            shards: manager.shardList.length,
            commands: JSON.parse(readFileSync('./api.json')).all,
            guilds: guilds.reduce((a, c) => a + c.guilds, 0),
            member: guilds.reduce((a, c) => a + c.member, 0),
        });
    });

    fastify.get('/v1/public/featured', async (req, res) => {
        let guilds = await getManager().broadcastEval(client => {
            return client.guilds.cache;
            //return client.guilds.cache.filter(i => i.name.toLowerCase().includes('val'));
        });
        const carray = [];
        for (let i = 0; guilds.length > i; i++) {
            for (let k = 0; guilds[i].length > k; k++) {
                carray.push(guilds[i][k]);
            }
        }
        return res.send(carray.sort((a, b) => b.memberCount - a.memberCount).slice(0, 4));
    });

    fastify.get('/v1/public/guild/:guild', async (req, res) => {
        const gcheck = await getManager().broadcastEval(
            (client, {guild}) => {
                try {
                    const check = client.guilds.cache.has(guild);
                    return check ? client.guilds.cache.get(guild) : false;
                } catch (e) {}
            },
            {context: {guild: req.params.guild}}
        );
        if (gcheck.some(i => typeof i == 'object')) return res.code(200).send({status: 200, data: gcheck.find(i => typeof i == 'object')});
        return res.code(404).send({status: 404, message: 'Unknown Guild'});
    });

    fastify.get('/v1/public/i18n/:lang', async (req, res) => {
        const payload = {
            type: 'website',
            language: req.params.lang,
        };
        return res.send(await getDB('translations').findOne(payload));
    });

    fastify.get('/v1/public/i18n/list', async (req, res) => {
        return res.send(
            (await getDB('translations').find({type: 'website'}).toArray()).map(i => {
                return {language: i.language, name: i.name};
            })
        );
    });

    fastify.get('/v1/public/commands', async (req, res) => {
        const translations = getApplicationCommands();
        const payload = {
            type: 'website',
            language: req.query.lang,
        };
        const db_translations = req.query.lang ? await getDB('translations').findOne(payload) : null;
        return res.send(
            translations
                .map(i => {
                    return {
                        name: i.name_localizations && db_translations ? i.name_localizations[db_translations.discord] ?? i.name : i.name,
                        docs: i.name,
                        description:
                            i.description_localizations && db_translations ? i.description_localizations[db_translations.discord] ?? i.description : i.description,
                        options: i.options
                            ? i.options.map(k => {
                                  return {
                                      required: k.required,
                                      type: ApplicationCommandOptionType[i.type] ?? k.type,
                                      name: k.name_localizations && db_translations ? k.name_localizations[db_translations.discord] ?? k.name : k.name,
                                      options: k.options
                                          ? k.options.map(o => {
                                                return {
                                                    required: o.required,
                                                    type: ApplicationCommandOptionType[i.type] ?? o.type,
                                                    name: o.name_localizations && db_translations ? o.name_localizations[db_translations.discord] ?? o.name : o.name,
                                                    options: [],
                                                };
                                            })
                                          : [],
                                  };
                              })
                            : [],
                        type: ApplicationCommandType[i.type] ?? i.type,
                    };
                })
                .sort((a, b) => {
                    if (a.name.toLowerCase().replaceAll(' ', '') < b.name.toLowerCase().replaceAll(' ', '')) return -1;
                    if (a.name.toLowerCase().replaceAll(' ', '') > b.name.toLowerCase().replaceAll(' ', '')) return 1;
                    return 0;
                })
        );
    });

    fastify.get('/v1/public/shards', async (req, res) => {
        const sharddata = await getManager().broadcastEval(client => {
            return {status: client.ws.status, ping: client.ws.ping, server: client.guilds.cache.size, ready_at: client.readyAt, memory: process.memoryUsage().heapUsed};
        });
        res.send(sharddata);
    });
}
