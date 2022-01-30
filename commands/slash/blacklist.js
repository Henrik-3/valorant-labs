import {default as Utils} from "../../methods.js"
export async function execute(data) {
    if(data.guilddata.blacklist) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistinactive_title, description: eval('`' + Utils.translations[data.guilddata.lang].blacklistinactive_desc + '`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    if(!data.interaction.permissions.has("MANAGE_GUILD")) return data.interaction.editReply({embeds: [{title: Utils.translations[data.guilddata.lang].blacklistperms_title, description: Utils.translations[data.guilddata.lang].blacklistperms_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    switch(data.interaction.options._subcommand) {
        case "get": {

        }
    }
}
export const name = "blacklist"