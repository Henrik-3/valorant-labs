import {default as Utils} from "../../methods.js"
export async function execute(data) {
    const sysdata = await Utils.sysinfo.get({mem: "total, free, used", osInfo: "distro", currentLoad: "currentLoad"})
    return data.interaction.editReply({
        embeds: [{
            title: Utils.translations[data.guilddata.lang].botinfo.title,
            author: {
                name: data.interaction.client.user.tag,
                iconURL: data.interaction.client.user.avatarURL()
            },
            fields: [
                {name: "Creator", value: "Henrik3#1451 | <@346345363990380546>", inline: false},
                {name: "Server", value: String((await data.interaction.client.shard.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0)), inline: false},
                {name: "CPU", value: `AMD Epyc 7702 (4C@3GHz) | Load: ${sysdata.currentLoad.currentLoad.toFixed(2)}%`, inline: false},
                {name: "Memory", value: `Total: ${Utils.pretty(sysdata.mem.total, {locale: 'en'})} | Free: ${Utils.pretty(sysdata.mem.free, {locale: 'en'})} | Used: ${Utils.pretty(sysdata.mem.used, {locale: 'en'})}`, inline: false},
                {name: "OS", value: sysdata.osInfo.distro, inline: false}
            ],
            color: 0xff4654,
        }]
    })
}
export const name = "botinfo"
