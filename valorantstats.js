//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const Discord = require("discord.js");
const RichEmbed = require("discord.js")
const client = new Discord.Client();
const querystring = require("querystring");
const prefix = 'v!'
const fetch = require("node-fetch")

//on client ready
client.on("ready", async () => {
  console.log("Ready");
  client.user.setActivity("v!stats" || "v!");
});

//Stats
client.on("message", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
      
    const args = message.content.slice(prefix.lengt).split(/ +/)
    const command = args.shift().toLowerCase();
    
    const canvasstats = Canvas.createCanvas(3840, 2160); //set image size
    const ctx = canvasstats.getContext("2d"); //text preparation

    const background = await Canvas.loadImage("https://cdn.glitch.com/15c546f8-c377-494a-a8f3-e5f452789cdf/Bot-BG.png?v=1587494730283"); //load backgroudn from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background

    //Text WIP
    ctx.font = "240px tahoma";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Work in Progress !!!", canvasstats.width / 4.5, 1400);

    //no arg for GET
    if (!args.length) {
    return message.channel.send("You need to supply a valid name");
    }

    //HTTP GET VALORANT NAME
    const qname = querystring.stringify({term: args.join(' ')})
    const { list } = await fetch(`API LINK HERE`).then(response => response.json()) //use qname where the name is needed in the api link
    
    //GET Answers
    if (!list.length) {
      return message.channel.send('No results found')
    }
    
  
    const [answer] = list
    
    ctx.font = "100pc tamoha"
    ctx.fillStyle = "#000000"  
    ctx.fillText('Kills:' + answer.IDK_THE_API_RESULT_YET) 
    
    
    const attachment = new Discord.Attachment(canvasstats.toBuffer(),"test.png" ); //final result
    message.channel.send(attachment); //send final result
  })


client.login("Bot Token here");
