const apistats = require('../database/api.json');
module.exports = async (args, client, message, { Canvas, Discord }) => {
    client.createMessage(message.channel.id, {embed: {
        color: 0xee3054,
        title: 'Usage since 18.07.2020',
        timestamp: new Date().toISOString(),
        fields: [
        { name: 'Servercount', value: apistats.servercount, inline: true},
        { name: 'MemberCount', value: apistats.usercount, inline: true},
        { name: 'All', value: apistats.all, inline: true},
        { name: 'Agent', value: apistats.agent, inline: true},
        { name: 'Blacklist', value: apistats.blacklist, inline: true},
        { name: 'Botinfo', value: apistats.botinfo, inline: true},
        { name: 'Game', value: apistats.game, inline: true},
        { name: 'Help', value: apistats.help, inline: true},
        { name: 'Help2', value: apistats.help2, inline: true},
        { name: 'Help3', value: apistats.help3, inline: true},
        { name: 'Link', value: apistats.link, inline: true},
        { name: 'Map', value: apistats.map, inline: true},
        { name: 'Patch', value: apistats.patch, inline: true},
        { name: 'Ranked', value: apistats.ranked, inline: true},
        { name: 'Settings', value: apistats.settings, inline: true},
        { name: 'Stats', value: apistats.stats, inline: true},
        { name: 'Status', value: apistats.status, inline: true},
        { name: 'Vote', value: apistats.vote, inline: true},
        { name: 'Weapon', value: apistats.weapon, inline: true},
        { name: 'Weapons', value: apistats.weapons, inline: true}
        ],
        footer: {
            text: 'VALORANT LABS'
        }
    }})
}