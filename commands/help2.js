module.exports = async (args, client, message, { Canvas, Discord }) => {
    message.channel.startTyping()
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
    
    //Text Help Overwiew
    ctx.text2('Help Overview 2', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
  
    //Text Commands:
    ctx.text('Commands:', 140, 140, 450)
  
    //Text Stats Command
    ctx.text('- ' + prefix + 'map [MAP NAME] - Shows Map details for an specific Map', 110, 140 , 650)
    
    //Text Stats Command
    ctx.text('- ' + prefix + 'agents [AGENT NAME] - Shows Agent details for an specific Agent', 110, 140 , 1450)

    //text patch command  
    ctx.text('- ' + prefix + 'patch - Shows the important changes of the latest patch', 110, 140, 850)
    
    //text patch command  
    ctx.text('- ' + prefix + 'ranked - Get overview over the ranks in the upcoming ranked mode', 110, 140, 1050)
   
    //text patch command  
    ctx.text('- ' + prefix + 'status [EU or NA] - Shows the server status for requested region', 110, 140, 1250)

    //text patch command  
    ctx.text('- ' + prefix + 'botinfo -  Get information about the bot', 110, 140, 1650)

  
    //Text Work in progress:
    //ctx.text('WIP:', 150, 140 , 1250, '#3f888f')
  
    /* const exampleEmbed = new Discord.RichEmbed()
	  .setColor('#ee3054')
	  .setTitle('Vote f\u00fcr den Bot auf top.gg')
	  .setURL('https://top.gg/bot/702201518329430117/vote')
  	  .setImage('https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca%2Fvalorant-help2-fixed%20(2).png?v=1590437312924')
	  .setTimestamp()
	  .setFooter('Timestamp:');
	*/
	
      //Text DC Tag/ID:
      ctx.text2(message.member.user.tag, 80, 245, 150)
  
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

     const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-help2.png" ); //final result
     message.channel.send(attachment); //send final result
    
    //message.channel.send(exampleEmbed);
    message.channel.stopTyping()
  }
