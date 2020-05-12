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
    const Maps = {
    bind: {
      name: 'Bind',
      mapurl: 'https://blitz-cdn-plain.blitz.gg/blitz/val/maps/bind/images/bind-layout-offense5.svg'
    },
    split: {
      name: 'Split',
      mapurl: 'https://blitz-cdn-plain.blitz.gg/blitz/val/maps/split/images/split-layout-offense5.svg'
    },
    haven: {
      name: 'Haven',
      mapurl: 'https://blitz-cdn-plain.blitz.gg/blitz/val/maps/haven/images/haven-layout-offense6.svg'
    },
  }
    
    
    const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
    // Cut start to get the name
    const name = message.content.toLowerCase().substr(prefix.length + 4)
    // lookup data for weapon
    const map = Maps[name]
    //check if weapon exist
    if (map) {
      ctx.text2('MAP: ' + map.name, 180, canvasstats.width / 2, 200, '#ffffff', 'center')
      const mapimage = await Canvas.loadImage(map.mapurl); //load map from url
      ctx.drawImage(mapimage, 1100, 350, 1500, 1500); // displays map
      ctx.text('Source: https://blitz.gg/valorant/maps', 60, 50, 2100)
    } else {
          ctx.text2('Map Overview', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
      ctx.text2('Bind:', 150, 640, 500, '#ffffff', 'center')
      ctx.text2('Split:', 150, 1920, 500, '#ffffff', 'center')
      ctx.text2('Haven:', 150, 3200, 500, '#ffffff', 'center')
      ctx.text('Source: https://blitz.gg/valorant/maps', 60, 50, 2100)
      const mapimagebind = await Canvas.loadImage('https://blitz-cdn-plain.blitz.gg/blitz/val/maps/bind/images/bind-layout-offense5.svg'); //load map from url
      ctx.drawImage(mapimagebind, 150, 550, 1000, 1200); // displays map
      
      const mapimagesplit = await Canvas.loadImage('https://blitz-cdn-plain.blitz.gg/blitz/val/maps/split/images/split-layout-offense5.svg'); //load map from url
      ctx.drawImage(mapimagesplit, 1430, 550, 1000, 1200); // displays map
      
      const mapimagehaven = await Canvas.loadImage('https://blitz-cdn-plain.blitz.gg/blitz/val/maps/haven/images/haven-layout-offense6.svg'); //load map from url
      ctx.drawImage(mapimagehaven, 2710, 550, 1000, 1200); // displays map
      
      ctx.beginPath()
      ctx.moveTo(1280, 400)
      ctx.lineTo(1280, 1800);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.stroke();
      
      ctx.beginPath()
      ctx.moveTo(2560, 400)
      ctx.lineTo(2560, 1800);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.stroke()
    }
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
    
    const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-map.png" ); //final result
    message.channel.send(attachment); //send final result
  }
