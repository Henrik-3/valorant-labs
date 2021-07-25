const { linkjson } = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
    message.reply({embeds: [{
        color: 0xff4654,
        title: linkjson[guilddata.lang].votetitle,
        url: 'https://top.gg/bot/702201518329430117/vote',
        timestamp: new Date().toISOString(),
        footer: {
          text: 'VALORANT LABS [VOTES]'
        }
    }]})
}

module.exports.name = "vote"