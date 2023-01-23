import {embedBuilder, ButtonStyle, ComponentType, ButtonBuilder, EmbedBuilder, getTranslations} from '../../methods.js';

export async function execute({interaction, args, guilddata} = {}) {
    const translations = getTranslations();
    await interaction.deferUpdate({ephemeral: true});
    switch (args[1]) {
        case 'title': {
            return await interaction.editReply({
                content: interaction.message.content,
                embeds: [
                    embedBuilder({
                        title: interaction.fields.getTextInputValue('input'),
                        desc: interaction.message.embeds[0].description,
                        color: interaction.message.embeds[0].color,
                        user: interaction.message.embeds[0].author,
                        additionalFields: interaction.message.embeds[0].fields,
                        image: interaction.message.embeds[0].image?.url,
                        thumbnail: interaction.message.embeds[0].thumbnail?.url,
                        footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                    }),
                ],
                components: interaction.message.components,
            });
        }
        case 'description': {
            return await interaction.editReply({
                content: interaction.message.content,
                embeds: [
                    embedBuilder({
                        title: interaction.message.embeds[0].title,
                        desc: interaction.fields.getTextInputValue('input'),
                        color: interaction.message.embeds[0].color,
                        user: interaction.message.embeds[0].author,
                        additionalFields: interaction.message.embeds[0].fields,
                        image: interaction.message.embeds[0].image?.url,
                        thumbnail: interaction.message.embeds[0].thumbnail?.url,
                        footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                    }),
                ],
                components: interaction.message.components,
            });
        }
        case 'thumbnail': {
            return await interaction.editReply({
                content: interaction.message.content,
                embeds: [
                    embedBuilder({
                        title: interaction.message.embeds[0].title,
                        desc: interaction.message.embeds[0].description,
                        color: interaction.message.embeds[0].color,
                        user: interaction.message.embeds[0].author,
                        additionalFields: interaction.message.embeds[0].fields,
                        image: interaction.message.embeds[0].image?.url,
                        thumbnail: interaction.fields.getTextInputValue('input'),
                        footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                    }),
                ],
                components: interaction.message.components,
            });
        }
        case 'image': {
            return await interaction.editReply({
                content: interaction.message.content,
                embeds: [
                    embedBuilder({
                        title: interaction.message.embeds[0].title,
                        desc: interaction.message.embeds[0].description,
                        color: interaction.message.embeds[0].color,
                        user: interaction.message.embeds[0].author,
                        additionalFields: interaction.message.embeds[0].fields,
                        image: interaction.fields.getTextInputValue('input'),
                        thumbnail: interaction.message.embeds[0].thumbnail?.url,
                        footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                    }),
                ],
                components: interaction.message.components,
            });
        }
        case 'color': {
            return await interaction.editReply({
                content: interaction.message.content,
                embeds: [
                    embedBuilder({
                        title: interaction.message.embeds[0].title,
                        desc: interaction.message.embeds[0].description,
                        color: parseInt(interaction.fields.getTextInputValue('input').replace('#', ''), 16),
                        user: interaction.message.embeds[0].author,
                        additionalFields: interaction.message.embeds[0].fields,
                        image: interaction.message.embeds[0].image?.url,
                        thumbnail: interaction.message.embeds[0].thumbnail?.url,
                        footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                    }),
                ],
                components: interaction.message.components,
            });
        }
        case 'content': {
            return await interaction.editReply({
                content: interaction.fields.getTextInputValue('input'),
                embeds: [
                    embedBuilder({
                        title: interaction.message.embeds[0].title,
                        desc: interaction.message.embeds[0].description,
                        color: interaction.message.embeds[0].color,
                        user: interaction.message.embeds[0].author,
                        additionalFields: interaction.message.embeds[0].fields,
                        image: interaction.message.embeds[0].image?.url,
                        thumbnail: interaction.message.embeds[0].thumbnail?.url,
                        footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                    }),
                ],
                components: interaction.message.components,
            });
        }
        case 'fields': {
            switch (args[2]) {
                case 'add': {
                    const component_fields = [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    label: translations[guilddata.lang].embeds.embed_edit_add_field,
                                    customId: `embed;edit;fields;add;${args[3]}`,
                                    style: ButtonStyle.Success,
                                },
                                {
                                    type: ComponentType.Button,
                                    label: translations[guilddata.lang].embeds.overview,
                                    customId: `embed;home;${args[3]}`,
                                    style: ButtonStyle.Danger,
                                },
                            ],
                        },
                    ];
                    const fields = [
                        ...(interaction.message.embeds[0].fields ?? []),
                        {
                            name: interaction.fields.getTextInputValue('name'),
                            value: interaction.fields.getTextInputValue('value'),
                        },
                    ];
                    if (fields.length)
                        component_fields.push(
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.StringSelect,
                                        placeholder: translations[guilddata.lang].embeds.embed_edit_edit_field,
                                        customId: `embed;fields;edit;${args[3]}`,
                                        style: ButtonStyle.Secondary,
                                        options: fields.map(i => {
                                            return {
                                                label: i.name,
                                                value: i.name,
                                                emoji: {id: '949635040424374342', name: 'icons_hammer'},
                                            };
                                        }),
                                    },
                                ],
                            },
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.StringSelect,
                                        placeholder: translations[guilddata.lang].embeds.embed_edit_remove_field,
                                        customId: `embed;fields;remove;${args[3]}`,
                                        style: ButtonStyle.Secondary,
                                        options: fields.map(i => {
                                            return {
                                                label: i.name,
                                                value: i.name,
                                                emoji: {id: '859424400968646676', name: 'icons_ban'},
                                            };
                                        }),
                                    },
                                ],
                            }
                        );
                    return await interaction.editReply({
                        content: interaction.message.content,
                        embeds: [
                            embedBuilder({
                                title: interaction.message.embeds[0].title,
                                desc: interaction.message.embeds[0].description,
                                color: interaction.message.embeds[0].color,
                                user: interaction.message.embeds[0].author,
                                additionalFields: [
                                    ...(interaction.message.embeds[0].fields ?? []),
                                    {
                                        name: interaction.fields.getTextInputValue('name'),
                                        value: interaction.fields.getTextInputValue('value'),
                                    },
                                ],
                                image: interaction.message.embeds[0].image?.url,
                                thumbnail: interaction.message.embeds[0].thumbnail?.url,
                                footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                            }),
                        ],
                        components: component_fields,
                    });
                }
                case 'edit': {
                    const component_fields = [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    label: translations[guilddata.lang].embeds.embed_edit_add_field,
                                    customId: `embed;edit;fields;add;${args[4]}`,
                                    style: ButtonStyle.Success,
                                },
                                {
                                    type: ComponentType.Button,
                                    label: translations[guilddata.lang].embeds.overview,
                                    customId: `embed;home;${args[4]}`,
                                    style: ButtonStyle.Danger,
                                },
                            ],
                        },
                    ];
                    const fields = [...(interaction.message.embeds[0].fields ?? [])];
                    fields.splice(Number(args[3]), 1, {
                        name: interaction.fields.getTextInputValue('name'),
                        value: interaction.fields.getTextInputValue('value'),
                    });
                    if (fields.length)
                        component_fields.push(
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.StringSelect,
                                        placeholder: translations[guilddata.lang].embeds.embed_edit_edit_field,
                                        customId: `embed;fields;edit;${args[4]}`,
                                        style: ButtonStyle.Secondary,
                                        options: fields.map(i => {
                                            return {
                                                label: i.name,
                                                value: i.name,
                                                emoji: {id: '949635040424374342', name: 'icons_hammer'},
                                            };
                                        }),
                                    },
                                ],
                            },
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.StringSelect,
                                        placeholder: translations[guilddata.lang].embeds.embed_edit_remove_field,
                                        customId: `embed;fields;remove;${args[4]}`,
                                        style: ButtonStyle.Secondary,
                                        options: fields.map(i => {
                                            return {
                                                label: i.name,
                                                value: i.name,
                                                emoji: {id: '859424400968646676', name: 'icons_ban'},
                                            };
                                        }),
                                    },
                                ],
                            }
                        );
                    return await interaction.editReply({
                        content: interaction.message.content,
                        embeds: [
                            embedBuilder({
                                title: interaction.message.embeds[0].title,
                                desc: interaction.message.embeds[0].description,
                                color: interaction.message.embeds[0].color,
                                user: interaction.message.embeds[0].author,
                                additionalFields: fields,
                                image: interaction.message.embeds[0].image?.url,
                                thumbnail: interaction.message.embeds[0].thumbnail?.url,
                                footer: 'VALORANT LABS [AUTOROLE SYSTEM]',
                            }),
                        ],
                        components: component_fields,
                    });
                }
            }
        }
    }
    return;
}

export const name = 'embed';
