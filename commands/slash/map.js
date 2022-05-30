import {axios, errorhandlerinteraction, embedBuilder} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
    const request = await axios.get(`https://valorant-api.com/v1/maps`).catch(error => {
        return error;
    });
    if (request.response) return errorhandlerinteraction({interaction, status: request.response.status, type: 'map', lang: guilddata.lang});
    const cmap = request.data.data.find(item => item.displayName.toLowerCase() == interaction.options.get('map').value);
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: cmap.displayName,
                thumbnail: cmap.splash,
                desc: cmap.coordinates ? cmap.coordinates : 'N.A',
                image: cmap.displayIcon,
                footer: `VALORANT LABS [MAP ${interaction.options.get('map').value.toUpperCase()}]`,
            }),
        ],
    });
}
export const name = 'map';
