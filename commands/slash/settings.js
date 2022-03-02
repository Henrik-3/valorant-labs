import {default as Utils} from "../../methods.js"
export async function execute(data) {
    if(!data.interaction.member.permissions.has(Utils.perms.MANAGE_GUILD)) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].settings.perms_title, description: Utils.translations[data.guilddata.lang].settings.perms_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS PERMISSION ERROR]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: Utils.translations[data.guilddata.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    if(data.interaction.options._subcommand == "get") return Utils.getGuild(interaction)
    if(interaction.options._subcommand == "deactivate") return Utils.patchGuild({interaction: interaction, key: interaction.options.get("value").value, value: false})
}
export const name = "settings"