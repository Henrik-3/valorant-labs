const fs = require('fs')
module.exports = async (args, client, message, { Canvas, Discord }) => {
  const db = require('../db.js')
  var lang = db.get(`${message.guild.id}.lang`) || 'en'
  var linkjson = JSON.parse(fs.readFileSync('lang.json'))
  
    const Embed = new Discord.MessageEmbed()
	  .setColor('#ee3054')
	  .setTitle(linkjson[lang].votetitle)
	  .setURL('https://top.gg/bot/702201518329430117/vote')
	  .setTimestamp()
	  .setFooter('VALORANT LABS');
	   message.channel.send(Embed);
}
