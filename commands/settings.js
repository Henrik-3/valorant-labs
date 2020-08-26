//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
// Database
const Discord = require("eris");
const fs = require('fs');
const db = require('../db.js')
const Default = {
  prefix: 'v?',
  news: false,
  lang: 'en-us',
  blacklist: false
}

module.exports = async (args, client, message, { Canvas, Discord }) => {

// System Funktionen
// Read settings of guild id
function read(id) {
  return { ...Default, ...(db.get(id) || {}) }
}

function write(id, value) {
  db.set(id, value)
}

// Nutzer Funktionen
// Macht ein Embed aus den Einstellungen
function Embed({ guild, settings, message }) {
  return {
    color: '#ff4654',
    title: 'Valorant Labs',
    description: 'Settings for '  + guild,
    fields: Object.keys(settings).map(k => {
      return {
        name: k,
        value: settings[k]
      }
    }),
    timestamp: new Date(),
    footer: {
      text: 'VALORANT LABS [SETTINGS]'
    }
  }
}

function get(message, key) {
  // Check Existance
  if (Object.keys(Default).includes(key)) {
    // Nur ein Key
    message.channel.send({
      embed: Embed({
        guild: message.guild,
        settings: {
          [key]: read(message.guildID)[key]
        }
      })
    })
  } else {
    client.createMessage(message.channel.id, `Can not find Category \`${key}\`.`)
  }
}

function set(message, key, value) {
  var lang = db.get(`${message.guildID}.lang`) || 'en-us'
  var linkjson = JSON.parse(fs.readFileSync('lang.json'))
  
  // Check Existance
  if (Object.keys(Default).includes(key)) {
    // Check Permission or Admin or Owner
   if(key == 'lang') {
   if(['de', 'en-us', 'en-gb', 'fr', 'pt-br', 'jp'].includes(value)) {
   if(message.channel.permissionsOf(message.author.id).has('manageGuild')) {
     write(message.guildID, { ...read(message.guildID), ...{ [key]: value }})
     client.createMessage(message.channel.id, {embed: {title: 'VALORANT LABS', description: 'Settings for your guild', color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Prefix', value: db.get(`${message.guildID}.prefix`)}, {name: 'News-Channel', value: db.get(`${message.guildID}.news`)}, {name: 'Language', value: db.get(`${message.guildID}.lang`)}, {name: 'Blacklist', value: db.get(`${message.guildID}.blacklist`)}], footer : {text: 'VALORANT LABS [SETTINGS]'}}})
   } else {
     client.createMessage(message.channel.id, "You don't have permissions to do that")
   }
  } else {
    client.createMessage(message.channel.id, {embed: {title: 'Language not available', color: 0xff4654, timestamp: new Date().toISOString(), description: 'This Language is not available, pick one of the available languages: \n - German --- de \n - English (NA) --- en-us \n - English (EUW) --- en-gb \n - French --- fr \n - Japanese --- jp \n - Brazil --- pt-br', fields: [{name: 'If you need help or want to help me by adding a new language, join the Support Server', value: '[Support Server](https://discord.com/invite/b5FmTqG)', inline: false}] ,footer: {text: 'VALORANT LABS [SETTINGS]'}}})
  }
} else if (key == 'news') {
  if(!['true'].includes(value)) {
    if(!value.includes('[')) {
      if(value.includes('#')) {
        if(message.channel.permissionsOf(message.author.id).has('manageGuild')) {
          write(message.guildID, { ...read(message.guildID), ...{ [key]: value }})
          client.createMessage(message.channel.id, {embed: {title: 'VALORANT LABS', description: 'Settings for your guild', color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Prefix', value: db.get(`${message.guildID}.prefix`)}, {name: 'News-Channel', value: db.get(`${message.guildID}.news`)}, {name: 'Language', value: db.get(`${message.guildID}.lang`)}, {name: 'Blacklist', value: db.get(`${message.guildID}.blacklist`)}], footer : {text: 'VALORANT LABS [SETTINGS]'}}})
        } else {
          client.createMessage(message.channel.id, "You don't have permissions to do that")
        }
    } else {
      client.createMessage(message.channel.id, {embed: {title: 'Please selected a channel', description: "You just set the name for the channel, but not tagged the channel \n \n So please use the command in the following syntax: **v?settings news #channel**",  color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [SETTINGS]'}}})
    }
    } else {
      client.createMessage(message.channel.id, {embed: {title: 'Please selected a channel', description: "You just used [], don't use them :D \n \n So please use the command in the following syntax: **v?settings news #channel**",  color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [SETTINGS]'}}})
    }
  } else {
    client.createMessage(message.channel.id, {embed: {title: 'Please selected a channel', description: 'You just set the news to true, but i need a channel for that \n \n So please use the command in the following syntax: **v?settings news #channel**',  color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [SETTINGS]'}}})
  }
} else if(key == 'blacklist') {
  if(value == 'true') {
    if(message.channel.permissionsOf(message.author.id).has('manageGuild')) {
      write(message.guildID, { ...read(message.guildID), ...{ [key]: value }})
      client.createMessage(message.channel.id, {embed: {title: 'VALORANT LABS', description: 'Settings for your guild', color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Prefix', value: db.get(`${message.guildID}.prefix`)}, {name: 'News-Channel', value: db.get(`${message.guildID}.news`)}, {name: 'Language', value: db.get(`${message.guildID}.lang`)}, {name: 'Blacklist', value: db.get(`${message.guildID}.blacklist`)}], footer : {text: 'VALORANT LABS [SETTINGS]'}}})
      client.createMessage(message.channel.id, {embed: {title: 'Blacklist activated', color: 0xff4654, description: 'You can now use the v?blacklist command to set a blacklist for not allowed channels', timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}})
      var databasePath = './database/blacklist.json'
      var databaseFile = JSON.parse(fs.readFileSync(databasePath)); 
      var serverid = message.guildID
      databaseFile[serverid] = {blacklisted: array};
      fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
    } else {
      client.createMessage(message.channel.id, "You don't have permissions to do that")
    }
  } else if (value == 'false') {
    if(message.channel.permissionsOf(message.author.id).has('manageGuild')) {
      write(message.guildID, { ...read(message.guild.id), ...{ [key]: value }})
      client.createMessage(message.channel.id, {embed: {title: 'VALORANT LABS', description: 'Settings for your guild', color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Prefix', value: db.get(`${message.guildID}.prefix`)}, {name: 'News-Channel', value: db.get(`${message.guildID}.news`)}, {name: 'Language', value: db.get(`${message.guildID}.lang`)}, {name: 'Blacklist', value: db.get(`${message.guildID}.blacklist`)}], footer : {text: 'VALORANT LABS [SETTINGS]'}}})
      client.createMessage(message.channel.id, {embed: {title: 'Blacklist deactivated', color: 0xff4654, description: "You can't use the v?blacklist command anymore and all blacklisted channels are open again", timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}})
    } else {
      client.createMessage(message.channel.id, "You don't have permissions to do that")
    }
  } else {
    client.createMessage(message.channel.id, {embed: {title: 'Wrong value', color: 0xff4654, description: 'You can only set the value to **true** or **false**', timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}})
  }
} else {
    if(message.channel.permissionsOf(message.author.id).has('manageGuild')) {
      write(message.guildID, { ...read(message.guildID), ...{ [key]: value }})
      client.createMessage(message.channel.id, {embed: {title: 'VALORANT LABS', description: 'Settings for your guild', color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Prefix', value: db.get(`${message.guildID}.prefix`)}, {name: 'News-Channel', value: db.get(`${message.guildID}.news`)}, {name: 'Language', value: db.get(`${message.guildID}.lang`)}, {name: 'Blacklist', value: db.get(`${message.guildID}.blacklist`)}], footer : {text: 'VALORANT LABS [SETTINGS]'}}})
    } else {
      client.createMessage(message.channel.id, "You don't have permissions to do that")
    }
  }
  } else {
    client.createMessage(message.channel.id, `Can not find Category \`${key}\`.`)
  }
}



  if (args[0]) {
    if (args[1]) {
      // Database write
      set(message, args[0], args.slice(1).join(' '))
    } else {
      // Database read
      client.createMessage(message.channel.id, {embed: {title: 'VALORANT LABS', description: 'Settings for your guild', color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Prefix', value: db.get(`${message.guildID}.prefix`)}, {name: 'News-Channel', value: db.get(`${message.guildID}.news`)}, {name: 'Language', value: db.get(`${message.guildID}.lang`)}, {name: 'Blacklist', value: db.get(`${message.guildID}.blacklist`)}], footer : {text: 'VALORANT LABS [SETTINGS]'}}})
    }
  } else {
    client.createMessage(message.channel.id, {embed: {title: 'VALORANT LABS', description: 'Settings for your guild', color: 0xff4654, timestamp: new Date().toISOString(), fields: [{name: 'Prefix', value: db.get(`${message.guildID}.prefix`)}, {name: 'News-Channel', value: db.get(`${message.guildID}.news`)}, {name: 'Language', value: db.get(`${message.guildID}.lang`)}, {name: 'Blacklist', value: db.get(`${message.guildID}.blacklist`)}], footer : {text: 'VALORANT LABS [SETTINGS]'}}})
  }
}
