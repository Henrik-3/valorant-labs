import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    interaction.showModal({
        title: Utils.translations[guilddata.lang].feedback.title,
        customId: `feedback;${interaction.user.id}`,
        components: [
            {
                type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"),
                components: [
                    {
                        type: 4,
                        customId: "feedback",
                        style: 2, //Long,
                        label: Utils.translations[guilddata.lang].feedback.label,
                        required: true,
                        placeholder: Utils.translations[guilddata.lang].feedback.placeholder
                    },
                ]
            },
        ]
    })
}
export const name = "feedback"