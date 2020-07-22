const fs = require('fs')
module.exports = async (args, client, message, { Canvas, Discord }) => {
    message.channel.startTyping()
    const db = require('../db.js')
    var lang = db.get(`${message.guild.id}.lang`) || 'en'
    var linkjson = JSON.parse(fs.readFileSync('lang.json'))

    const Embed = new Discord.MessageEmbed()
	  .setColor('#ee3054')
      .setDescription(linkjson[lang].patchdesc)
	  .setTitle(linkjson[lang].patchtitle)
	  .setURL(linkjson[lang].patchurl)
	  //.attachFiles(['./commands/images/VALORANT_Patch_1.jpg'])
      //.setImage('attachment://VALORANT_Patch_1.jpg')
      .setImage(linkjson[lang].patchimage2)
	  .setTimestamp()
	  .setFooter('VALORANT LABS');
	   message.channel.send(Embed);
       message.channel.stopTyping()
}
