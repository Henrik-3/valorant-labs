import {axios, translations, weapons, embedBuilder} from '../../methods.js';
import {errorhandlerinteraction} from '../../methods/errorhandlerinteraction.js';

export async function execute({interaction, guilddata} = {}) {
    const request = await axios.get(`https://valorant-api.com/v1/weapons?language=${translations[guilddata.lang].valorant_api_lang}`).catch(error => {
        return error;
    });
    if (request.response)
        return errorhandlerinteraction({interaction, status: request.response.status, type: 'weapon', lang: guilddata.lang, data: request.response.data});
    const cweapon = request.data.data.find(item => item.displayName.toLowerCase() == interaction.options.get('name').value.toLowerCase());
    const fields = [
        {name: translations[guilddata.lang].weapon.cost, value: String(cweapon.shopData.cost), inline: true},
        {name: translations[guilddata.lang].weapon.magazinsize, value: String(cweapon.weaponStats.magazineSize), inline: true},
        {name: translations[guilddata.lang].weapon.penetration, value: weapons[cweapon.weaponStats.wallPenetration], inline: true},
        {name: translations[guilddata.lang].weapon.firerate, value: String(cweapon.weaponStats.fireRate), inline: true},
        {
            name: translations[guilddata.lang].weapon.firerate_zoom,
            value: cweapon.weaponStats.adsStats != undefined ? String(cweapon.weaponStats.adsStats.fireRate) : 'N.A',
            inline: true,
        },
        {
            name: translations[guilddata.lang].weapon.zoom,
            value: cweapon.weaponStats.adsStats != undefined ? String(cweapon.weaponStats.adsStats.zoomMultiplier) : 'N.A',
            inline: true,
        },
    ];
    for (let i = 0; cweapon.weaponStats.damageRanges > i; i++) {
        fields.push({
            name: `${String(range.rangeStartMeters)}m-${String(range.rangeEndMeters)}`,
            value: `${translations[guilddata.lang].weapon.head}: ${cweapon.weaponStats.damageRanges[i].headDamage} | ${translations[guilddata.lang].weapon.body}: ${
                cweapon.weaponStats.damageRanges[i].bodyDamage
            } | ${translations[guilddata.lang].weapon.leg}: ${cweapon.weaponStats.damageRanges[i].legDamage}`,
        });
    }
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: cweapon.displayName,
                additionalFields: fields,
                image: cweapon.displayIcon,
                footer: 'VALORANT LABS [WEAPON]',
            }),
        ],
    });
}
export const name = 'weapon';
