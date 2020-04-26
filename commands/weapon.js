//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const querystring = require("querystring");
const fs = require('fs')
const data = require("../server.js")


// Required for Attachment
const Discord = require('discord.js')


Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })


module.exports = async (args, client, message) => {
    
  //can also be added to an config file
  const Weapons = {
    classic: {
      type: 'Sidearm - Pistol',
      cost: 'Free',
      firemode: 'Semi-Auto | 3-Shot',
      head: '78',
      body: '26',
      leg: '22',
      range: 'max.50m',
      magsize: '12',
      firerate: '6,75',
      penetration: 'Low',
      description: 'Classic'
    },
    shorty: {
      type: 'Sidearm - Shotgun',
      cost: '200',
      firemode: 'Semi-Auto',
      head: '36',
      body: '22',
      leg: '19',
      range: 'max.15m',
      magsize: '2',
      firerate: '3,3',
      penetration: 'Low',
      description: 'Shorty'
    },
    frenzy: {
      type: 'Sidearm - SMG',
      cost: '400',
      firemode: 'Full Auto',
      head: '78',
      body: '26',
      leg: '22',
      range: 'max.50m',
      magsize: '13',
      firerate: '10',
      penetration: 'Low',
      description: 'Frenzy'
    },
    ghost: {
      type: 'Sidearm - Pistol',
      cost: '500',
      firemode: 'Semi-Auto',
      head: '105',
      body: '33',
      leg: '26',
      range: 'max.50m',
      magsize: '15',
      firerate: '6,75',
      penetration: 'Medium',
      description: 'Ghost'
    },
    sheriff: {
      type: 'Sidearm - Pistol',
      cost: '800',
      firemode: 'Semi-Auto',
      head: '160',
      body: '55',
      leg: '47',
      range: 'max.50m',
      magsize: '6',
      firerate: '4',
      penetration: 'High',
      description: 'Sheriff'
    },
    stinger: {
      type: 'SMG',
      cost: '1000',
      firemode: 'Full Auto | 4-Burst',
      head: '67',
      body: '27',
      leg: '23',
      range: 'max.50m',
      magsize: '20',
      firerate: '18',
      penetration: 'Low',
      description: 'Stinger'
    },
    spectre: {
      type: 'SMG',
      cost: '1600',
      firemode: 'Full Auto',
      head: '78',
      body: '26',
      leg: '22',
      range: 'max.50m',
      magsize: '30',
      firerate: '15.33',
      penetration: 'Medium',
      description: 'Spectre'
    },
    bucky: {
      type: 'Shotgun',
      cost: '900',
      firemode: 'Semi-Auto',
      head: '44',
      body: '22',
      leg: '19',
      range: 'max.50m',
      magsize: '8',
      firerate: '1.1',
      penetration: 'Low',
      description: 'Bucky'
    },
    judge: {
      type: 'Shotgun',
      cost: '1500',
      firemode: 'Semi-Auto',
      head: '36',
      body: '17',
      leg: '14',
      range: 'max.50m',
      magsize: '7',
      firerate: '1.5',
      penetration: 'Medium',
      description: 'Judge'
    },
    bulldog: {
      type: 'Rifle',
      cost: '2100',
      firemode: 'Full Auto | 3-Burst',
      head: '159',
      body: '35',
      leg: '30',
      range: 'max.50m',
      magsize: '24',
      firerate: '9.15',
      penetration: 'Medium',
      description: 'Bulldog'
    },
    guardian: {
      type: 'Rifle',
      cost: '2700',
      firemode: 'Semi-Auto',
      head: '185',
      body: '35',
      leg: '430',
      range: 'No Limit',
      magsize: '12',
      firerate: '8.5',
      penetration: 'Medium',
      description: 'Guardian'
    },
    phantom: {
      type: 'Rifle',
      cost: '2900',
      firemode: 'Full Auto',
      head: '156',
      body: '39',
      leg: '33',
      range: 'max.50m',
      magsize: '30',
      firerate: '11',
      penetration: 'Medium',
      description: 'Phantom'
    },
    vandal: {
      type: 'Rifle',
      cost: '2900',
      firemode: 'Full Auto',
      head: '156',
      body: '39',
      leg: '33',
      range: 'max.50m',
      magsize: '25',
      firerate: '9.25',
      penetration: 'Medium',
      description: 'Vandal'
    },
    marshal: {
      type: 'Sniper',
      cost: '1100',
      firemode: 'Semi-Auto',
      head: '202',
      body: '101',
      leg: '85',
      range: 'No limit',
      magsize: '5',
      firerate: '1.5',
      penetration: 'Medium',
      description: 'Marshal'
    },
    operator: {
      type: 'Sniper',
      cost: '4500',
      firemode: 'Semi-Auto',
      head: '255',
      body: '150',
      leg: '127',
      range: 'No Limit',
      magsize: '5',
      firerate: '0.75',
      penetration: 'High',
      description: 'Operator'
    },
    ares: {
      type: 'LMG',
      cost: '1700',
      firemode: 'Full Auto',
      head: '72',
      body: '30',
      leg: '25',
      range: 'max.50m',
      magsize: '50',
      firerate: '13',
      penetration: 'High',
      description: 'Ares'
    },
    odin: {
      type: 'LMG',
      cost: '3200',
      firemode: 'Full Auto',
      head: '95',
      body: '38',
      leg: '32',
      range: 'max.50m',
      magsize: '100',
      firerate: '15.6',
      penetration: 'High',
      description: 'Odin'
    },
    knife: {
      type: 'Knife',
      cost: 'Free',
      firemode: 'Full Auto | Semi-Auto',
      head: 'n.A | ~150',
      body: 'n.A | ~150',
      leg: 'n.A | ~150',
      range: 'Melee',
      magsize: 'n.A',
      firerate: 'n.A',
      penetration: 'n.A',
      description: 'Knife'
    },
  }  
  
  const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
  const ctx = canvasstats.getContext('2d') //text preparation
  
    //function for easier text 
    //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
    ctx.text = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
    ctx.font = size + 'px product_sans';
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.fillText(content, x, y)
  }
  const background = await Canvas.loadImage("https://cdn.glitch.com/15c546f8-c377-494a-a8f3-e5f452789cdf%2FKomp%2010.png?v=1587586582984"); //load background from url
  ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
  
 // if (message.content.toLowerCase().startsWith('v!weapon ')) {
    // Cut start to get the name
    const name = message.content.toLowerCase().substr(9)
    // lookup data for weapon
    const weapon = Weapons[name]
    //check if weapon exist
    if (weapon) {
      ctx.text('STATS: ' + weapon.description, 240, canvasstats.width / 2, 320, '#ffffff', 'center')
      ctx.text('Type: ', 110, 140, 650, '#3f888f')
      ctx.text(weapon.type, 110, 415, 650)
      ctx.text('Cost: ', 110, 140, 950, '#3f888f')
      ctx.text(weapon.cost, 110, 415, 950)
      ctx.text('Firemode:  ', 110, 140, 1250, '#3f888f')
      ctx.text(weapon.firemode, 110, 645, 1250)
      ctx.text('Range: ', 110, 140, 1550, '#3f888f')
      ctx.text(weapon.range, 110, 490, 1550)
      ctx.text('Magsize: ', 110, 140, 1850, '#3f888f')
      ctx.text(weapon.magsize, 110, 590, 1850)
      
      ctx.text('Head: ', 110, 1920, 650, '#3f888f')
      ctx.text(weapon.head, 110, 2225, 650)
      ctx.text('Body: ', 110, 1920, 950, '#3f888f')
      ctx.text(weapon.body, 110, 2225, 950)
      ctx.text('Leg: ', 110, 1920, 1250, '#3f888f')
      ctx.text(weapon.leg, 110, 2150, 1250)
      ctx.text('Firerate: ', 110, 1920, 1550, '#3f888f')
      ctx.text(weapon.firerate, 110, 2350, 1550)
      ctx.text('Penetration: ', 110, 1920, 1850, '#3f888f')
      ctx.text(weapon.penetration, 110, 2525, 1850, weapon.penetration == 'Low' ? '#ff0000' : weapon.penetration == 'Medium' ? '#FFFF00' : weapon.penetration == 'High' ? '#008000' : '#ffffff')
    } else {
      //No info for this Weapon
      ctx.text('Weapon Overview', 180, canvasstats.width / 2, 200, '#ffffff', 'center')
      ctx.text("Sidearm:", 120, 200, 400, '#3f888f')
      ctx.text("Classic - 0", 100, 200, 600)
      ctx.text("Shorty - 200", 100, 200, 900)
      ctx.text("Frenzy - 400", 100, 200, 1200)
      ctx.text("Ghost - 500", 100, 200, 1500)
      ctx.text("Sheriff - 800", 100, 200, 1800)
      
      ctx.text("SMG:", 120, 950, 400, '#3f888f')
      ctx.text("Stinger - 1000", 100, 950, 600)
      ctx.text("Spectre - 1600", 100, 950, 900)
      ctx.text("Shotgun:", 120, 950, 1200, '#3f888f')
      ctx.text("Bucky - 900", 100, 950, 1500)
      ctx.text("Judge - 1500", 100, 950, 1800)
      
      ctx.text("Rifle:", 120, 1800, 400, '#3f888f')
      ctx.text("Bulldog - 2100", 100, 1800, 600)
      ctx.text("Guardian - 2700", 100, 1800, 900)
      ctx.text("Phantom - 2900", 100, 1800, 1200)
      ctx.text("Vandal - 2900", 100, 1800, 1500)
      
      ctx.text("Sniper:", 120, 2700, 400, '#3f888f')
      ctx.text("Marshall - 1100", 100, 2700, 600)
      ctx.text("Operator - 4500", 100, 2700, 900)
      ctx.text("LMG:", 120, 2700, 1200, '#3f888f')
      ctx.text("Ares - 1700", 100, 2700, 1500)
      ctx.text("Odin - 3200", 100, 2700, 1800)
      
      ctx.beginPath()
      ctx.moveTo(850, 300)
      ctx.lineTo(850, 1900);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.stroke();
      
      ctx.beginPath()
      ctx.moveTo(1700, 300)
      ctx.lineTo(1700, 1900);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.stroke();
      
      ctx.beginPath()
      ctx.moveTo(2600, 300)
      ctx.lineTo(2600, 1900);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.stroke();
      
      ctx.beginPath()
      ctx.moveTo(900, 1025)
      ctx.lineTo(1650, 1025);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.stroke();
      
      ctx.beginPath()
      ctx.moveTo(2650, 1025)
      ctx.lineTo(3500, 1025);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  
      //Text DC Tag/ID:
      ctx.text(message.member.user.tag, 80, 245, 150)
  
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
  
      const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-weapon.png" ); //final result
      message.channel.send(attachment); //send final result
  }
//}
