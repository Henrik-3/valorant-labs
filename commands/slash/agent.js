import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const request = await Utils.axios.get(`https://valorant-api.com/v1/agents?language=${Utils.translations[guilddata.lang].valorant_api_lang}`).catch(error => {return error})
    const cagent = request.data.data.find(item => item.displayName.toLowerCase() == interaction.options.get("agent").value && item.role != null)
    if(cagent == undefined) return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].agent.agentunknown_title, description: Utils.translations[guilddata.lang].agent.agentunknown_desc, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: `VALORANT LABS [AGENT ERROR]`, icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: Utils.translations[guilddata.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    const a1 = cagent.abilities.find(item => item.slot == "Ability1")
    const a2 = cagent.abilities.find(item => item.slot == "Ability2")
    const a3 = cagent.abilities.find(item => item.slot == "Grenade")
    const ult = cagent.abilities.find(item => item.slot == "Ultimate")
    return interaction.editReply({
        embeds: [{
            title: cagent.displayName,
            thumbnail: {
                url: cagent.fullPortrait
            },
            description: cagent.description,
            fields: [
                {name: Utils.translations[guilddata.lang].agent.agentrole, value: `${Utils.agents.find(item => item.name == cagent.displayName.toLowerCase()).discord_id} ${cagent.role.displayName}`},
                {name: `Q: ${a1.displayName}`, value: a1.description},
                {name: `E: ${a2.displayName}`, value: a2.description},
                {name: `C: ${a3.displayName}`, value: a3.description},
                {name: `X: ${ult.displayName}`, value: ult.description}
            ],
            color: 0xff4654,
            timestamp: new Date().toISOString(),
            footer: {text: `VALORANT LABS [AGENT]`, icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}
        }]
    })
}
export const name = "agent"