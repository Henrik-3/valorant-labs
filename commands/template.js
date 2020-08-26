const db = require("../db.js")
const fs = require('fs')

module.exports = async (args, client, message, { Canvas, Discord }) => {
    
    client.createMessage(message.channel.id, {embed: {
        color: 0xff0000,
        title: 'Temporary disabled',
        description: 'The reason for this is big performance issues with this command, it will be activated when we found a good solution for it',
        fields: [
            { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}
        ],
        timestamp: new Date().toISOString(),
        footer: { 
            text: 'VALORANT LABS [DISABLED]'
        }
    }})
    
    /*const prefix = db.get(`${message.guild.id}.prefix`) || 'v?'
    const substrate = message.content.toLowerCase().substr(prefix.length + 9)
    const args2 = substrate.trim().split(' ');
    const key = args2[0]
    const value = args2[1]
    var lang = db.get(`${message.guild.id}.lang`) || 'en-us'
    const canvasstats = Canvas.createCanvas(4100, 2160) //set image size
    const ctx = canvasstats.getContext('2d') //text preparation

    if(message.member.hasPermission('MANAGE_GUILD')) {
        var databasePath = './templates.json'
        var databaseFile = JSON.parse(fs.readFileSync(databasePath)); 
        var serverid = message.guild.id
        if(databaseFile[serverid]) {
           //
        } else {
        databaseFile[serverid] = {messageid_agents: '', messageid_rank: ''}; 
        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
        }
        var msgid;
        if (key == 'create') {
            if(value == 'agents') {
                if(lang == 'de') {
                    const background = await Canvas.loadImage("commands/images/templates/agents/Agents-Deutsch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  } else if(lang == 'en-us' || lang == 'en-gb') {
                    const background = await Canvas.loadImage("commands/images/templates/agents/Agents-Englisch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  } else if(lang == 'fr') {
                    const background = await Canvas.loadImage("commands/images/templates/agents/Agents-Französisch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  } else if(lang == 'pt-br') {
                    const background = await Canvas.loadImage("commands/images/templates/agents/Agents-Portugisisch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  } else if(lang == 'jp') {
                    const background = await Canvas.loadImage("commands/images/templates/agents/Agents-Japanisch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  }
                  const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-labs-agent-template.png" ); //final result
                message.channel.send(attachment).then(msg => {
                    msgid = msg.id
                    msg.guild.roles.create({
                        data: {
                            name: 'Breach'
                        }
                    }).then(role => {
                        databaseFile[serverid].breachroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Brimstone'
                        }
                    }).then(role => {
                        databaseFile[serverid].brimstoneroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Cypher'
                        }
                    }).then(role => {
                        databaseFile[serverid].cypherroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Jett'
                        }
                    }).then(role => {
                        databaseFile[serverid].jettroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Killjoy'
                        }
                    }).then(role => {
                        databaseFile[serverid].killjoyroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Omen'
                        }
                    }).then(role => {
                        databaseFile[serverid].omenroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Phoenix'
                        }
                    }).then(role => {
                        databaseFile[serverid].pheonixroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Raze'
                        }
                    }).then(role => {
                        databaseFile[serverid].razeroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Reyna'
                        }
                    }).then(role => {
                        databaseFile[serverid].reynaroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Sage'
                        }
                    }).then(role => {
                        databaseFile[serverid].sageroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Sova'
                        }
                    }).then(role => {
                        databaseFile[serverid].sovaroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Viper'
                        }
                    }).then(role => {
                        databaseFile[serverid].viperroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    databaseFile[serverid].messageid_agents = msg.id
                    fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    setTimeout(() => {
                        msg.react('724656538815430716') //Breach
                        msg.react('724656540329443628') //Brimstone
                        msg.react('724656540006481933') //Cypher
                        msg.react('724656541608968202') //Jett
                        msg.react('740642710448373780') //Killjoy
                        msg.react('724656541671620691') //Omen
                        msg.react('724656541273292842') //Phoenix
                        msg.react('724656541646716998') //Raze
                        msg.react('724656541873209354') //Reyna
                        msg.react('724656541638066236') //Sage
                        msg.react('724656541294395414') //Sova
                        msg.react('724656541646454795') //Viper
                    }, 5000)
                })
            } else if(value == 'rank') {
                var databasePath = './templates.json'
                var databaseFile = JSON.parse(fs.readFileSync(databasePath)); 
                var serverid = message.guild.id
                if(lang == 'de') {
                    const background = await Canvas.loadImage("commands/images/templates/rank/Rank-Deutsch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  } else if(lang == 'en') {
                    const background = await Canvas.loadImage("commands/images/templates/rank/Rank-Englisch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  } else if(lang == 'fr') {
                    const background = await Canvas.loadImage("commands/images/templates/rank/Rank-Französisch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  } else if(lang == 'pt-br') {
                    const background = await Canvas.loadImage("commands/images/templates/rank/Rank-Portugisisch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  } else if(lang == 'jp') {
                    const background = await Canvas.loadImage("commands/images/templates/rank/Rank-Japanisch.png"); //load background from url
                    ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height); // displays background
                  }
                  const attachment = new Discord.MessageAttachment(canvasstats.toBuffer(),"valorant-labs-rank-template.png" ); //final result
                message.channel.send(attachment).then(msg => {
                    msgid = msg.id
                    msg.guild.roles.create({
                        data: {
                            name: 'Iron',
                            color: '#888888'
                        }
                    }).then(role => {
                        databaseFile[serverid].ironroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Bronze',
                            color: '#744e14'
                        }
                    }).then(role => {
                        databaseFile[serverid].bronzeroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Silver',
                            color: '#ececec'
                        }
                    }).then(role => {
                        databaseFile[serverid].silverroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Gold',
                            color: '#df9824'
                        }
                    }).then(role => {
                        databaseFile[serverid].goldroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Platinum',
                            color: '#df9824'
                        }
                    }).then(role => {
                        databaseFile[serverid].platinroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Diamond',
                            color: '#be81ec'
                        }
                    }).then(role => {
                        databaseFile[serverid].diamondroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Immortal',
                            color: '#d14f76'
                        }
                    }).then(role => {
                        databaseFile[serverid].immortalroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    msg.guild.roles.create({
                        data: {
                            name: 'Radiant',
                            color: '#fce7a5'
                        }
                    }).then(role => {
                        databaseFile[serverid].radiantroleid = role.id
                        fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    })
                    databaseFile[serverid].messageid_rank = msg.id
                    fs.writeFileSync(databasePath, JSON.stringify(databaseFile, null, 2));
                    setTimeout(() => {
                        msg.react('724705380076355665') //Eisen
                        msg.react('724705406412390421') //Bronze
                        msg.react('724705428503789680') //Silber
                        msg.react('724705444152475659') //Gold
                        msg.react('724705453229211649') //Platin
                        msg.react('724705465103155221') //Diamond
                        msg.react('724705475672670278') //Immortal
                        msg.react('724705484933824624') //Radiant
                    }, 5000)
                })
            } else {
            const Embed = new Discord.MessageEmbed()
            .setTitle('Command does not exist')
            .setDescription('Do v?templates create [rank/agents]')
            .setTimestamp()
            .setFooter('VALORANT LABS [SETTINGS]', 'http://valorantlabs.xyz:81/image3.png')
            message.channel.send(Embed).then(msg => {
                msg.delete({ timeout: 15000, reason: 'Clean Chat'});
                message.delete({ timeout: 15000, reason: 'Clean Chat'});
            })
        }
        } else {
            const Embed = new Discord.MessageEmbed()
            .setTitle('Command does not exist')
            .setDescription('Do v?templates create [rank/agents]')
            .setTimestamp()
            .setFooter('VALORANT LABS [SETTINGS]', 'http://valorantlabs.xyz:81/image3.png')
            message.channel.send(Embed).then(msg => {
                msg.delete({ timeout: 15000, reason: 'Clean Chat'});
                message.delete({ timeout: 15000, reason: 'Clean Chat'});
            })
        }
    } else {
        const Embed = new Discord.MessageEmbed()
            .setColor('#ff4654')
            .setTitle('No permission')
            .setTimestamp()
            .setFooter('VALORANT LABS [SETTINGS]', 'http://valorantlabs.xyz:81/image3.png')
            message.channel.send(Embed).then(msg => {
                msg.delete({ timeout: 15000, reason: 'Clean Chat'});
                message.delete({ timeout: 15000, reason: 'Clean Chat'});
            })
    }*/
}