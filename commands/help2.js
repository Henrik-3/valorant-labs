module.exports = async (args, client, message, { Canvas, Discord }) => {
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
  
    const db = require('../db.js')
    const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
    
/*    //Text Help Overwiew
    ctx.text2('Help Overview 2', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
  
    //Text Commands:
    ctx.text('Commands:', 140, 140, 450)
  
    //Text Stats Command
    ctx.text('- ' + prefix + 'map [MAP NAME] - Shows Map details for an specific Map', 110, 140 , 650)
  
    //Text Stats Command
    ctx.text('- ' + prefix + 'maps - Shows an overview for all Maps', 110, 140 , 850)
  
    //Text Stats Command
    ctx.text('- ' + prefix + 'agents [AGENT NAME] - Shows Agent details for an specific Agent', 110, 140 , 1450)

    //text patch command  
    ctx.text('- ' + prefix + 'patch - Shows the important changes of the latest patch', 110, 140, 1050)
  
    //Text Work in progress:
    ctx.text('WIP:', 150, 140 , 1250, '#3f888f')
*/  
     const exampleEmbed = new Discord.RichEmbed()
	  .setColor('#0099ff')
	  .setTitle('Vote here for the Bot on top.gg')
	  .setURL('https://top.gg/bot/702201518329430117/vote')
  	.setImage('https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca%2Fvalorant-help2.png?v=1589306349061')
	  .setTimestamp()
	  .setFooter('Timestamp:');

   //  const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-stats.png" ); //final result
   //  message.channel.send(attachment); //send final result
    
    message.channel.send(exampleEmbed);
  }
