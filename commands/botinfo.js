const fs = require('fs');
module.exports = async (args, client, message, { Canvas, Discord }) => {
    message.channel.startTyping()
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/715949560970608702/718467365146198057/Valorant_LABS.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
  
   //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
    ctx.font = size + 'px product_sans';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(content, x, y)
  }
  
    //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text2 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left', rotate=-0.5*Math.PI) {
    ctx.font = size + 'px valorant_font';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.save();
    ctx.translate(200,canvasstats.height/2);
    ctx.rotate(rotate);
    ctx.fillText(content , 0, 0);
    ctx.restore();
  }
    //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text3 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
    ctx.font = size + 'px valorant_font';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(content , x, y);
  }
    const db = require('../db.js')
    var lang = db.get(`${message.guild.id}.lang`) || 'en'
    var linkjson = JSON.parse(fs.readFileSync('lang.json'))

  if(lang == 'en') {
    ctx.text2('Bot Overview', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
    ctx.text3('- Powering          Server', 120, 340, 200)
    ctx.text3(client.guilds.cache.size, 120, 1175, 200, '#ff4654')
    ctx.text3('- Is Online for              Users', 120, 340, 450)
    ctx.text3(client.users.cache.size, 120, 1350, 450, '#ff4654')
    ctx.text3('- Created by                          and', 120, 340, 700)
    ctx.text3('Henrik3#1451', 120, 1200, 700, '#ff4654')
    ctx.text3('ggg#7000', 120, 2325, 700, '#ff4654')
    ctx.text3('- Design by                        , check out his', 120, 340, 950)
    ctx.text3('ouihq#1640', 120, 1110, 950, '#ff4654')
    ctx.text3('Reyna Bot', 120, 2910, 950, '#ff4654')
    ctx.text3('- Vote for us on', 120, 340, 1200)
    ctx.text3('top.gg', 120, 1475, 1200, '#ff4654')
    ctx.text('(v?vote)', 120, 1975, 1200)
  
    ctx.text3('Last Change:', 140, 340, 1600, '#3f888f')
    ctx.text3('- Multi-Language System', 120, 340, 1850)
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
    ctx.text2('Bot Uebersicht', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
    ctx.text3('- Ist fuer          Server Online', 120, 340, 200)
    ctx.text3(client.guilds.cache.size, 120, 1000, 200, '#ff4654')
    ctx.text3('- Ist online fuer              User', 120, 340, 450)
    ctx.text3(client.users.cache.size, 120, 1450, 450, '#ff4654')
    ctx.text3('- Erstellt von                          und', 120, 340, 700)
    ctx.text3('Henrik3#1451', 120, 1325, 700, '#ff4654')
    ctx.text3('ggg#7000', 120, 2500, 700, '#ff4654')
    ctx.text3('- Design von                        , checked auch den Bot von ihm aus:', 80, 340, 950)
    ctx.text3('ouihq#1640', 80, 930, 950, '#ff4654')
    ctx.text3('IGNITION Bot', 80, 3110, 950, '#ff4654')
    ctx.text3('- Vote fuer uns auf', 120, 340, 1200)
    ctx.text3('top.gg', 120, 1680, 1200, '#ff4654')
    ctx.text('(v?vote)', 120, 2180, 1200)
  
    ctx.text3('Letzte Aenderung:', 140, 340, 1500, '#3f888f')
    ctx.text3('- Multi-Language System', 120, 340, 1750)

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