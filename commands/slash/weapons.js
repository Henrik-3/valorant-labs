import {axios, translations, embedBuilder} from '../../methods.js';
import {errorhandlerinteraction} from '../../methods/errorhandlerinteraction.js';

export async function execute({interaction, guilddata} = {}) {
    const request = await axios.get(`https://valorant-api.com/v1/weapons?language=${translations[guilddata.lang].valorant_api_lang}`).catch(error => {
        return error;
    });
    if (request.response)
        return errorhandlerinteraction({interaction, status: request.response.status, type: 'weapons', lang: guilddata.lang, data: request.response.data});
    const fields = [];
    for (let i = 0; request.data.data.length > i; i++) {
        fields.push({
            name: request.data.data[i].displayName,
            value: `${translations[guilddata.lang].weapon.cost}: ${request.data.data[i].shopData != null ? String(request.data.data[i].shopData.cost) : 'Free'}`,
        });
    }
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].weapon.name,
                additionalFields: fields.sort(function (a, b) {
                    if (a.name.toUpperCase() < b.name.toUpperCase()) {
                        return -1;
                    }
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return 1;
                    }
                }),
                footer: `VALORANT LABS [WEAPONS]`,
            }),
        ],
    });
}
export const name = 'weapons';
