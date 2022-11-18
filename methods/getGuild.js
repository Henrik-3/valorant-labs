import {embedBuilder} from '../methods.js';
import {guildSettings} from './guildSettings.js';

export const getGuild = async function (interaction) {
    const settings = await guildSettings(interaction.guild);
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: 'VALORANT LABS Settings',
                desc: `Settings for ${interaction.guild.name}`,
                additionalFields: [
                    {
                        name: 'Patchnotes',
                        value: ['false', false].some(i => i == settings.news)
                            ? translations[settings.lang].settings.not_set
                            : `<#${settings.news.replace(/<|#|>/g, '')}>`,
                    },
                    {
                        name: 'Othernews',
                        value: ['false', false].some(i => i == settings.onews)
                            ? translations[settings.lang].settings.not_set
                            : `<#${settings.onews.replace(/<|#|>/g, '')}>`,
                    },
                    {
                        name: 'Serverstatus',
                        value: ['false', false].some(i => i == settings.serverstatus)
                            ? translations[settings.lang].settings.not_set
                            : `<#${settings.serverstatus.replace(/<|#|>/g, '')}>`,
                    },
                    {name: 'Language', value: String(settings.lang)},
                    {
                        name: 'Background - Stats',
                        value: ['false', false].some(i => i == settings.background_stats)
                            ? translations[settings.lang].settings.not_set
                            : String(settings.background_stats),
                    },
                    {
                        name: 'Background - Game',
                        value: ['false', false].some(i => i == settings.background_game)
                            ? translations[settings.lang].settings.not_set
                            : String(settings.background_game),
                    },
                    {
                        name: 'Background - MMR',
                        value: ['false', false].some(i => i == settings.background_mmr) ? translations[settings.lang].settings.not_set : String(settings.background_mmr),
                    },
                ],
                footer: 'VALORANT LABS [SETTINGS]',
            }),
        ],
        components: [],
        attachments: [],
    });
};
