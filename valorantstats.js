const Canvas = require('canvas')
const Discord = require('discord.js')
const client = new Discord.Client()

//on client ready
client.on('ready', async () => {
  console.log('Ready')
  client.user.setActivity('v!stats' || 'v!')
})

client.on('message', async message => {
  if (message.content.toLowerCase() == 'v!stats') {
	  const canvasstats = Canvas.createCanvas(3840, 2160)
	  const ctx = canvasstats.getContext('2d')
	
  	const background = await Canvas.loadImage('https://cdn.glitch.com/15c546f8-c377-494a-a8f3-e5f452789cdf/Bot-BG.png?v=1587494730283')
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height)
    
// Text
    ctx.font = '240px tahoma';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Work in Progress !!!', canvasstats.width / 4.5 , 1400)

    
    const attachment = new Discord.Attachment(canvasstats.toBuffer(), 'test.png')
    message.channel.send(attachment)
  }
})

client.login('[BOT TOKEN HERE]')
