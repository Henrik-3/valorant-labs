const { getGuild, updateGuild, linkjson, Permissions } = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply({embeds: [{title: linkjson[guilddata.lang].settingspermissions, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [SETTINGS ERROR]`}}]})
    var key = args[0]
    var value = args.slice(1).join(' ')
    if(key == undefined) return getGuild(message, message.guild.id)
    if(!["prefix", "patchnotes", "othernews", "serverstatus", "lang", "blacklist"].includes(key)) return message.reply({embeds: [{title: linkjson[guilddata.lang].settingsna, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [SETTINGS ERROR]`}}]})
    switch(key) {
        case "lang": 
            if(!['de', 'en-us', 'en-gb', 'fr', 'pt-br', 'jp', 'es'].includes(value)) return message.reply({embeds: [{title: linkjson[guilddata.lang].settingslanguage, color: 0xff4654, timestamp: new Date().toISOString(), description: linkjson[guilddata.lang].settingslanguage_desc, fields: [{name: linkjson[guilddata.lang].settings_support_server, value: '[Support Server](https://discord.com/invite/b5FmTqG)', inline: false}], footer: {text: 'VALORANT LABS [SETTINGS]'}}]})
            return updateGuild(message, key, value)    
        case "patchnotes":
            if(value.includes("true") || value.includes("[") || !value.includes("#")) return message.reply({embeds: [{title: linkjson[guilddata.lang].settingsnews, description: eval('`'+ linkjson[guilddata.lang].settingsnews_desc +'`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [SETTINGS]'}}]})
            return updateGuild(message, key, value)
        case "othernews":
            if(value.includes("true") || value.includes("[") || !value.includes("#")) return message.reply({embeds: [{title: linkjson[guilddata.lang].settingsonews, description: eval('`'+ linkjson[guilddata.lang].settingsonews_desc +'`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [SETTINGS]'}}]})
            return updateGuild(message, key, value)
        case "serverstatus":
            if(value.includes("true") || value.includes("[") || !value.includes("#")) return message.reply({embeds: [{title: linkjson[guilddata.lang].settingsstatus, description: eval('`'+ linkjson[guilddata.lang].settingsstatus_desc +'`'), color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [SETTINGS]'}}]})
            return updateGuild(message, key, value)
        case "blacklist":
            if(value != "true" && value != "false") return message.reply({embeds: [{title: linkjson[guilddata.lang].statserror, description: linkjson[guilddata.lang].settingsblacklist_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [SETTINGS]'}}]})
            if(value == "true") return updateGuild(message, key, value)
            await updateGuild(message, key, value)
            return message.reply({embeds: [{title: linkjson[guilddata.lang].settingsblacklistfalse, description: linkjson[guilddata.lang].settingsblacklistfalse_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [SETTINGS]'}}]})
        case "prefix":
            updateGuild(message, key, value)
    }
}
module.exports.name = "settings"
