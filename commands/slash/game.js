import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const image = await Utils.buildGameImage({id: interaction.options.getString("gamekey"), guilddata: guilddata})
    if(image.unknown) return interaction.editReply({
        embeds: [
            Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].game.unknown_title,
                desc: Utils.translations[guilddata.lang].game.unknown_desc,
                footer: "VALORANT LABS [GAME KEY ERROR]"
            })
        ]
    })
    if(image.error) return Utils.errorhandlerinteraction({interaction: interaction, status: image.error.status, type: "game", lang: guilddata.lang})
    if(image.embed) return interaction.editReply({embeds: [image.embed]})
    if(image.image) return interaction.editReply({files: [image.image]})
}
export const name = "game"