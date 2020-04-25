//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const Discord = require("discord.js");
const RichEmbed = require("discord.js")
const querystring = require("querystring");
const fetch = require("node-fetch")
const fs = require('fs');
const client = new Discord.Client();
const config = require("./commands/config.json");
const data = require("./server.js")


//on client ready
client.on("ready", async () => {
  console.log("Ready")
  client.user.setActivity('v?help | ' + client.guilds.size + ' Server')
});

//DBL Things
const DBL = require("dblapi.js");
const dbl = new DBL(config.dbltoken, client)

client.on("ready", () => {
  setInterval(() =>{ 
    dbl.postStats(client.guilds.size)
  }, 1800000)
})
    

// Commands laden
let Commands = {};
['help', 'weapon', 'stats', 'prefix', 'ranked'].forEach(name => Commands[name] = require(`./commands/${name}.js`))

client.on('message', message => {
  // Command und Arguments checken
  if (message.content.toLowerCase().startsWith('v?')) {
     const args = message.content.toLowerCase().substr(2).split(' ')
     const cmd = args.shift()
	 console.log(cmd)
     // Checken ob der Command existiert
     if (Commands[cmd]) {
        Commands[cmd](args, client, message)
     } else {
        // Gibt es nicht
     }
  }
})

  
client.login(config.token)

// Always Active
require("express")()
  .get('/', (req, res) => res.sendFile('/app/site/index.html'))
  .get('/main.css', (req, res) => res.sendFile('/app/site/main.css'))
  .use((_, r) => r.send("Ok"))
  .listen(3000)
