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
    
    const Agents = {
    breach: {
      name: 'Breach',
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/breach/breach-cutout-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/brimstone/brimstone-cutout-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/cypher/cypher-cutout-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/jett/jett-cutout2-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/omen/omen-cutout-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/phoenix/phoenix-cutout-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/raze/raze-cutout-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/sage/sage-cutout-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/sova/sova-cutout-compressed.png',
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
      url: 'https://blitz-cdn.blitz.gg/blitz/val/agents/viper/viper-cutout-compressed.png',
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
  }
    
    
    const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
    // Cut start to get the name
    const name = message.content.toLowerCase().substr(prefix.length + 7)
    // lookup data for weapon
    const agent = Agents[name]
    
    ctx.text2('Agent: ' + agent.name, 180, canvasstats.width / 2, 200, '#ffffff', 'center')
    ctx.text('Source: https://blitz.gg/valorant/agents', 60, 50, 2100)
      
    const agentimage = await Canvas.loadImage(agent.url); //load map from url
    ctx.drawImage(agentimage, 3000, 350, 724, 469); // displays map
  
    ctx.text2('C-Cost:', 100, 150, 450, '#3f888f')
    ctx.text(agent.ccost, 100, 575, 450)
    ctx.text2('C-Ability:', 100, 150, 550, '#3f888f')
    ctx.text(agent.cability, 100, 700, 550)
  
    ctx.text2('Q-Cost:', 100, 150, 750,'#3f888f')
    ctx.text(agent.qcost, 100, 575, 750)
    ctx.text2('Q-Ability:', 100, 150, 850, '#3f888f')
    ctx.text(agent.qability, 100, 700, 850)
  
    ctx.text2('E-Cost:', 100, 150, 1050, '#3f888f')
    ctx.text(agent.ecost, 100, 575, 1050)
    ctx.text2('E-Ability:', 100, 150, 1150, '#3f888f')
    ctx.text(agent.eability, 100, 700, 1150)
  
    ctx.text2('X-Cost:', 100, 150, 1350, '#3f888f')
    ctx.text(agent.xcost, 100, 575, 1350)
    ctx.text2('X-Ability:', 100, 150, 1450, '#3f888f')
    ctx.text(agent.xability, 100, 700, 1450)
    ctx.text2('X-Ability-Description:', 100, 150, 1550, '#3f888f')
    ctx.text(agent.xabilitydescription, 100, 150, 1650)
    
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
