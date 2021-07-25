const { addGuildBlacklist, removeGuildBlacklist, getGuildBlacklist_js, Permissions, bot, linkjson } = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
    if(guilddata.blacklist === false) return message.reply({embeds: [{title: linkjson[guilddata.lang].blacklistinactive_title, color: 0xff4654, timestamp: new Date().toISOString(), description: eval('`'+ linkjson[guilddata.lang].blacklistinactive_title +'`'), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply({embeds: [{title: linkjson[guilddata.lang].blacklist_permissions, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    var key = args[0]
    var value = args[1]
    switch (key) {
        case "add": 
            var updatedchannels = await addGuildBlacklist(bot, message.guild.id, value)
            if(updatedchannels != 404) return message.reply({embeds: [{title: linkjson[guilddata.lang].blacklist_added_title, color: 0xff4654, timestamp: new Date().toISOString(), description: eval('`'+ linkjson[guilddata.lang].blacklist_added_description +'`'), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
            return message.channel.send({embeds: [{title: linkjson[guilddata.lang].blacklist_added_already, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
        case "remove":
            var updatedchannels = await removeGuildBlacklist(bot, message.guild.id, value)
            if(updatedchannels != 404) return message.channel.send({embeds: [{title: linkjson[guilddata.lang].blacklist_removed_title, color: 0xff4654, timestamp: new Date().toISOString(), description: eval('`'+ linkjson[guilddata.lang].blacklist_removed_description +'`'), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
            return message.channel.send({embeds: [{title: linkjson[guilddata.lang].blacklist_removed_already, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
        default: 
            var currentchannel = await getGuildBlacklist_js(bot, message.guild.id)
            return message.channel.send({embeds: [{title: linkjson[guilddata.lang].blacklist_args_title, color: 0xff4654, timestamp: new Date().toISOString(), description: eval('`'+ linkjson[guilddata.lang].blacklist_args_description +'`'), footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
    }
}
module.exports.name = "blacklist"