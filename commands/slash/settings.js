import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    if(!interaction.member.permissions.has(Utils.perms.MANAGE_GUILD)) return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].settings.perms_title, description: Utils.translations[guilddata.lang].settings.perms_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS PERMISSION ERROR]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: Utils.translations[guilddata.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    if(interaction.options._subcommand == "get") return Utils.getGuild(interaction)
    if(interaction.options._subcommand == "deactivate") return Utils.patchGuild({interaction: interaction, key: interaction.options.get("value").value, value: false})
    return Utils.patchGuild({interaction: interaction, key: interaction.options._subcommand, value: interaction.options.get("value").value})
}
export const name = "settings"