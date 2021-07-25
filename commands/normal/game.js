const { Canvas, text, linkjson, axios, getPreGameData, websites, ranks, MessageAttachment, moment, modes } = require("../../functions.js")
module.exports.execute = async function(message, args, guilddata) {
    const canvasstats = Canvas.createCanvas(4100, 2160)
    const ctx = canvasstats.getContext('2d')
    if(!args.length) return message.reply({embeds: [{title: linkjson[guilddata.lang].gamekey_missing_title, description: linkjson[guilddata.lang].gamekey_missing_description, color: 0xff4654, fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}],timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [ERROR]'}}]})
    var pre_gamedata = await getPreGameData(args[0])
    if(pre_gamedata == 404) return message.reply({embeds: [{title: linkjson[guilddata.lang].gamekey_invalid_title, description: linkjson[guilddata.lang].gamekey_invalid_description, color: 0xff4654, fields: [{name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)'}],timestamp: new Date().toISOString(), footer: {text: 'VALORANT LABS [ERROR]'}}]})
    var match_data = await axios.get(`https://api.henrikdev.xyz/valorant/v2/match/${pre_gamedata.matchid}`).catch(error => {return error})
    if(match_data.response) return errorhandler(message, match_data.response.status, "game", guilddata)
    switch(match_data.data.data.metadata.mode) {
        case "Deathmatch":
            message.channel.startTyping()
            var fields = []
            var sorted_array =  match_data.data.data.players.all_players.sort((player2, player1) => player2.stats.score - player1.stats.score)
            for await (item of sorted_array) {
                var rank = await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/eu/${item.puuid}`).catch(error => {return error})
                fields.push({name: `${item.name}#${item.tag}`, value: `${(rank.response != null || rank.status == 204) ? ranks[0].discordid : ranks[rank.data.data.currenttier].discordid} | Score: ${item.stats.score} | KDA: ${item.stats.kills}/${item.stats.deaths}/${item.stats.assists}`})
            }
            message.reply({embeds: [{
                title: `Game ${args[0]} | ID: ${match_data.data.data.metadata.matchid}`,
                description: `Mode: Deathmatch | Map: ${match_data.data.data.metadata.map} | Length: ${moment.duration(match_data.data.data.metadata.game_length).minutes()}m ${moment.duration(match_data.data.data.metadata.game_length).seconds()}s | Started at: ${moment(match_data.data.data.metadata.game_start).format("LLLL")}`,
                thumbnail: {
                    url: "https://media.valorant-api.com/gamemodes/a8790ec5-4237-f2f0-e93b-08a8e89865b2/displayicon.png"
                },
                fields: fields.reverse(),
                color: 0xff4654, 
                timestamp: new Date().toISOString(), 
                footer: { text: 'VALORANT LABS [GAME]'}
            }]})
            message.channel.stopTyping()
            break;
        default: 
            message.channel.startTyping()
            const background = await Canvas.loadImage("commands/images/game/Game-Normal.png");
            ctx.drawImage(background, 0, 0, canvasstats.width, canvasstats.height);
            text(ctx, `Game: ${args[0]}`, 150, canvasstats/2, 200, "#ffffff", "center", "anton", true)
            var mode_image = await Canvas.loadImage(`commands/images/stats/${modes[match_data.data.data.metadata.mode].game}.png`)
            ctx.drawImage(mode_image, 630, 85, 200, 200)
            text(ctx, `${match_data.data.data.metadata.mode} | ${match_data.data.data.metadata.map}`, 100, 850, 225)
            moment.locale(websites[guilddata.lang].locale)
            text(ctx, `${moment.duration(match_data.data.data.metadata.game_length).minutes()}m ${moment.duration(match_data.data.data.metadata.game_length).seconds()}s | ${moment(match_data.data.data.metadata.game_start).format("LLLL")}`, 100, 3700, 225, "#ffffff", "right")
            var red_players = match_data.data.data.players.red.sort((player2, player1) => player1.stats.score - player2.stats.score)
            var blue_players = match_data.data.data.players.blue.sort((player2, player1) => player1.stats.score - player2.stats.score)
            text(ctx, match_data.data.data.teams.blue.rounds_won, 90, 2075, 450, '#00ffcc', 'center')
            text(ctx, ":", 90, 2175, 450, "#ffffff", "center")
            text(ctx, match_data.data.data.teams.red.rounds_won, 90, 2275, 450, '#ff4654', 'center')
            var y_red_1 = 560
            var y_red_2 = 680
            var y_blue_1 = 560
            var y_blue_2 = 680
            for(let i = 0; red_players.length > i; i++) {
                var player = await Canvas.loadImage(`commands/images/stats/${ranks[red_players[i].currenttier].image}`)
                ctx.drawImage(player, 2330, y_red_1, 200, 200)
                y_red_1 = y_red_1 + 300
                text(ctx, `${red_players[i].name}#${red_players[i].tag}`, 80, 2550, y_red_2)
                text(ctx, red_players[i].stats.score, 80, 3375, y_red_2)
                text(ctx, `${red_players[i].stats.kills}/${red_players[i].stats.deaths}/${red_players[i].stats.assists}`, 80, 3625, y_red_2)
                y_red_2 = y_red_2 + 305
            }
            for(let i = 0; blue_players.length > i; i++) {
                var player = await Canvas.loadImage(`commands/images/stats/${ranks[blue_players[i].currenttier].image}`)
                ctx.drawImage(player, 460, y_blue_1, 200, 200)
                y_blue_1 = y_blue_1 + 300
                text(ctx, `${blue_players[i].name}#${blue_players[i].tag}`, 80, 680, y_blue_2)
                text(ctx, blue_players[i].stats.score, 80, 1505, y_blue_2)
                text(ctx, `${blue_players[i].stats.kills}/${blue_players[i].stats.deaths}/${blue_players[i].stats.assists}`, 80, 1755, y_blue_2)
                y_blue_2 = y_blue_2 + 305
            }
            var attachment = new MessageAttachment(canvasstats.toBuffer(), `valorant-game-${args[0]}.png`)
            message.channel.stopTyping()
            return message.reply({files: [attachment]})
    }
}
module.exports.name = "game"