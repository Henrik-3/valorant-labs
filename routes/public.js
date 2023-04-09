import {getManager, getDB} from '../shard.js';

export default async function (fastify, opts, done) {
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

    fastify.get('/v1/public/featured', async (req, res) => {
        const guilds = (
            await getManager().broadcastEval(client => {
                return client.guilds.cache;
            })
        )[0];
        return res.send(guilds.sort((a, b) => b.memberCount - a.memberCount).slice(0, 4));
    });

    fastify.get('/v1/public/i18n', async (req, res) => {
        return res.send(await getDB('translations').find({type: 'website'}).toArray());
    });

    fastify.get('/v1/public/i18n/list', async (req, res) => {
        return res.send((await getDB('translations').find({type: 'website'}).toArray()).map(i => i.name));
    });
}
