const fs = require('fs');
module.exports = async (args, client, message, { Canvas, Discord }) => {

  const db = require('../db.js')
  const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
  var lang = db.get(`${message.guild.id}.lang`) || 'en'
  var linkjson = JSON.parse(fs.readFileSync('lang.json'))

    message.channel.startTyping()
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    if(lang == 'jp') {

      const background = await Canvas.loadImage("commands/images/help/Help2-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
  
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
  
      const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help2.png" ); //final result
      message.channel.send(attachment) //send final result
      
      message.channel.stopTyping()  
    } else if(lang == 'pt-br') {
      
      const background = await Canvas.loadImage("commands/images/help/Help2-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

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
  
      const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help2.png" ); //final result
      message.channel.send(attachment) //send final result
      
      message.channel.stopTyping() 

  } else if(lang == 'fr') {
      
    const background = await Canvas.loadImage("commands/images/help/Help2-Französisch.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

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

    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help2.png" ); //final result
    message.channel.send(attachment) //send final result
    
    message.channel.stopTyping() 

} else if(lang == 'de') {
      
  const background = await Canvas.loadImage("commands/images/help/Help2-Deutsch.png"); //load background from url
  ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

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

  const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help2.png" ); //final result
  message.channel.send(attachment) //send final result
  
  message.channel.stopTyping() 

} else if(lang == 'en') {
      
  const background = await Canvas.loadImage("commands/images/help/Help2-Englisch.png"); //load background from url
  ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

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

  const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help2.png" ); //final result
  message.channel.send(attachment) //send final result
  
  message.channel.stopTyping() 

} 
}