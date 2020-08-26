//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const db = require('../db.js')
Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })


module.exports = async (args, client, message) => {
  message.channel.sendTyping()
  //can also be added to an config file
  const Weapons = {
    classic: {
      url: 'commands/images/weapon/Classic/Classic'
    },
    shorty: {
      url: 'commands/images/weapon/Shorty/Shorty'
    },
    frenzy: {
      url: 'commands/images/weapon/Frenzy/Frenzy'
    },
    ghost: {
      url: 'commands/images/weapon/Ghost/Ghost'
    },
    sheriff: {
      url: 'commands/images/weapon/Sheriff/Sheriff'
    },
    stinger: {
      url: 'commands/images/weapon/Stinger/Stinger'
    },
    spectre: {
      url: 'commands/images/weapon/Spectre/Spectre'
    },
    bucky: {
      url: 'commands/images/weapon/Bucky/Bucky'
    },
    judge: {
      url: 'commands/images/weapon/Judge/Judge'
    },
    bulldog: {
      url: 'commands/images/weapon/Bulldog/Bulldog'
    },
    guardian: {
      url: 'commands/images/weapon/Guardian/Guardian'
    },
    phantom: {
      url: 'commands/images/weapon/Phantom/Phantom'
    },
    vandal: {
      url: 'commands/images/weapon/Vandal/Vandal'
    },
    marshal: {
      url: 'commands/images/weapon/Marshal/Marshal'
    },
    operator: {
      url: 'commands/images/weapon/Operator/Operator'
    },
    ares: {
      url: 'commands/images/weapon/Ares/Ares'
    },
    odin: {
      url: 'commands/images/weapon/Odin/Odin'
    },
  }  
  
  const canvasstats = Canvas.createCanvas(4100, 2160) //set image size
  const ctx = canvasstats.getContext('2d') //text preparation

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
  //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text4 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left', rotate=-0.5*Math.PI) {
      ctx.font = size + 'px Japan2';
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
      ctx.text5 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
      ctx.font = size + 'px Japan2';
      ctx.fillStyle = color
      ctx.textAlign = textAlign
      ctx.fillText(content , x, y);
    }
  
    var lang = db.get(`${message.guildID}.lang`) || 'en-us'

    const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
    // Cut start to get the name
    const name = message.content.toLowerCase().substr(prefix.length + 7)
    // lookup data for weapon
    const weapon = Weapons[name]
    //check if weapon exist
    if (weapon) {
      if(lang == 'en-us' || lang == 'en-gb') {
        const background = await Canvas.loadImage(weapon.url + '-Englisch.png'); //load background from url
        ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if (lang == 'de') {
        const background = await Canvas.loadImage(weapon.url + '-Deutsch.png'); //load background from url
        ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage(weapon.url + '-Englisch.png'); //load background from url
        ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if (lang == 'pt-br') {
      const background = await Canvas.loadImage(weapon.url + '-Englisch.png'); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
     } else if (lang == 'fr') {
      const background = await Canvas.loadImage(weapon.url + '-Englisch.png'); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }        
  } else {
    const background = await Canvas.loadImage('commands/images/Valorant_LABS.png'); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    //No info for this Weapon
    ctx.text2('Weapon Overview', 140, 1890, 130, '#ffffff', 'center')
    ctx.text3("Sidearm:", 120, 580, 425, '#3f888f', 'center')
    ctx.text("Classic - 0", 100, 580, 600, '#ffffff','center')
    ctx.text("Shorty - 200", 100, 580, 900, '#ffffff', 'center')
    ctx.text("Frenzy - 400", 100, 580, 1200, '#ffffff', 'center')
    ctx.text("Ghost - 500", 100, 580, 1500, '#ffffff', 'center')
    ctx.text("Sheriff - 800", 100, 580, 1800, '#ffffff', 'center')
    
    ctx.text3("SMG:", 120, 1540, 425, '#3f888f', 'center')
    ctx.text("Stinger - 1000", 100, 1540, 600, '#ffffff', 'center')
    ctx.text("Spectre - 1600", 100, 1540, 900, '#ffffff', 'center')
    ctx.text3("Shotgun:", 120, 1540, 1200, '#3f888f', 'center')
    ctx.text("Bucky - 900", 100, 1540, 1500, '#ffffff', 'center')
    ctx.text("Judge - 1500", 100, 1540, 1800, '#ffffff', 'center')
    
    ctx.text3("Rifle:", 120, 2500, 425, '#3f888f','center')
    ctx.text("Bulldog - 2100", 100, 2500, 600, '#ffffff', 'center')
    ctx.text("Guardian - 2500", 100, 2500, 1000, '#ffffff', 'center')
    ctx.text("Phantom - 2900", 100, 2500, 1400, '#ffffff', 'center')
    ctx.text("Vandal - 2900", 100, 2500, 1800, '#ffffff', 'center')
    
    ctx.text3("Sniper:", 120, 3410, 425, '#3f888f', 'center')
    ctx.text("Marshal - 1100", 100, 3410, 600, '#ffffff', 'center')
    ctx.text("Operator - 4500", 100, 3410, 900,'#ffffff', 'center')
    ctx.text3("LMG:", 120, 3410, 1225, '#3f888f', 'center')
    ctx.text("Ares - 1600", 100, 3410, 1500, '#ffffff', 'center')
    ctx.text("Odin - 3200", 100, 3410, 1800, '#ffffff', 'center')
    
    ctx.beginPath()
    ctx.moveTo(1060, 300)
    ctx.lineTo(1060, 1900);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.beginPath()
    ctx.moveTo(2020, 300)
    ctx.lineTo(2020, 1900);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.beginPath()
    ctx.moveTo(2980, 300)
    ctx.lineTo(2980, 1900);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.beginPath()
    ctx.moveTo(1200, 1025)
    ctx.lineTo(1900, 1025);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.beginPath()
    ctx.moveTo(3100, 1025)
    ctx.lineTo(3800, 1025);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();
  }

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
    client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-weapon.png'})
}