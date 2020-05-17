 //process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const querystring = require("querystring");
const prefix = 'v!'
const fs = require('fs')
const fetch = require("node-fetch")
const r = require('request-promise')

// Required for Attachment
const Discord = require('discord.js')

Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })

module.exports = async (args, client, message) => { 
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    const background = await Canvas.loadImage("https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca%2FUnbenannt-1%20(2).png?v=1588341225969"); //load background from url
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
    ctx.text2 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
    ctx.font = size + 'px valorant_font';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(content, x, y)
    }
  
    //Text WIP
    //ctx.text2('Work in Progress...', 240, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')

  
    const nametest = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
    const name = nametest[0];
    const tag = args.slice(1).join(' ');

    //no arg for GET
    if (!args.length) {
    return message.channel.send("You need to supply a valid name and tag");
    }

    //HTTP GET VALORANT NAME
    const raw = await r({
      url: `API LINK`,
      json: true
    })
    
    if(raw.error){
      message.channel.send("Error, this User is not available or typed something wrong. Try again in a few hours or correct your mistake. (Note: Riot Developers removed ability to get other's user stats, so we can't update stats anymore. Only existing people in the databse can get their old stats :C )")
    }
    
    // const [answer] = raw
    
    ctx.text2('STATS: ' + raw.data.nickname + "#" + raw.data.tag, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    ctx.text2('Name: ', 100, 140, 450)
    ctx.text(raw.data.nickname + "#" + raw.data.tag, 110, 525, 450)
  
    ctx.text2('Last Update: ', 100, 140, 600)
    ctx.text(raw.data.updated_at, 110, 850, 600)
  
    ctx.text2('Overall Stats:', 100, 140, 850, '#3f888f')
  
    ctx.text2('Matches:', 100, 140, 1000)
    ctx.text(raw.data.stats.matches, 110, 700, 1000)
    
    var winrate = raw.data.stats.summary.wins / raw.data.stats.matches
  
    ctx.text2('Win Rate:', 100, 140, 1150)
    ctx.text(winrate.toFixed(2), 110, 700, 1150)
  
    ctx.text2('Best KDA:', 100, 140, 1300)
    ctx.text(raw.data.stats.record.kda.kills + ' | ' + raw.data.stats.record.kda.deaths + ' | ' + raw.data.stats.record.kda.assists, 110, 700, 1300)
  
  
    var damagepermatch = raw.data.stats.summary.damage / raw.data.stats.matches  
  
    ctx.text2('Avg. Damage per Match:', 100, 140, 1450)
    ctx.text(damagepermatch.toFixed(0), 110, 1575, 1450)
  
    ctx.text('Note: Valorant is still in Beta so stats might be missing or inaccurate.', 90, canvasstats.width / 2, 2050, '#ffffff', 'center')
    
   //Text DC Tag/ID:
    ctx.text2(message.member.user.tag, 80, 245, 150)
    
    //Avatar
    const ctx_v = canvasstats.getContext('2d') //text preparation
    // Pick up the pen
	  ctx_v.beginPath();
	  // Start the arc to form a circle
	  ctx_v.arc(125, 125, 100, 0, Math.PI * 2, true);
	  // Put the pen down
	  ctx_v.closePath();
	  // Clip off the region you drew on
	  ctx_v.clip();
    const avatarl = await Canvas.loadImage(message.author.displayAvatarURL);
    ctx_v.drawImage(avatarl, 25, 25, 200, 200) 
  
    const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-stats.png" ); //final result
    message.channel.send(attachment); //send final result
  }
