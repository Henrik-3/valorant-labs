const fs = require('fs')
const r = require('request-promise')
const moment = require('moment')
const axios = require('axios')

module.exports = async (args, client, message, { Canvas, Discord }) => {
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
    var gamejson = JSON.parse(fs.readFileSync('database/game.json'))

    const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
    const name1 = message.content.substr(prefix.length + 5)

    var gameids = gamejson.gameids
    var gamekeys = gamejson.gamekeys
    if(name1 === '') {
        client.createMessage(message.channel.id, {embed: {
            color: 0xff4654,
            title: 'No Game key given',
            description: 'Please add a Game Key as an argument',
            fields: [
                {name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'VALORANT LABS [ERROR]'
            }
        }})
    } else if(gamekeys.includes(name1)) {
        console.log(gamejson[name1].gamekeys)
        var raw;
        var error;
        try {
          await axios.get(`API Key and Endpoint here`).then(response => raw = response.data)
        } catch (e) {
            error = e
        }
        if(error !== undefined) {
            client.createMessage(message.channel.id, {embed: {
                color: 0xff4654,
                title: 'Error while fetching match',
                description: 'Please try again in a few minutes. If the Error still exists join the support server or write me a DM that there is a error',
                fields: [
                    {name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'VALORANT LABS [ERROR]'
                }
            }})
        } else {
            if(raw.data.metadata.modeName == 'Spike Rush') {
                message.channel.sendTyping()
                const background = await Canvas.loadImage("commands/images/game/Game-Spikerush.png"); //load background from url
                ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

                ctx.text2('Game: ' + gamejson[raw.data.attributes.id].gamekeys, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
                const avatar2 = await Canvas.loadImage(raw.data.metadata.modeImageUrl);
                ctx.drawImage(avatar2, 630, 85, 200, 200)
                ctx.text3(raw.data.metadata.modeName + " | " + raw.data.metadata.mapName, 100, 900, 225)
                if(lang == 'de') {
                  moment.locale('de')
                  ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
                } else if(lang == 'en-us') {
                  moment.locale('en')
                  ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
                } else if(lang == 'en-gb') {
                  moment.locale('en-gb')
                  ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
                } else if(lang == 'fr') {
                  moment.locale('fr')
                  ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
                } else if(lang == 'jp') {
                  moment.locale('ja')
                  ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
                } else if(lang == 'pt-br') {
                  moment.locale('pt-br')
                  ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
                }
                //logic
                var players = raw.data.segments.filter(segment => segment.type == 'player-summary')
                var teams = raw.data.segments.filter(segment => segment.type == 'team-summary')
                var teamblue = teams.filter(team => team.attributes.teamId == 'Blue')
                var teamred = teams.filter(team => team.attributes.teamId == 'Blue')
                var red = players.filter(player => player.metadata.teamId == 'Red')
                var blue = players.filter(player => player.metadata.teamId == 'Blue')
                var redx = red.sort((player1, player2) => player2.stats.score.value - player1.stats.score.value)
                var bluex = blue.sort((player1, player2) => player2.stats.score.value - player1.stats.score.value)

                ctx.text3(teamblue.stats.roundsWon.displayValue, 90, 2075, 450, '#00ffcc', 'center')
                ctx.text3(":", 90, 2175, 450, '#fff', 'center')
                ctx.text3(teamred.stats.roundsWon.displayValue, 90, 2275, 450, '#ff4654', 'center')

                const red1 = await Canvas.loadImage(redx[0].stats.rank.metadata.iconUrl);
                ctx.drawImage(red1, 2330, 555, 200, 200)
                if(redx[0].attributes.platformUserIdentifier == null) {
                  ctx.text3(redx[0].metadata.agentKey, 80, 2550, 680)
                } else {
                  ctx.text3(redx[0].attributes.platformUserIdentifier, 80, 2550, 680)
                }
                ctx.text3(redx[0].stats.scorePerRound.displayValue, 80, 3375, 680)
                ctx.text3(redx[0].stats.kills.value + ' | ' + redx[0].stats.deaths.value + ' | ' + redx[0].stats.assists.value, 80, 3625, 680)

                const red2 = await Canvas.loadImage(redx[1].stats.rank.metadata.iconUrl);
                ctx.drawImage(red2, 2330, 860, 200, 200)
                if(redx[1].attributes.platformUserIdentifier == null) {
                  ctx.text3(redx[1].metadata.agentKey, 80, 2550, 985)
                } else {
                  ctx.text3(redx[1].attributes.platformUserIdentifier, 80, 2550, 985)
                }
                ctx.text3(redx[1].stats.scorePerRound.displayValue, 80, 3375, 985)
                ctx.text3(redx[1].stats.kills.value + ' | ' + redx[1].stats.deaths.value + ' | ' + redx[1].stats.assists.value, 80, 3625, 985)

                const red3 = await Canvas.loadImage(redx[2].stats.rank.metadata.iconUrl);
                ctx.drawImage(red3, 2330, 1160, 200, 200)
                if(redx[2].attributes.platformUserIdentifier == null) {
                  ctx.text3(redx[2].metadata.agentKey, 80, 2550, 1287.5)
                } else {
                  ctx.text3(redx[2].attributes.platformUserIdentifier, 80, 2550, 1287.5)
                }
                ctx.text3(redx[2].stats.scorePerRound.displayValue, 80, 3375, 1287.5)
                ctx.text3(redx[2].stats.kills.value + ' | ' + redx[2].stats.deaths.value + ' | ' + redx[2].stats.assists.value, 80, 3625, 1287.5)

                const red4 = await Canvas.loadImage(redx[3].stats.rank.metadata.iconUrl);
                ctx.drawImage(red4, 2330, 1465, 200, 200)
                if(redx[3].attributes.platformUserIdentifier == null) {
                  ctx.text3(redx[3].metadata.agentKey, 80, 2550, 1595)
                } else {
                  ctx.text3(redx[3].attributes.platformUserIdentifier, 80, 2550, 1595)
                }
                ctx.text3(redx[3].stats.scorePerRound.displayValue, 80, 3375, 1595)
                ctx.text3(redx[3].stats.kills.value + ' | ' + redx[3].stats.deaths.value + ' | ' + redx[3].stats.assists.value, 80, 3625, 1595)

                const red5 = await Canvas.loadImage(redx[4].stats.rank.metadata.iconUrl);
                ctx.drawImage(red5, 2330, 1770, 200, 200)
                if(redx[4].attributes.platformUserIdentifier == null) {
                  ctx.text3(redx[4].metadata.agentKey, 80, 2550, 1900)
                } else {
                  ctx.text3(redx[4].attributes.platformUserIdentifier, 80, 2550, 1900)
                }
                ctx.text3(redx[4].stats.scorePerRound.displayValue, 80, 3375, 1900)
                ctx.text3(redx[4].stats.kills.value + ' | ' + redx[4].stats.deaths.value + ' | ' + redx[4].stats.assists.value, 80, 3625, 1900)


                const blue1 = await Canvas.loadImage(bluex[0].stats.rank.metadata.iconUrl);
                ctx.drawImage(blue1, 460, 555, 200, 200)
                if(bluex[0].attributes.platformUserIdentifier == null) {
                  ctx.text3(bluex[0].metadata.agentKey, 80, 680, 680)
                } else {
                  ctx.text3(bluex[0].attributes.platformUserIdentifier, 80, 680, 680)
                }
                ctx.text3(bluex[0].stats.scorePerRound.displayValue, 80, 1505, 680)
                ctx.text3(bluex[0].stats.kills.value + ' | ' + bluex[0].stats.deaths.value + ' | ' + bluex[0].stats.assists.value, 80, 1755, 680)

                const blue2 = await Canvas.loadImage(bluex[1].stats.rank.metadata.iconUrl);
                ctx.drawImage(blue2, 460, 860, 200, 200)
                if(bluex[1].attributes.platformUserIdentifier == null) {
                  ctx.text3(bluex[1].metadata.agentKey, 80, 680, 985)
                } else {
                  ctx.text3(bluex[1].attributes.platformUserIdentifier, 80, 680, 985)
                }
                ctx.text3(bluex[1].stats.scorePerRound.displayValue, 80, 1505, 985)
                ctx.text3(bluex[1].stats.kills.value + ' | ' + bluex[1].stats.deaths.value + ' | ' + bluex[1].stats.assists.value, 80, 1755, 985)

                const blue3 = await Canvas.loadImage(bluex[2].stats.rank.metadata.iconUrl);
                ctx.drawImage(blue3, 460, 1160, 200, 200)
                if(bluex[2].attributes.platformUserIdentifier == null) {
                  ctx.text3(bluex[2].metadata.agentKey, 80, 680, 1287.5)
                } else {
                  ctx.text3(bluex[2].attributes.platformUserIdentifier, 80, 680, 1287.5)
                }
                ctx.text3(bluex[2].stats.scorePerRound.displayValue, 80, 1505, 1287.5)
                ctx.text3(bluex[2].stats.kills.value + ' | ' + bluex[2].stats.deaths.value + ' | ' + bluex[2].stats.assists.value, 80, 1755, 1287.5)

                const blue4 = await Canvas.loadImage(bluex[3].stats.rank.metadata.iconUrl);
                ctx.drawImage(blue4, 460, 1465, 200, 200)
                if(bluex[3].attributes.platformUserIdentifier == null) {
                  ctx.text3(bluex[3].metadata.agentKey, 80, 680, 1595)
                } else {
                  ctx.text3(bluex[3].attributes.platformUserIdentifier, 80, 680, 1595)
                }
                ctx.text3(bluex[3].stats.scorePerRound.displayValue, 80, 1505, 1595)
                ctx.text3(bluex[3].stats.kills.value + ' | ' + bluex[3].stats.deaths.value + ' | ' + bluex[3].stats.assists.value, 80, 1755, 1595)

                const blue5 = await Canvas.loadImage(bluex[4].stats.rank.metadata.iconUrl);
                ctx.drawImage(blue5, 460, 1770, 200, 200)
                if(bluex[4].attributes.platformUserIdentifier == null) {
                  ctx.text3(bluex[4].metadata.agentKey, 80, 680, 1900)
                } else {
                  ctx.text3(bluex[4].attributes.platformUserIdentifier, 80, 680, 1900)
                }
                ctx.text3(bluex[4].stats.scorePerRound.displayValue, 80, 1505, 1900)
                ctx.text3(bluex[4].stats.kills.value + ' | ' + bluex[4].stats.deaths.value + ' | ' + bluex[4].stats.assists.value, 80, 1755, 1900)

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
         client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-game.png'})
            } else if(raw.data.metadata.modeName == 'Rated' || raw.data.metadata.modeName == 'Normal' || raw.data.metadata.modeName == 'Competitive') {
              message.channel.sendTyping()
              const background = await Canvas.loadImage("commands/images/game/Game-Normal.png"); //load background from url
              ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

              ctx.text2('Game: ' + gamejson[raw.data.attributes.id].gamekeys, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
              const avatar2 = await Canvas.loadImage(raw.data.metadata.modeImageUrl);
              ctx.drawImage(avatar2, 630, 85, 200, 200)
              ctx.text3(raw.data.metadata.modeName + " | " + raw.data.metadata.mapName, 100, 870, 225)
              if(lang == 'de') {
                moment.locale('de')
                ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
              } else if(lang == 'en-us') {
                moment.locale('en')
                ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
              } else if(lang == 'en-gb') {
                moment.locale('en-gb')
                ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
              } else if(lang == 'fr') {
                moment.locale('fr')
                ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
              } else if(lang == 'jp') {
                moment.locale('ja')
                ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
              } else if(lang == 'pt-br') {
                moment.locale('pt-br')
                ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
              }

              ctx.text3(raw.data.segments[1].stats.roundsWon.displayValue, 90, 2075, 450, '#00ffcc', 'center')
              ctx.text3(":", 90, 2175, 450, '#fff', 'center')
              ctx.text3(raw.data.segments[1].stats.roundsLost.displayValue, 90, 2275, 450, '#ff4654', 'center')

              //logic
              var players = raw.data.segments.filter(segment => segment.type == 'player-summary')
              var red = players.filter(player => player.metadata.teamId == 'Red')
              var blue = players.filter(player => player.metadata.teamId == 'Blue')
              var redx = red.sort((player1, player2) => player2.stats.score.value - player1.stats.score.value)
              var bluex = blue.sort((player1, player2) => player2.stats.score.value - player1.stats.score.value)

              const red1 = await Canvas.loadImage(redx[0].stats.rank.metadata.iconUrl);
              ctx.drawImage(red1, 2330, 555, 200, 200)
              if(redx[0].attributes.platformUserIdentifier == null) {
                ctx.text3(redx[0].metadata.agentKey, 80, 2550, 680)
              } else {
                ctx.text3(redx[0].attributes.platformUserIdentifier, 80, 2550, 680)
              }
              ctx.text3(redx[0].stats.scorePerRound.displayValue, 80, 3375, 680)
              ctx.text3(redx[0].stats.kills.value + ' | ' + redx[0].stats.deaths.value + ' | ' + redx[0].stats.assists.value, 80, 3625, 680)

              const red2 = await Canvas.loadImage(redx[1].stats.rank.metadata.iconUrl);
              ctx.drawImage(red2, 2330, 860, 200, 200)
              if(redx[1].attributes.platformUserIdentifier == null) {
                ctx.text3(redx[1].metadata.agentKey, 80, 2550, 985)
              } else {
                ctx.text3(redx[1].attributes.platformUserIdentifier, 80, 2550, 985)
              }
              ctx.text3(redx[1].stats.scorePerRound.displayValue, 80, 3375, 985)
              ctx.text3(redx[1].stats.kills.value + ' | ' + redx[1].stats.deaths.value + ' | ' + redx[1].stats.assists.value, 80, 3625, 985)

              const red3 = await Canvas.loadImage(redx[2].stats.rank.metadata.iconUrl);
              ctx.drawImage(red3, 2330, 1160, 200, 200)
              if(redx[2].attributes.platformUserIdentifier == null) {
                ctx.text3(redx[2].metadata.agentKey, 80, 2550, 1287.5)
              } else {
                ctx.text3(redx[2].attributes.platformUserIdentifier, 80, 2550, 1287.5)
              }
              ctx.text3(redx[2].stats.scorePerRound.displayValue, 80, 3375, 1287.5)
              ctx.text3(redx[2].stats.kills.value + ' | ' + redx[2].stats.deaths.value + ' | ' + redx[2].stats.assists.value, 80, 3625, 1287.5)

              const red4 = await Canvas.loadImage(redx[3].stats.rank.metadata.iconUrl);
              ctx.drawImage(red4, 2330, 1465, 200, 200)
              if(redx[3].attributes.platformUserIdentifier == null) {
                ctx.text3(redx[3].metadata.agentKey, 80, 2550, 1595)
              } else {
                ctx.text3(redx[3].attributes.platformUserIdentifier, 80, 2550, 1595)
              }
              ctx.text3(redx[3].stats.scorePerRound.displayValue, 80, 3375, 1595)
              ctx.text3(redx[3].stats.kills.value + ' | ' + redx[3].stats.deaths.value + ' | ' + redx[3].stats.assists.value, 80, 3625, 1595)

              const red5 = await Canvas.loadImage(redx[4].stats.rank.metadata.iconUrl);
              ctx.drawImage(red5, 2330, 1770, 200, 200)
              if(redx[4].attributes.platformUserIdentifier == null) {
                ctx.text3(redx[4].metadata.agentKey, 80, 2550, 1900)
              } else {
                ctx.text3(redx[4].attributes.platformUserIdentifier, 80, 2550, 1900)
              }
              ctx.text3(redx[4].stats.scorePerRound.displayValue, 80, 3375, 1900)
              ctx.text3(redx[4].stats.kills.value + ' | ' + redx[4].stats.deaths.value + ' | ' + redx[4].stats.assists.value, 80, 3625, 1900)


              const blue1 = await Canvas.loadImage(bluex[0].stats.rank.metadata.iconUrl);
              ctx.drawImage(blue1, 460, 555, 200, 200)
              if(bluex[0].attributes.platformUserIdentifier == null) {
                ctx.text3(bluex[0].metadata.agentKey, 80, 680, 680)
              } else {
                ctx.text3(bluex[0].attributes.platformUserIdentifier, 80, 680, 680)
              }
              ctx.text3(bluex[0].stats.scorePerRound.displayValue, 80, 1505, 680)
              ctx.text3(bluex[0].stats.kills.value + ' | ' + bluex[0].stats.deaths.value + ' | ' + bluex[0].stats.assists.value, 80, 1755, 680)

              const blue2 = await Canvas.loadImage(bluex[1].stats.rank.metadata.iconUrl);
              ctx.drawImage(blue2, 460, 860, 200, 200)
              if(bluex[1].attributes.platformUserIdentifier == null) {
                ctx.text3(bluex[1].metadata.agentKey, 80, 680, 985)
              } else {
                ctx.text3(bluex[1].attributes.platformUserIdentifier, 80, 680, 985)
              }
              ctx.text3(bluex[1].stats.scorePerRound.displayValue, 80, 1505, 985)
              ctx.text3(bluex[1].stats.kills.value + ' | ' + bluex[1].stats.deaths.value + ' | ' + bluex[1].stats.assists.value, 80, 1755, 985)

              const blue3 = await Canvas.loadImage(bluex[2].stats.rank.metadata.iconUrl);
              ctx.drawImage(blue3, 460, 1160, 200, 200)
              if(bluex[2].attributes.platformUserIdentifier == null) {
                ctx.text3(bluex[2].metadata.agentKey, 80, 680, 1287.5)
              } else {
                ctx.text3(bluex[2].attributes.platformUserIdentifier, 80, 680, 1287.5)
              }
              ctx.text3(bluex[2].stats.scorePerRound.displayValue, 80, 1505, 1287.5)
              ctx.text3(bluex[2].stats.kills.value + ' | ' + bluex[2].stats.deaths.value + ' | ' + bluex[2].stats.assists.value, 80, 1755, 1287.5)

              const blue4 = await Canvas.loadImage(bluex[3].stats.rank.metadata.iconUrl);
              ctx.drawImage(blue4, 460, 1465, 200, 200)
              if(bluex[3].attributes.platformUserIdentifier == null) {
                ctx.text3(bluex[3].metadata.agentKey, 80, 680, 1595)
              } else {
                ctx.text3(bluex[3].attributes.platformUserIdentifier, 80, 680, 1595)
              }
              ctx.text3(bluex[3].stats.scorePerRound.displayValue, 80, 1505, 1595)
              ctx.text3(bluex[3].stats.kills.value + ' | ' + bluex[3].stats.deaths.value + ' | ' + bluex[3].stats.assists.value, 80, 1755, 1595)

              const blue5 = await Canvas.loadImage(bluex[4].stats.rank.metadata.iconUrl);
              ctx.drawImage(blue5, 460, 1770, 200, 200)
              if(bluex[4].attributes.platformUserIdentifier == null) {
                ctx.text3(bluex[4].metadata.agentKey, 80, 680, 1900)
              } else {
                ctx.text3(bluex[4].attributes.platformUserIdentifier, 80, 680, 1900)
              }
              ctx.text3(bluex[4].stats.scorePerRound.displayValue, 80, 1505, 1900)
              ctx.text3(bluex[4].stats.kills.value + ' | ' + bluex[4].stats.deaths.value + ' | ' + bluex[4].stats.assists.value, 80, 1755, 1900)

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
         client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-game.png'})
          } else if(raw.data.metadata.modeName == 'Deathmatch') {
            message.channel.sendTyping()
            const background = await Canvas.loadImage("commands/images/game/Game-Deathmatch.png"); //load background from url
            ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

            ctx.text2('Game: ' + gamejson[raw.data.attributes.id].gamekeys, 150, canvasstats.width / 2, 200, '#ffffff', 'center')
            const avatar2 = await Canvas.loadImage(raw.data.metadata.modeImageUrl);
            ctx.drawImage(avatar2, 630, 85, 200, 200)
            ctx.text3(raw.data.metadata.modeName + " | " + raw.data.metadata.mapName, 100, 850, 225)
            if(lang == 'de') {
              moment.locale('de')
              ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
            } else if(lang == 'en-us') {
              moment.locale('en')
              ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
            } else if(lang == 'en-gb') {
              moment.locale('en-gb')
              ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
            } else if(lang == 'fr') {
              moment.locale('fr')
              ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
            } else if(lang == 'jp') {
              moment.locale('ja')
              ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
            } else if(lang == 'pt-br') {
              moment.locale('pt-br')
              ctx.text3(moment.duration(raw.data.metadata.duration).minutes() + 'm ' + moment.duration(raw.data.metadata.duration).seconds() + "s | " + moment(raw.data.metadata.dateStarted).format('LLLL'), 100, 3700, 225, '#ffffff', 'right')
            }

            var players = raw.data.segments.filter(segment => segment.type == 'player-summary')
            var statsx = players.sort((player1, player2) => player2.stats.score.value - player1.stats.score.value)

            const player1 = await Canvas.loadImage(statsx[0].stats.rank.metadata.iconUrl);
            ctx.drawImage(player1, 520, 455, 200, 200)
            if(statsx[0].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[0].metadata.agentKey, 80, 750, 580)
            } else {
              ctx.text3(statsx[0].attributes.platformUserIdentifier, 80, 750, 580)
            }
            ctx.text3(statsx[0].stats.scorePerRound.displayValue, 80, 1455, 580)
            ctx.text3(statsx[0].stats.kills.value + ' | ' + statsx[0].stats.deaths.value + ' | ' + statsx[0].stats.assists.value, 80, 1730, 580)

            const player2 = await Canvas.loadImage(statsx[1].stats.rank.metadata.iconUrl);
            ctx.drawImage(player2, 520, 805, 200, 200)
            if(statsx[1].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[1].metadata.agentKey, 80, 750, 930)
            } else {
              ctx.text3(statsx[1].attributes.platformUserIdentifier, 80, 750, 930)
            }
            ctx.text3(statsx[1].stats.scorePerRound.displayValue, 80, 1455, 930)
            ctx.text3(statsx[1].stats.kills.value + ' | ' + statsx[1].stats.deaths.value + ' | ' + statsx[1].stats.assists.value, 80, 1730, 930)

            const player3 = await Canvas.loadImage(statsx[2].stats.rank.metadata.iconUrl);
            ctx.drawImage(player3, 520, 1155, 200, 200)
            if(statsx[2].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[2].metadata.agentKey, 80, 750, 1280)
            } else {
              ctx.text3(statsx[2].attributes.platformUserIdentifier, 80, 750, 1280)
            }
            ctx.text3(statsx[2].stats.scorePerRound.displayValue, 80, 1455, 1280)
            ctx.text3(statsx[2].stats.kills.value + ' | ' + statsx[2].stats.deaths.value + ' | ' + statsx[2].stats.assists.value, 80, 1730, 1280)

            const player4 = await Canvas.loadImage(statsx[3].stats.rank.metadata.iconUrl);
            ctx.drawImage(player4, 520, 1505, 200, 200)
            if(statsx[3].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[3].metadata.agentKey, 80, 750, 1630)
            } else {
              ctx.text3(statsx[3].attributes.platformUserIdentifier, 80, 750, 1630)
            }
            ctx.text3(statsx[3].stats.scorePerRound.displayValue, 80, 1455, 1630)
            ctx.text3(statsx[3].stats.kills.value + ' | ' + statsx[3].stats.deaths.value + ' | ' + statsx[3].stats.assists.value, 80, 1730, 1630)

            const player5 = await Canvas.loadImage(statsx[4].stats.rank.metadata.iconUrl);
            ctx.drawImage(player5, 520, 1855, 200, 200)
            if(statsx[4].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[4].metadata.agentKey, 80, 750, 1980)
            } else {
              ctx.text3(statsx[4].attributes.platformUserIdentifier, 80, 750, 1980)
            }
            ctx.text3(statsx[4].stats.scorePerRound.displayValue, 80, 1455, 1980)
            ctx.text3(statsx[4].stats.kills.value + ' | ' + statsx[4].stats.deaths.value + ' | ' + statsx[4].stats.assists.value, 80, 1730, 1980)


            const player6 = await Canvas.loadImage(statsx[5].stats.rank.metadata.iconUrl);
            ctx.drawImage(player6, 2455, 455, 200, 200)
            if(statsx[5].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[5].metadata.agentKey, 80, 2675, 580)
            } else {
              ctx.text3(statsx[5].attributes.platformUserIdentifier, 80, 2675, 580)
            }
            ctx.text3(statsx[5].stats.scorePerRound.displayValue, 80, 3425, 580)
            ctx.text3(statsx[5].stats.kills.value + ' | ' + statsx[5].stats.deaths.value + ' | ' + statsx[5].stats.assists.value, 80, 3675, 580)

            const player7 = await Canvas.loadImage(statsx[6].stats.rank.metadata.iconUrl);
            ctx.drawImage(player7, 2455, 805, 200, 200)
            if(statsx[6].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[6].metadata.agentKey, 80, 2675, 930)
            } else {
              ctx.text3(statsx[6].attributes.platformUserIdentifier, 80, 2675, 930)
            }
            ctx.text3(statsx[6].stats.scorePerRound.displayValue, 80, 3425, 930)
            ctx.text3(statsx[6].stats.kills.value + ' | ' + statsx[6].stats.deaths.value + ' | ' + statsx[6].stats.assists.value, 80, 3675, 930)

            const player8 = await Canvas.loadImage(statsx[7].stats.rank.metadata.iconUrl);
            ctx.drawImage(player8, 2455, 1155, 200, 200)
            if(statsx[7].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[7].metadata.agentKey, 80, 2675, 1280)
            } else {
              ctx.text3(statsx[7].attributes.platformUserIdentifier, 80, 2675, 1280)
            }
            ctx.text3(statsx[7].stats.scorePerRound.displayValue, 80, 3425, 1280)
            ctx.text3(statsx[7].stats.kills.value + ' | ' + statsx[7].stats.deaths.value + ' | ' + statsx[7].stats.assists.value, 80, 3675, 1280)

            const player9 = await Canvas.loadImage(statsx[8].stats.rank.metadata.iconUrl);
            ctx.drawImage(player9, 2455, 1505, 200, 200)
            if(statsx[8].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[8].metadata.agentKey, 80, 2675, 1630)
            } else {
              ctx.text3(statsx[8].attributes.platformUserIdentifier, 80, 2675, 1630)
            }
            ctx.text3(statsx[8].stats.scorePerRound.displayValue, 80, 3425, 1630)
            ctx.text3(statsx[8].stats.kills.value + ' | ' + statsx[8].stats.deaths.value + ' | ' + statsx[8].stats.assists.value, 80, 3675, 1630)

            const player10 = await Canvas.loadImage(statsx[9].stats.rank.metadata.iconUrl);
            ctx.drawImage(player10, 2455, 1855, 200, 200)
            if(statsx[9].attributes.platformUserIdentifier == null) {
                ctx.text3(statsx[9].metadata.agentKey, 80, 2675, 1980)
            } else {
              ctx.text3(statsx[9].attributes.platformUserIdentifier, 80, 2675, 1980)
            }
            ctx.text3(statsx[9].stats.scorePerRound.displayValue, 80, 3425, 1980)
            ctx.text3(statsx[9].stats.kills.value + ' | ' + statsx[9].stats.deaths.value + ' | ' + statsx[9].stats.assists.value, 80, 3675, 1980)

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
         client.createMessage(message.channel.id, ' ', { file: canvasstats.toBuffer(), name: 'valorant-game.png'})

          }
        }
    } else {
        client.createMessage(message.channel.id, {embed: {
            color: 0xff4654,
            title: 'Game Key does not exist',
            description: 'Please add a valid Game Key',
            fields: [
                {name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'VALORANT LABS [ERROR]'
            }
        }})
    }
}
