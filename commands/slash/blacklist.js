import {default as Utils} from "../../methods.js"
export async function execute(data) {
    if(data.guilddata.blacklist) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistinactive_title, description: Utils.translations[data.guilddata.lang].blacklistinactive_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    if(!data.interaction.member.permissions.has("MANAGE_GUILD")) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistperms_title, description: Utils.translations[data.guilddata.lang].blacklistperms_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    switch(data.interaction.options._subcommand) {
        case "get": {
            const cchannel = await Utils.getBlacklist(data.interaction.guildId)
            console.log(cchannel)
            return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistoverview_title, description: eval('`' + Utils.translations[data.guilddata.lang].blacklistoverview_desc + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
        }
        case "add": {
            const uchannel = await Utils.addBlacklist({guild: data.interaction.guildId, channel: `<#${data.interaction.options.get("channel").value}>`})
            if(!uchannel) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistalreadyadded_title, description: Utils.translations[data.guilddata.lang].blacklistalreadyadded_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
            return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistadded_title, description: eval('`' + Utils.translations[data.guilddata.lang].blacklistchannels + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
        }
        case "remove": {
            const uchannel = await Utils.removeBlacklist({guild: data.interaction.guildId, channel: `<#${data.interaction.options.get("channel").value}>`})
            if(uchannel == null) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistalreadyremoved_title, description: Utils.translations[data.guilddata.lang].blacklistalreadyremoved_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
            return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistremoved_title, description: eval('`' + Utils.translations[data.guilddata.lang].blacklistchannels + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
        }
    }
}
export const name = "blacklist"