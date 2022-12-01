import {getCustomBackground, embedBuilder, getTranslations, getFunction} from '../../methods.js';

export async function execute({interaction, guilddata} = {}) {
    const translations = getTranslations();
    const buildBackground = getFunction('buildBackground');
    const buildGameImage = getFunction('buildGameImage');
    const errorhandlerinteraction = getFunction('errorhandlerinteraction');
    const bgcanvas = guilddata.background_game ? await buildBackground(getCustomBackground(guilddata.background_game), 'game') : null;
    const image = await buildGameImage({id: interaction.options.getString('gamekey'), guilddata: guilddata, bgcanvas});
    if (image.unknown)
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].game.unknown_title,
                    desc: translations[guilddata.lang].game.unknown_desc,
                    footer: 'VALORANT LABS [GAME KEY ERROR]',
                }),
            ],
        });
    if (image.error) return errorhandlerinteraction({interaction, status: image.error.status, type: 'game', lang: guilddata.lang, data: image.error.data});
    if (image.embed) return interaction.editReply({embeds: image.embed});
    if (image.image) return interaction.editReply({files: [image.image]});
}
export const name = 'game';
