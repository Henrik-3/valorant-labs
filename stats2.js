const r = require('request-promise')
const fs = require('fs')

module.exports = async (args, client, message, { Canvas, Discord }) => {
  var linkjson = JSON.parse(fs.readFileSync('link.json'))
  var author = message.author.id

if(linkjson[author]) {
  var name = linkjson[author].ingamename
  var tag = linkjson[author].ingametag
  const raw = await r({
    url: `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=RGAPI-86be9a0c-b2a1-4d67-bbf9-773bcb365039`,
    json: true,
    headers: {
      'User-Agent': 'ValorantLABS',
      'Origin': 'valorantlabs.xyz'
    }
  })
  message.channel.send(JSON.stringify(raw))
  var puuid = raw.puuid
  const raw2 = await r({
    url: `https://europe.api.riotgames.com/riot/account/v1/active-shards/by-game/val/by-puuid/${puuid}?api_key=RGAPI-86be9a0c-b2a1-4d67-bbf9-773bcb365039`,
    json: true,
    headers: {
      'User-Agent': 'ValorantLABS',
      'Origin': 'valorantlabs.xyz'
    }
  })
  message.channel.send(JSON.stringify(raw2))
} else {
  const Embed = new Discord.MessageEmbed()
    .setTitle(statslinksyntax)
    .setDescription(langjson[lang].statslinkdesc)
    .setTimestamp()
}
}