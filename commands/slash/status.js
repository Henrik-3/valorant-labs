import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const embeds = []
    const status = await Utils.axios.get(Utils.clusters[interaction.options.get("region").value].status).catch(error => {return error})
    const maintainance = status.data.data.maintenances
    const incidents = status.data.data.incidents
    if(!maintainance.length && !incidents.length) return interaction.editReply({embeds: [{title: Utils.translations[guilddata.lang].status.noerrors, color: 0xff4654, timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [STATUS NOERROR]', icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}}]})
    Utils.moment.locale(Utils.translations[guilddata.lang].moment)
    for(let i = 0; maintainance.length > i; i++) {
        embeds.push({
            title: maintainance[i].titles.find(item => item.locale == Utils.translations[guilddata.lang].locale) ? maintainance[i].titles.find(item => item.locale == Utils.translations[guilddata.lang].locale).content : maintainance[i].titles.find(item => item.locale == "en_US").content,
            description: maintainance[i].updates[0].translations.find(item => item.locale == Utils.translations[guilddata.lang].locale) ? maintainance[i].updates[0].translations.find(item => item.locale == Utils.translations[guilddata.lang].locale).content : maintainance[i].updates[0].translations.find(item => item.locale == "en_US").content,
            color: 0xff4654,
            fields: [
                {name: Utils.translations[guilddata.lang].status.postedat, value: Utils.moment(maintainance[i].created_at).format("LLLL"), inline: true},
                {name: Utils.translations[guilddata.lang].status.platforms, value: maintainance[i].platforms.join(" | "), inline: true},
                {name: Utils.translations[guilddata.lang].status.type, value: maintainance[i].incident_severity ? maintainance[i].incident_severity : "N.A", inline: true}
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'VALORANT LABS [STATUS MAINTENANCE]',
                icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
            }
        })
    }
    for(let i = 0; incidents.length > i; i++) {
        embeds.push({
            title: incidents[i].titles.find(item => item.locale == Utils.translations[guilddata.lang].locale) ? incidents[i].titles.find(item => item.locale == Utils.translations[guilddata.lang].locale).content : incidents[i].titles.find(item => item.locale == "en_US").content,
            description: incidents[i].updates[0].translations.find(item => item.locale == Utils.translations[guilddata.lang].locale) ? incidents[i].updates[0].translations.find(item => item.locale == Utils.translations[guilddata.lang].locale).content : incidents[i].updates[0].translations.find(item => item.locale == "en_US").content,
            color: 0xff4654,
            fields: [
                {name: Utils.translations[guilddata.lang].status.postedat, value: Utils.moment(incidents[i].created_at).format("LLLL"), inline: true},
                {name: Utils.translations[guilddata.lang].status.platforms, value: incidents[i].platforms.join(" | "), inline: true},
                {name: Utils.translations[guilddata.lang].status.type, value: incidents[i].incident_severity ? incidents[i].incident_severity : "N.A", inline: true}
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'VALORANT LABS [STATUS INCIDENT]',
                icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"
            }
        })
    }
    return interaction.editReply({embeds: embeds})
}
export const name = "status"