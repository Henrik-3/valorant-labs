const { ranked, fs, MessageAttachment } = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
    const background = fs.readFileSync(ranked[guilddata.lang].link)
    const attachment = new MessageAttachment(background, "valorant-ranked.png")
    message.reply({files: [attachment]}).catch(error => console.log(error))
}
module.exports.name = "ranked"