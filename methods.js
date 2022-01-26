import {MongoClient} from 'mongodb'
import {readFileSync} from "fs"
const basedata = JSON.parse(readFileSync("./basedata.json"))
const mongoclient = new MongoClient(basedata.mongoaccess)
mongoclient.connect()
const valodb = mongoclient.db("VALORANT-LABS")
const translations = JSON.parse(readFileSync("./translations.json"))

export default {
    translations: translations,
    locales: {
        de: "de",
        fr: "fr",
        "en-GB": "en-gb",
        "en-US": "en-us",
        ja: "jp",
        "pt-BR": "pt-br",
        "es-ES": "es",
        vi: "vi"
    },
    guildSettings: async function (guild) {
        return (await valodb.collection("settings").findOneAndUpdate({gid: guild.id}, {$setOnInsert: {news: false, onews: false, serverstatus: false, lang: this.locales[guild.preferredLocale] ? this.locales[guild.preferredLocale] : "en-us", blacklist: false, prefix: "v?"}}, {upsert: true, returnDocument: "after"})).value
    },
    guildBlacklist: async function (guildId) {
        const request = await valodb.collection("settings").findOne({gid: guild.id})
        if(!request) return null
        return request.entrys.length ? request.entrys : null
    },
    getLink: async function (id) {
        const request = await valodb.collection("link").findOne({user_id: id}) //rename user_id to userid
        return request ? request : null
    }
}