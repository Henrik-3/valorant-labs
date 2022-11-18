import {axios, getDB} from '../methods.js';
export const getStatsDB = async function (account) {
    const puuid = await axios
        .get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURI(account.name)}/${encodeURI(account.tag)}`, {
            headers: {'X-Riot-Token': riottoken},
        })
        .catch(error => {
            return error;
        });
    if (puuid.response) return {status: puuid.response.status, data: puuid.response.data};
    const region = await axios
        .get(`https://europe.api.riotgames.com/riot/account/v1/active-shards/by-game/val/by-puuid/${puuid.data.puuid}`, {headers: {'X-Riot-Token': riottoken}})
        .catch(error => {
            return error;
        });
    if (region.response) return {status: region.response.status, data: region.response.data};
    const link = await getDB('rso').findOne({puuid: puuid.data.puuid});
    if (!link) return {status: 451, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine};
    const stats = await getDB('userstats').findOne({puuid: puuid.data.puuid});
    return {status: 200, ...stats, region: region.data.activeShard, puuid: puuid.data.puuid, name: puuid.data.gameName, tag: puuid.data.tagLine};
};
