import Utils from "../../methods.js"
export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferUpdate()
    const components = [...interaction.message.components]
    interaction.editReply({
        embeds: [
            Utils.embedBuilder({
                title: Utils.translations[guilddata.lang].mmr.loading_title,
                desc: Utils.translations[guilddata.lang].mmr.loading_desc,
                footer: "VALORANT LABS [MMR LOADING]"
            })
        ],
        attachments: [],
        components: []
    })
    const bgcanvas = guilddata.background_mmr ? await Utils.buildBackground(Utils.getCustomBackground(guilddata.background_mmr), "game") : null
    console.log(args)
    const mmrdb = await Utils.getDB("mmr").findOne({puuid: args[2]})
    const mmr = mmrdb ? mmrdb : await Utils.axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${args[1]}/${args[2]}`).catch(error => {return error})
    if(mmr.response) return Utils.errorhandlerinteraction({interaction, status: mmr.response.status, type: "stats", lang: guilddata.lang})
    const image = await Utils.buildMMRImage({mmrdata: mmr.data.data, seasonid: interaction.values[0], guilddata, bgcanvas})
    return interaction.editReply({files: [image], embeds: [], components: components})
}
export const name = "mmr"