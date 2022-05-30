import {ButtonStyle, ComponentType, embedBuilder} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: 'Unofficial-VALORANT-API',
                desc: 'Unofficial Valorant API using the VALORANT Ingame API',
                image: 'https://opengraph.githubassets.com/3bbac063af945bc9eed6be07446a8760a5b892eea59e7d1e515b7770ef13b6/Henrik-3/unofficial-valorant-api',
                footer: 'VALORANT LABS [API]',
            }),
        ],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        url: 'https://github.com/Henrik-3/unofficial-valorant-api',
                        style: ButtonStyle.Link,
                        label: 'GitHub',
                    },
                ],
            },
        ],
    });
}
export const name = 'api';
