import {ButtonStyle, ComponentType, embedBuilder, getTranslations, TextInputStyle} from '../../methods.js';

export async function execute({interaction, args, guilddata} = {}) {
    const translations = getTranslations();
    switch (args[1]) {
        case 'fields': {
            switch (args[2]) {
                case 'edit': {
                    return interaction.showModal({
                        title: translations[guilddata.lang].embeds.embed_edit_edit_field,
                        customId: `embed;fields;edit;${interaction.message.embeds[0].fields.findIndex(
                            i => i.name.toLowerCase() == interaction.values[0].toLowerCase()
                        )};${args[3]}`,
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
                                        value: interaction.message.embeds[0].fields.find(i => i.name.toLowerCase() == interaction.values[0].toLowerCase()).name,
                                    },
                                ],
                            },
                            {
                                type: ComponentType.ActionRow,
                                components: [
                                    {
                                        type: ComponentType.TextInput,
                                        customId: 'value',
                                        style: TextInputStyle.Short,
                                        label: translations[guilddata.lang].embeds.value,
                                        required: true,
                                        value: interaction.message.embeds[0].fields.find(i => i.name.toLowerCase() == interaction.values[0].toLowerCase()).value,
                                    },
                                ],
                            },
                        ],
                    });
                }
                case 'remove': {
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
                    const fields = [...(interaction.message.embeds[0].fields ?? [])];
                    fields.splice(
                        fields.findIndex(i => i.name.toLowerCase() == interaction.values[0].toLowerCase()),
                        1
                    );
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
                    return await interaction.update({
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
