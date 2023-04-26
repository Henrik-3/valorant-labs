export default async function (fastify, opts, done) {
    fastify.get('/invite/discord', async (req, res) => {
        res.redirect(
            'https://discord.com/oauth2/authorize?client_id=702201518329430117&permissions=2416307264&redirect_uri=https%3A%2F%2Fdiscord.gg%2FZr5eF5D&scope=bot%20applications.commands'
        );
    });

    fastify.get('/invite/guilded', async (req, res) => {
        res.redirect('https://www.guilded.gg/b/5f089b0d-fa2c-4335-91c6-54df79f5d6e1');
    });
}
