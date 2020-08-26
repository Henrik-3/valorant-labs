const fs = require('fs');
module.exports = async (args, client, message, { Canvas, Discord }) => {

  const db = require('../db.js')
  const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
  var lang = db.get(`${message.guildID}.lang`) || 'en-us'
  var linkjson = JSON.parse(fs.readFileSync('lang.json'))

    message.channel.sendTyping()
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    if(lang == 'jp') {

      const background = await Canvas.loadImage("commands/images/help/Help3-Japanisch.png"); //load background from url
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
  
    
      const avatarl = await Canvas.loadImage(message.author.avatarURL);
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
      //const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help.png" ); //final result
      client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-help3.png'})
    } else if(lang == 'pt-br') {
      
      const background = await Canvas.loadImage("commands/images/help/Help3-Portugisisch.png"); //load background from url
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
  
    
      const avatarl = await Canvas.loadImage(message.author.avatarURL);
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
      //const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help.png" ); //final result
      client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-help3.png'})

  } else if(lang == 'fr') {
      
    const background = await Canvas.loadImage("commands/images/help/Help3-Französisch.png"); //load background from url
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

  
    const avatarl = await Canvas.loadImage(message.author.avatarURL);
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
      //const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help.png" ); //final result
      client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-help3.png'}) 

} else if(lang == 'de') {
      
  const background = await Canvas.loadImage("commands/images/help/Help3-Deutsch.png"); //load background from url
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


    const avatarl = await Canvas.loadImage(message.author.avatarURL);
    ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
    //const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help.png" ); //final result
    client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-help3.png'})

} else if(lang == 'en-us' || lang == 'en-gb') {
      
  const background = await Canvas.loadImage("commands/images/help/Help3-Englisch.png"); //load background from url
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


  const avatarl = await Canvas.loadImage(message.author.avatarURL);
      ctx.drawImage(avatarl, 30, 1925, 200, 200)
  
      //const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-help.png" ); //final result
      client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-help3.png'})

} 
}