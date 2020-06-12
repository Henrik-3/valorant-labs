const fs = require('fs')
module.exports = async (args, client, message, { Canvas, Discord }) => {
    if (!args.length) {
        var linkjson = JSON.parse(fs.readFileSync('link.json'))
        //var linkjson = require('../link.json')
        var author = message.author.id 
        console.log(linkjson)
    const Embed = new Discord.MessageEmbed()
	    .setColor('#ee3054')
	    .setTitle('Your current linked account is ' + linkjson[author].ingamename + '#' + linkjson[author].ingametag)
	    .setTimestamp()
	    .setFooter('VALORANT LABS');
	    message.channel.send(Embed);
    } else {
    var linkPath = './link.json'
    var linkRead = fs.readFileSync(linkPath);
    var linkFile = JSON.parse(linkRead); //ready for use
    var userId = message.author.id //user id here

    linkFile[userId] = {ingamename: "", ingametag: ""}; //if not, create it
    fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));

    const nametest = message.content.split(' ');// All arguments behind the command name with the prefix
    const namefinal = nametest[1].split('#')
    const name = namefinal[0];
    const tag = namefinal[1];

    linkFile[userId] = {ingamename: name, ingametag: tag};
    fs.writeFileSync(linkPath, JSON.stringify(linkFile, null, 2));

    const Embed = new Discord.MessageEmbed()
	    .setColor('#ee3054')
	    .setTitle('User succesfully linked with ' + name + '#' + tag)
	    .setTimestamp()
	    .setFooter('VALORANT LABS');
	    message.channel.send(Embed);
    }
}