import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    switch(interaction.options._subcommand) {
        case "setup": {
            return Utils.patchGuild({interaction, key: "autoroles", value: interaction.options.get("rank").value, additionaldata: interaction.options.get("role").value, guilddata})
        }
        case "get": {
            return Utils.getAutoRoles(interaction, guilddata)
        }
        case "send": {
            if(guilddata.autoroles?.length != 8) {
                return interaction.editReply({
                    embeds: [
                        Utils.embedBuilder({
                            title: Utils.translations[guilddata.lang].autorole.setup_missing_roles_title,
                            desc: Utils.translations[guilddata.lang].autorole.setup_missing_roles_desc,
                            additionalFields: Utils.roles.map(item => {
                                return {
                                    name: Utils.firstletter(item),
                                    value: guilddata.autoroles.some(item1 => item1.name == item) ? Utils.translations[guilddata.lang].autorole.correct : Utils.translations[guilddata.lang].autorole.wrong
                                }
                            }),
                            footer: "VALORANT LABS [MISSING ROLES]"
                        })
                    ]
                })
            } else {
                const uneditableroles = []
                Utils.roles.forEach(item => {
                    const role = interaction.guild.roles.cache.get(guilddata.autoroles.find(item1 => item1.name == item).id)
                    if(!role.editable) uneditableroles.push({name: Utils.firstletter(item), value: `<@&${role.id}>`})
                })
                if(uneditableroles.length) return interaction.editReply({
                    embeds: [
                        Utils.embedBuilder({
                            title: Utils.translations[guilddata.lang].autorole.roles_error_title,
                            desc: Utils.translations[guilddata.lang].autorole.roles_error_desc,
                            additionalFields: uneditableroles,
                            footer: "VALORANT LABS [ROLE PERMISSION ERROR]"
                        })
                    ]
                })
            }
            interaction.channel.send({
                embeds: [
                    Utils.embedBuilder({
                        title: "VALORANT LABS Auto Role System",
                        desc: Utils.translations[guilddata.lang].autorole.send_desc,
                        footer: "VALORANT LABS [AUTOROLE SYSTEM]"
                    })
                ],
                components: [{
                    type: Utils.EnumResolvers.resolveComponentType("ACTION_ROW"),
                    components: [
                        {
                            type: Utils.EnumResolvers.resolveComponentType("BUTTON"),
                            style: Utils.EnumResolvers.resolveButtonStyle("SUCCESS"),
                            customId: "autoroles;generate",
                            label: Utils.translations[guilddata.lang].autorole.add
                        },
                        {
                            type: Utils.EnumResolvers.resolveComponentType("BUTTON"),
                            style: Utils.EnumResolvers.resolveButtonStyle("SECONDARY"),
                            customId: "autoroles;update",
                            label: Utils.translations[guilddata.lang].autorole.update
                        },
                        {
                            type: Utils.EnumResolvers.resolveComponentType("BUTTON"),
                            style: Utils.EnumResolvers.resolveButtonStyle("DANGER"),
                            customId: "autoroles;remove",
                            label: Utils.translations[guilddata.lang].autorole.remove
                        }
                    ]
                }]
            })
            return interaction.editReply({
                embeds: [
                    Utils.embedBuilder({
                        title: Utils.translations[guilddata.lang].autorole.created_title,
                        desc: Utils.translations[guilddata.lang].autorole.created_desc,
                        footer: "VALORANT LABS [AUTOROLE CREATED]"
                    })
                ],
                ephemeral: true
            })
        }
    }
}
export const name = "autoroles"