module.exports = async (args, client, message, { Canvas, Discord }) => {
  message.channel.startTyping()
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
      firerate: '13.33',
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
      firerate: '3.5',
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
      cost: '2500',
      firemode: 'Semi-Auto',
      head: '185',
      body: '35',
      leg: '430',
      range: 'No Limit',
      magsize: '12',
      firerate: '4.75',
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
      cost: '1600',
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
  
      const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-weapon-overview.png" ); //final result
      message.channel.send(attachment); //send final result
      message.channel.stopTyping()
}