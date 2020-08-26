const fs = require('fs')
module.exports = async (args, client, message, { Canvas, Discord }) => {
  const db = require('../db.js')
  var lang = db.get(`${message.guildID}.lang`) || 'en-us'
  var messagejson = JSON.parse(fs.readFileSync('lang.json'))
    if (!args.length) {
      var linkjson = JSON.parse(fs.readFileSync('database/link.json'))
      var author = message.author.id
      const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
      if(linkjson[author]) {
        var linkjson = JSON.parse(fs.readFileSync('database/link.json'))
        var author = message.author.id 
        console.log(linkjson)
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].linkcurrent + linkjson[author].ingamename + '#' + linkjson[author].ingametag, color: 0xee3054, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [LINK GET]'}}})
    } else {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].linkna + message.author.username, color: 0xee3054, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [LINK UNKNOWN]'}}})
    }
    } else {
    var linkPath = './database/link.json'
    var linkRead = fs.readFileSync(linkPath);
    var linkFile = JSON.parse(linkRead); //ready for use
    var userId = message.author.id //user id here

    linkFile[userId] = {ingamename: "", ingametag: ""}; //if not, create it
    fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));

    const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
    const name1 = message.content.substr(prefix.length + 5)
    const namefinal = name1.split('#')
    const name = namefinal[0];
    const tag = namefinal[1];
    
    if(name == null || tag == null) {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].linksyntax, color: 0xee3054, description: messagejson[lang].linksyntaxdesc, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [ERROR]'}}})
    } else {
    linkFile[userId] = {ingamename: name, ingametag: tag};
    fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));
    client.createMessage(message.channel.id, {embed: {title: messagejson[lang].linksuccess + name + '#' + tag, color: 0xee3054, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SUCCESS]'}}})
    }
  }
}