import {checkVerify} from '../shard.js';

export default async function (fastify, opts, done) {
    fastify.get('/api/v1/auth', async (req, res) => {
        const dbcheck = await checkVerify(req, res);
        return res.code(200).send({message: 'ok', user: dbcheck.user});
    });
}
