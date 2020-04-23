//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const querystring = require("querystring");
const prefix = 'v!'
const fetch = require("node-fetch")
const fs = require('fs')

// Required for Attachment
const Discord = require('discord.js')


Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })


module.exports = async (args, client, message) => {
  
  const Weapons = {
    phantom: {
      damage: 10,
      description: 'Phantom'
    },
    spectre: {
      damage: 0,
      description: 'Overpowered'
    }
  }
  
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    const background = await Canvas.loadImage("https://cdn.glitch.com/15c546f8-c377-494a-a8f3-e5f452789cdf%2FKomp%2010.png?v=1587586582984"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    
    //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
    ctx.font = size + 'px product_sans';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(content, x, y)
  }
  if (message.content.toLowerCase().startsWith('v!weapon2 ')) {
    // Anfang abschneiden um auf Name zu kommen
    const name = message.content.toLowerCase().substr(10)
    // Daten für Waffe nachschauen
    const weapon = Weapons[name]
    // Überprüfen ob Waffe existiert
    if (weapon) {
      ctx.text('STATS: ' + weapon.description, 240, canvasstats.width / 2, 320, '#ffffff', 'center')
      
      //Text DC Tag/ID:
      ctx.text(message.member.user.tag, 80, 245, 150)
  
      //Avatar
      // Pick up the pen
	    ctx.beginPath();
	    // Start the arc to form a circle
	    ctx.arc(125, 125, 80, 0, Math.PI * 2, true);
	    // Put the pen down
	    ctx.closePath();
	    // Clip off the region you drew on
	    ctx.clip();
  
      const avatarl = await Canvas.loadImage(message.author.displayAvatarURL);
      ctx.drawImage(avatarl, 25, 25, 200, 200)
  
      const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-weapon.png" ); //final result
      message.channel.send(attachment); //send final result
  }
    } else {
      // Diese Waffe hat keine Info
      message.channel.send('This weapon does not exist, check your input')
    }
  }
