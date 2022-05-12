import Utils from "../../methods.js"
export async function execute({interaction, guilddata} = {}) {
    const request = await Utils.axios.get(`https://valorant-api.com/v1/weapons?language=${Utils.translations[guilddata.lang].valorant_api_lang}`).catch(error => {return error})
    const fields = []
    for(let i = 0; weaponsf.data.data.length > i; i++) {
        fields.push({name: weaponsf.data.data[i].displayName, value: `${Utils.translations[guilddata.lang].weapon.cost}: ${weapons.shopData != null ? String(weapons.shopData.cost) : 'Free'}`})
    }
    return interaction.editReply({
        title: Utils.translations[guilddata.lang].weapon.name,
        fields: fields.sort(function (a, b) {
            if(a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
            }
            if(a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
            }
        }),
        color: 0xff4654,
        timestamp: new Date().toISOString(),
        footer: {text: `VALORANT LABS [WEAPONS]`, icon_url: "https://valorantlabs.xyz/css/valorant-logo.png"}
    })
}
export const name = "weapons"