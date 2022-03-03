import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    if(guilddata.blacklist) return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].blacklist.blacklistinactive_title, description: Utils.translations[guilddata.lang].blacklist.blacklistinactive_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
    if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].blacklist.blacklistperms_title, description: Utils.translations[guilddata.lang].blacklist.blacklistperms_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
    switch(interaction.options._subcommand) {
        case "get": {
            const cchannel = await Utils.getBlacklist(interaction.guildId)
            console.log(cchannel)
            return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].blacklist.blacklistoverview_title, description: eval('`' + Utils.translations[guilddata.lang].blacklist.blacklistoverview_desc + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
        }
        case "add": {
            const uchannel = await Utils.addBlacklist({guild: interaction.guildId, channel: `<#${interaction.options.get("channel").value}>`})
            if(!uchannel) return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].blacklist.blacklistalreadyadded_title, description: Utils.translations[guilddata.lang].blacklist.blacklistalreadyadded_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
            return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].blacklist.blacklistadded_title, description: eval('`' + Utils.translations[guilddata.lang].blacklist.blacklistchannels + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
        }
        case "remove": {
            const uchannel = await Utils.removeBlacklist({guild: interaction.guildId, channel: `<#${interaction.options.get("channel").value}>`})
            if(uchannel == null) return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].blacklist.blacklistalreadyremoved_title, description: Utils.translations[guilddata.lang].blacklist.blacklistalreadyremoved_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
            return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].blacklist.blacklistremoved_title, description: eval('`' + Utils.translations[guilddata.lang].blacklist.blacklistchannels + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
        }
    }
}
export const name = "blacklist"