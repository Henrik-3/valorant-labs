import {guildSettings} from './guildSettings.js';
import {firstletter, embedBuilder, getTranslations, roles} from '../methods.js';

export const getAutoRoles = async function ({interaction, guilddata} = {}) {
    const translations = getTranslations();
    const settings = guilddata ?? (await guildSettings(interaction.guild));
    const formattedarray = roles.map(i => {
        return {
            name: firstletter(i),
            value: settings.autoroles?.some(k => k.name == i)
                ? `<@&${settings.autoroles.find(k => k.name == i).id}>`
                : translations[settings.lang].autorole.settings_not_set,
            inline: true,
        };
    });
    return formattedarray;
};
