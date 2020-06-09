module.exports = async (args, client, message, { Canvas, Discord }) => {
 const Embed = new Discord.MessageEmbed()
	  .setColor('#ee3054')
	  .setTitle('Vote for us on top.gg')
	  .setURL('https://top.gg/bot/702201518329430117/vote')
	  .setTimestamp()
	  .setFooter('VALORANT LABS');
	   message.channel.send(Embed);
}
