const r = require('request-promise')
const moment = require('moment')
const fs = require('fs')

module.exports = async (args, client, message, { Canvas, Discord }) => {
  message.channel.startTyping()
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

  
  const serverregionsplit = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
  const serverregion = serverregionsplit[0];

    /* //no arg for GET
    if (!args.length) {
    message.channel.send("You need to supply a valid server region [EU or NA]");
    message.channel.stopTyping()
    } */

  const db = require('../db.js')
  var lang = db.get(`${message.guild.id}.lang`) || 'en'
  var linkjson = JSON.parse(fs.readFileSync('lang.json'))

  if(serverregion == "na" || serverregion == "NA" || serverregion == "Na" || serverregion == "nA" || serverregion == "eu" || serverregion == "EU" || serverregion == "Eu" || serverregion == "eU" || serverregion == "AP" || serverregion == "ap" || serverregion == "Ap" || serverregion == "aP" || serverregion == "SEA" || serverregion == "sea" || serverregion == "Sea" || serverregion == "Asia" || serverregion == "ASIA"|| serverregion == "asia" || serverregion == "BR" || serverregion == "br" || serverregion == "Br" || serverregion == "bR" || serverregion == "Brazil" || serverregion == "BRAZIL" || serverregion == "brazil" || serverregion == "KR" || serverregion == "kr" || serverregion == "Kr" || serverregion == "kR" || serverregion == "Korea" || serverregion == "KOREA" || serverregion == "korea" || serverregion == "LA" || serverregion == "la" || serverregion == "La" || serverregion == "lA" || serverregion == "LATAM" || serverregion == "Latam" || serverregion == "latam") {
  } else {
    ctx.text2(linkjson[lang].statusinvalidregion, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
    ctx.text3(linkjson[lang].statusinvalidoverview, 140, canvasstats.width / 2, 210, '#ffffff', 'center')

    ctx.text3('Europe', 110, 350, 500)
    ctx.text3('North America', 110, 350, 750)
    ctx.text3('Latin America', 110, 350, 1000)
    ctx.text3('Asia/SEA', 110, 350, 1250)
    ctx.text3('Korea', 110, 350, 1500)
    ctx.text3('Brazil', 110, 350, 1750)

    ctx.text('EU, eu, Eu, eU', 110, 1550, 500)
    ctx.text('NA, na, Na, nA', 110, 1550, 750)
    ctx.text('LA, la ,La, lA, LATAM, Latam, latam', 110, 1550, 1000)
    ctx.text('AP, ap, Ap, aP, SEA, sea, Sea, Asia, ASIA, asia', 110, 1550, 1250)
    ctx.text('KR, kr, Kr, kR, Korea, KOREA, korea', 110, 1550, 1500)
    ctx.text('BR, br, Br, bR, Brazil, BRAZIL, brazil', 110, 1550, 1750)

    ctx.beginPath()
    ctx.moveTo(350, 590)
    ctx.lineTo(3700, 590);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(350, 840)
    ctx.lineTo(3700, 840);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(350, 1090)
    ctx.lineTo(3700, 1090);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(350, 1340)
    ctx.lineTo(3700, 1340);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(350, 1590)
    ctx.lineTo(3700, 1590);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(1450, 400)
    ctx.lineTo(1450, 1800);
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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-help.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  }
  
  if (serverregion == "eu" || serverregion == "EU" || serverregion == "Eu" || serverregion == "eU") {
    //HTTP GET EU STATS
    const eustatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/eu.json`,
      json: true
    })
    
    if(eustatus.maintenances.toString() == "" && eustatus.incidents.toString() == "" ) {
      ctx.text2(linkjson[lang].statuseu, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
      ctx.text3(linkjson[lang].statuseuokay, 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')

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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-EU.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
     }
    
    if(eustatus.incidents.toString() != "" ) {

      const Embed = new Discord.MessageEmbed()
	      .setColor('#FF0000')
	      .setTitle(linkjson[lang].statusissue + eustatus.incidents[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(eustatus.incidents[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(eustatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: eustatus.incidents[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: eustatus.incidents[0].incident_severity, inline: true}
        )
	      .setTimestamp()
	      .setFooter('VALORANT LABS [STATUS EU]');
      message.channel.send(Embed);
      message.channel.stopTyping()
      }
    
    if(eustatus.maintenances.toString() != "") {

      const Embed = new Discord.MessageEmbed()
	      .setColor('#FF0000')
	      .setTitle(linkjson[lang].statusissue + eustatus.maintenances[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(eustatus.maintenances[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(eustatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: eustatus.maintenances[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: eustatus.maintenances[0].incident_severity, inline: true}
        )
	      .setTimestamp()
	      .setFooter('VALORANT LABS [STATUS EU]');
      message.channel.send(Embed);
      message.channel.stopTyping()   
      }
  }
  
  if (serverregion == "na" || serverregion == "NA" || serverregion == "Na" || serverregion == "nA") {
    //HTTP GET NA STATS
    const nastatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/na.json`,
      json: true
    })
    
    if(nastatus.maintenances.toString() == "" && nastatus.incidents.toString() == "") {
      ctx.text2(linkjson[lang].statusna, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
      ctx.text3(linkjson[lang].statusnaokay, 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')

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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-NA.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
    }
    
    if(nastatus.incidents.toString() != "") {
      const Embed = new Discord.MessageEmbed()
	      .setColor('#FF0000')
	      .setTitle(linkjson[lang].statusissue + nastatus.incidents[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(nastatus.incidents[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(nastatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: nastatus.incidents[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: nastatus.incidents[0].incident_severity, inline: true}
        )
	      .setTimestamp()
	      .setFooter('VALORANT LABS [STATUS NA]');
      message.channel.send(Embed);
      message.channel.stopTyping()
      }
    if(nastatus.maintenances.toString() != "") {
      const Embed = new Discord.MessageEmbed()
	      .setColor('#FF0000')
	      .setTitle(linkjson[lang].statusissue + nastatus.maintenances[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(nastatus.maintenances[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(nastatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: nastatus.maintenances[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: nastatus.maintenances[0].incident_severity, inline: true}
        )
	      .setTimestamp()
	      .setFooter('VALORANT LABS [STATUS NA]');
      message.channel.send(Embed);
      message.channel.stopTyping()
      }
  }

  if (serverregion == "AP" || serverregion == "ap" || serverregion == "Ap" || serverregion == "aP" || serverregion == "SEA" || serverregion == "sea" || serverregion == "Sea" || serverregion == "Asia" || serverregion == "ASIA"|| serverregion == "asia") {
    //HTTP GET EU STATS
    const apstatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/ap.json`,
      json: true
    })

    if(apstatus.maintenances.toString() == "" && apstatus.incidents.toString() == "" ) {
      ctx.text2(linkjson[lang].statusap, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
      ctx.text3(linkjson[lang].statusapokay, 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')

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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-SEA/ASIA.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
     }
    
    if(apstatus.incidents.toString() != "" ) {

      const Embed = new Discord.MessageEmbed()
	      .setColor('#FF0000')
	      .setTitle(linkjson[lang].statusissue + apstatus.incidents[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(apstatus.incidents[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(apstatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: apstatus.incidents[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: apstatus.incidents[0].incident_severity, inline: true}
        )
	      .setTimestamp()
	      .setFooter('VALORANT LABS [STATUS ASIA/SEA]');
      message.channel.send(Embed);
      message.channel.stopTyping()
      }
    
    if(apstatus.maintenances.toString() != "") {

      const Embed = new Discord.MessageEmbed()
	      .setColor('#FF0000')
	      .setTitle(linkjson[lang].statusissue + apstatus.maintenances[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(apstatus.maintenances[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(apstatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: apstatus.maintenances[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: apstatus.maintenances[0].incident_severity, inline: true}
        )
	      .setTimestamp()
	      .setFooter('VALORANT LABS [STATUS ASIA/SEA]');
      message.channel.send(Embed);
      message.channel.stopTyping()
      }
  }

  if (serverregion == "BR" || serverregion == "br" || serverregion == "Br" || serverregion == "bR" || serverregion == "Brazil" || serverregion == "BRAZIL" || serverregion == "brazil") {
    //HTTP GET NA STATS
    const brstatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/br.json`,
      json: true
    })
    
    if(brstatus.maintenances.toString() == "" && brstatus.incidents.toString() == "") {
      ctx.text2(linkjson[lang].statusbr, 140, canvasstats.width / 2, 200, '#ffffff', 'center')
      ctx.text3(linkjson[lang].statusbrokay, 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')

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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-BRAZIL.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
    }
    
    if(brstatus.incidents.toString() != "") {

      const Embed = new Discord.MessageEmbed()
	      .setColor('#FF0000')
	      .setTitle(linkjson[lang].statusissue + brstatus.incidents[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(brstatus.incidents[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(brstatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: brstatus.incidents[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: brstatus.incidents[0].incident_severity, inline: true}
        )
	      .setTimestamp()
	      .setFooter('VALORANT LABS [STATUS BRAZIL]');
      message.channel.send(Embed);
      message.channel.stopTyping()
      }
    if(brstatus.maintenances.toString() != "") {

      const Embed = new Discord.MessageEmbed()
	      .setColor('#FF0000')
	      .setTitle(linkjson[lang].statusissue + brstatus.maintenances[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(brstatus.maintenances[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(brstatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: brstatus.maintenances[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: brstatus.maintenances[0].incident_severity, inline: true}
        )
	      .setTimestamp()
	      .setFooter('VALORANT LABS [STATUS BRAZIL]');
      message.channel.send(Embed);
      message.channel.stopTyping()
      }
  }

  if (serverregion == "KR" || serverregion == "kr" || serverregion == "Kr" || serverregion == "kR" || serverregion == "Korea" || serverregion == "KOREA" || serverregion == "korea") {
    //HTTP GET NA STATS
    const krstatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/kr.json`,
      json: true
    })

    if(krstatus.maintenances.toString() == "" && krstatus.incidents.toString() == "") {
      ctx.text2(linkjson[lang].statuskr, 140, canvasstats.width / 2, 200, '#ffffff', 'center')
      ctx.text3(linkjson[lang].statuskrokay, 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')

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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-KOREA.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
    }
    
    if(krstatus.incidents.toString() != "") {

      const Embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(linkjson[lang].statusissue + krstatus.incidents[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(krstatus.incidents[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(krstatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: krstatus.incidents[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: krstatus.incidents[0].incident_severity, inline: true}
        )
        .setTimestamp()
        .setFooter('VALORANT LABS [STATUS KOREA]');
     message.channel.send(Embed);
     message.channel.stopTyping()
      }
    if(krstatus.maintenances.toString() != "") {

      const Embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(linkjson[lang].statusissue + krstatus.maintenances[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(krstatus.maintenances[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(krstatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: krstatus.maintenances[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: krstatus.maintenances[0].incident_severity, inline: true}
        )
        .setTimestamp()
        .setFooter('VALORANT LABS [STATUS BRAZIL]');
     message.channel.send(Embed);
     message.channel.stopTyping()
    }
  }

  if (serverregion == "LA" || serverregion == "la" || serverregion == "La" || serverregion == "lA" || serverregion == "LATAM" || serverregion == "Latam" || serverregion == "latam") {
    //HTTP GET NA STATS
    const lastatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/latam.json`,
      json: true
    })
    
    if(lastatus.maintenances.toString() == "" && lastatus.incidents.toString() == "") {
      ctx.text2(linkjson[lang].statusla, 100, canvasstats.width / 2, 200, '#ffffff', 'center')
      ctx.text3(linkjson[lang].statuslaokay, 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')

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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-LATIN-AMERICA.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
    }
    
    if(lastatus.incidents.toString() != "") {

      const Embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(linkjson[lang].statusissue + lastatus.incidents[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(lastatus.incidents[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(lastatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: lastatus.incidents[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: lastatus.incidents[0].incident_severity, inline: true}
        )
        .setTimestamp()
        .setFooter('VALORANT LABS [STATUS LATIN AMERICA]');
     message.channel.send(Embed);
     message.channel.stopTyping()
      }
    if(lastatus.maintenances.toString() != "") {

      const Embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(linkjson[lang].statusissue + lastatus.maintenances[0].titles.find(c => c.locale == linkjson[lang].statusregion).content)
        .setDescription(lastatus.maintenances[0].updates[0].translations.find(c => c.locale == linkjson[lang].statusregion).content)
        .addFields(
          { name: linkjson[lang].statuspostedat, value: moment(lastatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), inline: true},
          { name: linkjson[lang].statusplatforms, value: lastatus.maintenances[0].platforms[0], inline: true},
          { name: linkjson[lang].statusissuetype, value: lastatus.maintenances[0].incident_severity, inline: true}
        )
        .setTimestamp()
        .setFooter('VALORANT LABS [STATUS LATIN AMERICA]');
     message.channel.send(Embed);
     message.channel.stopTyping()
    }
  }
}