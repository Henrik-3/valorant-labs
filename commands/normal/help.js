const { fs, help, linkjson, MessageAttachment } = require("../../functions.js")
module.exports.execute = async function(message, args, guilddata) {
    if(args[0] > 3 || args[0] < 1) return message.reply({embeds: [{title: linkjson[guilddata.lang].helppage_unknown,color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [HELP ERROR]'}}]})
    var image = fs.readFileSync(help[guilddata.lang][args.length ? Number(args[0]) : 1])
    const attachment = new MessageAttachment(image, "valorant-help.png")
    message.reply({files: [attachment]})
}
module.exports.name = "help"