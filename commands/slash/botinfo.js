import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const sysdata = await Utils.sysinfo.get({mem: "total, free, used", osInfo: "distro", currentLoad: "currentLoad"})
    return interaction.editReply({
        embeds: [Utils.embedBuilder({
            title: Utils.translations[guilddata.lang].botinfo.title,
            user: interaction.client.user.tag,
            additionalFields: [
                {name: "Creator", value: "Henrik3#1451 | <@346345363990380546>", inline: false},
                {name: "Server", value: String((await interaction.client.shard.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0)), inline: false},
                {name: "CPU", value: `AMD Epyc 7702 (4C@3GHz) | Load: ${sysdata.currentLoad.currentLoad.toFixed(2)}%`, inline: false},
                {name: "Memory", value: `Total: ${Utils.pretty(sysdata.mem.total, {locale: 'en'})} | Free: ${Utils.pretty(sysdata.mem.free, {locale: 'en'})} | Used: ${Utils.pretty(sysdata.mem.used, {locale: 'en'})}`, inline: false},
                {name: "OS", value: sysdata.osInfo.distro, inline: false}
            ],
            footer: 'VALORANT LABS [BOTINFO]',
        })]
    })
}
export const name = "botinfo"
