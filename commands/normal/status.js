const {regions, linkjson, axios, websites, moment} = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
    if(!args.length) return message.reply({embeds: [{title: linkjson[guilddata.lang].statusinvalidregion, description: linkjson[guilddata.lang].statusoverview, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [STATUS]`}}]})
    if(regions[args[0]] == undefined) return message.reply({embeds: [{title: linkjson[guilddata.lang].statusinvalidregion, description: linkjson[guilddata.lang].statusinvalidregion, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [STATUS]`}}]})
    var shard_status = await axios.get(regions[args[0]].patchurl).catch(error => {return error})
    var maintenance = shard_status.data.data.maintenances[0]
    var incidents = shard_status.data.data.incidents[0]
    if(!shard_status.data.data.incidents.length && !shard_status.data.data.maintenances.length) return message.reply({embeds: [{title: linkjson[guilddata.lang].statusokay, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [STATUS]`}}]})
    if(maintenance != null) {
        moment.locale(websites[guilddata.lang].moment)
        message.reply({embeds: [{
            color: 0xff4654,
            description: maintenance.updates[0].translations.find(c => c.locale == websites[guilddata.lang].locale).content != undefined ? maintenance.updates[0].translations.find(c => c.locale == websites[guilddata.lang].locale).content : maintenance.updates[0].translations.find(c => c.locale == 'en_US').content,
            title: maintenance.titles.find(c => c.locale == websites[guilddata.lang].locale).content != undefined ? maintenance.titles.find(c => c.locale == websites[guilddata.lang].locale).content : maintenance.titles.find(c => c.locale == 'en_US').content,
            fields: [
                { name: linkjson[guilddata.lang].statuspostedat, value: moment(maintenance.created_at).format('LLLL'), inline: true},
                { name: linkjson[guilddata.lang].statusplatforms, value: maintenance.platforms[0], inline: true},
                { name: linkjson[guilddata.lang].statusissuetype, value: maintenance.incident_severity, inline: true},
            ], 
            timestamp: new Date().toISOString(),
            footer: {
                text: "VALORANT LABS [STATUS MAINTENANCE]"
            }
        }]})
    }
    if(incidents != null) {
        moment.locale(websites[guilddata.lang].moment)
        message.reply({embeds: [{
            color: 0xff4654,
            description: incidents.updates[0].translations.find(c => c.locale == websites[guilddata.lang].locale).content != undefined ? incidents.updates[0].translations.find(c => c.locale == websites[guilddata.lang].locale).content : incidents.updates[0].translations.find(c => c.locale == 'en_US').content,
            title: incidents.titles.find(c => c.locale == websites[guilddata.lang].locale).content != undefined ? incidents.titles.find(c => c.locale == websites[guilddata.lang].locale).content : incidents.titles.find(c => c.locale == 'en_US').content,
            fields: [
                { name: linkjson[guilddata.lang].statuspostedat, value: moment(incidents.created_at).format('LLLL'), inline: true},
                { name: linkjson[guilddata.lang].statusplatforms, value: incidents.platforms[0], inline: true},
                { name: linkjson[guilddata.lang].statusissuetype, value: incidents.incident_severity, inline: true},
            ], 
            timestamp: new Date().toISOString(),
            footer: {
                text: "VALORANT LABS [STATUS incidents]"
            }
        }]})
    }
}

module.exports.name = "status"