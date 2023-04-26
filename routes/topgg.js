import {getManager} from '../shard.js';

export default async function (fastify, opts, done) {
    fastify.post('/v1/topgg/vote', async (req, res) => {
        const user = await getManager().broadcastEval(
            async (c, {user}) => {
                return await c.users.fetch(user);
            },
            {shard: 0, context: {user: req.body.user}}
        );
        await getManager().broadcastEval(
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
                            url: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : null,
                        },
                    },
                },
            }
        );
        res.send('ok');
    });
}
