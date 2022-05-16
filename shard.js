import {ShardingManager} from "discord.js"
import {AutoPoster} from "topgg-autoposter"
import {readFileSync} from "fs"
import * as f from "fastify"
const fastify = f.fastify()
const basedata = JSON.parse(readFileSync("./basedata.json"))

const manager = new ShardingManager('./index.js', {
    token: basedata.discordtoken,
    totalShards: 2,
    respawn: true
})
//const poster = AutoPoster(basedata.dbltoken, manager)

let restart = false
setInterval(async () => {
    //fetchWebsite(manager)
    //shard_status_update(manager)
}, 150000)

manager.on('shardCreate', async shard => {
    shard.on("message", async message => {
        if(typeof message == "string" && message.startsWith("restart")) {
            manager.shards.get(Number(message.split("-")[1])).respawn()
            restart = true
            setTimeout(function () {
                restart = false
            }, 60000)
        }
    })
    shard.on("ready", async rshard => {
        console.log("Ready", shard.id)
        if(manager.shards.size == manager.totalShards && restart == false) {
            //fetchWebsite(manager)
            //shard_status_update(manager)
            manager.shards.forEach(sshard => {
                sshard.send("startup")
            })
        }
    })
    console.log(`Launched shard ${shard.id}`);
})

fastify.get("/v1/guild-available/:guild", async (req, res) => {
    const gcheck = await manager.broadcastEval((client, {guild}) => {
        try {
            const check = client.guilds.cache.has(guild)
            return check ? client.guilds.cache.get(guild) : false
        } catch(e) {

        }
    }, {context: {guild: req.params.guild}})
    if(gcheck.some(item => typeof item == "object")) return res.code(200).send({status: 200, data: gcheck.find(item => typeof item == "object")})
    res.code(404).send({status: 404, message: "Guild unavailable"})
})

fastify.get("/v1/shard-state", async (req, res) => {
    const sharddata = await manager.broadcastEval(client => {
        return {status: client.ws.status, ping: client.ws.ping, server: client.guilds.cache.size}
    })
    res.send(sharddata)
})

fastify.listen(3000, () => {console.log("API Online")})
manager.spawn();