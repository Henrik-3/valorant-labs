const { linkjson, websites, capitalize, axios } = require("../../functions.js")
module.exports.execute = async function(message, args, guilddata) {
    var website = await axios.get(websites[guilddata.lang].patch).catch(error => {return error})
    message.reply({embeds: [{
        title: website.data.data[0].title,
        url: website.data.data[0].url,
        image: {
            url: website.data.data[0].banner_url
        },
        color: 0xff4654,
        timestamp: new Date().toISOString(), 
        footer: {text: `VALORANT LABS [PATCH NOTES]`}
    }]})
}
module.exports.name = "patch"