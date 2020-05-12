//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

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
  
    //ranked
    ctx.text2('Ranked Overview', 150, canvasstats.width / 2, 175, '#ffffff', 'center')
  
    //Upcoming Text
    ctx.text2("Available in the new 0.49 patch :D", 60, 2700, 150)
      
    const rankedimage = await Canvas.loadImage("https://cdn.glitch.com/15c546f8-c377-494a-a8f3-e5f452789cdf%2FVALORANT_ICONS_UPDATED-ger_v1.jpg?v=1587846787626");
    ctx.drawImage(rankedimage, 0, 250, 3840, 1950)
  
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
  
    const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-ranked.png" ); //final result
    message.channel.send(attachment); //send final result
}
