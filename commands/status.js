const r = require('request-promise')
const moment = require('moment')

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

  if(serverregion == "na" || serverregion == "NA" || serverregion == "Na" || serverregion == "nA" || serverregion == "eu" || serverregion == "EU" || serverregion == "Eu" || serverregion == "eU" || serverregion == "AP" || serverregion == "ap" || serverregion == "Ap" || serverregion == "aP" || serverregion == "SEA" || serverregion == "sea" || serverregion == "Sea" || serverregion == "Asia" || serverregion == "ASIA"|| serverregion == "asia" || serverregion == "BR" || serverregion == "br" || serverregion == "Br" || serverregion == "bR" || serverregion == "Brazil" || serverregion == "BRAZIL" || serverregion == "brazil" || serverregion == "KR" || serverregion == "kr" || serverregion == "Kr" || serverregion == "kR" || serverregion == "Korea" || serverregion == "KOREA" || serverregion == "korea" || serverregion == "LA" || serverregion == "la" || serverregion == "La" || serverregion == "lA" || serverregion == "LATAM" || serverregion == "Latam" || serverregion == "latam") {
  } else {
    ctx.text2('No Valid Region', 150, canvasstats.width / 2, 200, '#ffffff', 'center')
    ctx.text3('Overview for Regions: ', 140, canvasstats.width / 2, 210, '#ffffff', 'center')

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
    
    ctx.text2("Server Status EU", 150, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    if(eustatus.maintenances.toString() == "" && eustatus.incidents.toString() == "" ) {
  
      ctx.text3('No Issues on EU Servers', 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')
     }
    
    console.log(eustatus.incidents.toString())
    
    if(eustatus.incidents.toString() != "" ) {

      ctx.text("Issue: " + eustatus.incidents[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff');
      ctx.text("Posted at: " + moment(eustatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = eustatus.incidents[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)    
      }
    
    if(eustatus.maintenances.toString() != "") {
      


      ctx.text("Issue: " + eustatus.maintenances[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(eustatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = eustatus.maintenances[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-EU.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  }
  
  if (serverregion == "na" || serverregion == "NA" || serverregion == "Na" || serverregion == "nA") {
    //HTTP GET NA STATS
    const nastatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/na.json`,
      json: true
    })
    
    ctx.text2("Server Status NA", 150, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    if(nastatus.maintenances.toString() == "" && nastatus.incidents.toString() == "") {
      ctx.text3('No Issues on NA Servers', 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')
    }
    
    if(nastatus.incidents.toString() != "") {
      ctx.text("Issue: " + nastatus.incidents[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(nastatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = nastatus.incidents[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
     
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
      }
    if(nastatus.maintenances.toString() != "") {
      ctx.text("Issue: " + nastatus.maintenances[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(nastatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = nastatus.maintenances[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-NA.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  }

  if (serverregion == "AP" || serverregion == "ap" || serverregion == "Ap" || serverregion == "aP" || serverregion == "SEA" || serverregion == "sea" || serverregion == "Sea" || serverregion == "Asia" || serverregion == "ASIA"|| serverregion == "asia") {
    //HTTP GET EU STATS
    const apstatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/ap.json`,
      json: true
    })
    
    ctx.text2("Server Status ASIA/SEA", 150, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    if(apstatus.maintenances.toString() == "" && apstatus.incidents.toString() == "" ) {
  
      ctx.text3('No Issues on ASIA/SEA Servers', 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')
     }
    
    console.log(apstatus.incidents.toString())
    
    if(apstatus.incidents.toString() != "" ) {

      ctx.text("Issue: " + apstatus.incidents[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff');
      ctx.text("Posted at: " + moment(apstatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = apstatus.incidents[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)    
      }
    
    if(apstatus.maintenances.toString() != "") {

      ctx.text("Issue: " + apstatus.maintenances[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(apstatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = apstatus.maintenances[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-SEA/ASIA.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  }

  if (serverregion == "BR" || serverregion == "br" || serverregion == "Br" || serverregion == "bR" || serverregion == "Brazil" || serverregion == "BRAZIL" || serverregion == "brazil") {
    //HTTP GET NA STATS
    const brstatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/br.json`,
      json: true
    })
    
    ctx.text2("Server Status Brazil", 140, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    if(brstatus.maintenances.toString() == "" && brstatus.incidents.toString() == "") {
      ctx.text3('No Issues on Brazil Servers', 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')
    }
    
    if(brstatus.incidents.toString() != "") {
      ctx.text("Issue: " + brstatus.incidents[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(brstatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = brstatus.incidents[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
     
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
      }
    if(brstatus.maintenances.toString() != "") {
      ctx.text("Issue: " + brstatus.maintenances[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(brstatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = brstatus.maintenances[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-BRAZIL.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  }

  if (serverregion == "KR" || serverregion == "kr" || serverregion == "Kr" || serverregion == "kR" || serverregion == "Korea" || serverregion == "KOREA" || serverregion == "korea") {
    //HTTP GET NA STATS
    const krstatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/kr.json`,
      json: true
    })
    
    ctx.text2("Server Status Korea", 140, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    if(krstatus.maintenances.toString() == "" && krstatus.incidents.toString() == "") {
      ctx.text3('No Issues on Korea Servers', 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')
    }
    
    if(krstatus.incidents.toString() != "") {
      ctx.text("Issue: " + krstatus.incidents[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(krstatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = krstatus.incidents[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
     
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
      }
    if(krstatus.maintenances.toString() != "") {
      ctx.text("Issue: " + krstatus.maintenances[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(krstatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = krstatus.maintenances[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-KOREA.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  }

  if (serverregion == "LA" || serverregion == "la" || serverregion == "La" || serverregion == "lA" || serverregion == "LATAM" || serverregion == "Latam" || serverregion == "latam") {
    //HTTP GET NA STATS
    const lastatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/latam.json`,
      json: true
    })
    
    ctx.text2("Server Status Latin America", 100, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    if(lastatus.maintenances.toString() == "" && lastatus.incidents.toString() == "") {
      ctx.text3('No Issues on Latin America Servers', 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')
    }
    
    if(lastatus.incidents.toString() != "") {
      ctx.text("Issue: " + lastatus.incidents[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(lastatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = lastatus.incidents[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
     
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
      }
    if(lastatus.maintenances.toString() != "") {
      ctx.text("Issue: " + lastatus.maintenances[0].titles.find(c => c.locale == "en_US").content, 130, 340, 550, '#ffffff')
      ctx.text("Posted at: " + moment(lastatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 90, 340, 750, '#3f888f')
      
      var content = lastatus.maintenances[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 110, 340, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 110, 340, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 110, 340, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 110, 340, 1600)
          
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
  
    const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-status-LATIN-AMERICA.png" ); //final result
    message.channel.send(attachment); //send final result
    message.channel.stopTyping()
  }
}
