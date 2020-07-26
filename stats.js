 //process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const querystring = require("querystring");
const prefix = 'v!'
const fs = require('fs')
const fetch = require("node-fetch")
const r = require('request-promise')

// Required for Attachment
const Discord = require('discord.js')

Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })

module.exports = async (args, client, message) => {
    message.channel.startTyping()
    const canvasstats = Canvas.createCanvas(3840, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    const background = await Canvas.loadImage("commands/images/Valorant_LABS.png"); //load background from url
    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
}
