const { linkjson, axios } = require("../../functions")
module.exports.execute = async (message, args, guilddata) => {
    var weaponsf = await axios.get(`https://valorant-api.com/v1/weapons`).catch(error => {return error})
    var fields = []
    for(weapons of weaponsf.data.data) {
        fields.push({name: weapons.displayName, value: eval('`' + linkjson[guilddata.lang].weapons + '`')})
    }
    message.reply({embeds: [{
        title: "Weapons", 
        fields: fields.sort(function(a, b) {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            }
            if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return 1;
            }
        }), 
        color: 0xff4654, 
        timestamp: new Date().toISOString(), 
        footer: {text: `VALORANT LABS [WEAPONS]`}
    }]})
}
module.exports.name = "weapons"