import Utils from "../../methods.js"
export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferUpdate()
    switch(args[1]) {
        case "background": {
            switch(args[2]) {
                case "accept":
                    return Utils.patchGuild({interaction: interaction, key: "_background", value: Utils.uuidv4()})
                case "deny":
                    return interaction.message.delete()
            }
        }
    }
}
export const name = "settings"