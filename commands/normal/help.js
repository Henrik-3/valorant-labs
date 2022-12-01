import {embedBuilder, getTranslations, ComponentType, ButtonStyle} from '../../methods.js';
export async function execute({message, guilddata} = {}) {
    const translations = getTranslations();
    return message.reply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].help_title,
                desc: translations[guilddata.lang].help_desc,
                image: 'https://valorantlabs.xyz/css/valorant-logo.png',
                footer: 'VALORANT LABS [HELP]',
            }),
        ],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        url: translations[guilddata.lang].cmdurl,
                        style: ButtonStyle.Link,
                        label: translations[guilddata.lang].cmd,
                    },
                ],
            },
        ],
    });
}
export const name = 'help';
