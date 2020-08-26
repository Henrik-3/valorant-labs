const db = require("../db.js")
const fs = require('fs')

module.exports = async (args, client, message, { Canvas, Discord }) => {
    const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
    const substrate = message.content.toLowerCase().substr(prefix.length + 9)
    const args2 = substrate.trim().split(' ');
    const key = args2[0]
    const value = args2[1]
    console.log(db.get(`${message.guildID}.blacklist`))
    if(db.get(`${message.guildID}.blacklist`) == true) {
        if(message.channel.permissionsOf(message.author.id).has('manageGuild')) {
            if(key == 'add') {
                var databasePath = './database/blacklist.json'
                var databaseFile = JSON.parse(fs.readFileSync(databasePath)); 
                var serverid = message.guildID
                if(databaseFile[serverid]) {
                    var array = databaseFile[serverid].blacklisted
                    array.push(value)
                    databaseFile[serverid] = {blacklisted: array}; 
                    fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    client.createMessage(message.channel.id, {embed: {title: 'Added Channel to List', color: 0xff4654, timestamp: new Date().toISOString(), description: 'Blacklisted channels now: \n' + databaseFile[serverid].blacklisted, footer: {text: 'VALORANT LABS [SETTINGS]'}}}).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 10000)
                })
                } else {
                    databaseFile[serverid] = {blacklisted: []};
                    fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    var array = databaseFile[serverid].blacklisted
                    array.push(value)
                    databaseFile[serverid] = {blacklisted: array}; 
                    fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    client.createMessage(message.channel.id, {embed: {title: 'Added Channel to List', color: 0xff4654, timestamp: new Date().toISOString(), description: 'Blacklisted channels now: \n' + databaseFile[serverid].blacklisted, footer: {text: 'VALORANT LABS [SETTINGS]'}}}).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 10000)
                })
            }
            } else if (key == 'remove') {
                var databasePath = './database/blacklist.json'
                var databaseFile = JSON.parse(fs.readFileSync(databasePath));
                var serverid = message.guildID
                var array = databaseFile[serverid].blacklisted
                console.log(array)
                if(array.includes(value)) {
                    var indexnumber = array.findIndex(element => element == value)
                    array.splice(indexnumber, 1)
                    databaseFile[serverid] = {blacklisted: array}; 
                    fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    client.createMessage(message.channel.id, {embed: {title: 'Removed Channel from list', color: 0xff4654, timestamp: new Date().toISOString(), description: 'Blacklisted channels now: \n' + databaseFile[serverid].blacklisted, footer: {text: 'VALORANT LABS [SETTINGS]'}}}).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                            message.delete();
                        }, 10000)
                    })
                } else {
                    client.createMessage(message.channel.id, {embed: {title: 'This Channel is not blacklisted and can not be removed', color: 0xff4654, timestamp: new Date().toISOString(), description: 'Blacklisted channels now: \n' + databaseFile[serverid].blacklisted, footer: {text: 'VALORANT LABS [SETTINGS]'}}}).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                            message.delete();
                        }, 10000)
                    })
                }
            } else {
            var databaseFile = JSON.parse(fs.readFileSync('./database/blacklist.json'));
            var serverid = message.guildID
            client.createMessage(message.channel.id, {embed: {title: 'No Arguments', color: 0xff4654, timestamp: new Date().toISOString(), description: 'Please use one of the following commands to set the blacklist \n \n v?blacklist add #channel \n v?blacklist remove #channel \n\n Here are your blacklisted channels: \n' + databaseFile[serverid].blacklisted, footer: {text: 'VALORANT LABS [SETTINGS]'}}}).then(msg => {
                setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 10000)
            })
            }
        } else {
            client.createMessage(message.channel.id, {embed: {title: 'No permission', color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [SETTINGS]'}}}).then(msg => {
                setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 10000)
            })
        }
    } else {
        client.createMessage(message.channel.id, {embed: {title: 'Blacklist is not active', color: 0xff4654, timestamp: new Date().toISOString(), description: 'Enable the blacklist with: v?settings blacklist true', footer: {text: 'VALORANT LABS [SETTINGS]'}}}).then(msg => {
            setTimeout(() => {
                msg.delete();
                message.delete();
            }, 10000)
        })
    }
}