//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const querystring = require("querystring");
const fs = require('fs')
const data = require("../server.js")


// Required for Attachment
const Discord = require('discord.js')

const db = require('../db.js')

Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })


module.exports = async (args, client, message) => {
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
      description: 'Classic',
      imagesize: '147x113',
      url: 'commands/images/classic-model.png'
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
      description: 'Shorty',
      imagesize: '155x50',
      url: 'commands/images/shorty-model.png'
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
      description: 'Frenzy',
      imagesize: '127x97',
      url: 'commands/images/frenzy-model.png'
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
      description: 'Ghost',
      imagesize: '109x60',
      url: 'commands/images/ghost-model.png'
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
      description: 'Sheriff',
      imagesize: '125x67',
      url: 'commands/images/sheriff-model.png'
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
      description: 'Stinger',
      imagesize: '231x95',
      url: 'commands/images/stinger-model.png'
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
  
  const background = await Canvas.loadImage("commands/images/Valorant_LABS.png"); //load background from url
  ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
  
    var lang = db.get(`${message.guild.id}.lang`) || 'en'

    const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
    // Cut start to get the name
    const name = message.content.toLowerCase().substr(prefix.length + 7)
    // lookup data for weapon
    const weapon = Weapons[name]
    //check if weapon exist
    if (weapon) {
      if(lang == 'en') {
      ctx.text2('STATS: ' + weapon.description, 160, canvasstats.width / 2, 190, '#ffffff', 'center')
      ctx.text('Type: ', 110, 340, 450, '#3f888f')
      ctx.text(weapon.type, 110, 615, 450)
      ctx.text('Cost: ', 110, 340, 750, '#3f888f')
      ctx.text(weapon.cost, 110, 615, 750)
      ctx.text('Firemode:  ', 110, 340, 1050, '#3f888f')
      ctx.text(weapon.firemode, 110, 845, 1050)
      ctx.text('Range: ', 110, 340, 1350, '#3f888f')
      ctx.text(weapon.range, 110, 690, 1350)
      ctx.text('Magsize: ', 110, 340, 1650, '#3f888f')
      ctx.text(weapon.magsize, 110, 790, 1650)
      
      ctx.text('Head: ', 110, 1820, 450, '#3f888f')
      ctx.text(weapon.head, 110, 2125, 450)
      ctx.text('Body: ', 110, 1820, 750, '#3f888f')
      ctx.text(weapon.body, 110, 2125, 750)
      ctx.text('Leg: ', 110, 1820, 1050, '#3f888f')
      ctx.text(weapon.leg, 110, 2050, 1050)
      ctx.text('Firerate: ', 110, 1820, 1350, '#3f888f')
      ctx.text(weapon.firerate, 110, 2250, 1350)
      ctx.text('Penetration: ', 110, 1820, 1650, '#3f888f')
      ctx.text(weapon.penetration, 110, 2425, 1650, weapon.penetration == 'Low' ? '#ff0000' : weapon.penetration == 'Medium' ? '#FFFF00' : weapon.penetration == 'High' ? '#008000' : '#ffffff')
      
      if(weapon.imagesize == '147x113') { //Classic
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 900, 588, 452); // displays mapap
      }
      if(weapon.imagesize == '155x50') { //Shorty
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 950, 620, 200); // displays mapap
      }
      if(weapon.imagesize == '127x97') { //Frenzy
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 850, 635, 582); // displays mapap
      }
      if(weapon.imagesize == '109x60') { //Ghost
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 850, 654, 360); // displays mapap
      }
      if(weapon.imagesize == '125x67') { //Sheriff
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 900, 625, 335); // displays mapap
      }
      if(weapon.imagesize == '231x95') { //Stinger
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 380); // displays mapap
      }
      if(weapon.imagesize == '232x86') { //Spectre
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 928, 344); // displays mapap
      }
      if(weapon.imagesize == '230x43') { //Bucky
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 920, 172); // displays mapap
      }
      if(weapon.imagesize == '231x72') { //Judge
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 288); // displays mapap
      }
      if(weapon.imagesize == '222x70') { //Bulldog
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 999, 315); // displays mapap
      }
      if(weapon.imagesize == '231x52') { //Guardian
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 208); // displays mapap
      }
      if(weapon.imagesize == '298x94') { //Phantom
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 1043, 329); // displays mapap
      }
      if(weapon.imagesize == '231x76') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 304); // displays mapap
      }
      if(weapon.imagesize == '231x40') { //Marshal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 160); // displays mapap
      }
      if(weapon.imagesize == '231x46') { //Operator
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 1000, 924, 184); // displays mapap
      }
      if(weapon.imagesize == '231x47') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 1000, 924, 188); // displays mapap
      }
      if(weapon.imagesize == '231x65') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 950, 924, 260); // displays mapap
      }
    } else if (lang == 'de') {
      ctx.text2('STATS: ' + weapon.description, 160, canvasstats.width / 2, 190, '#ffffff', 'center')
      ctx.text('Typ: ', 110, 340, 450, '#3f888f')
      ctx.text(weapon.type, 110, 575, 450)
      ctx.text('Kosten: ', 110, 340, 750, '#3f888f')
      ctx.text(weapon.cost, 110, 725, 750)
      ctx.text('Feuermodus:  ', 110, 340, 1050, '#3f888f')
      ctx.text(weapon.firemode, 110, 990, 1050)
      ctx.text('Reichweite: ', 110, 340, 1350, '#3f888f')
      ctx.text(weapon.range, 110, 925, 1350)
      ctx.text('Magazingroese: ', 110, 340, 1650, '#3f888f')
      ctx.text(weapon.magsize, 110, 1120, 1650)
      
      ctx.text('Kopf: ', 110, 1800, 450, '#3f888f')
      ctx.text(weapon.head, 110, 2075, 450)
      ctx.text('Koerper: ', 110, 1800, 750, '#3f888f')
      ctx.text(weapon.body, 110, 2230, 750)
      ctx.text('Bein: ', 110, 1800, 1050, '#3f888f')
      ctx.text(weapon.leg, 110, 2050, 1050)
      ctx.text('Feuerrate: ', 110, 1800, 1350, '#3f888f')
      ctx.text(weapon.firerate, 110, 2310, 1350)
      ctx.text('Durchschuss: ', 110, 1800, 1650, '#3f888f')
      ctx.text(weapon.penetration, 110, 2485, 1650, weapon.penetration == 'Low' ? '#ff0000' : weapon.penetration == 'Medium' ? '#FFFF00' : weapon.penetration == 'High' ? '#008000' : '#ffffff')
      
      if(weapon.imagesize == '147x113') { //Classic
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 900, 588, 452); // displays mapap
      }
      if(weapon.imagesize == '155x50') { //Shorty
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 950, 620, 200); // displays mapap
      }
      if(weapon.imagesize == '127x97') { //Frenzy
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 850, 635, 582); // displays mapap
      }
      if(weapon.imagesize == '109x60') { //Ghost
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 850, 654, 360); // displays mapap
      }
      if(weapon.imagesize == '125x67') { //Sheriff
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 900, 625, 335); // displays mapap
      }
      if(weapon.imagesize == '231x95') { //Stinger
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 380); // displays mapap
      }
      if(weapon.imagesize == '232x86') { //Spectre
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 928, 344); // displays mapap
      }
      if(weapon.imagesize == '230x43') { //Bucky
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 920, 172); // displays mapap
      }
      if(weapon.imagesize == '231x72') { //Judge
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 288); // displays mapap
      }
      if(weapon.imagesize == '222x70') { //Bulldog
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 999, 315); // displays mapap
      }
      if(weapon.imagesize == '231x52') { //Guardian
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 208); // displays mapap
      }
      if(weapon.imagesize == '298x94') { //Phantom
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 1043, 329); // displays mapap
      }
      if(weapon.imagesize == '231x76') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 304); // displays mapap
      }
      if(weapon.imagesize == '231x40') { //Marshal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 160); // displays mapap
      }
      if(weapon.imagesize == '231x46') { //Operator
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 1000, 924, 184); // displays mapap
      }
      if(weapon.imagesize == '231x47') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 1000, 924, 188); // displays mapap
      }
      if(weapon.imagesize == '231x65') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 950, 924, 260); // displays mapap
      }

    } else if(lang == 'jp') {
      ctx.text4('統計: ' + weapon.description, 160, canvasstats.width / 2, 190, '#ffffff', 'center')
      ctx.text5('タイプ: ', 110, 340, 450, '#3f888f')
      ctx.text5(weapon.type, 110, 790, 450)
      ctx.text5('費用: ', 110, 340, 750, '#3f888f')
      ctx.text5(weapon.cost, 110, 650, 750)
      ctx.text5('発砲モード:  ', 110, 340, 1050, '#3f888f')
      ctx.text5(weapon.firemode, 110, 990, 1050)
      ctx.text5('範囲: ', 110, 340, 1350, '#3f888f')
      ctx.text5(weapon.range, 110, 650, 1350)
      ctx.text5('雑誌サイズ: ', 110, 340, 1650, '#3f888f')
      ctx.text5(weapon.magsize, 110, 1000, 1650)
      
      ctx.text5('頭: ', 110, 1800, 450, '#3f888f')
      ctx.text5(weapon.head, 110, 2025, 450)
      ctx.text5('体: ', 110, 1800, 750, '#3f888f')
      ctx.text5(weapon.body, 110, 2025, 750)
      ctx.text5('脚: ', 110, 1800, 1050, '#3f888f')
      ctx.text5(weapon.leg, 110, 2025, 1050)
      ctx.text5('発火率: ', 110, 1800, 1350, '#3f888f')
      ctx.text5(weapon.firerate, 110, 2175, 1350)
      ctx.text5('弾丸: ', 110, 1800, 1650, '#3f888f')
      ctx.text5(weapon.penetration, 110, 2100, 1650, weapon.penetration == 'Low' ? '#ff0000' : weapon.penetration == 'Medium' ? '#FFFF00' : weapon.penetration == 'High' ? '#008000' : '#ffffff')
      
      if(weapon.imagesize == '147x113') { //Classic
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 900, 588, 452); // displays mapap
      }
      if(weapon.imagesize == '155x50') { //Shorty
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 950, 620, 200); // displays mapap
      }
      if(weapon.imagesize == '127x97') { //Frenzy
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 850, 635, 582); // displays mapap
      }
      if(weapon.imagesize == '109x60') { //Ghost
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 850, 654, 360); // displays mapap
      }
      if(weapon.imagesize == '125x67') { //Sheriff
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 900, 625, 335); // displays mapap
      }
      if(weapon.imagesize == '231x95') { //Stinger
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 380); // displays mapap
      }
      if(weapon.imagesize == '232x86') { //Spectre
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 928, 344); // displays mapap
      }
      if(weapon.imagesize == '230x43') { //Bucky
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 920, 172); // displays mapap
      }
      if(weapon.imagesize == '231x72') { //Judge
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 288); // displays mapap
      }
      if(weapon.imagesize == '222x70') { //Bulldog
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 999, 315); // displays mapap
      }
      if(weapon.imagesize == '231x52') { //Guardian
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 208); // displays mapap
      }
      if(weapon.imagesize == '298x94') { //Phantom
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 1043, 329); // displays mapap
      }
      if(weapon.imagesize == '231x76') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 304); // displays mapap
      }
      if(weapon.imagesize == '231x40') { //Marshal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 160); // displays mapap
      }
      if(weapon.imagesize == '231x46') { //Operator
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 1000, 924, 184); // displays mapap
      }
      if(weapon.imagesize == '231x47') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 1000, 924, 188); // displays mapap
      }
      if(weapon.imagesize == '231x65') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 950, 924, 260); // displays mapap
      }
    } else if (lang == 'pt-br') {
      ctx.text2('Estatisticas: ' + weapon.description, 130, canvasstats.width / 2, 190, '#ffffff', 'center')
      ctx.text('Tipo: ', 110, 340, 450, '#3f888f')
      ctx.text(weapon.type, 110, 610, 450)
      ctx.text('Custos: ', 110, 340, 750, '#3f888f')
      ctx.text(weapon.cost, 110, 725, 750)
      ctx.text('Modo de fogo:  ', 110, 340, 1050, '#3f888f')
      ctx.text(weapon.firemode, 110, 1070, 1050)
      ctx.text('Alcance: ', 110, 340, 1350, '#3f888f')
      ctx.text(weapon.range, 110, 790, 1350)
      ctx.text('Tamanho da revista: ', 110, 340, 1650, '#3f888f')
      ctx.text(weapon.magsize, 110, 1320, 1650)
      
      ctx.text('Cabeça: ', 110, 1950, 450, '#3f888f')
      ctx.text(weapon.head, 110, 2365, 450)
      ctx.text('Corpo: ', 110, 1950, 750, '#3f888f')
      ctx.text(weapon.body, 110, 2300, 750)
      ctx.text('Perna: ', 110, 1950, 1050, '#3f888f')
      ctx.text(weapon.leg, 110, 2280, 1050)
      ctx.text('Taxa de incêndio: ', 110, 1950, 1350, '#3f888f')
      ctx.text(weapon.firerate, 110, 2800, 1350)
      ctx.text('Disparar através: ', 110, 1950, 1650, '#3f888f')
      ctx.text(weapon.penetration, 110, 2800, 1650, weapon.penetration == 'Low' ? '#ff0000' : weapon.penetration == 'Medium' ? '#FFFF00' : weapon.penetration == 'High' ? '#008000' : '#ffffff')
      
      if(weapon.imagesize == '147x113') { //Classic
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 900, 588, 452); // displays mapap
      }
      if(weapon.imagesize == '155x50') { //Shorty
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 950, 620, 200); // displays mapap
      }
      if(weapon.imagesize == '127x97') { //Frenzy
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 850, 635, 582); // displays mapap
      }
      if(weapon.imagesize == '109x60') { //Ghost
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 850, 654, 360); // displays mapap
      }
      if(weapon.imagesize == '125x67') { //Sheriff
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2700, 900, 625, 335); // displays mapap
      }
      if(weapon.imagesize == '231x95') { //Stinger
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 380); // displays mapap
      }
      if(weapon.imagesize == '232x86') { //Spectre
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 928, 344); // displays mapap
      }
      if(weapon.imagesize == '230x43') { //Bucky
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 920, 172); // displays mapap
      }
      if(weapon.imagesize == '231x72') { //Judge
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 288); // displays mapap
      }
      if(weapon.imagesize == '222x70') { //Bulldog
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 999, 315); // displays mapap
      }
      if(weapon.imagesize == '231x52') { //Guardian
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 208); // displays mapap
      }
      if(weapon.imagesize == '298x94') { //Phantom
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 1043, 329); // displays mapap
      }
      if(weapon.imagesize == '231x76') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 304); // displays mapap
      }
      if(weapon.imagesize == '231x40') { //Marshal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 900, 924, 160); // displays mapap
      }
      if(weapon.imagesize == '231x46') { //Operator
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 1000, 924, 184); // displays mapap
      }
      if(weapon.imagesize == '231x47') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 1000, 924, 188); // displays mapap
      }
      if(weapon.imagesize == '231x65') { //Vandal
        const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
        ctx.drawImage(weaponimage, 2600, 950, 924, 260); // displays mapap
      }
     } else if (lang == 'fr') {
        ctx.text2('Statistiques: ' + weapon.description, 140, canvasstats.width / 2, 190, '#ffffff', 'center')
        ctx.text('Type: ', 110, 340, 450, '#3f888f')
        ctx.text(weapon.type, 110, 630, 450)
        ctx.text('Frais: ', 110, 340, 750, '#3f888f')
        ctx.text(weapon.cost, 110, 630, 750)
        ctx.text('Mode feu:  ', 110, 340, 1050, '#3f888f')
        ctx.text(weapon.firemode, 110, 875, 1050)
        ctx.text('Intervalle: ', 110, 340, 1350, '#3f888f')
        ctx.text(weapon.range, 110, 850, 1350)
        ctx.text('Taille du magazine: ', 110, 340, 1650, '#3f888f')
        ctx.text(weapon.magsize, 110, 1280, 1650)
        
        ctx.text('Tête: ', 110, 1800, 450, '#3f888f')
        ctx.text(weapon.head, 110, 2075, 450)
        ctx.text('Corps: ', 110, 1800, 750, '#3f888f')
        ctx.text(weapon.body, 110, 2150, 750)
        ctx.text('Jambe: ', 110, 1800, 1050, '#3f888f')
        ctx.text(weapon.leg, 110, 2180, 1050)
        ctx.text('Cadence de tir: ', 110, 1800, 1350, '#3f888f')
        ctx.text(weapon.firerate, 110, 2575, 1350)
        ctx.text('Balle: ', 110, 1800, 1650, '#3f888f')
        ctx.text(weapon.penetration, 110, 2100, 1650, weapon.penetration == 'Low' ? '#ff0000' : weapon.penetration == 'Medium' ? '#FFFF00' : weapon.penetration == 'High' ? '#008000' : '#ffffff')
        
        if(weapon.imagesize == '147x113') { //Classic
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2700, 900, 588, 452); // displays mapap
        }
        if(weapon.imagesize == '155x50') { //Shorty
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2700, 950, 620, 200); // displays mapap
        }
        if(weapon.imagesize == '127x97') { //Frenzy
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2700, 850, 635, 582); // displays mapap
        }
        if(weapon.imagesize == '109x60') { //Ghost
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2700, 850, 654, 360); // displays mapap
        }
        if(weapon.imagesize == '125x67') { //Sheriff
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2700, 900, 625, 335); // displays mapap
        }
        if(weapon.imagesize == '231x95') { //Stinger
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 924, 380); // displays mapap
        }
        if(weapon.imagesize == '232x86') { //Spectre
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 928, 344); // displays mapap
        }
        if(weapon.imagesize == '230x43') { //Bucky
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 920, 172); // displays mapap
        }
        if(weapon.imagesize == '231x72') { //Judge
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 924, 288); // displays mapap
        }
        if(weapon.imagesize == '222x70') { //Bulldog
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 999, 315); // displays mapap
        }
        if(weapon.imagesize == '231x52') { //Guardian
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 924, 208); // displays mapap
        }
        if(weapon.imagesize == '298x94') { //Phantom
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 1043, 329); // displays mapap
        }
        if(weapon.imagesize == '231x76') { //Vandal
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 924, 304); // displays mapap
        }
        if(weapon.imagesize == '231x40') { //Marshal
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 900, 924, 160); // displays mapap
        }
        if(weapon.imagesize == '231x46') { //Operator
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 1000, 924, 184); // displays mapap
        }
        if(weapon.imagesize == '231x47') { //Vandal
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 1000, 924, 188); // displays mapap
        }
        if(weapon.imagesize == '231x65') { //Vandal
          const weaponimage = await Canvas.loadImage(weapon.url); //load map from url
          ctx.drawImage(weaponimage, 2600, 950, 924, 260); // displays mapap
        }
    }        
  } else {
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

    const avatarl = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg'}));
    ctx.drawImage(avatarl, 30, 1925, 200, 200)

    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-weapon.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
}
//}