const {regions, linkjson, axios, websites, moment, weapons} = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
    if(args[0] == undefined) return message.reply({embeds: [{title: linkjson[guilddata.lang].weaponinvalid, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [WEAPON]`}}]})
    var weaponsf = await axios.get(`https://valorant-api.com/v1/weapons?language=${weapons[guilddata.lang].query}`).catch(error => {return error})
    var cweapon = weaponsf.data.data.find(item => item.displayName.toLowerCase() == args[0].toLowerCase())
    if(cweapon == undefined) return message.reply({embeds: [{title: linkjson[guilddata.lang].weaponinvalid, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [WEAPON]`}}]})
    var fields = [
        {name: linkjson[guilddata.lang].weaponcosts, value: String(cweapon.shopData.cost)},
        {name: linkjson[guilddata.lang].weaponmagazinsize, value: String(cweapon.weaponStats.magazineSize)},
        {name: linkjson[guilddata.lang].weaponpenetration, value: weapons[cweapon.weaponStats.wallPenetration]},
        {name: linkjson[guilddata.lang].weaponfirerate, value: String(cweapon.weaponStats.fireRate)},
        {name: linkjson[guilddata.lang].weaponfireratezoom, value: cweapon.weaponStats.adsStats != undefined ? String(cweapon.weaponStats.adsStats.fireRate) : "N.A"},
        {name: linkjson[guilddata.lang].weaponzoom, value: cweapon.weaponStats.adsStats != undefined ? String(cweapon.weaponStats.adsStats.zoomMultiplier) : "N.A"},
    ]
    for(range of cweapon.weaponStats.damageRanges) {
        fields.push({name: eval('`'+ String(linkjson[guilddata.lang].weaponrangemeters) +'`'), value: eval('`'+ String(linkjson[guilddata.lang].weaponrangedamage) +'`')})
    }
    message.reply({embeds: [{
        title: eval('`'+ linkjson[guilddata.lang].weapontitle +'`'), 
        thumbnail: {
            url: cweapon.displayIcon
        },
        fields: fields, 
        color: 0xff4654, 
        timestamp: new Date().toISOString(), 
        footer: {text: `VALORANT LABS [WEAPON]`}
    }]})
}
module.exports.name = "weapon"