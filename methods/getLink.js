import {getDB, axios} from '../methods.js';
export const getLink = async function ({user} = {}) {
    const db = await getDB('linkv2').findOne({userid: user.id});
    if (!db) return null;
    const riot = await axios
        .get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${db.rpuuid}`, {headers: {'X-Riot-Token': riottoken}})
        .catch(error => {
            return error;
        });
    return riot.response ? {error: riot.response.status, data: riot.response.data} : {error: false, name: riot.data.gameName, tag: riot.data.tagLine};
};
