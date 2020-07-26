const fs = require('fs');
const pretty = require('pretty-bytes')
const system = require('systeminformation')

module.exports = async (args, client, message, { Canvas, Discord }) => {
    message.channel.startTyping()
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation
  
   //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
    ctx.font = size + 'px anton';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(content, x, y)
  }
    const db = require('../db.js')
    var lang = db.get(`${message.guild.id}.lang`) || 'en'
    var linkjson = JSON.parse(fs.readFileSync('lang.json'))
  if(lang == 'en') {
    const background = await Canvas.loadImage("commands/images/botinfo/Botinfo-Englisch.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

    const load = await system.currentLoad()
    ctx.text('Load: ' + load.currentload.toFixed(2), 80, 3250, 275)

    const ramload = await system.mem()
    console.log(ramload)
    ctx.text('Used: ' + pretty(ramload.used), 80, 3225, 660)

    ctx.text(client.guilds.cache.size, 140, 1100, 300)
    ctx.text(client.users.cache.size, 140, 1100, 675)

    ctx.text('Redesign v2', 140, 1850, 1925)

    //Text DC Tag/ID:
    //Avatar
      // Pick up the pen
	    ctx.beginPath();
	    // Start the arc to form a circle
	    ctx.arc(130, 2025, 80, 0, Math.PI * 2, true);
	    // Put the pen down
	    ctx.closePath();
	    // Clip off the region you drew on
	    ctx.clip();
  
      const avatarl = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg'}));
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-botinfo.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  } else if (lang == 'de') {
    const background = await Canvas.loadImage("commands/images/botinfo/Botinfo-Deutsch.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

    const load = await system.currentLoad()
    ctx.text('Load: ' + load.currentload.toFixed(2), 80, 3250, 275)

    const ramload = await system.mem()
    console.log(ramload)
    ctx.text('Used: ' + pretty(ramload.used), 80, 3225, 660)

    ctx.text(client.guilds.cache.size, 140, 1100, 300)
    ctx.text(client.users.cache.size, 140, 1100, 675)

    ctx.text('Redesign v2', 140, 1850, 1925)

    //Text DC Tag/ID:
    //Avatar
      // Pick up the pen
	    ctx.beginPath();
	    // Start the arc to form a circle
	    ctx.arc(130, 2025, 80, 0, Math.PI * 2, true);
	    // Put the pen down
	    ctx.closePath();
	    // Clip off the region you drew on
	    ctx.clip();
  
      const avatarl = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg'}));
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-botinfo.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  } else if (lang == 'jp') {
    const background = await Canvas.loadImage("commands/images/botinfo/Botinfo-Japanisch.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

    const load = await system.currentLoad()
    ctx.text('Load: ' + load.currentload.toFixed(2), 80, 3250, 275)

    const ramload = await system.mem()
    console.log(ramload)
    ctx.text('Used: ' + pretty(ramload.used), 80, 3225, 660)

    ctx.text(client.guilds.cache.size, 140, 1100, 300)
    ctx.text(client.users.cache.size, 140, 1100, 675)

    ctx.text('Redesign v2', 140, 1850, 1925)

    //Text DC Tag/ID:
    //Avatar
      // Pick up the pen
	    ctx.beginPath();
	    // Start the arc to form a circle
	    ctx.arc(130, 2025, 80, 0, Math.PI * 2, true);
	    // Put the pen down
	    ctx.closePath();
	    // Clip off the region you drew on
	    ctx.clip();
  
      const avatarl = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg'}));
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-botinfo.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  } else if (lang == 'pt-br') {
    const background = await Canvas.loadImage("commands/images/botinfo/Botinfo-Portugisisch.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

    const load = await system.currentLoad()
    ctx.text('Load: ' + load.currentload.toFixed(2), 80, 3250, 275)

    const ramload = await system.mem()
    console.log(ramload)
    ctx.text('Used: ' + pretty(ramload.used), 80, 3225, 660)

    ctx.text(client.guilds.cache.size, 140, 1100, 300)
    ctx.text(client.users.cache.size, 140, 1100, 675)

    ctx.text('Redesign v2', 140, 1850, 1925)

    //Text DC Tag/ID:
    //Avatar
      // Pick up the pen
	    ctx.beginPath();
	    // Start the arc to form a circle
	    ctx.arc(130, 2025, 80, 0, Math.PI * 2, true);
	    // Put the pen down
	    ctx.closePath();
	    // Clip off the region you drew on
	    ctx.clip();
  
      const avatarl = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg'}));
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-botinfo.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  } else if (lang == 'fr') {
    const background = await Canvas.loadImage("commands/images/botinfo/Botinfo-Französisch.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

    const load = await system.currentLoad()
    ctx.text('Load: ' + load.currentload.toFixed(2), 80, 3250, 275)

    const ramload = await system.mem()
    console.log(ramload)
    ctx.text('Used: ' + pretty(ramload.used), 80, 3225, 660)

    ctx.text(client.guilds.cache.size, 140, 1100, 300)
    ctx.text(client.users.cache.size, 140, 1100, 675)

    ctx.text('Redesign v2', 140, 1850, 1925)

    //Text DC Tag/ID:
    //Avatar
      // Pick up the pen
	    ctx.beginPath();
	    // Start the arc to form a circle
	    ctx.arc(130, 2025, 80, 0, Math.PI * 2, true);
	    // Put the pen down
	    ctx.closePath();
	    // Clip off the region you drew on
	    ctx.clip();
  
      const avatarl = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg'}));
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-botinfo.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  }
}