import {existsSync, readFileSync, brotliDecompressSync} from '../shard.js';

export default async function (fastify, opts, done) {
    fastify.get('/cdn/v1/agents/:uuid', async (req, res) => {
        if (existsSync(`assets/agents/${req.params.uuid}.png`)) return res.type('image/png').send(readFileSync(`assets/agents/${req.params.uuid}.png`));
        else return res.code(404).send({error: 'Ressource not found'});
    });

    fastify.get('/cdn/v1/backgrounds/:uuid', async (req, res) => {
        if (existsSync(`settings/backgrounds/${req.params.uuid}.png`))
            return res.type('image/png').send(brotliDecompressSync(readFileSync(`settings/backgrounds/${req.params.uuid}.png`)));
        else return res.code(404).send({error: 'Ressource not found'});
    });
}
