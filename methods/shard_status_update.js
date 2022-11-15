export const execute = async function (manager) {
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
export const name = 'shard_status_update';
