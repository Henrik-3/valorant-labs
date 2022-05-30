import {ComponentType, ButtonStyle, axios, translations, errorhandlerinteraction, embedBuilder} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
    const website = await axios.get(translations[guilddata.lang].patchurl).catch(error => {
        return error;
    });
    if (website.response)
        return errorhandlerinteraction({interaction, status: website.response.status, type: 'patch', lang: guilddata.lang, data: website.response.data});
    interaction.editReply({
        embeds: [
            embedBuilder({
                title: website.data.data[0].title,
                image: website.data.data[0].banner_url,
                footer: 'VALORANT LABS [PATCH NOTES]',
                url: website.data.data[0].url,
            }),
        ],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        url: website.data.data[0].url,
                        label: website.data.data[0].title,
                    },
                ],
            },
        ],
    });
}
export const name = 'patch';
