import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    return interaction.editReply({
        embeds: [Utils.embedBuilder({
            title: Utils.translations[guilddata.lang].vote.title,
            desc: Utils.translations[guilddata.lang].vote.desc,
            footer: 'VALORANT LABS [VOTES]',
        })],
        components: [{
            type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"),
            components: [{
                type: Utils.EnumResolvers.resolveComponentType("BUTTON"),
                style: Utils.EnumResolvers.resolveButtonStyle("LINK"),
                url: "https://top.gg/bot/702201518329430117/vote",
                label: "Vote"
            }]
        }]
    })
}
export const name = "vote"