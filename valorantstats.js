//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const Discord = require("discord.js");
const RichEmbed = require("discord.js")
const querystring = require("querystring");
const prefix = 'v!'
const fetch = require("node-fetch")
const DBL = require("dblapi.js");
const fs = require('fs');
const client = new Discord.Client();
const config = require("./config.json");

//on client ready
client.on("ready", async () => {
  console.log("Ready");
  client.user.setActivity("v!help");
});


// Commands laden
let Commands = {};
['help', 'weapon', 'stats', 'weapon2'].forEach(name => Commands[name] = require(`./commands/${name}.js`))

client.on('message', message => {
  // Command und Arguments checken
  if (message.content.toLowerCase().startsWith('v!')) {
     const args = message.content.toLowerCase().substr(2).split(' ')
     const cmd = args.shift()
     // Checken ob der Command existiert
     if (Commands[cmd]) {
        Commands[cmd](args, client, message)
     } else {
        // Gibt es nicht
     }
  }
})

client.login(config.token)
