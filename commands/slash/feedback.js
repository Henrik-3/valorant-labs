import {getTranslations, ComponentType, TextInputStyle} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
    const translations = getTranslations();
    interaction.showModal({
        title: translations[guilddata.lang].feedback.title,
        customId: `feedback;${interaction.user.id}`,
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.TextInput,
                        customId: 'feedback',
                        style: TextInputStyle.Paragraph,
                        label: translations[guilddata.lang].feedback.label,
                        required: true,
                        placeholder: translations[guilddata.lang].feedback.placeholder,
                    },
                ],
            },
        ],
    });
}
export const name = 'feedback';
