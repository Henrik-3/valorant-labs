import {sysinfo, embedBuilder, getTranslations, pretty} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
    const translations = getTranslations();
    const sysdata = await sysinfo.get({mem: '*', osInfo: '*', currentLoad: 'currentLoad'});
    console.log(sysdata);
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].botinfo.title,
                user: interaction.client.user,
                additionalFields: [
                    {name: 'Creator', value: 'Henrik3#1451 | <@346345363990380546>', inline: false},
                    {
                        name: 'Server',
                        value: String((await interaction.client.shard.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0)),
                        inline: false,
                    },
                    {
                        name: 'CPU',
                        value: `i9 9900K (8C 16T, 3.6 - 5.0 GHz) | Load: ${sysdata.currentLoad.currentLoad.toFixed(2)}%`,
                        inline: false,
                    },
                    {
                        name: 'Memory',
                        value: `Total: ${pretty(sysdata.mem.total - sysdata.mem.available - sysdata.mem.buffers + sysdata.mem.available, {
                            locale: 'en',
                        })} | Free: ${pretty(sysdata.mem.available, {locale: 'en'})} | Used: ${pretty(sysdata.mem.total - sysdata.mem.available - sysdata.mem.buffers, {
                            locale: 'en',
                        })}`,
                        inline: false,
                    },
                    {
                        name: 'OS',
                        value: `${sysdata.osInfo.distro} ${sysdata.osInfo.release} (${sysdata.osInfo.codename}) `,
                        inline: false,
                    },
                ],
                footer: 'VALORANT LABS [BOTINFO]',
            }),
        ],
    });
}
export const name = 'botinfo';
