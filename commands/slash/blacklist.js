import {default as Utils} from "../../methods.js"
export async function execute(data) {
    if(data.guilddata.blacklist) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklist.blacklistinactive_title, description: Utils.translations[data.guilddata.lang].blacklist.blacklistinactive_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    if(!data.interaction.member.permissions.has("MANAGE_GUILD")) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklist.blacklistperms_title, description: Utils.translations[data.guilddata.lang].blacklist.blacklistperms_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    switch(data.interaction.options._subcommand) {
        case "get": {
            const cchannel = await Utils.getBlacklist(data.interaction.guildId)
            console.log(cchannel)
            return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklist.blacklistoverview_title, description: eval('`' + Utils.translations[data.guilddata.lang].blacklist.blacklistoverview_desc + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
        }
        case "add": {
            const uchannel = await Utils.addBlacklist({guild: data.interaction.guildId, channel: `<#${data.interaction.options.get("channel").value}>`})
            if(!uchannel) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklist.blacklistalreadyadded_title, description: Utils.translations[data.guilddata.lang].blacklist.blacklistalreadyadded_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
            return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklist.blacklistadded_title, description: eval('`' + Utils.translations[data.guilddata.lang].blacklist.blacklistchannels + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
        }
        case "remove": {
            const uchannel = await Utils.removeBlacklist({guild: data.interaction.guildId, channel: `<#${data.interaction.options.get("channel").value}>`})
            if(uchannel == null) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklist.blacklistalreadyremoved_title, description: Utils.translations[data.guilddata.lang].blacklist.blacklistalreadyremoved_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
            return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklist.blacklistremoved_title, description: eval('`' + Utils.translations[data.guilddata.lang].blacklist.blacklistchannels + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
        }
    }
}
export const name = "blacklist"