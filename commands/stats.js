 //process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
 const Canvas = require("canvas");
 const querystring = require("querystring");
 const prefix = 'v!'
 const fs = require('fs')
 const fetch = require("node-fetch")
 const r = require('request-promise')
 const randomize = require('randomatic')
 const axios = require('axios');
 const moment = require('moment')
 
 Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })
 
 module.exports = async (args, client, message, { Canvas, Discord }) => {
   const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
   const ctx = canvasstats.getContext('2d') //text preparation
 
   const background = await Canvas.loadImage("commands/images/stats/Stats-Template.png"); //load background from url
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
   ctx.font = size + 'px anton';
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
   ctx.text5 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left', rotate=0.225*Math.PI) {
      ctx.font = size + 'px anton';
      ctx.fillStyle = color
      ctx.textAlign = textAlign
      ctx.save();
      ctx.translate(1850, 550);
      ctx.rotate(rotate);
      ctx.fillText(content , 0, 0);
      ctx.restore();
    }
   //function for easier text 
   //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
   ctx.text3 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
   ctx.font = size + 'px anton';
   ctx.fillStyle = color
   ctx.textAlign = textAlign
   ctx.fillText(content , x, y);
 }
   //function for easier text 
   //Base: ctx.text('Text', Size, X, Y, '#Color', 'textAlign')
   ctx.text4 = function(content='Leer', size=100, x=0, y=0, color='#ffffff', textAlign='left') {
     ctx.font = size + 'px Japan2';
     ctx.fillStyle = color
     ctx.textAlign = textAlign
     ctx.fillText(content , x, y);
   }
 
   const db = require('../db.js')
   var lang = db.get(`${message.guildID}.lang`) || 'en-us'
   var messagejson = JSON.parse(fs.readFileSync('lang.json'))
   var linkjson = JSON.parse(fs.readFileSync('database/link.json'))
   var gamejson = JSON.parse(fs.readFileSync('database/game.json'))
   const prefix = db.get(`${message.guildID}.prefix`) || 'v?'


   const db2 = {
    breach: {
      url: 'commands/images/game/Breach.png'
    },
    brimstone: {
      url: 'commands/images/game/Brimstone.png'
    },
    cypher: {
      url: 'commands/images/game/Cypher.png'
    },
    jett: {
      url: 'commands/images/game/Jett.png'
    },
    omen: {
      url: 'commands/images/game/Omen.png'
    },
    phoenix: {
      url: 'commands/images/game/Phoenix.png'
    },
    raze: {
      url: 'commands/images/game/Raze.png'
    },
    reyna: {
      url: 'commands/images/game/Reyna.png'
    },
    sage: {
      url: 'commands/images/game/Sage.png'
    },
    sova: {
      url: 'commands/images/game/Sova.png'
    },
    viper: {
      url: 'commands/images/game/Viper.png'
    },
    killjoy: {
      url: 'commands/images/game/Killjoy.png'
    },
   }

   const db3 = {
    "Iron 1": {
      url: 'commands/images/stats/iron1.png'
    },
    "Iron 2": {
      url: 'commands/images/stats/iron2.png'
    },
    "Iron 3": {
      url: 'commands/images/stats/iron3.png'
    },
    "Bronze 1": {
      url: 'commands/images/stats/bronze1.png'
    },
    "Bronze 2": {
      url: 'commands/images/stats/bronze2.png'
    },
    "Bronze 3": {
      url: 'commands/images/stats/bronze3.png'
    },
    "Silver 1": {
      url: 'commands/images/stats/silver1.png'
    },
    "Silver 2": {
      url: 'commands/images/stats/silver2.png'
    },
    "Silver 3": {
      url: 'commands/images/stats/silver3.png'
    },
    "Gold 1": {
      url: 'commands/images/stats/gold1.png'
    },
    "Gold 2": {
      url: 'commands/images/stats/gold2.png'
    },
    "Gold 3": {
      url: 'commands/images/stats/gold3.png'
    },
    "Platinum 1": {
      url: 'commands/images/stats/platin1.png'
    },
    "Platinum 2": {
      url: 'commands/images/stats/platin2.png'
    },
    "Platinum 3": {
      url: 'commands/images/stats/platin3.png'
    },
    "Diamond 1": {
      url: 'commands/images/stats/diamond1.png'
    },
    "Diamond 2": {
      url: 'commands/images/stats/diamond2.png'
    },
    "Diamond 3": {
      url: 'commands/images/stats/diamond3.png'
    },
    "Immortal 1": {
      url: 'commands/images/stats/immortal1.png'
    },
    "Immortal 2": {
      url: 'commands/images/stats/immortal2.png'
    },
    "Immortal 3": {
      url: 'commands/images/stats/immortal3.png'
    },
    "Radiant": {
      url: 'commands/images/stats/radiant.png'
    },
    "4": {
      url: 'commands/images/stats/4.png'
    },
    "Unrated": {
      url: 'commands/images/stats/4.png'
    }
   }

   const db4 = {
     "Spike Rush": {
       url: 'commands/images/stats/spikerush.png'
     },
     "Deathmatch": {
      url: 'commands/images/stats/deathmatch.png'
    },
    "Normal": {
      url: 'commands/images/stats/unranked.png'
    },
    "Competitive": {
      url: 'commands/images/stats/ranked.png'
    }
   }

   const db5 = {
    Breach: {
      url: 'commands/images/stats/Breach.png'
    },
    Brimstone: {
      url: 'commands/images/stats/Brimstone.png'
    },
    Cypher: {
      url: 'commands/images/stats/Cypher.png'
    },
    Jett: {
      url: 'commands/images/stats/Jett.png'
    },
    Omen: {
      url: 'commands/images/stats/Omen.png'
    },
    Phoenix: {
      url: 'commands/images/stats/Phoenix.png'
    },
    Raze: {
      url: 'commands/images/stats/Raze.png'
    },
    Reyna: {
      url: 'commands/images/stats/Reyna.png'
    },
    Sage: {
      url: 'commands/images/stats/Sage.png'
    },
    Sova: {
      url: 'commands/images/stats/Sova.png'
    },
    Viper: {
      url: 'commands/images/stats/Viper.png'
    },
    Killjoy: {
      url: 'commands/images/stats/Killjoy.png'
    },
   }
   
   if(!args.length && linkjson[message.author.id]) {
    var namex = encodeURI(linkjson[message.author.id].ingamename)
    var tagx = encodeURI(linkjson[message.author.id].ingametag)
    var raw;
    var raw2;
    var agentdata1;
    var agentdata2;
    var agentdata3;
    var error2 = false;
    var raw1error = false;
    var statusembed_channel;
    var statusembed_message;
    var agent = true;
    var playlist = true;
    try {
      await axios.get(`API Key and Endpoint here`).then(response => {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Fetching General Stats Data',
          description: "Please be patient :D",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [STATS]"
          }
        }}).then(msg => {
          statusembed_channel = msg.channel.id
          statusembed_message = msg.id
        })
        raw = response.data
        if(!raw.data.platformInfo.platformUserHandle || !raw.data.platformInfo.platformUserHandle || !raw.data.platformInfo || !raw.data.segments[1].stats || !raw.data.metadata || !raw.data) {
          console.log('raw, then')
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        if(raw.data.metadata.schema == 'overwolf') {
          if(!raw.data.segments[0].stats.rank.value) {
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsjson, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        } else if(raw.data.metadata.schema == 'riot-api') {
          if(!raw.data.segments[0].stats.rank.value) {
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsjson, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        }
       
    }).catch(error => {
      console.log('raw, catch')
      console.log('Error raw:' + error)
      error2 = true
      raw1error = true
      if(error.response.status == '451') {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats451, description: messagejson[lang].stats451_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 451]' }}})
    } else if(error.response.status == '404') {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats404, description: messagejson[lang].stats404_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 404]' }}})
    } else if(error.response.status == '500') {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats500, description: messagejson[lang].stats500_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 500]' }}})
    } else {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsunknownerror, description: messagejson[lang].statsunknownerror_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR UNKNOWN]' }}})
    }
    })
      await axios.get(`API Key and Endpoint here`).then(response => {
        var data2 = {embed: {
          color: 0xff4654,
          title: 'Fetching Match Data',
          description: "Please be patient :D",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [STATS]"
          }
        }}
        client.editMessage(statusembed_channel, statusembed_message, data2)
        raw2 = response.data
        if(!raw2.data.matches[0].segments[0].stats || !raw2.data.matches[1].segments[0].stats || !raw2.data.matches[2].segments[0].stats || !raw2.data.matches[3].segments[0].stats || !raw2.data.matches[4].segments[0].stats || !raw2.data.matches[0].metadata.modeName || !raw2.data.matches[0].metadata.agent || !raw2.data.matches[1].metadata.modeName || !raw2.data.matches[1].metadata.agent || !raw2.data.matches[2].metadata.modeName || !raw2.data.matches[2].metadata.agent || !raw2.data.matches[3].metadata.modeName || !raw2.data.matches[3].metadata.agent || !raw2.data.matches[4].metadata.modeName || !raw2.data.matches[4].metadata.agent) {
          console.log('raw2, then')
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[0].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[1].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[2].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[3].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[4].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
    }).catch(error => {
      console.log('raw2, catch')
      console.log('Error raw2:' + error)
      console.log(error)
      error2 = true
      if(error.message == "Cannot read property 'stats' of undefined" && raw1error == false) {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
      } else if(error.message == "Cannot read property 'matches' of undefined" && raw1error == false) {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
      } else {

      }
    })
    await axios.get(`API Key and Endpoint here`).then(response => {
      agentdata1 = response.data
  }).catch(error => {
    error2 = true
  })
  await axios.get(`API Key and Endpoint here`).then(response => {
    var data2 = {embed: {
      color: 0xff4654,
      title: 'Fetching Agent Data',
      description: "Please be patient :D",
      timestamp: new Date().toISOString(),
      footer: {
        text: "VALORANT LABS [STATS]"
      }
    }}
    client.editMessage(statusembed_channel, statusembed_message, data2)
    agentdata2 = response.data
  }).catch(error => {
    client.createMessage(message.channel.id, {embed: {
      color: 0xff4654,
      title: 'Error while fetching Agent Data',
      description: "This normally occurrs when you are immortal or radiant but where not logged with RSO on tracker.gg one time, please do that to fetch your full agent stats",
      timestamp: new Date().toISOString(),
      footer: {
        text: "VALORANT LABS [STATS]"
      }
    }})
    error2 = true
  })
  await axios.get(`API Key and Endpoint here`).then(response => {
      agentdata3 = response.data
  }).catch(error => {
    error2 = true
  })
      } catch (e) {
          
      }
      if(error2 == false) {
        message.channel.sendTyping()
        ctx.text2('STATS: ' + raw.data.platformInfo.platformUserHandle, 130, canvasstats.width / 2, 200, '#ffffff', 'center')
        ctx.text3(raw.data.platformInfo.platformUserHandle, 80, 975, 340, '#ffffff', 'center')
       
          var rankpng = db3[raw.data.segments[0].stats.rank.value]
          const avatar2 = await Canvas.loadImage(rankpng.url);
          ctx.drawImage(avatar2, 410, 210, 200, 200)
          var overviewdata = raw.data.segments.filter(segment => segment.type == 'playlist')
          if(!overviewdata[0] || !overviewdata[1] || !overviewdata[2] || !overviewdata[3]) {
            ctx.text3(raw.data.segments[0].stats.kDRatio.displayValue, 100, 880, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesWon.value, 100, 580, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesWinPct.value, 100, 1200, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesPlayed.value, 120, 910, 1175, '#00ffcc')
            ctx.text3(raw.data.segments[0].stats.kills.value, 120, 735, 980, '#00ffcc')
            playlist = false
          } else {
            var kd_start = Number(overviewdata[0].stats.kDRatio.displayValue) + Number(overviewdata[1].stats.kDRatio.displayValue) + Number(overviewdata[2].stats.kDRatio.displayValue) + Number(overviewdata[3].stats.kDRatio.displayValue)
            var kd_final = kd_start / 4
            ctx.text3(kd_final.toFixed(2), 100, 880, 715, '#00ffcc', 'center')
            var wins_start = Number(overviewdata[0].stats.matchesWon.value) + Number(overviewdata[1].stats.matchesWon.value) + Number(overviewdata[2].stats.matchesWon.value) + Number(overviewdata[3].stats.matchesWon.value)
            ctx.text3(wins_start, 100, 580, 715, '#00ffcc', 'center')
            var winpc_start = Number(overviewdata[0].stats.matchesWinPct.value) + Number(overviewdata[1].stats.matchesWinPct.value) + Number(overviewdata[2].stats.matchesWinPct.value) + Number(overviewdata[3].stats.matchesWinPct.value)
            var winpc_final = winpc_start / 4
            ctx.text3(winpc_final.toFixed(2) + "%", 100, 1200, 715, '#00ffcc', 'center')
            var matches_start = Number(overviewdata[0].stats.matchesPlayed.value) + Number(overviewdata[1].stats.matchesPlayed.value) + Number(overviewdata[2].stats.matchesPlayed.value) + Number(overviewdata[3].stats.matchesPlayed.value)
            ctx.text3(matches_start, 120, 910, 1175, '#00ffcc')
            var kills_start = Number(overviewdata[0].stats.kills.value) + Number(overviewdata[1].stats.kills.value) + Number(overviewdata[2].stats.kills.value) + Number(overviewdata[3].stats.kills.value)
            ctx.text3(kills_start, 120, 735, 980, '#00ffcc')
          }
          var agentxow = raw.data.segments.filter(segment => segment.type == 'agent')
          var agentxowfinal = agentxow.sort((agent1, agent2) => agent2.stats.timePlayed.value - agent1.stats.timePlayed.value)
          var agentnr1 = db5[agentxowfinal[0].metadata.name]
          const agentavatar = await Canvas.loadImage(agentnr1.url);
          ctx.drawImage(agentavatar, 410, 1375, 326, 500)
          var agentingamedata_find_1 = agentdata1.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          var agentingamedata_find_2 = agentdata2.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          var agentingamedata_find_3 = agentdata3.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          if(!agentingamedata_find_1[0] || !agentingamedata_find_2[0] || !agentingamedata_find_3[0]) {
            ctx.text3(agentxowfinal[0].stats.matchesPlayed.value, 100, 1185, 1430, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.matchesWon.value, 100, 1035, 1590, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.kDRatio.displayValue, 100, 987.5, 1750, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.timePlayed.displayValue, 100, 800, 1900, '#ff4654')
            agent = false
          } else {
            var agentingamedata_matches = Number(agentingamedata_find_1[0].stats.matchesPlayed.value) + Number(agentingamedata_find_2[0].stats.matchesPlayed.value) + Number(agentingamedata_find_3[0].stats.matchesPlayed.value)
            ctx.text3(agentingamedata_matches, 100, 1185, 1430, '#00ffcc')
            var agentingamedata_wins = Number(agentingamedata_find_1[0].stats.matchesWon.value) + Number(agentingamedata_find_2[0].stats.matchesWon.value) + Number(agentingamedata_find_3[0].stats.matchesWon.value)
            ctx.text3(agentingamedata_wins, 100, 1035, 1590, '#00ffcc')
            var agentingamedata_kd_1 = Number(agentingamedata_find_1[0].stats.kDRatio.value) + Number(agentingamedata_find_2[0].stats.kDRatio.value) + Number(agentingamedata_find_3[0].stats.kDRatio.value)
            var agentingamedata_kd_final = Number(agentingamedata_kd_1) / 3
            ctx.text3(agentingamedata_kd_final.toFixed(2), 100, 987.5, 1750, '#00ffcc')
            var agentingamedata_time = Number(agentingamedata_find_1[0].stats.timePlayed.value) + Number(agentingamedata_find_2[0].stats.timePlayed.value) + Number(agentingamedata_find_3[0].stats.timePlayed.value)
            ctx.text3(moment.duration(agentingamedata_time).days() + 'd ' + moment.duration(agentingamedata_time).hours() + 'h ' + moment.duration(agentingamedata_time).minutes() + 'm ' + moment.duration(agentingamedata_time).seconds() + 's', 100, 800, 1900, '#ff4654')
          }
        var agentp1 = db2[raw2.data.matches[0].metadata.agent]
        ctx.text3(raw2.data.matches[0].metadata.mapName, 110, 1800, 300)
        ctx.text3(raw2.data.matches[0].metadata.modeName, 90, 1800, 425)
        var modep1 = db4[raw2.data.matches[0].metadata.modeName]
        const avatar3 = await Canvas.loadImage(modep1.url);
        ctx.drawImage(avatar3, 1675, 347.5, 100, 100)
        const agentpx1 = await Canvas.loadImage(agentp1.url);
        ctx.drawImage(agentpx1, 1675, 222.5, 100, 100)
        ctx.text3('Score', 110, 2280, 300)
        ctx.text3(raw2.data.matches[0].segments[0].stats.roundsWon.value, 90, 2345, 425, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 425, '#fff', 'center')
        ctx.text3(raw2.data.matches[0].segments[0].stats.roundsLost.value, 90, 2465, 425, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 300)
        ctx.text3(raw2.data.matches[0].segments[0].stats.kills.value + ' | ' + raw2.data.matches[0].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[0].segments[0].stats.assists.value, 90, 2630, 425)

        var agentp2 = db2[raw2.data.matches[1].metadata.agent]
        ctx.text3(raw2.data.matches[1].metadata.mapName, 110, 1800, 650)
        ctx.text3(raw2.data.matches[1].metadata.modeName, 90, 1800, 775)
        var modep2 = db4[raw2.data.matches[1].metadata.modeName]
        const avatar4 = await Canvas.loadImage(modep2.url);
        ctx.drawImage(avatar4, 1675, 697.5, 100, 100)
        const agentpx2 = await Canvas.loadImage(agentp2.url);
        ctx.drawImage(agentpx2, 1675, 572.5, 100, 100)
        ctx.text3('Score', 110, 2280, 650)
        ctx.text3(raw2.data.matches[1].segments[0].stats.roundsWon.value, 90, 2345, 775, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 775, '#fff', 'center')
        ctx.text3(raw2.data.matches[1].segments[0].stats.roundsLost.value, 90, 2465, 775, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 650)
        ctx.text3(raw2.data.matches[1].segments[0].stats.kills.value + ' | ' + raw2.data.matches[1].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[1].segments[0].stats.assists.value, 90, 2630, 775)

        var agentp3 = db2[raw2.data.matches[2].metadata.agent]
        ctx.text3(raw2.data.matches[2].metadata.mapName, 110, 1800, 1020)
        ctx.text3(raw2.data.matches[2].metadata.modeName, 90, 1800, 1145)
        var modep3 = db4[raw2.data.matches[2].metadata.modeName]
        const avatar5 = await Canvas.loadImage(modep3.url);
        ctx.drawImage(avatar5, 1675, 1067.5, 100, 100)
        const agentpx3 = await Canvas.loadImage(agentp3.url);
        ctx.drawImage(agentpx3, 1675, 942.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1020)
        ctx.text3(raw2.data.matches[2].segments[0].stats.roundsWon.value, 90, 2345, 1145, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1145, '#fff', 'center')
        ctx.text3(raw2.data.matches[2].segments[0].stats.roundsLost.value, 90, 2465, 1145, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1020)
        ctx.text3(raw2.data.matches[2].segments[0].stats.kills.value + ' | ' + raw2.data.matches[2].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[2].segments[0].stats.assists.value, 90, 2630, 1145)

        var agentp4 = db2[raw2.data.matches[3].metadata.agent]
        ctx.text3(raw2.data.matches[3].metadata.mapName, 110, 1800, 1395)
        ctx.text3(raw2.data.matches[3].metadata.modeName, 90, 1800, 1520)
        var modep4 = db4[raw2.data.matches[3].metadata.modeName]
        const avatar6 = await Canvas.loadImage(modep4.url);
        ctx.drawImage(avatar6, 1675, 1442.5, 100, 100)
        const agentpx4 = await Canvas.loadImage(agentp4.url);
        ctx.drawImage(agentpx4, 1675, 1317.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1395)
        ctx.text3(raw2.data.matches[3].segments[0].stats.roundsWon.value, 90, 2345, 1520, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1520, '#fff', 'center')
        ctx.text3(raw2.data.matches[3].segments[0].stats.roundsLost.value, 90, 2465, 1520, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1395)
        ctx.text3(raw2.data.matches[3].segments[0].stats.kills.value + ' | ' + raw2.data.matches[3].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[3].segments[0].stats.assists.value, 90, 2630, 1520)

        var agentp5 = db2[raw2.data.matches[4].metadata.agent]
        ctx.text3(raw2.data.matches[4].metadata.mapName, 110, 1800, 1755)
        ctx.text3(raw2.data.matches[4].metadata.modeName, 90, 1800, 1880)
        var modep5 = db4[raw2.data.matches[4].metadata.modeName]
        const avatar7 = await Canvas.loadImage(modep5.url);
        ctx.drawImage(avatar7, 1675, 1803.5, 100, 100)
        const agentpx5 = await Canvas.loadImage(agentp5.url);
        ctx.drawImage(agentpx5, 1675, 1678.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1755)
        ctx.text3(raw2.data.matches[4].segments[0].stats.roundsWon.value, 90, 2345, 1880, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1880, '#fff', 'center')
        ctx.text3(raw2.data.matches[4].segments[0].stats.roundsLost.value, 90, 2465, 1880, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1755)
        ctx.text3(raw2.data.matches[4].segments[0].stats.kills.value + ' | ' + raw2.data.matches[4].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[4].segments[0].stats.assists.value, 90, 2630, 1880)

        var gameids = gamejson.gameids
        var gamekeys = gamejson.gamekeys
        //temporary
        if(gameids.includes(raw2.data.matches[0].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[0].attributes.id].gamekeys, 80, 3075, 350)
        } else {
          gameids.push(raw2.data.matches[0].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[0].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[0].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 350)
          } else {
            gamejson[raw2.data.matches[0].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[0].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 350)
          }
        }
        if(gameids.includes(raw2.data.matches[1].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[1].attributes.id].gamekeys, 80, 3075, 715)
        } else {
          gameids.push(raw2.data.matches[1].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[1].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[1].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 715)
          } else {
            gamejson[raw2.data.matches[1].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[1].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 715)
          }
        }
        if(gameids.includes(raw2.data.matches[2].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[2].attributes.id].gamekeys, 80, 3075, 1085)
        } else {
          gameids.push(raw2.data.matches[2].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[2].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[2].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1085)
          } else {
            gamejson[raw2.data.matches[2].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[2].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1085)
          }
        }
        if(gameids.includes(raw2.data.matches[3].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[3].attributes.id].gamekeys, 80, 3075, 1460)
        } else {
          gameids.push(raw2.data.matches[3].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[3].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[3].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1460)
          } else {
            gamejson[raw2.data.matches[3].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[3].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1460)
          }
        }
        if(gameids.includes(raw2.data.matches[4].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[4].attributes.id].gamekeys, 80, 3075, 1830)
        } else {
          gameids.push(raw2.data.matches[4].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[4].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[4].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1830)
          } else {
            gamejson[raw2.data.matches[4].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[4].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1830)
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
       client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-stats.png'})
       if(agent == false) {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Agent data missing',
          description: "This error occours when you not your most played agent in one of these gamemodes since API Release: \n**Competitive**\n**Unrated**\n**SpikeRush** \n\nAs a result only your competitive with that agent will shown",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [ERROR STATS]"
          }
        }})
       }
       if(playlist == false) {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Playlist data missing',
          description: "This error occours when you not played one of these gamemodes since API Release: \n**Deathmatch**\n**Competitive**\n**Unrated**\n**SpikeRush** \n\nAs a result only your competitive stats will shown",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [ERROR STATS]"
          }
        }})
       }
       client.deleteMessage(statusembed_channel, statusembed_message, 'cleanchat')
  }
 } else if (!args.length) {
   client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsargument, description: messagejson[lang].statsargument_desc, fields: [{ name: `${prefix}stats`, value: messagejson[lang].statsargument_field1 + `${prefix}link`}, { name: `${prefix}stats @User`, value: messagejson[lang].statsargument_field2 + `${prefix}link`}, { name: `${prefix}stats RIOT-ID`, value: messagejson[lang].statsargument_field3}, {name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [ERROR]'} }})
 } else if(args.length && message.mentions.length) {
  console.log('true')
  const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
  const name1 = message.content.substr(prefix.length + 6)
  const namefinal = name1.split('#')

  console.log(message.mentions)

  if(linkjson[message.mentions[0].id]) {
  var namex = encodeURI(linkjson[message.mentions[0].id].ingamename)
  var tagx = encodeURI(linkjson[message.mentions[0].id].ingametag)

  //HTTP GET VALORANT NAME
  var raw;
    var raw2;
    var agentdata1;
    var agentdata2;
    var agentdata3;
    var error2 = false;
    var raw1error = false;
    var statusembed_channel;
    var statusembed_message;
    var agent = true;
    var playlist = true;
    try {
      await axios.get(`API Key and Endpoint here`).then(response => {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Fetching General Stats Data',
          description: "Please be patient :D",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [STATS]"
          }
        }}).then(msg => {
          statusembed_channel = msg.channel.id
          statusembed_message = msg.id
        })
        raw = response.data
        if(!raw.data.platformInfo.platformUserHandle || !raw.data.platformInfo.platformUserHandle || !raw.data.platformInfo || !raw.data.segments[1].stats || !raw.data.metadata || !raw.data) {
          console.log('raw, then')
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        if(raw.data.metadata.schema == 'overwolf') {
          if(!raw.data.segments[0].stats.rank.value) {
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsjson, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        } else if(raw.data.metadata.schema == 'riot-api') {
          if(!raw.data.segments[0].stats.rank.value) {
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsjson, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        }
       
    }).catch(error => {
      console.log('raw, catch')
      console.log('Error raw:' + error)
      error2 = true
      raw1error = true
      if(error.response.status == '451') {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats451, description: messagejson[lang].stats451_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 451]' }}})
    } else if(error.response.status == '404') {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats404, description: messagejson[lang].stats404_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 404]' }}})
    } else if(error.response.status == '500') {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats500, description: messagejson[lang].stats500_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 500]' }}})
    } else {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsunknownerror, description: messagejson[lang].statsunknownerror_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR UNKNOWN]' }}})
    }
    })
      await axios.get(`API Key and Endpoint here`).then(response => {
        var data2 = {embed: {
          color: 0xff4654,
          title: 'Fetching Match Data',
          description: "Please be patient :D",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [STATS]"
          }
        }}
        client.editMessage(statusembed_channel, statusembed_message, data2)
        raw2 = response.data
        if(!raw2.data.matches[0].segments[0].stats || !raw2.data.matches[1].segments[0].stats || !raw2.data.matches[2].segments[0].stats || !raw2.data.matches[3].segments[0].stats || !raw2.data.matches[4].segments[0].stats || !raw2.data.matches[0].metadata.modeName || !raw2.data.matches[0].metadata.agent || !raw2.data.matches[1].metadata.modeName || !raw2.data.matches[1].metadata.agent || !raw2.data.matches[2].metadata.modeName || !raw2.data.matches[2].metadata.agent || !raw2.data.matches[3].metadata.modeName || !raw2.data.matches[3].metadata.agent || !raw2.data.matches[4].metadata.modeName || !raw2.data.matches[4].metadata.agent) {
          console.log('raw2, then')
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[0].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[1].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[2].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[3].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[4].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
    }).catch(error => {
      console.log('raw2, catch')
      console.log('Error raw2:' + error)
      console.log(error)
      error2 = true
      if(error.message == "Cannot read property 'stats' of undefined" && raw1error == false) {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
      } else if(error.message == "Cannot read property 'matches' of undefined" && raw1error == false) {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
      } else {

      }
    })
    await axios.get(`API Key and Endpoint here`).then(response => {
      agentdata1 = response.data
  }).catch(error => {
    error2 = true
  })
  await axios.get(`API Key and Endpoint here`).then(response => {
    var data2 = {embed: {
      color: 0xff4654,
      title: 'Fetching Agent Data',
      description: "Please be patient :D",
      timestamp: new Date().toISOString(),
      footer: {
        text: "VALORANT LABS [STATS]"
      }
    }}
    client.editMessage(statusembed_channel, statusembed_message, data2)
    agentdata2 = response.data
  }).catch(error => {
    client.createMessage(message.channel.id, {embed: {
      color: 0xff4654,
      title: 'Error while fetching Agent Data',
      description: "This normally occurrs when you are immortal or radiant but where not logged with RSO on tracker.gg one time, please do that to fetch your full agent stats",
      timestamp: new Date().toISOString(),
      footer: {
        text: "VALORANT LABS [STATS]"
      }
    }})
    error2 = true
  })
  await axios.get(`API Key and Endpoint here`).then(response => {
      agentdata3 = response.data
  }).catch(error => {
    error2 = true
  })
      } catch (e) {
          
      }
      if(error2 == false) {
        message.channel.sendTyping()
        ctx.text2('STATS: ' + raw.data.platformInfo.platformUserHandle, 130, canvasstats.width / 2, 200, '#ffffff', 'center')
        ctx.text3(raw.data.platformInfo.platformUserHandle, 80, 975, 340, '#ffffff', 'center')
       
          var rankpng = db3[raw.data.segments[0].stats.rank.value]
          const avatar2 = await Canvas.loadImage(rankpng.url);
          ctx.drawImage(avatar2, 410, 210, 200, 200)
          var overviewdata = raw.data.segments.filter(segment => segment.type == 'playlist')
          if(!overviewdata[0] || !overviewdata[1] || !overviewdata[2] || !overviewdata[3]) {
            ctx.text3(raw.data.segments[0].stats.kDRatio.displayValue, 100, 880, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesWon.value, 100, 580, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesWinPct.value, 100, 1200, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesPlayed.value, 120, 910, 1175, '#00ffcc')
            ctx.text3(raw.data.segments[0].stats.kills.value, 120, 735, 980, '#00ffcc')
            playlist = false
          } else {
            var kd_start = Number(overviewdata[0].stats.kDRatio.displayValue) + Number(overviewdata[1].stats.kDRatio.displayValue) + Number(overviewdata[2].stats.kDRatio.displayValue) + Number(overviewdata[3].stats.kDRatio.displayValue)
            var kd_final = kd_start / 4
            ctx.text3(kd_final.toFixed(2), 100, 880, 715, '#00ffcc', 'center')
            var wins_start = Number(overviewdata[0].stats.matchesWon.value) + Number(overviewdata[1].stats.matchesWon.value) + Number(overviewdata[2].stats.matchesWon.value) + Number(overviewdata[3].stats.matchesWon.value)
            ctx.text3(wins_start, 100, 580, 715, '#00ffcc', 'center')
            var winpc_start = Number(overviewdata[0].stats.matchesWinPct.value) + Number(overviewdata[1].stats.matchesWinPct.value) + Number(overviewdata[2].stats.matchesWinPct.value) + Number(overviewdata[3].stats.matchesWinPct.value)
            var winpc_final = winpc_start / 4
            ctx.text3(winpc_final.toFixed(2) + "%", 100, 1200, 715, '#00ffcc', 'center')
            var matches_start = Number(overviewdata[0].stats.matchesPlayed.value) + Number(overviewdata[1].stats.matchesPlayed.value) + Number(overviewdata[2].stats.matchesPlayed.value) + Number(overviewdata[3].stats.matchesPlayed.value)
            ctx.text3(matches_start, 120, 910, 1175, '#00ffcc')
            var kills_start = Number(overviewdata[0].stats.kills.value) + Number(overviewdata[1].stats.kills.value) + Number(overviewdata[2].stats.kills.value) + Number(overviewdata[3].stats.kills.value)
            ctx.text3(kills_start, 120, 735, 980, '#00ffcc')
          }
          var agentxow = raw.data.segments.filter(segment => segment.type == 'agent')
          var agentxowfinal = agentxow.sort((agent1, agent2) => agent2.stats.timePlayed.value - agent1.stats.timePlayed.value)
          var agentnr1 = db5[agentxowfinal[0].metadata.name]
          const agentavatar = await Canvas.loadImage(agentnr1.url);
          ctx.drawImage(agentavatar, 410, 1375, 326, 500)
          var agentingamedata_find_1 = agentdata1.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          var agentingamedata_find_2 = agentdata2.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          var agentingamedata_find_3 = agentdata3.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          if(!agentingamedata_find_1[0] || !agentingamedata_find_2[0] || !agentingamedata_find_3[0]) {
            ctx.text3(agentxowfinal[0].stats.matchesPlayed.value, 100, 1185, 1430, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.matchesWon.value, 100, 1035, 1590, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.kDRatio.displayValue, 100, 987.5, 1750, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.timePlayed.displayValue, 100, 800, 1900, '#ff4654')
            agent = false
          } else {
            var agentingamedata_matches = Number(agentingamedata_find_1[0].stats.matchesPlayed.value) + Number(agentingamedata_find_2[0].stats.matchesPlayed.value) + Number(agentingamedata_find_3[0].stats.matchesPlayed.value)
            ctx.text3(agentingamedata_matches, 100, 1185, 1430, '#00ffcc')
            var agentingamedata_wins = Number(agentingamedata_find_1[0].stats.matchesWon.value) + Number(agentingamedata_find_2[0].stats.matchesWon.value) + Number(agentingamedata_find_3[0].stats.matchesWon.value)
            ctx.text3(agentingamedata_wins, 100, 1035, 1590, '#00ffcc')
            var agentingamedata_kd_1 = Number(agentingamedata_find_1[0].stats.kDRatio.value) + Number(agentingamedata_find_2[0].stats.kDRatio.value) + Number(agentingamedata_find_3[0].stats.kDRatio.value)
            var agentingamedata_kd_final = Number(agentingamedata_kd_1) / 3
            ctx.text3(agentingamedata_kd_final.toFixed(2), 100, 987.5, 1750, '#00ffcc')
            var agentingamedata_time = Number(agentingamedata_find_1[0].stats.timePlayed.value) + Number(agentingamedata_find_2[0].stats.timePlayed.value) + Number(agentingamedata_find_3[0].stats.timePlayed.value)
            ctx.text3(moment.duration(agentingamedata_time).days() + 'd ' + moment.duration(agentingamedata_time).hours() + 'h ' + moment.duration(agentingamedata_time).minutes() + 'm ' + moment.duration(agentingamedata_time).seconds() + 's', 100, 800, 1900, '#ff4654')
          }
        var agentp1 = db2[raw2.data.matches[0].metadata.agent]
        ctx.text3(raw2.data.matches[0].metadata.mapName, 110, 1800, 300)
        ctx.text3(raw2.data.matches[0].metadata.modeName, 90, 1800, 425)
        var modep1 = db4[raw2.data.matches[0].metadata.modeName]
        const avatar3 = await Canvas.loadImage(modep1.url);
        ctx.drawImage(avatar3, 1675, 347.5, 100, 100)
        const agentpx1 = await Canvas.loadImage(agentp1.url);
        ctx.drawImage(agentpx1, 1675, 222.5, 100, 100)
        ctx.text3('Score', 110, 2280, 300)
        ctx.text3(raw2.data.matches[0].segments[0].stats.roundsWon.value, 90, 2345, 425, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 425, '#fff', 'center')
        ctx.text3(raw2.data.matches[0].segments[0].stats.roundsLost.value, 90, 2465, 425, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 300)
        ctx.text3(raw2.data.matches[0].segments[0].stats.kills.value + ' | ' + raw2.data.matches[0].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[0].segments[0].stats.assists.value, 90, 2630, 425)

        var agentp2 = db2[raw2.data.matches[1].metadata.agent]
        ctx.text3(raw2.data.matches[1].metadata.mapName, 110, 1800, 650)
        ctx.text3(raw2.data.matches[1].metadata.modeName, 90, 1800, 775)
        var modep2 = db4[raw2.data.matches[1].metadata.modeName]
        const avatar4 = await Canvas.loadImage(modep2.url);
        ctx.drawImage(avatar4, 1675, 697.5, 100, 100)
        const agentpx2 = await Canvas.loadImage(agentp2.url);
        ctx.drawImage(agentpx2, 1675, 572.5, 100, 100)
        ctx.text3('Score', 110, 2280, 650)
        ctx.text3(raw2.data.matches[1].segments[0].stats.roundsWon.value, 90, 2345, 775, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 775, '#fff', 'center')
        ctx.text3(raw2.data.matches[1].segments[0].stats.roundsLost.value, 90, 2465, 775, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 650)
        ctx.text3(raw2.data.matches[1].segments[0].stats.kills.value + ' | ' + raw2.data.matches[1].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[1].segments[0].stats.assists.value, 90, 2630, 775)

        var agentp3 = db2[raw2.data.matches[2].metadata.agent]
        ctx.text3(raw2.data.matches[2].metadata.mapName, 110, 1800, 1020)
        ctx.text3(raw2.data.matches[2].metadata.modeName, 90, 1800, 1145)
        var modep3 = db4[raw2.data.matches[2].metadata.modeName]
        const avatar5 = await Canvas.loadImage(modep3.url);
        ctx.drawImage(avatar5, 1675, 1067.5, 100, 100)
        const agentpx3 = await Canvas.loadImage(agentp3.url);
        ctx.drawImage(agentpx3, 1675, 942.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1020)
        ctx.text3(raw2.data.matches[2].segments[0].stats.roundsWon.value, 90, 2345, 1145, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1145, '#fff', 'center')
        ctx.text3(raw2.data.matches[2].segments[0].stats.roundsLost.value, 90, 2465, 1145, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1020)
        ctx.text3(raw2.data.matches[2].segments[0].stats.kills.value + ' | ' + raw2.data.matches[2].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[2].segments[0].stats.assists.value, 90, 2630, 1145)

        var agentp4 = db2[raw2.data.matches[3].metadata.agent]
        ctx.text3(raw2.data.matches[3].metadata.mapName, 110, 1800, 1395)
        ctx.text3(raw2.data.matches[3].metadata.modeName, 90, 1800, 1520)
        var modep4 = db4[raw2.data.matches[3].metadata.modeName]
        const avatar6 = await Canvas.loadImage(modep4.url);
        ctx.drawImage(avatar6, 1675, 1442.5, 100, 100)
        const agentpx4 = await Canvas.loadImage(agentp4.url);
        ctx.drawImage(agentpx4, 1675, 1317.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1395)
        ctx.text3(raw2.data.matches[3].segments[0].stats.roundsWon.value, 90, 2345, 1520, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1520, '#fff', 'center')
        ctx.text3(raw2.data.matches[3].segments[0].stats.roundsLost.value, 90, 2465, 1520, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1395)
        ctx.text3(raw2.data.matches[3].segments[0].stats.kills.value + ' | ' + raw2.data.matches[3].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[3].segments[0].stats.assists.value, 90, 2630, 1520)

        var agentp5 = db2[raw2.data.matches[4].metadata.agent]
        ctx.text3(raw2.data.matches[4].metadata.mapName, 110, 1800, 1755)
        ctx.text3(raw2.data.matches[4].metadata.modeName, 90, 1800, 1880)
        var modep5 = db4[raw2.data.matches[4].metadata.modeName]
        const avatar7 = await Canvas.loadImage(modep5.url);
        ctx.drawImage(avatar7, 1675, 1803.5, 100, 100)
        const agentpx5 = await Canvas.loadImage(agentp5.url);
        ctx.drawImage(agentpx5, 1675, 1678.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1755)
        ctx.text3(raw2.data.matches[4].segments[0].stats.roundsWon.value, 90, 2345, 1880, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1880, '#fff', 'center')
        ctx.text3(raw2.data.matches[4].segments[0].stats.roundsLost.value, 90, 2465, 1880, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1755)
        ctx.text3(raw2.data.matches[4].segments[0].stats.kills.value + ' | ' + raw2.data.matches[4].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[4].segments[0].stats.assists.value, 90, 2630, 1880)

        var gameids = gamejson.gameids
        var gamekeys = gamejson.gamekeys
        //temporary
        if(gameids.includes(raw2.data.matches[0].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[0].attributes.id].gamekeys, 80, 3075, 350)
        } else {
          gameids.push(raw2.data.matches[0].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[0].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[0].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 350)
          } else {
            gamejson[raw2.data.matches[0].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[0].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 350)
          }
        }
        if(gameids.includes(raw2.data.matches[1].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[1].attributes.id].gamekeys, 80, 3075, 715)
        } else {
          gameids.push(raw2.data.matches[1].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[1].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[1].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 715)
          } else {
            gamejson[raw2.data.matches[1].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[1].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 715)
          }
        }
        if(gameids.includes(raw2.data.matches[2].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[2].attributes.id].gamekeys, 80, 3075, 1085)
        } else {
          gameids.push(raw2.data.matches[2].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[2].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[2].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1085)
          } else {
            gamejson[raw2.data.matches[2].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[2].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1085)
          }
        }
        if(gameids.includes(raw2.data.matches[3].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[3].attributes.id].gamekeys, 80, 3075, 1460)
        } else {
          gameids.push(raw2.data.matches[3].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[3].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[3].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1460)
          } else {
            gamejson[raw2.data.matches[3].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[3].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1460)
          }
        }
        if(gameids.includes(raw2.data.matches[4].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[4].attributes.id].gamekeys, 80, 3075, 1830)
        } else {
          gameids.push(raw2.data.matches[4].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[4].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[4].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1830)
          } else {
            gamejson[raw2.data.matches[4].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[4].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1830)
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
       client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-stats.png'})
       if(agent == false) {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Agent data missing',
          description: "This error occours when you not your most played agent in one of these gamemodes since API Release: \n**Competitive**\n**Unrated**\n**SpikeRush** \n\nAs a result only your competitive with that agent will shown",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [ERROR STATS]"
          }
        }})
       }
       if(playlist == false) {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Playlist data missing',
          description: "This error occours when you not played one of these gamemodes since API Release: \n**Deathmatch**\n**Competitive**\n**Unrated**\n**SpikeRush** \n\nAs a result only your competitive stats will shown",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [ERROR STATS]"
          }
        }})
       }
       client.deleteMessage(statusembed_channel, statusembed_message, 'cleanchat')
  }
 } else {
   client.createMessage(message.channel.id, {embed: {title: "This User doesn't have a linked account", color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR]'}}})
 }
 } else if(args.length) {
  
   const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
   const name1 = message.content.substr(prefix.length + 6)
   const namefinal = name1.split('#')
   const name = namefinal[0];
   const tag = namefinal[1];

   var namex = encodeURI(name)
   var tagx = encodeURI(tag)

   //HTTP GET VALORANT NAME
   var raw;
    var raw2;
    var agentdata1;
    var agentdata2;
    var agentdata3;
    var error2 = false;
    var raw1error = false;
    var statusembed_channel;
    var statusembed_message;
    var agent = true;
    var playlist = true;
    try {
      await axios.get(`API Key and Endpoint here`).then(response => {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Fetching General Stats Data',
          description: "Please be patient :D",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [STATS]"
          }
        }}).then(msg => {
          statusembed_channel = msg.channel.id
          statusembed_message = msg.id
        })
        raw = response.data
        if(!raw.data.platformInfo.platformUserHandle || !raw.data.platformInfo.platformUserHandle || !raw.data.platformInfo || !raw.data.segments[1].stats || !raw.data.metadata || !raw.data) {
          console.log('raw, then')
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        if(raw.data.metadata.schema == 'overwolf') {
          if(!raw.data.segments[0].stats.rank.value) {
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsjson, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        } else if(raw.data.metadata.schema == 'riot-api') {
          if(!raw.data.segments[0].stats.rank.value) {
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsjson, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
        }
       
    }).catch(error => {
      console.log('raw, catch')
      console.log('Error raw:' + error)
      error2 = true
      raw1error = true
      if(error.response.status == '451') {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats451, description: messagejson[lang].stats451_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 451]' }}})
    } else if(error.response.status == '404') {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats404, description: messagejson[lang].stats404_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 404]' }}})
    } else if(error.response.status == '500') {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].stats500, description: messagejson[lang].stats500_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR 500]' }}})
    } else {
      client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statsunknownerror, description: messagejson[lang].statsunknownerror_2, color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}], footer: {text: 'VALORANT LABS [ERROR UNKNOWN]' }}})
    }
    })
      await axios.get(`API Key and Endpoint here`).then(response => {
        var data2 = {embed: {
          color: 0xff4654,
          title: 'Fetching Match Data',
          description: "Please be patient :D",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [STATS]"
          }
        }}
        client.editMessage(statusembed_channel, statusembed_message, data2)
        raw2 = response.data
        if(!raw2.data.matches[0].segments[0].stats || !raw2.data.matches[1].segments[0].stats || !raw2.data.matches[2].segments[0].stats || !raw2.data.matches[3].segments[0].stats || !raw2.data.matches[4].segments[0].stats || !raw2.data.matches[0].metadata.modeName || !raw2.data.matches[0].metadata.agent || !raw2.data.matches[1].metadata.modeName || !raw2.data.matches[1].metadata.agent || !raw2.data.matches[2].metadata.modeName || !raw2.data.matches[2].metadata.agent || !raw2.data.matches[3].metadata.modeName || !raw2.data.matches[3].metadata.agent || !raw2.data.matches[4].metadata.modeName || !raw2.data.matches[4].metadata.agent) {
          console.log('raw2, then')
          error2 = true
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[0].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[1].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[2].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[3].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        } else if(raw2.data.matches[4].metadata.isAvailable) {
          client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsmatches, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
        }
    }).catch(error => {
      console.log('raw2, catch')
      console.log('Error raw2:' + error)
      console.log(error)
      error2 = true
      if(error.message == "Cannot read property 'stats' of undefined" && raw1error == false) {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
      } else if(error.message == "Cannot read property 'matches' of undefined" && raw1error == false) {
        client.createMessage(message.channel.id, {embed: {title: messagejson[lang].statserror, description: messagejson[lang].statsjson, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [MISSING DATA]' }}})
      } else {

      }
    })
    await axios.get(`API Key and Endpoint here`).then(response => {
      agentdata1 = response.data
  }).catch(error => {
    error2 = true
  })
  await axios.get(`API Key and Endpoint here`).then(response => {
    var data2 = {embed: {
      color: 0xff4654,
      title: 'Fetching Agent Data',
      description: "Please be patient :D",
      timestamp: new Date().toISOString(),
      footer: {
        text: "VALORANT LABS [STATS]"
      }
    }}
    client.editMessage(statusembed_channel, statusembed_message, data2)
    agentdata2 = response.data
  }).catch(error => {
    client.createMessage(message.channel.id, {embed: {
      color: 0xff4654,
      title: 'Error while fetching Agent Data',
      description: "This normally occurrs when you are immortal or radiant but where not logged with RSO on tracker.gg one time, please do that to fetch your full agent stats",
      timestamp: new Date().toISOString(),
      footer: {
        text: "VALORANT LABS [STATS]"
      }
    }})
    error2 = true
  })
  await axios.get(`API Key and Endpoint here`).then(response => {
      agentdata3 = response.data
  }).catch(error => {
    error2 = true
  })
      } catch (e) {
          
      }
      if(error2 == false) {
        message.channel.sendTyping()
        ctx.text2('STATS: ' + raw.data.platformInfo.platformUserHandle, 130, canvasstats.width / 2, 200, '#ffffff', 'center')
        ctx.text3(raw.data.platformInfo.platformUserHandle, 80, 975, 340, '#ffffff', 'center')
       
          var rankpng = db3[raw.data.segments[0].stats.rank.value]
          const avatar2 = await Canvas.loadImage(rankpng.url);
          ctx.drawImage(avatar2, 410, 210, 200, 200)
          var overviewdata = raw.data.segments.filter(segment => segment.type == 'playlist')
          if(!overviewdata[0] || !overviewdata[1] || !overviewdata[2] || !overviewdata[3]) {
            ctx.text3(raw.data.segments[0].stats.kDRatio.displayValue, 100, 880, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesWon.value, 100, 580, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesWinPct.value, 100, 1200, 715, '#00ffcc', 'center')
            ctx.text3(raw.data.segments[0].stats.matchesPlayed.value, 120, 910, 1175, '#00ffcc')
            ctx.text3(raw.data.segments[0].stats.kills.value, 120, 735, 980, '#00ffcc')
            playlist = false
          } else {
            var kd_start = Number(overviewdata[0].stats.kDRatio.displayValue) + Number(overviewdata[1].stats.kDRatio.displayValue) + Number(overviewdata[2].stats.kDRatio.displayValue) + Number(overviewdata[3].stats.kDRatio.displayValue)
            var kd_final = kd_start / 4
            ctx.text3(kd_final.toFixed(2), 100, 880, 715, '#00ffcc', 'center')
            var wins_start = Number(overviewdata[0].stats.matchesWon.value) + Number(overviewdata[1].stats.matchesWon.value) + Number(overviewdata[2].stats.matchesWon.value) + Number(overviewdata[3].stats.matchesWon.value)
            ctx.text3(wins_start, 100, 580, 715, '#00ffcc', 'center')
            var winpc_start = Number(overviewdata[0].stats.matchesWinPct.value) + Number(overviewdata[1].stats.matchesWinPct.value) + Number(overviewdata[2].stats.matchesWinPct.value) + Number(overviewdata[3].stats.matchesWinPct.value)
            var winpc_final = winpc_start / 4
            ctx.text3(winpc_final.toFixed(2) + "%", 100, 1200, 715, '#00ffcc', 'center')
            var matches_start = Number(overviewdata[0].stats.matchesPlayed.value) + Number(overviewdata[1].stats.matchesPlayed.value) + Number(overviewdata[2].stats.matchesPlayed.value) + Number(overviewdata[3].stats.matchesPlayed.value)
            ctx.text3(matches_start, 120, 910, 1175, '#00ffcc')
            var kills_start = Number(overviewdata[0].stats.kills.value) + Number(overviewdata[1].stats.kills.value) + Number(overviewdata[2].stats.kills.value) + Number(overviewdata[3].stats.kills.value)
            ctx.text3(kills_start, 120, 735, 980, '#00ffcc')
          }
          var agentxow = raw.data.segments.filter(segment => segment.type == 'agent')
          var agentxowfinal = agentxow.sort((agent1, agent2) => agent2.stats.timePlayed.value - agent1.stats.timePlayed.value)
          var agentnr1 = db5[agentxowfinal[0].metadata.name]
          const agentavatar = await Canvas.loadImage(agentnr1.url);
          ctx.drawImage(agentavatar, 410, 1375, 326, 500)
          var agentingamedata_find_1 = agentdata1.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          var agentingamedata_find_2 = agentdata2.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          var agentingamedata_find_3 = agentdata3.data.filter(data => data.metadata.name == agentxowfinal[0].metadata.name)
          if(!agentingamedata_find_1[0] || !agentingamedata_find_2[0] || !agentingamedata_find_3[0]) {
            ctx.text3(agentxowfinal[0].stats.matchesPlayed.value, 100, 1185, 1430, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.matchesWon.value, 100, 1035, 1590, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.kDRatio.displayValue, 100, 987.5, 1750, '#00ffcc')
            ctx.text3(agentxowfinal[0].stats.timePlayed.displayValue, 100, 800, 1900, '#ff4654')
            agent = false
          } else {
            var agentingamedata_matches = Number(agentingamedata_find_1[0].stats.matchesPlayed.value) + Number(agentingamedata_find_2[0].stats.matchesPlayed.value) + Number(agentingamedata_find_3[0].stats.matchesPlayed.value)
            ctx.text3(agentingamedata_matches, 100, 1185, 1430, '#00ffcc')
            var agentingamedata_wins = Number(agentingamedata_find_1[0].stats.matchesWon.value) + Number(agentingamedata_find_2[0].stats.matchesWon.value) + Number(agentingamedata_find_3[0].stats.matchesWon.value)
            ctx.text3(agentingamedata_wins, 100, 1035, 1590, '#00ffcc')
            var agentingamedata_kd_1 = Number(agentingamedata_find_1[0].stats.kDRatio.value) + Number(agentingamedata_find_2[0].stats.kDRatio.value) + Number(agentingamedata_find_3[0].stats.kDRatio.value)
            var agentingamedata_kd_final = Number(agentingamedata_kd_1) / 3
            ctx.text3(agentingamedata_kd_final.toFixed(2), 100, 987.5, 1750, '#00ffcc')
            var agentingamedata_time = Number(agentingamedata_find_1[0].stats.timePlayed.value) + Number(agentingamedata_find_2[0].stats.timePlayed.value) + Number(agentingamedata_find_3[0].stats.timePlayed.value)
            ctx.text3(moment.duration(agentingamedata_time).days() + 'd ' + moment.duration(agentingamedata_time).hours() + 'h ' + moment.duration(agentingamedata_time).minutes() + 'm ' + moment.duration(agentingamedata_time).seconds() + 's', 100, 800, 1900, '#ff4654')
          }
        var agentp1 = db2[raw2.data.matches[0].metadata.agent]
        ctx.text3(raw2.data.matches[0].metadata.mapName, 110, 1800, 300)
        ctx.text3(raw2.data.matches[0].metadata.modeName, 90, 1800, 425)
        var modep1 = db4[raw2.data.matches[0].metadata.modeName]
        const avatar3 = await Canvas.loadImage(modep1.url);
        ctx.drawImage(avatar3, 1675, 347.5, 100, 100)
        const agentpx1 = await Canvas.loadImage(agentp1.url);
        ctx.drawImage(agentpx1, 1675, 222.5, 100, 100)
        ctx.text3('Score', 110, 2280, 300)
        ctx.text3(raw2.data.matches[0].segments[0].stats.roundsWon.value, 90, 2345, 425, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 425, '#fff', 'center')
        ctx.text3(raw2.data.matches[0].segments[0].stats.roundsLost.value, 90, 2465, 425, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 300)
        ctx.text3(raw2.data.matches[0].segments[0].stats.kills.value + ' | ' + raw2.data.matches[0].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[0].segments[0].stats.assists.value, 90, 2630, 425)

        var agentp2 = db2[raw2.data.matches[1].metadata.agent]
        ctx.text3(raw2.data.matches[1].metadata.mapName, 110, 1800, 650)
        ctx.text3(raw2.data.matches[1].metadata.modeName, 90, 1800, 775)
        var modep2 = db4[raw2.data.matches[1].metadata.modeName]
        const avatar4 = await Canvas.loadImage(modep2.url);
        ctx.drawImage(avatar4, 1675, 697.5, 100, 100)
        const agentpx2 = await Canvas.loadImage(agentp2.url);
        ctx.drawImage(agentpx2, 1675, 572.5, 100, 100)
        ctx.text3('Score', 110, 2280, 650)
        ctx.text3(raw2.data.matches[1].segments[0].stats.roundsWon.value, 90, 2345, 775, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 775, '#fff', 'center')
        ctx.text3(raw2.data.matches[1].segments[0].stats.roundsLost.value, 90, 2465, 775, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 650)
        ctx.text3(raw2.data.matches[1].segments[0].stats.kills.value + ' | ' + raw2.data.matches[1].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[1].segments[0].stats.assists.value, 90, 2630, 775)

        var agentp3 = db2[raw2.data.matches[2].metadata.agent]
        ctx.text3(raw2.data.matches[2].metadata.mapName, 110, 1800, 1020)
        ctx.text3(raw2.data.matches[2].metadata.modeName, 90, 1800, 1145)
        var modep3 = db4[raw2.data.matches[2].metadata.modeName]
        const avatar5 = await Canvas.loadImage(modep3.url);
        ctx.drawImage(avatar5, 1675, 1067.5, 100, 100)
        const agentpx3 = await Canvas.loadImage(agentp3.url);
        ctx.drawImage(agentpx3, 1675, 942.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1020)
        ctx.text3(raw2.data.matches[2].segments[0].stats.roundsWon.value, 90, 2345, 1145, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1145, '#fff', 'center')
        ctx.text3(raw2.data.matches[2].segments[0].stats.roundsLost.value, 90, 2465, 1145, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1020)
        ctx.text3(raw2.data.matches[2].segments[0].stats.kills.value + ' | ' + raw2.data.matches[2].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[2].segments[0].stats.assists.value, 90, 2630, 1145)

        var agentp4 = db2[raw2.data.matches[3].metadata.agent]
        ctx.text3(raw2.data.matches[3].metadata.mapName, 110, 1800, 1395)
        ctx.text3(raw2.data.matches[3].metadata.modeName, 90, 1800, 1520)
        var modep4 = db4[raw2.data.matches[3].metadata.modeName]
        const avatar6 = await Canvas.loadImage(modep4.url);
        ctx.drawImage(avatar6, 1675, 1442.5, 100, 100)
        const agentpx4 = await Canvas.loadImage(agentp4.url);
        ctx.drawImage(agentpx4, 1675, 1317.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1395)
        ctx.text3(raw2.data.matches[3].segments[0].stats.roundsWon.value, 90, 2345, 1520, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1520, '#fff', 'center')
        ctx.text3(raw2.data.matches[3].segments[0].stats.roundsLost.value, 90, 2465, 1520, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1395)
        ctx.text3(raw2.data.matches[3].segments[0].stats.kills.value + ' | ' + raw2.data.matches[3].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[3].segments[0].stats.assists.value, 90, 2630, 1520)

        var agentp5 = db2[raw2.data.matches[4].metadata.agent]
        ctx.text3(raw2.data.matches[4].metadata.mapName, 110, 1800, 1755)
        ctx.text3(raw2.data.matches[4].metadata.modeName, 90, 1800, 1880)
        var modep5 = db4[raw2.data.matches[4].metadata.modeName]
        const avatar7 = await Canvas.loadImage(modep5.url);
        ctx.drawImage(avatar7, 1675, 1803.5, 100, 100)
        const agentpx5 = await Canvas.loadImage(agentp5.url);
        ctx.drawImage(agentpx5, 1675, 1678.5, 100, 100)
        ctx.text3('Score', 110, 2280, 1755)
        ctx.text3(raw2.data.matches[4].segments[0].stats.roundsWon.value, 90, 2345, 1880, '#0088ff', 'center')
        ctx.text3(':', 90, 2405, 1880, '#fff', 'center')
        ctx.text3(raw2.data.matches[4].segments[0].stats.roundsLost.value, 90, 2465, 1880, '#ff4654', 'center')
        ctx.text3('K/D/A', 110, 2675, 1755)
        ctx.text3(raw2.data.matches[4].segments[0].stats.kills.value + ' | ' + raw2.data.matches[4].segments[0].stats.deaths.value + ' | ' + raw2.data.matches[4].segments[0].stats.assists.value, 90, 2630, 1880)

        var gameids = gamejson.gameids
        var gamekeys = gamejson.gamekeys
        //temporary
        if(gameids.includes(raw2.data.matches[0].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[0].attributes.id].gamekeys, 80, 3075, 350)
        } else {
          gameids.push(raw2.data.matches[0].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[0].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[0].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 350)
          } else {
            gamejson[raw2.data.matches[0].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[0].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 350)
          }
        }
        if(gameids.includes(raw2.data.matches[1].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[1].attributes.id].gamekeys, 80, 3075, 715)
        } else {
          gameids.push(raw2.data.matches[1].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[1].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[1].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 715)
          } else {
            gamejson[raw2.data.matches[1].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[1].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 715)
          }
        }
        if(gameids.includes(raw2.data.matches[2].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[2].attributes.id].gamekeys, 80, 3075, 1085)
        } else {
          gameids.push(raw2.data.matches[2].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[2].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[2].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1085)
          } else {
            gamejson[raw2.data.matches[2].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[2].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1085)
          }
        }
        if(gameids.includes(raw2.data.matches[3].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[3].attributes.id].gamekeys, 80, 3075, 1460)
        } else {
          gameids.push(raw2.data.matches[3].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[3].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[3].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1460)
          } else {
            gamejson[raw2.data.matches[3].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[3].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1460)
          }
        }
        if(gameids.includes(raw2.data.matches[4].attributes.id)) {
          ctx.text('v?game ' + gamejson[raw2.data.matches[4].attributes.id].gamekeys, 80, 3075, 1830)
        } else {
          gameids.push(raw2.data.matches[4].attributes.id)
          var randomizedid = randomize('Aa0', 5)
          if(gamekeys.includes(randomizedid)) {
            randomizedid = randomize('Aa0', 5)
            gamejson[raw2.data.matches[4].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[4].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1830)
          } else {
            gamejson[raw2.data.matches[4].attributes.id] = {gamekeys: randomizedid}
            gamejson[randomizedid] = {gamekeys: raw2.data.matches[4].attributes.id}
            gamekeys.push(randomizedid)
            fs.writeFileSync('./database/game.json', JSON.stringify(gamejson, null, 2));
            ctx.text('v?game ' + randomizedid, 80, 3060, 1830)
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
       client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-stats.png'})
       if(agent == false) {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Agent data missing',
          description: "This error occours when you not your most played agent in one of these gamemodes since API Release: \n**Competitive**\n**Unrated**\n**SpikeRush** \n\nAs a result only your competitive with that agent will shown",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [ERROR STATS]"
          }
        }})
       }
       if(playlist == false) {
        client.createMessage(message.channel.id, {embed: {
          color: 0xff4654,
          title: 'Playlist data missing',
          description: "This error occours when you not played one of these gamemodes since API Release: \n**Deathmatch**\n**Competitive**\n**Unrated**\n**SpikeRush** \n\nAs a result only your competitive stats will shown",
          timestamp: new Date().toISOString(),
          footer: {
            text: "VALORANT LABS [ERROR STATS]"
          }
        }})
       }
       client.deleteMessage(statusembed_channel, statusembed_message, 'cleanchat')
  }
 }
 }
 
 
