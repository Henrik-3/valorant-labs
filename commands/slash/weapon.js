import {default as Utils} from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const request = await Utils.axios.get(`https://valorant-api.com/v1/weapons?language=${Utils.translations[guilddata.lang].valorant_api_lang}`).catch(error => {return error})
    const cweapon = request.data.data.find(item => item.displayName.toLowerCase() == interaction.options.get("name").value.toLowerCase())
    const fields = [
        {name: Utils.translations[guilddata.lang].weapon.costs, value: String(cweapon.shopData.cost), inline: true},
        {name: Utils.translations[guilddata.lang].weapon.magazinsize, value: String(cweapon.weaponStats.magazineSize), inline: true},
        {name: Utils.translations[guilddata.lang].weapon.penetration, value: Utils.weapons[cweapon.weaponStats.wallPenetration], inline: true},
        {name: Utils.translations[guilddata.lang].weapon.firerate, value: String(cweapon.weaponStats.fireRate), inline: true},
        {name: Utils.translations[guilddata.lang].weapon.firerate_zoom, value: cweapon.weaponStats.adsStats != undefined ? String(cweapon.weaponStats.adsStats.fireRate) : "N.A", inline: true},
        {name: Utils.translations[guilddata.lang].weapon.zoom, value: cweapon.weaponStats.adsStats != undefined ? String(cweapon.weaponStats.adsStats.zoomMultiplier) : "N.A", inline: true},
    ]
    for(let i = 0; cweapon.weaponStats.damageRanges > i; i++) {
        fields.push({
            name: `${String(range.rangeStartMeters)}m-${String(range.rangeEndMeters)}`, value: `${Utils.translations[guilddata.lang].weapon.head}: ${cweapon.weaponStats.damageRanges[i].headDamage} | ${Utils.translations[guilddata.lang].weapon.body}: ${cweapon.weaponStats.damageRanges[i].bodyDamage} | ${Utils.translations[guilddata.lang].weapon.leg}: ${cweapon.weaponStats.damageRanges[i].legDamage}`
        })
    }
    return interaction.editReply({
        title: cweapon.displayName,
        fields: fields,
        image: {
            url: cweapon.displayIcon
        },
        color: 0xff4654,
        timestamp: new Date().toISOString(),
        footer: {text: `VALORANT LABS [WEAPON]`, icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}
    })
}
export const name = "weapon"