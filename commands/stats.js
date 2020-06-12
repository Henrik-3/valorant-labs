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
     message.channel.startTyping()
     const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
     const ctx = canvasstats.getContext('2d') //text preparation
 
     const background = await Canvas.loadImage("commands/images/Valorant_LABS.png"); //load background from url
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
   
     //Text WIP
 
     ctx.text3('TEMPORARY DISABLED', 230, 2000, canvasstats.height / 2, '#ffffff', 'center')
 
     //no arg for GET
     if (!args.length) {
       var linkjson = JSON.parse(fs.readFileSync('link.json'))
       var author = message.author.id
       var name = linkjson[author].ingamename
       var tag = linkjson[author].ingametag
 
       console.log(name)
 
       /*
     //HTTP GET VALORANT NAME
     const raw = await r({
       url: `https://api.riotstats.com/player/profile?game=valorant&nickname=${name}&tag=${tag}`,
       json: true
     })
     
     
     if(raw.error){
       message.channel.send("Error, this User is not available or typed something wrong. Try again later or correct your mistake. ")
     }
     
     if(raw.data.nickname = 'undefined') {
       message.channel.send("Error, this User is not available or typed something wrong. Try again later or correct your mistake. ")
     }
     // const [answer] = raw
     
     ctx.text2('STATS: ' + raw.data.nickname.catch(err => message.channel.send('test')) + "#" + raw.data.tag, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
     
     ctx.text3('Name: ', 100, 140, 450)
     ctx.text(raw.data.nickname + "#" + raw.data.tag, 110, 525, 450)
   
     ctx.text3('Last Update: ', 100, 140, 600)
     ctx.text(raw.data.updated_at, 110, 850, 600)
   
     ctx.text3('Overall Stats:', 100, 140, 850, '#3f888f')
   
     ctx.text3('Matches:', 100, 140, 1000)
     ctx.text(raw.data.stats.matches, 110, 700, 1000)
     
     var winrate = raw.data.stats.summary.wins / raw.data.stats.matches
   
     ctx.text3('Win Rate:', 100, 140, 1150)
     ctx.text(winrate.toFixed(2), 110, 700, 1150)
   
     ctx.text3('Best KDA:', 100, 140, 1300)
     ctx.text(raw.data.stats.record.kda.kills + ' | ' + raw.data.stats.record.kda.deaths + ' | ' + raw.data.stats.record.kda.assists, 110, 700, 1300)
   
   
     var damagepermatch = raw.data.stats.summary.damage / raw.data.stats.matches  
   
     ctx.text2('Avg. Damage per Match:', 100, 140, 1450)
     ctx.text(damagepermatch.toFixed(0), 110, 1575, 1450)
   */
     
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
   
       const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-stats.png" ); //final result
       message.channel.send(attachment); //send final result
 
       message.channel.stopTyping()
     } else {
   
     const nametest = message.content.split(' ');// All arguments behind the command name with the prefix
     const namefinal = nametest[1].split('#')
     const name = namefinal[0];
     const tag = namefinal[1];
 
     console.log(name)
 
 /*
     //HTTP GET VALORANT NAME
     const raw = await r({
       url: `https://api.riotstats.com/player/profile?game=valorant&nickname=${name}&tag=${tag}`,
       json: true
     })
     
     
     if(raw.error){
       message.channel.send("Error, this User is not available or typed something wrong. Try again later or correct your mistake. ")
     }
     
     if(raw.data.nickname = 'undefined') {
       message.channel.send("Error, this User is not available or typed something wrong. Try again later or correct your mistake. ")
     }
     // const [answer] = raw
     
     ctx.text2('STATS: ' + raw.data.nickname.catch(err => message.channel.send('test')) + "#" + raw.data.tag, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
     
     ctx.text3('Name: ', 100, 140, 450)
     ctx.text(raw.data.nickname + "#" + raw.data.tag, 110, 525, 450)
   
     ctx.text3('Last Update: ', 100, 140, 600)
     ctx.text(raw.data.updated_at, 110, 850, 600)
   
     ctx.text3('Overall Stats:', 100, 140, 850, '#3f888f')
   
     ctx.text3('Matches:', 100, 140, 1000)
     ctx.text(raw.data.stats.matches, 110, 700, 1000)
     
     var winrate = raw.data.stats.summary.wins / raw.data.stats.matches
   
     ctx.text3('Win Rate:', 100, 140, 1150)
     ctx.text(winrate.toFixed(2), 110, 700, 1150)
   
     ctx.text3('Best KDA:', 100, 140, 1300)
     ctx.text(raw.data.stats.record.kda.kills + ' | ' + raw.data.stats.record.kda.deaths + ' | ' + raw.data.stats.record.kda.assists, 110, 700, 1300)
   
   
     var damagepermatch = raw.data.stats.summary.damage / raw.data.stats.matches  
   
     ctx.text2('Avg. Damage per Match:', 100, 140, 1450)
     ctx.text(damagepermatch.toFixed(0), 110, 1575, 1450)
   */
     
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
   
     const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-stats.png" ); //final result
     message.channel.send(attachment); //send final result
     message.channel.stopTyping()
   }
   }
 