import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const request = await Utils.axios.get(`https://valorant-api.com/v1/agents?language=${Utils.translations[guilddata.lang].valorant_api_lang}`).catch(error => {return error})
    const cagent = request.data.data.find(item => item.displayName.toLowerCase() == interaction.options.get("agent").value && item.role != null)
    if(cagent == undefined) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].agent.agentunknown_title, desc: Utils.translations[guilddata.lang].agent.agentunknown_desc, footer: `VALORANT LABS [AGENT ERROR]`})], components: [{type: "ACTION_ROW", components: [{type: "BUTTON", label: Utils.translations[guilddata.lang].support, style: "LINK", url: "https://discord.gg/Zr5eF5D"}]}]})
    const a1 = cagent.abilities.find(item => item.slot == "Ability1")
    const a2 = cagent.abilities.find(item => item.slot == "Ability2")
    const a3 = cagent.abilities.find(item => item.slot == "Grenade")
    const ult = cagent.abilities.find(item => item.slot == "Ultimate")
    return interaction.editReply({
        embeds: [Utils.embedBuilder({
            title: cagent.displayName,
            thumbnail: cagent.fullPortrait,
            desc: cagent.description,
            additionalFields: [
                {name: Utils.translations[guilddata.lang].agent.agentrole, value: `${Utils.agents.find(item => item.name == cagent.displayName.toLowerCase()).discord_id} ${cagent.role.displayName}`},
                {name: `Q: ${a1.displayName}`, value: a1.description},
                {name: `E: ${a2.displayName}`, value: a2.description},
                {name: `C: ${a3.displayName}`, value: a3.description},
                {name: `X: ${ult.displayName}`, value: ult.description}
            ],
            footer: `VALORANT LABS [AGENT]`
        })]
    })
}
export const name = "agent"