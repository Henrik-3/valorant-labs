const fs = require('fs');
module.exports = async (args, client, message, { Canvas, Discord }) => {
    const db = require('../db.js')
    var lang = db.get(`${message.guildID}.lang`) || 'en-us'
    var linkjson = JSON.parse(fs.readFileSync('lang.json'))

    message.channel.sendTyping()
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
    
    const Agents = {
    breach: {
      name: 'Breach',
    },
    brimstone: {
      name: 'Brimstone',
    },
    cypher: {
      name: 'Cypher',
    },
    jett: {
      name: 'Jett',
    },
    omen: {
      name: 'Omen',
    },
    phoenix: {
      name: 'Phoenix',
    },
    raze: {
      name: 'Raze',
    },
    sage: {
      name: 'Sage',
    },
    sova: {
      name: 'Sova',
    },
    viper: {
      name: 'Viper',
    },
    reyna: {
      name: 'reyna',
    },
    killjoy: {
      name: 'killjoy'
    }
  }
    
  if (!args.length) {
    console.log('true')
      client.createMessage(message.channel.id, {embed: {title: linkjson[lang].agentunknown, color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [AGENT ERROR]'}}})
  } else {
    console.log('true2')
  const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
  // Cut start to get the name
  const name = message.content.toLowerCase().substr(prefix.length + 6)
  console.log(name)
  // lookup data for weapon
  const agent = Agents[name]
  if(agent) {
  if(name == 'breach') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("./commands/images/agent/Breach/Breach-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if(name == 'brimstone') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("./commands/images/agent/Brimstone/Brimstone-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'cypher') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("./commands/images/agent/Cypher/Cypher-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'jett') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Jett/Jett-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'omen') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Omen/Omen-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'phoenix') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Pheonix/Pheonix-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'raze') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Raze/Raze-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'reyna') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Reyna/Reyna-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'sage') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Sage/Sage-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'sova') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Sova/Sova-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'viper') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Viper/Viper-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
  } else if (name == 'killjoy') {
    if(lang == 'de') {
      const background = await Canvas.loadImage("commands/images/agent/Killjoy/Killjoy-Deutsch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'en-us' || lang == 'en-gb') {
      const background = await Canvas.loadImage("commands/images/agent/Killjoy/Killjoy-Englisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'fr') {
      const background = await Canvas.loadImage("commands/images/agent/Killjoy/Killjoy-Französisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'pt-br') {
      const background = await Canvas.loadImage("commands/images/agent/Killjoy/Killjoy-Portugisisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    } else if(lang == 'jp') {
      const background = await Canvas.loadImage("commands/images/agent/Killjoy/Killjoy-Japanisch.png"); //load background from url
      ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
    }
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
  client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-agent.png'})
  } else {
    client.createMessage(message.channel.id, {embed: {title: linkjson[lang].agentunknown, color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [AGENT ERROR]'}}})
  }
 }
}