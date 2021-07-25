const { linkjson, maps, capitalize } = require("../../functions.js")
module.exports.execute = async function(message, args, guilddata) {
    if(!args.length) return message.reply({embeds: [{title: linkjson[guilddata.lang].mapunknown, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MAP ERROR ARGS]'}}]})
    if(maps[args[0].toLowerCase()] == undefined) return message.reply({embeds: [{title: linkjson[guilddata.lang].mapunknown, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MAP ERROR]'}}]})
    message.reply({embeds: [{
        title: `Map: ${capitalize(args[0])}`,
        thumbnail: {
            url: maps[args[0].toLowerCase()].splash
        },
        color: 0xff4654,
        image: {
            url: maps[args[0].toLowerCase()].maplayout
        },
        timestamp: new Date().toISOString(), 
        footer: {text: `VALORANT LABS [MAP ${args[0].toUpperCase()}]`}
    }]})
}
module.exports.name = "map"