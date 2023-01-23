import {getTranslations, ButtonStyle, ComponentType, embedBuilder, TextInputStyle, perms} from '../../methods.js';

export async function execute({interaction, args, guilddata} = {}) {
    if (args[1].includes('appedit')) {
        if (args[1].includes('-')) {
            args.push(args[1].split('-')[1]);
            args[1] = 'appedit';
        }
    }
    if (args[2].includes('appedit')) {
        if (args[2].includes('-')) {
            args[2] = args[2].split('-')[1];
        }
    }
    const translations = getTranslations();
    switch (args[1]) {
        case 'edit': {
            switch (args[2]) {
                case 'title': {
                    return interaction.showModal({
                        title: translations[guilddata.lang].embeds.embed_edit_title,
                        customId: `embed;title`,
                        components: [
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.TextInput,
                                        customId: 'input',
                                        style: TextInputStyle.Short,
                                        label: translations[guilddata.lang].embeds.title,
                                        required: true,
                                        value: interaction.message.embeds[0].title,
                                    },
                                ],
                            },
                        ],
                    });
                }
                case 'description': {
                    return interaction.showModal({
                        title: translations[guilddata.lang].embeds.embed_edit_desc,
                        customId: `embed;description`,
                        components: [
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.TextInput,
                                        customId: 'input',
                                        style: TextInputStyle.Paragraph,
                                        label: translations[guilddata.lang].embeds.desc,
                                        required: true,
                                        value: interaction.message.embeds[0].description,
                                    },
                                ],
                            },
                        ],
                    });
                }
                case 'thumbnail': {
                    return interaction.showModal({
                        title: translations[guilddata.lang].embeds.embed_edit_thumbnail,
                        customId: `embed;thumbnail`,
                        components: [
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.TextInput,
                                        customId: 'input',
                                        style: TextInputStyle.Short,
                                        label: translations[guilddata.lang].embeds.thumbnail,
                                        required: true,
                                        value: interaction.message.embeds[0].thumbnail ? interaction.message.embeds[0].thumbnail.url : '',
                                    },
                                ],
                            },
                        ],
                    });
                }
                case 'image': {
                    return interaction.showModal({
                        title: translations[guilddata.lang].embeds.embed_edit_image,
                        customId: `embed;image`,
                        components: [
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.TextInput,
                                        customId: 'input',
                                        style: TextInputStyle.Short,
                                        label: translations[guilddata.lang].embeds.image,
                                        required: true,
                                        value: interaction.message.embeds[0].image ? interaction.message.embeds[0].image.url : '',
                                    },
                                ],
                            },
                        ],
                    });
                }
                case 'color': {
                    return interaction.showModal({
                        title: translations[guilddata.lang].embeds.embed_edit_color,
                        customId: `embed;color`,
                        components: [
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.TextInput,
                                        customId: 'input',
                                        style: TextInputStyle.Short,
                                        label: translations[guilddata.lang].embeds.color,
                                        required: true,
                                        value: `#${interaction.message.embeds[0].color.toString(16)}`,
                                    },
                                ],
                            },
                        ],
                    });
                }
                case 'content': {
                    return interaction.showModal({
                        title: translations[guilddata.lang].embeds.embed_edit_content,
                        customId: `embed;content`,
                        components: [
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.TextInput,
                                        customId: 'input',
                                        style: TextInputStyle.Paragraph,
                                        label: translations[guilddata.lang].embeds.content,
                                        required: true,
                                        value: interaction.message.content,
                                    },
                                ],
                            },
                        ],
                    });
                }
                case 'fields': {
                    switch (args[3]) {
                        case 'sub': {
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
                            if (interaction.message.embeds[0].fields?.length)
                                component_fields.push(
                                    {
                                        type: ComponentType.ActionRow,
                                        components: [
                                            {
                                                type: ComponentType.StringSelect,
                                                placeholder: translations[guilddata.lang].embeds.embed_edit_edit_field,
                                                customId: `embed;fields;edit;${args[4]}`,
                                                style: ButtonStyle.Secondary,
                                                options: interaction.message.embeds[0].fields.map(i => {
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
                                                options: interaction.message.embeds[0].fields.map(i => {
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
                            return await interaction.update({
                                content: interaction.message.content,
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
                                components: component_fields,
                            });
                        }
                        case 'add': {
                            return interaction.showModal({
                                title: translations[guilddata.lang].embeds.embed_edit_add_field,
                                customId: `embed;fields;add;${args[4]}`,
                                components: [
                                    {
                                        type: ComponentType.ActionRow,
                                        components: [
                                            {
                                                type: ComponentType.TextInput,
                                                customId: 'name',
                                                style: TextInputStyle.Short,
                                                label: translations[guilddata.lang].embeds.name,
                                                required: true,
                                                placeholder: translations[guilddata.lang].embeds.name_of_field,
                                            },
                                        ],
                                    },
                                    {
                                        type: ComponentType.ActionRow,
                                        components: [
                                            {
                                                type: ComponentType.TextInput,
                                                customId: 'value',
                                                style: TextInputStyle.Paragraph,
                                                label: translations[guilddata.lang].embeds.value,
                                                required: true,
                                                placeholder: translations[guilddata.lang].embeds.value_of_field,
                                            },
                                        ],
                                    },
                                ],
                            });
                        }
                    }
                }
            }
            return;
        }
        case 'appedit': {
            await interaction.channel.messages.edit(args[2], {
                content: interaction.message.content,
                embeds: [interaction.message.embeds[0]],
            });
            await interaction.update({ephemeral: true, content: translations[guilddata.lang].embeds.edited, embeds: [], components: []});
            setTimeout(() => {
                interaction.deleteReply();
            }, 5000);
            return;
        }
        case 'home': {
            return await interaction.update({
                content: interaction.message.content,
                embeds: [interaction.message.embeds[0]],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                label: translations[guilddata.lang].embeds.title,
                                customId: `embed;edit;title`,
                                style: ButtonStyle.Secondary,
                            },
                            {
                                type: ComponentType.Button,
                                label: translations[guilddata.lang].embeds.desc,
                                customId: `embed;edit;description`,
                                style: ButtonStyle.Secondary,
                            },
                            {
                                type: ComponentType.Button,
                                label: translations[guilddata.lang].embeds.color,
                                customId: `embed;edit;color`,
                                style: ButtonStyle.Secondary,
                            },
                            {
                                type: ComponentType.Button,
                                label: translations[guilddata.lang].embeds.thumbnail,
                                customId: `embed;edit;thumbnail`,
                                style: ButtonStyle.Secondary,
                            },
                            {
                                type: ComponentType.Button,
                                label: translations[guilddata.lang].embeds.image,
                                customId: `embed;edit;image`,
                                style: ButtonStyle.Secondary,
                            },
                        ],
                    },
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                label: translations[guilddata.lang].embeds.fields,
                                customId: `embed;edit;fields;sub;${args[2]}`,
                                style: ButtonStyle.Secondary,
                            },
                            {
                                type: ComponentType.Button,
                                label: translations[guilddata.lang].embeds.content,
                                customId: `embed;edit;content`,
                                disabled: !interaction.member.permissions.has(perms.ManageGuild),
                                style: ButtonStyle.Secondary,
                            },
                        ],
                    },
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                label: 'Absenden',
                                customId: `embed;appedit;${args[2]}`,
                                style: ButtonStyle.Success,
                            },
                        ],
                    },
                ],
            });
        }
    }
    return;
}

export const name = 'embed';
