import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    return interaction.editReply({
        embeds: [Utils.embedBuilder({
            title: Utils.translations[guilddata.lang].help_title,
            desc: Utils.translations[guilddata.lang].help_desc,
            footer: 'VALORANT LABS [HELP]',
        })],
        components: [{
            type: "ACTION_ROW",
            components: [{
                type: "BUTTON",
                url: Utils.translations[guilddata.lang].cmdurl,
                style: "LINK",
                label: Utils.translations[guilddata.lang].cmd
            }]
        }]
    })
}
export const name = "help"