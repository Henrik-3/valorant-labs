import Utils from "../../methods.js"
export async function execute({interaction, args, guilddata} = {}) {
    interaction.client.shard.broadcastEval((c, {embed}) => {
        if(c.channels.cache.has("975850839040200763")) c.channels.cache.get("975850839040200763").send({
            embeds: [embed]
        })
    }, {
        context: {
            embed: Utils.embedBuilder({
                title: "Feedback",
                desc: interaction.fields.getTextInputValue("feedback"),
                additionalFields: [
                    {name: "UserID", value: String(args[1])}
                ]
            })
        }
    })
    return interaction.reply({
        embeds: [
            Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].feedback.send_title,
                desc: Utils.translations[guilddata.lang].feedback.send_desc,
                footer: "VALORANT LABS [FEEDBACK SEND]"
            })
        ]
    })
}
export const name = "feedback"