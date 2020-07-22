const fs = require('fs')
module.exports = async (args, client, message, { Canvas, Discord }) => {
  const db = require('../db.js')
  var lang = db.get(`${message.guild.id}.lang`) || 'en'
  var messagejson = JSON.parse(fs.readFileSync('lang.json'))
    if (!args.length) {
      var linkjson = JSON.parse(fs.readFileSync('link.json'))
      var author = message.author.id 
      const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
      if(linkjson[author]) {
        var linkjson = JSON.parse(fs.readFileSync('link.json'))
        var author = message.author.id 
        console.log(linkjson)
        const Embed = new Discord.MessageEmbed()
	        .setColor('#ee3054')
	        .setTitle(messagejson[lang].linkcurrent + linkjson[author].ingamename + '#' + linkjson[author].ingametag)
	        .setTimestamp()
	        .setFooter('VALORANT LABS [LINK GET]');
        message.channel.send(Embed);
    } else {
        const Embed = new Discord.MessageEmbed()
	        .setColor('#ee3054')
	        .setTitle(messagejson[lang].linkna + message.author.username)
	        .setTimestamp()
	        .setFooter('VALORANT LABS [LINK UNKNOWN]');
        message.channel.send(Embed);
    }
    } else {
    var linkPath = './link.json'
    var linkRead = fs.readFileSync(linkPath);
    var linkFile = JSON.parse(linkRead); //ready for use
    var userId = message.author.id //user id here

    linkFile[userId] = {ingamename: "", ingametag: ""}; //if not, create it
    fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));

    const nametest = message.content.split(' ');// All arguments behind the command name with the prefix
    const namefinal = nametest[1].split('#')
    const name = namefinal[0];
    const tag = namefinal[1];
    
    if(name == null || tag == null) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#ee3054')
            .setTitle(messagejson[lang].linksyntax)
            .setDescription(messagejson[lang].linksyntaxdesc)
            .setTimestamp()
            .setFooter('VALORANT LABS [ERROR]')
        message.channel.send(Embed)
    } else {
    linkFile[userId] = {ingamename: name, ingametag: tag};
    fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));
    const Embed = new Discord.MessageEmbed()
	    .setColor('#ee3054')
	    .setTitle(messagejson[lang].linksuccess + name + '#' + tag)
	    .setTimestamp()
	    .setFooter('VALORANT LABS [SUCCESS]');
	    message.channel.send(Embed);
    }
  }
}