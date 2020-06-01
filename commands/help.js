
module.exports = async (args, client, message, { Canvas, Discord }) => {
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    const background = await Canvas.loadImage("https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca%2Fvalorant-overview-1.png?v=1588435702807"); //load background from url
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
    
    
 /*   //Text Help Overwiew
    ctx.text2('Help Overview', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
  
    //Text Commands:
    ctx.text('Commands:', 140, 140, 450)
  
    //Text Help Command 
    ctx.text('- ' + prefix + 'help - Shows the help message', 110, 140 , 650)
  
    //Text Stats Command
    ctx.text('- ' + prefix + 'stats [NAME] [TAG](Without #) - Shows the stats of the requested user', 110, 140 , 850)
  
    //Text Weapon Command:
    ctx.text('- ' + prefix + 'weapon [WEAPON NAME] - Get stats for requested weapon', 110, 140 , 1050)
  
    //Text Ranked Command:
    ctx.text('- ' + prefix + 'ranked - Get overview over the ranks in the upcoming ranked mode', 110, 140 , 1450)
  
    //text settings command:
    ctx.text('- ' + prefix + 'settings - Get overview over the settings', 110, 140, 1650)
  
     //text prefix command:
    ctx.text('- ' + prefix + 'settings prefix [NEW PREFIX] - Set new prefix', 110, 140, 1850)
  
    //text patch command  
    ctx.text('- ' + prefix + 'weapons - Get overview over all available weapons', 110, 140, 1250)
  
    //Text Autonews:
    ctx.text('- ' + prefix + 'help2 - Shows the next help page', 110, 140 , 2050, '#3f888f')
*/  
    const exampleEmbed = new Discord.RichEmbed()
	  .setColor('#ee3054')
	  .setTitle('Vote here or join the support Server')
	  .setURL('https://top.gg/bot/702201518329430117')
  	  .setImage('https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca%2Fvalorant-help.png?v=1591004844004')
	  .setTimestamp()
	  .setFooter('Timestamp:');

   // const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-stats.png" ); //final result
   // message.channel.send(attachment); //send final result
    
    message.channel.send(exampleEmbed)
}

