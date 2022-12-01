import {getDB} from '../methods.js';
export const getGameKey = async function (id) {
    const request = await getDB('games').findOne({gamekey: id});
    return request ? request : null;
};
