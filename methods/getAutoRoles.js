import {guildSettings} from './guildSettings.js';
import {firstletter, embedBuilder, getTranslations, roles} from '../methods.js';

export const getAutoRoles = async function (interaction, guilddata) {
    const translations = getTranslations();
    const settings = guilddata ? guilddata : await guildSettings(interaction.guild);
    const formattedarray = roles.map(item => {
        return {
            name: firstletter(item),
            value: settings.autoroles.some(item1 => item1.name == item)
                ? `<@&${settings.autoroles.find(item1 => item1.name == item).id}>`
                : translations[settings.lang].autorole.wrong,
        };
    });
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: 'VALORANT LABS Auto Role System',
                desc: `Auto Role System Settings for ${interaction.guild.name}`,
                additionalFields: formattedarray,
                footer: 'VALORANT LABS [AUTO ROLE]',
            }),
        ],
        components: [],
        attachments: [],
    });
};
