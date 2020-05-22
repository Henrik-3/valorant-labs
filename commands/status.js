const r = require('request-promise')
const moment = require('moment')

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
  
  const serverregionsplit = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
  const serverregion = serverregionsplit[0];

    //no arg for GET
    if (!args.length) {
    return message.channel.send("You need to supply a valid server region [EU or NA]");
    }

  if(serverregion == "na" || serverregion == "NA" || serverregion == "Na" || serverregion == "nA" || serverregion == "eu" || serverregion == "EU" || serverregion == "Eu" || serverregion == "eU") {
  } else {
    message.channel.send("You need to supply a valid server region [EU or NA]")
  }
  
  if (serverregion == "eu" || serverregion == "EU" || serverregion == "Eu" || serverregion == "eU") {
    //HTTP GET EU STATS
    const eustatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/eu.json`,
      json: true
    })
    
    ctx.text2("Server Status EU", 150, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    if(eustatus.maintenances.toString() == "" && eustatus.incidents.toString() == "" ) {
      ctx.text("NO ISSUES", 90, 3200, 170, '#008000')
      ctx.text('No Issues on EU Servers', 150, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')
      //message.channel.send("No Issues")
    }
    
    console.log(eustatus.incidents.toString())
    
    if(eustatus.incidents.toString() != "" ) {
      ctx.text("ISSUE FOUND", 80, 3200, 170, '#ff0000')
      ctx.text("Issue: " + eustatus.incidents[0].titles.find(c => c.locale == "en_US").content, 180, 140, 550, '#ffffff');
      ctx.text("Posted at: " + moment(eustatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 110, 140, 750, '#3f888f')
      
      var content = eustatus.incidents[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 120, 140, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 120, 140, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 120, 140, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 120, 140, 1600)    
      }
    
    if(eustatus.maintenances.toString() != "") {
      
      ctx.text("ISSUE FOUND", 80, 3200, 170, '#ff0000')
      ctx.text("Issue: " + eustatus.maintenances[0].titles.find(c => c.locale == "en_US").content, 180, 140, 550, '#ffffff')
      ctx.text("Posted at: " + moment(eustatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 110, 140, 750, '#3f888f')
      
      var content = eustatus.maintenances[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 120, 140, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 120, 140, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 120, 140, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 120, 140, 1600)
          
      }
    
    //Text DC Tag/ID:
    ctx.text2(message.member.user.tag, 80, 245, 150)
    
    //Avatar
    const ctx_v = canvasstats.getContext('2d') //text preparation
    // Pick up the pen
	  ctx_v.beginPath();
	  // Start the arc to form a circle
	  ctx_v.arc(125, 125, 100, 0, Math.PI * 2, true);
	  // Put the pen down
	  ctx_v.closePath();
	  // Clip off the region you drew on
	  ctx_v.clip();
    const avatarl = await Canvas.loadImage(message.author.displayAvatarURL);
    ctx_v.drawImage(avatarl, 25, 25, 200, 200)
  
    const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-status-EU.png" ); //final result
    message.channel.send(attachment); //send final result
  }
  
  if (serverregion == "na" || serverregion == "NA" || serverregion == "Na" || serverregion == "nA") {
    //HTTP GET NA STATS
    const nastatus = await r({
      url: `https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/na.json`,
      json: true
    })
    
    ctx.text2("Server Status NA", 150, canvasstats.width / 2, 200, '#ffffff', 'center')
    
    if(nastatus.maintenances.toString() == "" && nastatus.incidents.toString() == "") {
      ctx.text("NO ISSUES", 90, 3200, 170, '#008000')
      ctx.text2('No Issues on NA Servers', 130, canvasstats.width / 2, canvasstats.height / 2, '#ffffff', 'center')
      //message.channel.send("No Issues")
    }
    
    if(nastatus.incidents.toString() != "") {
      
      ctx.text("ISSUE FOUND", 80, 3200, 170, '#ff0000')
      ctx.text("Issue: " + nastatus.incidents[0].titles.find(c => c.locale == "en_US").content, 180, 140, 550, '#ffffff')
      ctx.text("Posted at: " + moment(nastatus.incidents[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 110, 140, 750, '#3f888f')
      
      var content = nastatus.incidents[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 120, 140, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 120, 140, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 120, 140, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 120, 140, 1600)
          
      }
    if(nastatus.maintenances.toString() != "") {
      
      ctx.text("ISSUE FOUND", 80, 3200, 170, '#ff0000')
      ctx.text("Issue: " + nastatus.maintenances[0].titles.find(c => c.locale == "en_US").content, 180, 140, 550, '#ffffff')
      ctx.text("Posted at: " + moment(nastatus.maintenances[0].created_at).format('MMMM Do YYYY, h:mm:ss a'), 110, 140, 750, '#3f888f')
      
      var content = nastatus.maintenances[0].updates[0].translations.find(c => c.locale == "en_US").content
      var contentarray = content.split(" ")
      contentarray.push(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
      
      console.log(contentarray[27])
      
      ctx.text(contentarray[0] + " " + contentarray[1] + " " + contentarray[2] + " " + contentarray[3] + " " + contentarray[4] + " " + contentarray[5] + " " + contentarray[6] + " " + contentarray[7] + " " + contentarray[8], 120, 140, 1000)
      ctx.text(contentarray[9] + " " + contentarray[10] + " " + contentarray[11] + " " + contentarray[12] + " " + contentarray[13] + " " + contentarray[14] + " " + contentarray[15] + " " + contentarray[16] + " " + contentarray[17] + " " + contentarray[18] , 120, 140, 1200)
      ctx.text(contentarray[19] + " " + contentarray[20] + " " + contentarray[21] + " " + contentarray[22] + " " + contentarray[23] + " " + contentarray[24] + " " + contentarray[25] + " " + contentarray[26] + " " + contentarray[27] + " " + contentarray[28] , 120, 140, 1400)
      ctx.text(contentarray[29] + " " + contentarray[30] + " " + contentarray[31] + " " + contentarray[32] + " " + contentarray[33] + " " + contentarray[34] + " " + contentarray[35] + " " + contentarray[36] + " " + contentarray[37] + " " + contentarray[38] , 120, 140, 1600)
          
      }
    //Text DC Tag/ID:
    ctx.text2(message.member.user.tag, 80, 245, 150)
    
    //Avatar
    const ctx_v = canvasstats.getContext('2d') //text preparation
    // Pick up the pen
	  ctx_v.beginPath();
	  // Start the arc to form a circle
	  ctx_v.arc(125, 125, 100, 0, Math.PI * 2, true);
	  // Put the pen down
	  ctx_v.closePath();
	  // Clip off the region you drew on
	  ctx_v.clip();
    const avatarl = await Canvas.loadImage(message.author.displayAvatarURL);
    ctx_v.drawImage(avatarl, 25, 25, 200, 200) 
  
    const attachment = new Discord.Attachment(canvasstats.toBuffer(),"valorant-status-NA.png" ); //final result
    message.channel.send(attachment); //send final result
  }
}
