import Utils from "../../methods.js"
export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferUpdate()
    switch(args[1]) {
        case "generate": {
            const uuid = Utils.uuidv4()
            await Utils.getDB("state").insertOne({userid: interaction.user.id, guild: interaction.guildId, code: uuid, expireAt: new Date(), type: "autorole"})
            return interaction.editReply({
                embeds: [
                    Utils.embedBuilder({
                        title: Utils.translations[guilddata.lang].link.link_generated_title,
                        desc: Utils.translations[guilddata.lang].link.link_generated_desc + `https://valorantlabs.xyz/api/rso/redirect/${uuid}`,
                        footer: "VALORANT LABS [LINK GENERATED]"
                    })
                ]
            })
        }
    }
}
export const name = "autoroles"