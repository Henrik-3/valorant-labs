import Utils from "../../methods.js"
export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferUpdate()
    const components = [...interaction.message.components]
    interaction.editReply({
        embeds: [
            Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].game.loading_title,
                desc: Utils.translations[guilddata.lang].game.loading_desc,
                footer: "VALORANT LABS [GAME LOADING]"
            })
        ],
        attachments: [],
        components: []
    })
    const bgcanvas = guilddata.background_game ? await Utils.buildBackground(Utils.getCustomBackground(guilddata.background_game), "game") : null
    const image = await Utils.buildGameImage({id: interaction.values[0], guilddata, bgcanvas})
    if(image.unknown) return interaction.editReply({
        embeds: [
            Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].game.unknown_title,
                desc: Utils.translations[guilddata.lang].game.unknown_desc,
                footer: "VALORANT LABS [GAME KEY ERROR]"
            })
        ],
        attachments: [],
        components: components
    })
    if(image.error) return Utils.errorhandlerinteraction({interaction: interaction, status: image.error.status, type: "game", lang: guilddata.lang})
    if(image.embed) return interaction.editReply({embeds: [image.embed], components: components})
    if(image.image) return interaction.editReply({files: [image.image], embeds: [], components: components})
}
export const name = "game"