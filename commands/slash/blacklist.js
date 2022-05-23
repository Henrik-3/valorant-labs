import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    if(guilddata.blacklist) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].blacklist.blacklistinactive_title, desc: Utils.translations[guilddata.lang].blacklist.blacklistinactive_desc, footer: 'VALORANT LABS [SETTINGS]'})]})
    if(!interaction.member.permissions.has(Utils.perms.ManageGuild)) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].blacklist.blacklistperms_title, desc: Utils.translations[guilddata.lang].blacklist.blacklistperms_desc, footer: 'VALORANT LABS [SETTINGS]'})]})
    switch(interaction.options._subcommand) {
        case "get": {
            const cchannel = await Utils.getBlacklist(interaction.guildId)
            console.log(cchannel)
            return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].blacklist.blacklistoverview_title, desc: eval('`' + Utils.translations[guilddata.lang].blacklist.blacklistoverview_desc + '`'), footer: 'VALORANT LABS [SETTINGS]'})]})
        }
        case "add": {
            const uchannel = await Utils.addBlacklist({guild: interaction.guildId, channel: `<#${interaction.options.get("channel").value}>`})
            if(!uchannel) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].blacklist.blacklistalreadyadded_title, desc: Utils.translations[guilddata.lang].blacklist.blacklistalreadyadded_desc, footer: 'VALORANT LABS [SETTINGS]'})]})
            return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].blacklist.blacklistadded_title, desc: eval('`' + Utils.translations[guilddata.lang].blacklist.blacklistchannels + '`'), footer: 'VALORANT LABS [SETTINGS]'})]})
        }
        case "remove": {
            const uchannel = await Utils.removeBlacklist({guild: interaction.guildId, channel: `<#${interaction.options.get("channel").value}>`})
            if(!uchannel) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].blacklist.blacklistalreadyremoved_title, desc: Utils.translations[guilddata.lang].blacklist.blacklistalreadyremoved_desc, footer: 'VALORANT LABS [SETTINGS]'})]})
            return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].blacklist.blacklistremoved_title, desc: eval('`' + Utils.translations[guilddata.lang].blacklist.blacklistchannels + '`'), footer: 'VALORANT LABS [SETTINGS]'})]})
        }
    }
}
export const name = "blacklist"