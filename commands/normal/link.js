const { getUser, addUser, deleteUser, bot, linkjson } = require("../../functions.js")
module.exports.execute = async function(message, args, guilddata) {
    if(!args.length) {
        var entry = await getUser(message.author.id)
        if(entry != 400 && entry != 404) return message.reply({embeds: [{title: `${linkjson[guilddata.lang].linkcurrent}${entry.ingamename}#${entry.ingametag}`, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [LINK GET]'}}]})
        return message.reply({embeds: [{title: linkjson[guilddata.lang].linkna + message.author.username, description: linkjson[guilddata.lang].linkna_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [LINK UNKNOWN]'}}]})
    }
    if(args[0] == "remove") { 
        await deleteUser(bot, message.author.id)
        return message.reply({embeds: [{title: linkjson[guilddata.lang].linkremove, color: 0xee3054, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SUCCESS]'}}]})
    }
    var id = message.content.substr(guilddata.prefix.length + 5).split("#")
    if(id[0] == null || id[1] == null) return message.reply({embeds: [{title: linkjson[guilddata.lang].linksyntax, color: 0xee3054, description: linkjson[guilddata.lang].linksyntaxdesc, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [ERROR]'}}]})
    await addUser(bot, message.author.id, id[0], id[1])
    message.reply({embeds: [{title: `${linkjson[guilddata.lang].linksuccess}${id[0]}#${id[1]}`, color: 0xee3054, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SUCCESS]'}}]})
}
module.exports.name = "link"