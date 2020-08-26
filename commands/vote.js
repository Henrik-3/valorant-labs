const fs = require('fs')
const { create } = require('domain')
module.exports = async (args, client, message, { Canvas, Discord }) => {
  const db = require('../db.js')
  var lang = db.get(`${message.guildID}.lang`) || 'en-us'
  var linkjson = JSON.parse(fs.readFileSync('lang.json'))
  
  client.createMessage(message.channel.id, {embed: {
	  color: 0xff4654,
	  title: linkjson[lang].votetitle,
	  url: 'https://top.gg/bot/702201518329430117/vote',
	  timestamp: new Date().toISOString(),
	  footer: {
		text: 'VALORANT LABS [PATCH NOTES]'
	  }
  }})
}
