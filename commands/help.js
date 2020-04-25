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
  
    //Text Help Overwiew
    ctx.text('Help Overview', 240, canvasstats.width / 2, 350, '#ffffff', 'center')
  
    //Text Commands:
    ctx.text('Commands:', 180, 140, 650)
  
    //Text Help Command 
    ctx.text('- v!help - Shows the help message', 110, 140 , 850)
  
    //Text Stats Command
    ctx.text('- v!stats [RIOT NAME] - Shows the stats of the requested user', 110, 140 , 1050)
  
    //Text Work in progress:
    ctx.text('WIP:', 180, 140 , 1750)
  
    //Text Weapon Command:
    ctx.text('- v!weapon [WEAPON NAME] - Get image and stats for requested weapon', 110, 140 , 1250)
  
    //Text Ranked Command:
    ctx.text('- v!ranked - Get overview over the ranks in the upcoming ranked mode', 110, 140 , 1450)
  
    //Text Autonews:
    ctx.text('- Autonews', 110, 140 , 1950)
  
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
    
    const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-help.png" ); //final result
    message.channel.send(attachment); //send final result
  }
