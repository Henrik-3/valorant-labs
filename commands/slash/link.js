import {getDB, translations, embedBuilder, ButtonStyle, ComponentType, uuidv4} from '../../methods.js';
import {getLink} from '../../methods/getLink.js';

export async function execute({interaction, guilddata} = {}) {
    switch (interaction.options._subcommand) {
        case 'get':
            const link = await getLink({user: interaction.user});
            if (link == null || typeof link.error == 'number')
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].link.nolink_title,
                            desc: translations[guilddata.lang].link.nolink_desc,
                            footer: 'VALORANT LABS [LINK UNKNOWN]',
                        }),
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Danger,
                                    customId: 'link;generate',
                                    label: translations[guilddata.lang].link.generate_link,
                                },
                            ],
                        },
                    ],
                });
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].link.clink_title,
                        desc: translations[guilddata.lang].link.clink_desc + ` \`${link.name}#${link.tag}\``,
                        footer: 'VALORANT LABS [LINK GET]',
                    }),
                ],
            });
        case 'add':
            const uuid = uuidv4();
            await getDB('state').insertOne({userid: interaction.user.id, code: uuid, expireAt: new Date(), type: 'link'});
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].link.link_generated_title,
                        desc: translations[guilddata.lang].link.link_generated_desc + `https://valorantlabs.xyz/v1/rso/redirect/${uuid}`,
                        footer: 'VALORANT LABS [LINK GENERATED]',
                    }),
                ],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Link,
                                url: `https://valorantlabs.xyz/v1/rso/redirect/${uuid}`,
                                label: translations[guilddata.lang].link.generate_link,
                            },
                        ],
                    },
                ],
            });
        case 'remove':
            await getDB('linkv2').deleteOne({userid: interaction.user.id});
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].link.removelink_title,
                        desc: translations[guilddata.lang].link.removelink_desc,
                        footer: 'VALORANT LABS [LINK REMOVE]',
                    }),
                ],
            });
    }
}
export const name = 'link';
