const fs = require('fs')
module.exports = async (args, client, message, { Canvas, Discord }) => {
    const db = require('../db.js')
    var lang = db.get(`${message.guildID}.lang`) || 'en-us'
    var linkjson = JSON.parse(fs.readFileSync('lang.json'))

    client.createMessage(message.channel.id, {embed: {title: linkjson[lang].patchtitle, color: 0xee3054, description: linkjson[lang].patchdesc, url: linkjson[lang].patchurl, image: { url: linkjson[lang].patchimage2}, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [PATCH]'}}})
}
