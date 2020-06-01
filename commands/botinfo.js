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
  
    ctx.text2('Bot Overview', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
    ctx.text2('- Powering          Server', 120, 140, 500)
    ctx.text2(client.guilds.size, 120, 975, 500, '#ff0000')
    ctx.text2('- Is Online for              Users', 120, 140, 750)
    ctx.text2(client.users.size, 120, 1150, 750, '#ff0000')
    ctx.text2('- Created by                          and', 120, 140, 1000)
    ctx.text2('Henrik3#1451', 120, 1000, 1000, '#ff0000')
    ctx.text2('ggg#7000', 120, 2125, 1000, '#ff0000')
    ctx.text2('- Vote for us on', 120, 140, 1250)
    ctx.text2('top.gg', 120, 1275, 1250, '#ff0000')
    ctx.text('(v?vote)', 120, 1775, 1250)
  
    ctx.text2('Last Change:', 140, 140, 1500, '#3f888f')
    ctx.text2('- Added Server Status Command', 120, 140, 1750)
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
