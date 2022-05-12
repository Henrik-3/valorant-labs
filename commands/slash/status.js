import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const embeds = []
    const status = await Utils.axios.get(Utils.clusters[interaction.options.get("region").value].status).catch(error => {return error})
    const maintainance = status.data.data.maintenances
    const incidents = status.data.data.incidents
    if(!maintainance.length && !incidents.length) return interaction.editReply({embeds: [Utils.embedBuilder({title: Utils.translations[guilddata.lang].status.noerrors, footer: 'VALORANT LABS [STATUS NOERROR]'})]})
    Utils.moment.locale(Utils.translations[guilddata.lang].moment)
    for(let i = 0; maintainance.length > i; i++) {
        embeds.push(Utils.embedBuilder({
            title: maintainance[i].titles.find(item => item.locale == Utils.translations[guilddata.lang].locale) ? maintainance[i].titles.find(item => item.locale == Utils.translations[guilddata.lang].locale).content : maintainance[i].titles.find(item => item.locale == "en_US").content,
            desc: maintainance[i].updates[0].translations.find(item => item.locale == Utils.translations[guilddata.lang].locale) ? maintainance[i].updates[0].translations.find(item => item.locale == Utils.translations[guilddata.lang].locale).content : maintainance[i].updates[0].translations.find(item => item.locale == "en_US").content,
            additionalFields: [
                {name: Utils.translations[guilddata.lang].status.postedat, value: Utils.moment(maintainance[i].created_at).format("LLLL"), inline: true},
                {name: Utils.translations[guilddata.lang].status.platforms, value: maintainance[i].platforms.join(" | "), inline: true},
                {name: Utils.translations[guilddata.lang].status.type, value: maintainance[i].incident_severity ? maintainance[i].incident_severity : "N.A", inline: true}
            ],
            footer: 'VALORANT LABS [STATUS MAINTENANCE]'
        }))
    }
    for(let i = 0; incidents.length > i; i++) {
        embeds.push(Utils.embedBuilder({
            title: incidents[i].titles.find(item => item.locale == Utils.translations[guilddata.lang].locale) ? incidents[i].titles.find(item => item.locale == Utils.translations[guilddata.lang].locale).content : incidents[i].titles.find(item => item.locale == "en_US").content,
            desc: incidents[i].updates[0].translations.find(item => item.locale == Utils.translations[guilddata.lang].locale) ? incidents[i].updates[0].translations.find(item => item.locale == Utils.translations[guilddata.lang].locale).content : incidents[i].updates[0].translations.find(item => item.locale == "en_US").content,
            additionalFields: [
                {name: Utils.translations[guilddata.lang].status.postedat, value: Utils.moment(incidents[i].created_at).format("LLLL"), inline: true},
                {name: Utils.translations[guilddata.lang].status.platforms, value: incidents[i].platforms.join(" | "), inline: true},
                {name: Utils.translations[guilddata.lang].status.type, value: incidents[i].incident_severity ? incidents[i].incident_severity : "N.A", inline: true}
            ],
            footer: 'VALORANT LABS [STATUS INCIDENT]',
        }))
    }
    return interaction.editReply({embeds: embeds, components: [{type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"), components: [{type: Utils.EnumResolvers.resolveComponentType("BUTTON"), style: Utils.EnumResolvers.resolveButtonStyle("LINK"), url: Utils.clusters[interaction.options.get("region").value].page, label: Utils.EnumResolvers.resolveButtonStyle("LINK")}]}]})
}
export const name = "status"