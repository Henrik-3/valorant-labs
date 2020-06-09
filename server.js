//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const Discord = require("discord.js");
const RichEmbed = require("discord.js")
const fs = require('fs');
const client = new Discord.Client();
const config = require("./commands/config.json");
const fetch = require("node-fetch")

require('download')('https://cdn.glitch.com/15c546f8-c377-494a-a8f3-e5f452789cdf/product_sans.ttf', './')
require('download')('https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca/valorant_font.ttf', './')

//Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })
//Canvas.registerFont('valorant_font.ttf', { family: 'valorant_font'})

//DBL Things
const DBL = require("dblapi.js");
const dbl = new DBL(config.dbltoken, client)

//db
const db = require("./db.js")


client.on("ready", () => {
  console.log("Ready")
  client.user.setActivity('v?help | ' + client.guilds.cache.size + ' Servers')
  setInterval(() =>{ 
    dbl.postStats(client.guilds.size)
  }, 180000)
 setInterval (function() {
  require('./autonews/check.js')().then(data => {
    console.log(data)
  if (data.article) {
    const Embed = new Discord.MessageEmbed()
	  .setColor('#ee3054')
    	  .setDescription(data.article.description)
	  .setTitle(data.article.title)
	  .setURL(data.article.link)
  	  .setImage(data.article.banner)
	  .setTimestamp()
	  .setFooter('VALORANT LABS');
    
    const settings = require('./db.json');
    
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news).forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.cache.get(guild)
      if (guild) {
        channel = guild.channels.cache.get(channel)
        if (channel) {
          channel.send({ embed: Embed })
        }
      }
    })
  
}
})
}, 60000)
})

client.on('guildCreate', g => {
  client.user.setActivity('v?help | ' + client.guilds.cache.size + ' Servers')
})

client.on('guildDelete', g => {
  client.user.setActivity('v?help | ' + client.guilds.cache.size + ' Servers')})

// Commands laden
let Commands = {};
['help', 'weapon', 'stats', 'ranked', 'settings', 'patch', 'help2', 'map', 'weapons', 'agent', 'botinfo', 'vote', 'agents', 'status'].forEach(name => Commands[name] = require(`./commands/${name}.js`))

client.on('message', message => {
  // Command und Arguments checken
  const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
  if (message.content.toLowerCase().startsWith(prefix)) {
     const args = message.content.toLowerCase().substr(prefix.length).split(' ')
     const cmd = args.shift()
	   //console.log(cmd)
     // Checken ob der Command existiert
     if (Commands[cmd]) {
        Commands[cmd](args, client, message, {
          Canvas: Canvas, // Damit man das nicht bei jedem command einzelnd machen muss
          Discord: Discord
        })
     } else {
        // Gibt es nicht
     }
  }
})

  
client.login(config.token)


// Always Active
// TODO: Better Docs + Analytics
const web = require('express')()

// Homepage
web.get('/', (req, res) => {
  res.sendFile('/app/site/index.html')
})
web.get('/main.css', (req, res) => res.sendFile('/app/site/main.css'))

// top.gg redirect
web.get('/invite', (req, res) => {
 res.redirect('https://discordapp.com/oauth2/authorize?client_id=702201518329430117&scope=bot&permissions=116736')
})


web.get('/banner.png', (req, res) => {
 res.redirect('https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca/Banner.png')
})

// Stay online
web.get('/ping', (req, res) => res.send('Ok'))

web.get('/article', require('./autonews/redirect.js'))

const News = require('./autonews/check.js')

web.get('/check', async (req, res) => {
  const news = await News()
  if (news) {
    const data = db.get('')
    Object.keys(data).forEach(guild_id => {
      if (data[guild_id].news) {
        client.channels.get(data[guild_id].news).replace(/[^0-9]/g, '').send({ embed: news })
      }
    })
   }
})


web.listen(3000)
