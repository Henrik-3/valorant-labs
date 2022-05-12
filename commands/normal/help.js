import Utils from "../../methods.js"
export async function execute({message, guilddata} = {}) {
    return message.reply({
        embeds: [Utils.embedBuilder({
            title: Utils.translations[guilddata.lang].help_title,
            desc: Utils.translations[guilddata.lang].help_desc,
            image: "https://valorantlabs.xyz/css/valorant-logo.png",
            footer: 'VALORANT LABS [HELP]'
        })],
        components: [{
            type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"),
            components: [{
                type: Utils.EnumResolvers.resolveComponentType("BUTTON"),
                url: Utils.translations[guilddata.lang].cmdurl,
                style: Utils.EnumResolvers.resolveButtonStyle("LINK"),
                label: Utils.translations[guilddata.lang].cmd
            }]
        }]
    })
}
export const name = "help"