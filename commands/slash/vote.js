import {embedBuilder, getTranslations, ComponentType, ButtonStyle} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
    const translations = getTranslations();
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].vote.title,
                desc: translations[guilddata.lang].vote.desc,
                footer: 'VALORANT LABS [VOTES]',
            }),
        ],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        url: 'https://top.gg/bot/702201518329430117/vote',
                        label: 'Vote',
                    },
                ],
            },
        ],
    });
}
export const name = 'vote';
