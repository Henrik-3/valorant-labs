const fs = require('fs');
module.exports = async (args, client, message, { Canvas, Discord }) => {
  const db = require('../db.js')
  var lang = db.get(`${message.guildID}.lang`) || 'en-us'
  var linkjson = JSON.parse(fs.readFileSync('lang.json'))

    message.channel.sendTyping()
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
   
    const Maps = {
    bind: {
      name: 'Bind',
      mapurl: 'commands/images/bind-layout-offense5.svg'
    },
    split: {
      name: 'Split',
      mapurl: 'commands/images/split-layout-offense5.svg'
    },
    haven: {
      name: 'Haven',
      mapurl: 'commands/images/haven-layout-offense6.svg'
    },
    ascent: {
      name: 'Ascent',
      mapurl: 'commands/images/ascent-layout-base.png'
    },
}
  
    if(!args.length) {
      client.createMessage(message.channel.id, {embed: {title: linkjson[lang].mapunknown, color: 0xee3054, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MAP ERROR ARGS]'}}})
    } else {
    
    const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
    // Cut start to get the name
    const name = message.content.toLowerCase().substr(prefix.length + 4)
    // lookup data for weapon
    const map = Maps[name]
    //check if map exist
    console.log(map)
    if(map) {
      ctx.text2('MAP: ' + map.name, 180, canvasstats.width / 2, 200, '#ffffff', 'center')
      const mapimage = await Canvas.loadImage(map.mapurl); //load map from url

      ctx.drawImage(mapimage, 1100, 50, 2000, 2000); // displays map
      ctx.text('Source: https://blitz.gg/valorant/maps', 60, 350, 2110)

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
    client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-map.png'})
  } else {
    client.createMessage(message.channel.id, {embed: {title: linkjson[lang].mapunknown, color: 0xee3054, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MAP ERROR]'}}})
  }
  }
  }
