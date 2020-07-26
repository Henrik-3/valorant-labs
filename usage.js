const apistats = require('../api.json');
module.exports = async (args, client, message, { Canvas, Discord }) => {
    const Embed = new Discord.MessageEmbed()
	  .setColor('#ee3054')
      .setTitle('Usage')
      .addFields(
        { name: 'Servercount', value: apistats.servercount, inline: true},
        { name: 'MemberCount', value: apistats.usercount, inline: true},
        { name: 'All', value: apistats.all, inline: true},
        { name: 'Agent', value: apistats.agent, inline: true},
        { name: 'Botinfo', value: apistats.botinfo, inline: true},
        { name: 'Help', value: apistats.help, inline: true},
        { name: 'Help2', value: apistats.help2, inline: true},
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
      )
	  .setTimestamp()
	  .setFooter('VALORANT LABS');
	   message.channel.send(Embed);
}