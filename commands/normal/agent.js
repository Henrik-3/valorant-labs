const { agents, linkjson, fs, MessageAttachment, weapons, axios } = require("../../functions.js")
module.exports.execute = async (message, args, guilddata) => {
        if(!args.length) return message.reply({embeds: [{title: linkjson[guilddata.lang].agentunknown, color: 0xff4654, timestamp: new Date().toISOString(), footer: { text: 'VALORANT LABS [AGENT ERROR]'}}]})
        var agentsf = await axios.get(`https://valorant-api.com/v1/agents?language=${weapons[guilddata.lang].query}`).catch(error => {return error})
        var cagent = agentsf.data.data.find(item => item.displayName.toLowerCase() == args[0].toLowerCase() && item.role != null)
        if(cagent == undefined) return message.reply({embeds: [{title: linkjson[guilddata.lang].agentunknown, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [AGENT ERROR]`}}]})
        var a1 = cagent.abilities.find(item => item.slot == "Ability1")
        var a2 = cagent.abilities.find(item => item.slot == "Ability2")
        var a3 = cagent.abilities.find(item => item.slot == "Grenade")
        var ult = cagent.abilities.find(item => item.slot == "Ultimate")
        console.log({
                title: eval('`'+ linkjson[guilddata.lang].agenttitle +'`'), 
                thumbnail: {
                    url: cagent.fullPortrait
                },
                desciption: cagent.description,
                fields: [
                        {name: linkjson[guilddata.lang].agentrole, value: `${agents[cagent.displayName.toLowerCase()].role.discordid} ${cagent.role.displayName}`},
                        {name: `Q: ${a1.displayName}`, value: a1.description},
                        {name: `E: ${a2.displayName}`, value: a2.description},
                        {name: `C: ${a3.displayName}`, value: a3.description},
                        {name: `X: ${ult.displayName}`, value: ult.description}
                ], 
                color: 0xff4654, 
                timestamp: new Date().toISOString(), 
                footer: {text: `VALORANT LABS [WEAPON]`}
        })
        message.reply({embeds: [{
                title: eval('`'+ linkjson[guilddata.lang].agenttitle +'`'), 
                thumbnail: {
                    url: cagent.fullPortrait
                },
                description: cagent.description,
                fields: [
                        {name: linkjson[guilddata.lang].agentrole, value: `${agents[cagent.displayName.toLowerCase()].role.discordid} ${cagent.role.displayName}`},
                        {name: `Q: ${a1.displayName}`, value: a1.description},
                        {name: `E: ${a2.displayName}`, value: a2.description},
                        {name: `C: ${a3.displayName}`, value: a3.description},
                        {name: `X: ${ult.displayName}`, value: ult.description}
                ], 
                color: 0xff4654, 
                timestamp: new Date().toISOString(), 
                footer: {text: `VALORANT LABS [AGENT]`}
        }]})
}
module.exports.name = "agent"
