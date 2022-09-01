import {embedBuilder, buildBackground, getCustomBackground, buildGameImage, translations, errorhandlerinteraction} from '../../methods.js';
export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferUpdate();
    const components = [...interaction.message.components];
    interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].game.loading_title,
                desc: translations[guilddata.lang].game.loading_desc,
                footer: 'VALORANT LABS [GAME LOADING]',
            }),
        ],
        attachments: [],
        components: [],
    });
    const bgcanvas = guilddata.background_game ? await buildBackground(getCustomBackground(guilddata.background_game), 'game') : null;
    const image = await buildGameImage({matchid: interaction.values[0], guilddata, bgcanvas});
    if (image.unknown)
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].game.unknown_title,
                    desc: translations[guilddata.lang].game.unknown_desc,
                    footer: 'VALORANT LABS [GAME KEY ERROR]',
                }),
            ],
            attachments: [],
            components: components,
        });
    if (image.error) return errorhandlerinteraction({interaction, status: image.error.status, type: 'game', lang: guilddata.lang, data: image.error.data});
    if (image.embed) return interaction.editReply({embeds: [image.embed], components});
    if (image.image) return interaction.editReply({files: [image.image], embeds: [], components});
}
export const name = 'game';
