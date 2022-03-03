import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    return interaction.editReply({
        embeds: [{
            color: 0xff4654,
            title: Utils.translations[guilddata.lang].help_title,
            description: Utils.translations[guilddata.lang].help_desc,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'VALORANT LABS [HELP]',
                icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
            }
        }],
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