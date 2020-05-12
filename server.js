//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const Discord = require("discord.js");
const RichEmbed = require("discord.js")
const fs = require('fs');
const client = new Discord.Client();
const config = require("./commands/config.json");
const fetch = require("node-fetch")

//require('download')('https://cdn.glitch.com/15c546f8-c377-494a-a8f3-e5f452789cdf/product_sans.ttf', './')
//require('download')('https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca/valorant_font.ttf', './')

Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })
Canvas.registerFont('valorant_font.ttf', { family: 'valorant_font'})

//DBL Things
const DBL = require("dblapi.js");
const dbl = new DBL(config.dbltoken, client)

//db
const db = require("./db.js")

// dev log
const log = new Discord.WebhookClient('HERE WEBHOOK DATA')

client.on("ready", () => {
  console.log("Ready")
  client.user.setActivity('v?help | ' + client.guilds.size + ' Servers')
  setInterval(() =>{ 
    dbl.postStats(client.guilds.size)
  }, 180000)
})

client.on('guildCreate', g => {
  client.user.setActivity('v?help | ' + client.guilds.size + ' Servers')
  log_(g, '+')
})

client.on('guildDelete', g => {
  client.user.setActivity('v?help | ' + client.guilds.size + ' Servers')
  log_(g, '-')
})

async function log_(g, type) {
  log.send({
    embeds: [{
      author: {
        name: g.owner.user.username,
        icon_url: g.owner.user.displayAvatarURL
      },
      thumbnail: {
        url: g.iconURL
      },
      title: (type == '+' ? ':heavy_plus_sign:' : ':heavy_minus_sign:') + g.name,
      description: `:busts_in_silhouette: ${g.memberCount}\n[Join](${((await g.fetchInvites()).first()||{}).url})`,
      timestamp: g.createdAt,
      footer: { text: 'Created at' },
      color: 16729686
    }]
  })
}

// Commands laden
let Commands = {};
['help', 'weapon', 'stats', 'ranked', 'settings', 'patch', 'help2', 'map', 'weapons', 'maps', 'agent', 'botinfo', 'vote', 'agents'].forEach(name => Commands[name] = require(`./commands/${name}.js`))

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
