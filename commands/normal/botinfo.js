const { system, pretty } = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
    var systemdata = await system.get({mem: "total, free, used", osInfo: "distro", currentLoad: "currentLoad"})
    message.reply({embeds: [{
        title: "Bot Information for VALORANT LABS",
        color: 0xff4654,
        fields: [
            {name: "Creator", value: "Henrik3#1451 | <@346345363990380546>", inline: false},
            {name: "Server", value: String(message.client.guilds.cache.size), inline: false},
            {name: "CPU", value: `AMD Epyc 7371 (4C@2.7GhZ) | Load: ${systemdata.currentLoad.currentLoad.toFixed(2)}`, inline: false},
            {name: "Memory", value: `Total: ${pretty(systemdata.mem.total, {locale: 'de'})} | Free: ${pretty(systemdata.mem.free, {locale: 'de'})} | Used: ${pretty(systemdata.mem.used, {locale: 'de'})}`, inline: false},
            {name: "OS", value: systemdata.osInfo.distro, inline: false}
        ],
        footer: {
            text: "VALORANT LABS [BOTINFO]"
        }
    }]})
}
module.exports.name = "botinfo"