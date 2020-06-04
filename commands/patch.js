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
  
/*    ctx.text2('Patch 0.49', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
    ctx.text('Released: 29.04.2020', 80, 3000, 150)
  
    //Text Important Changes:
    //ctx.text('Important Changes:', 140, 140, 450, '#3f888f')
  
    //Changes 
    ctx.text2('- MAP: ', 100, 100, 450)
    ctx.text('Fixed geometry on Haven, Split and Bind to fix exploits', 110, 500, 450)
  
    ctx.text2('- Ranked:', 100, 100, 600)
    ctx.text('Added Competitive mode and ranked matchmaking, to go live soon', 110, 625, 600)
  
    ctx.text2('- HUD + UI:', 100, 100, 750)
    ctx.text('New directional damage indicator visual', 110, 625, 750)
  
    ctx.text2('- HUD + UI:', 100, 100, 900)
    ctx.text('Removed character portrait from player’s minimap icon', 110, 625, 900)
  
    ctx.text2('- HUD + UI:', 100, 100, 1050)
    ctx.text('Added Play Again button to End of Game screen', 110, 625, 1050)
  
    ctx.text2('- QOL:', 100, 100, 1200)
    ctx.text('Added "Leave Match" Button to Custom Games', 110, 475, 1200)
  
    ctx.text2('- QOL:', 100, 100, 1350)
    ctx.text('Enabled the ability to see VALORANT players online in Riot games', 110, 475, 1350)
  
    ctx.text2('- QOL:', 100, 100, 1500)
    ctx.text('Adjusted social panel UX to accommodate additional space', 110, 475, 1500)
  
    ctx.text2('- Bug Fix:', 100, 100, 1650)
    ctx.text('Fixed issues with receiving party invitations', 110, 625, 1650)
  
    ctx.text2('- Bug Fix:', 100, 100, 1800)
    ctx.text('Fixed resetting controls for Voice Chat in settings', 110, 625, 1800)
  
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
  
    const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-patch.png" ); //final result
    message.channel.send(attachment); //send final result
    */
  
  const Embed = new Discord.RichEmbed()
	  .setColor('#ee3054')
    	  .setDescription('New launch stuff! Also, major balance updates for 5 Agents, and  performance and hit registration improvements.')
	  .setTitle('Click here for the last Patch Notes of v1.0')
	  .setURL('https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-1-0/')
	  .attachFile('./commands/images/VALORANT_Patch_1.jpg')
  	  .setImage('attachment://VALORANT_Patch_1.jpg')
	  .setTimestamp()
	  .setFooter('VALORANT LABS');

  message.channel.send(Embed);
  message.channel.stopTyping()
}
