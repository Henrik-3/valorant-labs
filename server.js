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
const log = new Discord.WebhookClient('705516506557055067', '8wWaNoFx5zc_E1GXxoWnN5RufaPocxCKGtAE3D6EZxTgoBC7xoaV72VvVTQnFRoTWJNn')

client.on("ready", () => {
  console.log("Ready")
  client.user.setActivity(client.guilds.cache.size + ' Servers | Send me a DM with your issues and wishes :D')	
  setInterval(() =>{ 
    dbl.postStats(client.guilds.size)
  }, 180000)
 setInterval (function() {
  require('./autonews/check-en.js')().then(data => {
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
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'en').forEach(guild => {
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
setInterval (function() {
  require('./autonews/check-de.js')().then(data => {
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
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'de').forEach(guild => {
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


var linkPath = './api.json'
    var linkRead = fs.readFileSync(linkPath);
    var linkFile = JSON.parse(linkRead); //ready for use
    linkFile = {servercount: client.guilds.cache.size, usercount: client.users.cache.size}; //if not, create it
    fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));
})

client.on('guildCreate', g => {
  const DMEmbed = new Discord.MessageEmbed()
    .setColor('#FFFF00')
    .setTitle('Message from the VALORANT LABS Creator')
    .setDescription('Hey, thanks for inviting me to your server. if you have suggestions or found a bug send me them in this channel or in the support server')
    .addFields(
      { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
    )
  client.users.cache.get(g.ownerID).send(DMEmbed)
  const Embed = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`Neuer Server: ${g.name}`)
    .setThumbnail(g.iconURL())
    .addFields(
      { name: 'ID', value: g.id, inline: true},
      { name: 'MemberCount', value: g.memberCount, inline: true},
      { name: 'Region', value: g.region, inline: true},
      { name: 'OwnerID', value: g.ownerID, inline: true},
      { name: 'Server Boost Level', value: g.premiumTier, inline: true},
    )
    .setTimestamp()
    .setFooter('VALORANT LABS [INVITE SYSTEM]');
  //client.channels.cache.get('705516325455528047').send(Embed)
  client.channels.cache.get('702435906757328897').send(Embed)
  client.user.setActivity(client.guilds.cache.size + ' Servers | Send me a DM with your issues and wishes :D')
  var linkPath = './api.json'
  var linkRead = fs.readFileSync(linkPath);
  var linkFile = JSON.parse(linkRead); //ready for use
  linkFile = {servercount: client.guilds.cache.size, usercount: client.users.cache.size}; //if not, create it
  fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));
})

client.on('guildDelete', g => {
  const DMEmbed = new Discord.MessageEmbed()
    .setColor('#FFFF00')
    .setTitle('Message from the VALORANT LABS Creator')
    .setDescription('Hey, i saw that you removed VALORANT LABS from your server, do you wanna tell me why so that i can improve the bot or add features that are missing? \n If yes, please write here in the chat your wishes or improvments or send me a DM if you want to discuss with me directly: Henrik3#1451')
    .addFields(
      { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
    )
    client.users.cache.get(g.ownerID).send(DMEmbed)
  const Embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle(`Server Verlassen: ${g.name}`)
    .setThumbnail(g.iconURL())
    .addFields(
      { name: 'ID', value: g.id, inline: true},
      { name: 'MemberCount', value: g.memberCount, inline: true},
      { name: 'Region', value: g.region, inline: true},
      { name: 'OwnerID', value: g.ownerID, inline: true},
      { name: 'Server Boost Level', value: g.premiumTier, inline: true},
    )
    .setTimestamp()
    .setFooter('VALORANT LABS [INVITE SYSTEM]');
  //client.channels.cache.get('705516325455528047').send(Embed)
  client.channels.cache.get('702435906757328897').send(Embed)
  client.user.setActivity(client.guilds.cache.size + ' Servers | Send me a DM with your issues and wishes :D')
    var linkPath = './api.json'
    var linkRead = fs.readFileSync(linkPath);
    var linkFile = JSON.parse(linkRead); //ready for use
    linkFile = {servercount: client.guilds.cache.size, usercount: client.users.cache.size}; //if not, create it
    fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));
})

client.on('message', message => {
  if(message.author.id == "346345363990380546" && message.content.startsWith('!labs') ) {
    const args = message.content.split(' ')
    console.log(args)
    var userID = args[1]
    args.shift()
    args.shift()
    console.log(userID)
    const Embed = new Discord.MessageEmbed()
    .setColor('#FFFF00')
    .setTitle('Answer from the VALORANT LABS Creator')
    .setDescription(args.join(' ').toString())
    client.users.cache.get(userID).send(Embed)
    client.channels.cache.get('729387358247714938').send('Message Successfully Send')
  } else {
    return;
  }
})

// Commands laden
let Commands = {};
['help', 'weapon', 'stats', 'ranked', 'settings', 'patch', 'help2', 'map', 'weapons', 'agent', 'botinfo', 'vote', 'agents', 'status'].forEach(name => Commands[name] = require(`./commands/${name}.js`))

client.on('message', message => {
  if(message.channel.type !== "dm") {
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
 } else if(message.channel.type === "dm" && message.author.id != "706138094956707861" && message.author.id != "702201518329430117") {
    const Embed = new Discord.MessageEmbed()
    .setColor('#FFFF00')
    .setTitle('Nachricht von ' + message.author.username + '#' + message.author.discriminator + ' | ID: ' + message.author.id)
    .setDescription(message.content)
    client.channels.cache.get('729387358247714938').send(Embed)
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

const News = require('./autonews/check-en.js')

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
