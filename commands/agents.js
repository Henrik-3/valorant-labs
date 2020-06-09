module.exports = async (args, client, message, { Canvas, Discord }) => {
    message.channel.startTyping()
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    const background = await Canvas.loadImage("./commands/images/Valorant_LABS.png"); //load background from url
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
  
  
    const db = require('../db.js')
    
    const Agents = {
    breach: {
      name: 'Breach',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png',
      ccost: '100',
      cability: 'Aftershock',
      cabilitydescription: 'Fusion Charge through wall. The burst does heavy damage to anyone in its range',
      qcost: '200',
      qability: 'Flashpoint',
      qabilitydescription: 'Flash through the wall. Blind all players looking at it',
      ecost: 'Free, 35sec. Cooldown',
      eability: 'Fault Line',
      eabilitydescription: 'Quake, which dazing all players in its zone',
      xcost: '7 Ult Points',
      xability: 'Rolling Thunder',
      xabilitydescription: 'Cascading Quake through all terrain in a large cone. The quake dazes and knocks up anyone caught in it.',
    },
    brimstone: {
      name: 'Brimstone',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt26fcf1b5752514ee/5eb7cdbfc1dc88298d5d3799/V_AGENTS_587x900_Brimstone.png',
      ccost: '100',
      cability: 'Stim Beacon',
      cabilitydescription: 'Stim Beacon, creates on landing a field which grant players RapidFire',
      qcost: '300',
      qability: 'Incendiary',
      qabilitydescription: 'Grenate, creating a lingering fire zone that damages players within the zone',
      ecost: '1 Free, 100 for extra charges',
      eability: 'Sky Smoke',
      eabilitydescription: 'Smoke, launching long-lasting smoke clouds that block vision in the selected area',
      xcost: '6 Ult Points',
      xability: 'Orbital Strike',
      xabilitydescription: 'Orbital Strike, dealing high damage-over-time to players cought in the selcted area',
    },
    cypher: {
      name: 'Cypher',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt158572ec37653cf3/5eb7cdc19df5cf37047009d1/V_AGENTS_587x900_Cypher.png',
      ccost: '200',
      cability: 'Trapwire',
      cabilitydescription: 'Enemy players who cross a tripwire will be tethered, and dazed after a short period if they do not destroy the device in time',
      qcost: '100',
      qability: 'Cyber Cage',
      qabilitydescription: 'Create a zone that blocks vision and slows enemies who pass through it.',
      ecost: 'Free, Usable once per round',
      eability: 'Spycam',
      eabilitydescription: 'Camera with a dart, dart will reveal the location of any player struck by the dart',
      xcost: '7 Ult Points',
      xability: 'Neural Theft',
      xabilitydescription: 'Use on a dead enemy in your crosshairs to reveal the location of all living enemy players',
    },
    jett: {
      name: 'Jett',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltceaa6cf20d328bd5/5eb7cdc1b1f2e27c950d2aaa/V_AGENTS_587x900_Jett.png',
      ccost: '100',
      cability: 'Cloudburst',
      cabilitydescription: 'Throw a projectile that expands into a brief vision-blocking cloud',
      qcost: '100',
      qability: 'Updraft',
      qabilitydescription: 'Propel Jett into the air',
      ecost: 'Free, Usable once per round, refreshed on 2 Kills',
      eability: 'Tailwind',
      eabilitydescription: 'Propel Jett in the direction she is moving',
      xcost: '7 Ult Points',
      xability: 'Bladestorm',
      xabilitydescription: 'High accurate throwing kniifes, recharge on killing an opponent',
    },
    omen: {
      name: 'Omen',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4e5af408cc7a87b5/5eb7cdc17bedc8627eff8deb/V_AGENTS_587x900_Omen.png',
      ccost: '100',
      cability: 'Shrouded Step',
      cabilitydescription: 'Shadow walk ability and see its range indicator',
      qcost: '200',
      qability: 'Paranoia',
      qabilitydescription: 'Fires a shadow projectile forward, reducing vision range of all players it touches.',
      ecost: 'Free 2 Charges, 30sec. Cooldown on charge refresh',
      eability: 'Dark Cover',
      eabilitydescription: 'Shadow Orb, creating a shadow sphere that blocks vision',
      xcost: '7 Ult Points',
      xability: 'Rolling Thunder',
      xabilitydescription: 'Teleport to any point on the map',
    },
    pheonix: {
      name: 'Pheonix',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf0200e1821b5b39f/5eb7cdc144bf8261a04d87f9/V_AGENTS_587x900_Phx.png',
      ccost: '200',
      cability: 'Blaze',
      qcost: '200',
      qability: 'Curveball',
      ecost: 'Free, Usable once per round, refreshed on 2 Kills',
      eability: 'Hot hands',
      xcost: '6 Ult Points',
      xability: 'Run it back',
      xabilitydescription: 'Creates a clone, which can die one time',
    },
    raze: {
      name: 'Raze',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6fef56a8182d0a81/5ebf2c2798f79d6925dbd6b4/V_AGENTS_587x900_ALL_Raze_2.png',
      ccost: '200',
      cability: 'Boom Bot',
      qcost: '200',
      qability: 'Blast Pack',
      ecost: '1 Free per round, Recharge on 2 kills.',
      eability: 'Paint Shells',
      xcost: '6 Ult Points',
      xability: 'Showstopper',
      xabilitydescription: 'Rocket Launcher',
    },
    sage: {
      name: 'Sage',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt8a627ec10b57f4f2/5eb7cdc16509f3370a5a93b7/V_AGENTS_587x900_sage.png',
      ccost: '400',
      cability: 'Barrier Orb',
      qcost: '100',
      qability: 'Slow Orb',
      ecost: 'Free, 35sec. Cooldown',
      eability: 'Healing Orb',
      xcost: '7 Ult Points',
      xability: 'Resurrection',
      xabilitydescription: 'Rescue a teammate',
    },
    sova: {
      name: 'Sova',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf11234f4775729b7/5ebf2c275e73766852c8d5d4/V_AGENTS_587x900_ALL_Sova_2.png',
      ccost: '300',
      cability: 'Owl Drone',
      qcost: '100',
      qability: 'Shock Bolt',
      ecost: 'Free, 35sec. Cooldown',
      eability: 'Recon Bolt',
      xcost: '7 Ult Points',
      xability: 'Hunter’s Fury',
      xabilitydescription: 'A bow with three long-range, wall-piercing energy blasts.',
    },
    viper: {
      name: 'Viper',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc825c6589eda7717/5eb7cdc6ee88132a6f6cfc25/V_AGENTS_587x900_Viper.png',
      ccost: '100',
      cability: 'Snake Bite',
      qcost: '200',
      qability: 'Poison Cloud',
      ecost: 'Placeable once per round.',
      eability: 'Toxic Screen',
      xcost: '7 Ult Points',
      xability: 'Viper’s Pit',
      xabilitydescription: 'Creating a large cloud that reduces the vision range and maximum health of players inside of it.',
    },
    reyna: {
      name: 'reyna',
      url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6577b1f58530e6b2/5eb7cdc121a5027d77420208/V_AGENTS_587x900_Reyna.png',
      ccost: '200',
      cability: 'Leer',
      qcost: '100',
      qability: 'Devour',
      ecost: 'Free',
      eability: 'Dismiss',
      eabilitydescription: 'Quake, which dazing all players in its zone',
      xcost: '6 Ult Points',
      xability: 'Empress',
      xabilitydescription: 'INSTANTLY enter a frenzy, increasing firing speed, equip and reload speed.',
    },

  }
    
    
    const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
    // Cut start to get the name
    const name = message.content.toLowerCase().substr(prefix.length + 7)
    // lookup data for weapon
    const agent = Agents[name]
    
    ctx.text2('Agent: ' + agent.name, 180, canvasstats.width / 2, 200, '#ffffff', 'center')
      
    const agentimage = await Canvas.loadImage(agent.url); //load map from url
    ctx.drawImage(agentimage, 2850, 30, 1056.6, 1620); // displays map
  
    ctx.text3('C-Cost:', 100, 350, 450, '#3f888f')
    ctx.text(agent.ccost, 100, 800, 450)
    ctx.text3('C-Ability:', 100, 350, 575, '#3f888f')
    ctx.text(agent.cability, 100, 900, 575)
  
    ctx.text3('Q-Cost:', 100, 350, 775,'#3f888f')
    ctx.text(agent.qcost, 100, 800, 775)
    ctx.text3('Q-Ability:', 100, 350, 900, '#3f888f')
    ctx.text(agent.qability, 100, 900, 900)
  
    ctx.text3('E-Cost:', 100, 350, 1100, '#3f888f')
    ctx.text(agent.ecost, 100, 800, 1100)
    ctx.text3('E-Ability:', 100, 350, 1225, '#3f888f')
    ctx.text(agent.eability, 100, 900, 1225)
  
    ctx.text3('X-Cost:', 100, 350, 1425, '#3f888f')
    ctx.text(agent.xcost, 100, 800, 1425)
    ctx.text3('X-Ability:', 100, 350, 1550, '#3f888f')
    ctx.text(agent.xability, 100, 900, 1550)
    ctx.text3('X-Ability-Description:', 100, 350, 1675, '#3f888f')
    ctx.text(agent.xabilitydescription, 100, 350, 1800)
    
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
    
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-agents.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
}
