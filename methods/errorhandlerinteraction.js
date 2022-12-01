import {embedBuilder, uuidv4, getDB, ComponentType, ButtonStyle, getTranslations} from '../methods.js';
export const errorhandlerinteraction = async function ({interaction, status, type, lang, data, name, tag} = {}) {
    const translations = getTranslations();
    if (status == 451) {
        const uuid = uuidv4();
        await getDB('state').insertOne({userid: interaction.user.id, code: uuid, expireAt: new Date(), type: 'stats'});
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[451].title,
                    desc: translations[lang].response[451].description,
                    footer: 'VALORANT LABS [ERROR 451]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_login,
                            style: ButtonStyle.Link,
                            url: `https://valorantlabs.xyz/v1/rso/redirect/${uuid}`,
                        },
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_update,
                            style: ButtonStyle.Danger,
                            customId: `stats;update;${name};${tag}`,
                        },
                        {
                            type: ComponentType.Button,
                            label: translations[lang].response[451].component_rank,
                            style: ButtonStyle.Danger,
                            customId: `mmr;${name};${tag}`,
                        },
                    ],
                },
            ],
        });
    }
    if (!translations[lang].response[status])
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[500].title,
                    desc: translations[lang].response[500][type] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                    footer: 'VALORANT LABS [ERROR 500]',
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
                },
            ],
        });
    if (!translations[lang].response[status][type])
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[lang].response[status].title,
                    desc: translations[lang].response[status]['default'] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                    footer: `VALORANT LABS [ERROR ${status}]`,
                }),
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
                },
            ],
        });
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[lang].response[status].title,
                desc: translations[lang].response[status][type] + `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``,
                footer: `VALORANT LABS [ERROR ${status}]`,
            }),
        ],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [{type: ComponentType.Button, label: translations[lang].support, style: ButtonStyle.Link, url: 'https://discord.gg/Zr5eF5D'}],
            },
        ],
    });
};
