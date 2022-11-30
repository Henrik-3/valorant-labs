import {getDB, locales} from '../methods.js';
export const guildSettings = async function (guild) {
    return (
        await getDB('settings').findOneAndUpdate(
            {gid: guild.id},
            {
                $setOnInsert: {
                    news: false,
                    onews: false,
                    serverstatus: false,
                    lang: locales[guild.preferredLocale] ? locales[guild.preferredLocale] : 'en-us',
                    prefix: 'v?',
                    background_stats: false,
                    background_game: false,
                    background_mmr: false,
                    autoroles: [],
                },
            },
            {upsert: true, returnDocument: 'after'}
        )
    ).value;
};
