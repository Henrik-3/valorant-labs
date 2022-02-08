import {default as Utils} from "../../methods.js"
export async function execute(data) {
    return data.interaction.editReply({
        embeds: [{
            color: 0xff4654,
            title: Utils.translations[data.guilddata.lang].help_title,
            description: Utils.translations[data.guilddata.lang].help_desc,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'VALORANT LABS [HELP]'
            }
        }],
        components: [{
            type: "ACTION_ROW",
            components: [{
                type: "BUTTON",
                url: Utils.translations[data.guilddata.lang].cmdurl,
                style: "LINK",
                label: Utils.translations[data.guilddata.lang].cmd
            }]
        }]
    })
}
export const name = "help"