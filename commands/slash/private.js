import {embedBuilder, getDB, translations, uuidv4} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
    const uuid = uuidv4();
    await getDB('state').insertOne({userid: interaction.user.id, code: uuid, expireAt: new Date(), type: 'delete'});
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].link.link_generated_title,
                desc: translations[guilddata.lang].link.link_generated_desc + `https://valorantlabs.xyz/v1/rso/redirect/${uuid}`,
                footer: 'VALORANT LABS [LINK GENERATED]',
            }),
        ],
    });
}
export const name = 'private';
