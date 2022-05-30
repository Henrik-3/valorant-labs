import {ShardingManager} from 'discord.js';
import {AutoPoster} from 'topgg-autoposter';
import {getDB, translations, patchStats, riottoken, getAgents, getGamemodes, shard_status_update, fetchWebsite} from './methods.js';
import {readFileSync, writeFileSync} from 'fs';
import * as f from 'fastify';
import axios from 'axios';
import path from 'path';
import randomize from 'randomatic';
const fastify = f.fastify({logger: {level: 'error'}});
const basedata = JSON.parse(readFileSync('./basedata.json'));
const __dirname = path.resolve();

const manager = new ShardingManager('./index.js', {
	token: basedata.discordtoken,
	totalShards: 2,
	respawn: true,
});
//const poster = AutoPoster(basedata.dbltoken, manager)

let restart = false;
setInterval(async () => {
	//fetchWebsite(manager)
	//shard_status_update(manager)
}, 150000);

manager.on('shardCreate', async shard => {
	shard.on('message', async message => {
		if (typeof message == 'string' && message.startsWith('restart')) {
			manager.shards.get(Number(message.split('-')[1])).respawn();
			restart = true;
			setTimeout(function () {
				restart = false;
			}, 60000);
		}
	});
	shard.on('ready', async rshard => {
		console.log('Ready', shard.id);
		if (manager.shards.size == manager.totalShards && restart == false) {
			//fetchWebsite(manager)
			//shard_status_update(manager)
			manager.shards.forEach(sshard => {
				sshard.send('startup');
			});
		}
	});
	console.log(`Launched shard ${shard.id}`);
});

fastify.register(await import('fastify-cors'), {});

fastify.register(await import('fastify-static'), {
	root: path.join(__dirname, 'website', 'build'),
});

fastify.get('/', async (req, res) => {
	const usage = readFileSync('./website/build/index.html', {encoding: 'utf-8'});
	res.type('text/html').send(usage);
});

fastify.get('/v1/guild-available/:guild', async (req, res) => {
	/*const gcheck = await manager.broadcastEval((client, {guild}) => {
        try {
            const check = client.guilds.cache.has(guild)
            return check ? client.guilds.cache.get(guild) : false
        } catch(e) {

        }
    }, {context: {guild: req.params.guild}})
    if(gcheck.some(item => typeof item == "object")) return res.code(200).send({status: 200, data: gcheck.find(item => typeof item == "object")})
    res.code(404).send({status: 404, message: "Guild unavailable"})*/
	const shard = await axios.get(`http://127.0.0.1:3000/v1/guild-available/${req.params.guild}`).catch(error => {
		return error;
	});
	if (shard.response) return res.code(500).send('Error while fetching');
	res.send(shard.data);
});

fastify.get('/v1/shard-state', async (req, res) => {
	/*const sharddata = await manager.broadcastEval(client => {
        return {status: client.ws.status, ping: client.ws.ping, server: client.guilds.cache.size}
    })
    res.send(sharddata)*/
	const shard = await axios.get('http://127.0.0.1:3000/v1/shard-state').catch(error => {
		return error;
	});
	if (shard.response) return res.code(500).send('Error while fetching');
	res.send(shard.data);
});

fastify.get('/v1/pagedata', async (req, res) => {
	if (req.query.type == 'landingpage') {
		const guild = (await manager.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0);
		const commands = JSON.parse(readFileSync('./api.json'));
		const utils = JSON.parse(readFileSync('./utils.json', {encoding: 'utf-8'}));
		const parselang = {
			de: 'German',
			en: 'English',
			jp: 'Japanese',
			'pt-br': 'Portuguese',
			fr: 'French',
			es: 'Spanish',
			vi: 'Vietname',
		};
		return res.code(200).send({
			guild: guild,
			cmds: commands.all,
			cmdlist: utils.cmds,
			langlist: utils.langlist,
			translations: utils.translations,
			clang: req.query.lang != undefined ? (parselang[req.query.lang] != undefined ? parselang[req.query.lang] : 'English') : 'English',
		});
	} else if (req.query.type == 'translation') {
		const translations = JSON.parse(readFileSync('./lang.json', {encoding: 'utf-8'}));
		const utils = JSON.parse(readFileSync('./utils.json', {encoding: 'utf-8'}));
		return res.code(200).send({langtranslations: translations, translations: utils.translations});
	} else if (req.query.type == 'shards') {
		const sharddata = await manager.broadcastEval(client => {
			return {status: client.ws.status, ping: client.ws.ping, server: client.guilds.cache.size};
		});
		res.send(sharddata);
	} else {
		return res.send('ok');
	}
});

fastify.post('/v1/topgg/vote', async (req, res) => {
	const user = await manager.broadcastEval(
		(c, {user}) => {
			return c.users.fetch(user);
		},
		{shard: 0, context: {user: req.body.user}}
	);
	await manager.broadcastEval(
		(c, {embed}) => {
			if (c.channels.cache.has('913842504611266560')) return c.channels.cache.get('913842504611266560').send({embeds: [embed]});
		},
		{
			context: {
				embed: {
					title: 'New Vote',
					description: `ID: ${user.id} | Username: ${user.tag} | <t:${Math.round(+new Date() / 1000)}:F>`,
					color: 16777215,
					thumbnail: {
						url: user.avatar != null ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : null,
					},
				},
			},
		}
	);
	res.send('ok');
});

fastify.get('/invite', async (req, res) => {
	res.redirect(
		'https://discord.com/oauth2/authorize?client_id=702201518329430117&permissions=2416307264&redirect_uri=https%3A%2F%2Fdiscord.gg%2FZr5eF5D&scope=bot%20applications.commands'
	);
});

fastify.get('/invite/guilded', async (req, res) => {
	res.redirect('https://www.guilded.gg/b/5f089b0d-fa2c-4335-91c6-54df79f5d6e1');
});

fastify.post('/v1/translations', async (req, res) => {
	const newObject = {};
	for (let i = 0; req.body.length > i; i++) {
		newObject[req.body[i].name] = req.body[i].value;
	}
	writeFileSync(`./translations/${randomize('Aa0', 6)}.json`, JSON.stringify(newObject, null, 2));
	res.code(200).send('ok');
});

fastify.get('/v1/rso/redirect/:state', async (req, res) => {
	res.redirect(
		301,
		`https://auth.riotgames.com/login#client_id=valorantlabs&redirect_uri=https%3A%2F%2Fvalorantlabs.xyz%2Foauth-finished.html&response_type=code&scope=openid%20offline_access&prompt=login&state=${req.params.state}`
	);
});

//DEPRECATED
const agents = {
	'5f8d3a7f-467b-97f3-062c-13acf203c006': 'Breach',
	'f94c3b30-42be-e959-889c-5aa313dba261': 'Raze',
	'6f2a04ca-43e0-be17-7f36-b3908627744d': 'Skye',
	'117ed9e3-49f3-6512-3ccf-0cada7e3823b': 'Cypher',
	'ded3520f-4264-bfed-162d-b080e2abccf9': 'Sova',
	'320b2a48-4d9b-a075-30f1-1f93a9b638fa': 'Sova',
	'1e58de9c-4950-5125-93e9-a0aee9f98746': 'Killjoy',
	'707eab51-4836-f488-046a-cda6bf494859': 'Viper',
	'eb93336a-449b-9c1b-0a54-a891f7921d69': 'Phoenix',
	'9f0d8ba9-4140-b941-57d3-a7ad57c6b417': 'Brimstone',
	'7f94d92c-4234-0a36-9646-3a87eb8b5c89': 'Yoru',
	'569fdd95-4d10-43ab-ca70-79becc718b46': 'Sage',
	'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc': 'Reyna',
	'8e253930-4c05-31dd-1b6c-968525494517': 'Omen',
	'add6443a-41bd-e414-f6ad-e58d267f4e95': 'Jett',
	'41fb69c1-4189-7b37-f117-bcaf1e96f1bf': 'Astra',
	'601dbbe7-43ce-be57-2a40-4abd24953621': 'KAY/O',
	'22697a3d-45bf-8dd7-4fec-84a9e28c69d7': 'Chamber',
	'dade69b4-4f5a-8528-247b-219e5a1facd6': 'Fade',
};

const gamemodes = {
	ggteam: 'Escalation',
	spikerush: 'Spike Rush',
	deathmatch: 'Deathmatch',
	competitive: 'Competitive',
	unrated: 'Unrated',
	onefa: 'Replication',
	'': 'Custom Game',
	newmap: 'New Map',
	snowball: 'Snowball Fight',
};

const maps = {
	'/Game/Maps/Triad/Triad': 'Haven',
	'/Game/Maps/Port/Port': 'Icebox',
	'/Game/Maps/Duality/Duality': 'Bind',
	'/Game/Maps/Bonsai/Bonsai': 'Split',
	'/Game/Maps/Ascent/Ascent': 'Ascent',
	'/Game/Maps/Foxtrot/Foxtrot': 'Breeze',
	'/Game/Maps/Canyon/Canyon': 'Fracture',
};

fastify.get('/oauth-finished.html', async (req, res) => {
	console.log(req.query);
	if (req.query.state) {
		const fstate = await getDB('state').findOne({code: req.query.state});
		if (!fstate) return res.code(400).send({error: 'The Link is older than one hour, please generate a new one'});
		const formData = new URLSearchParams();
		formData.append('grant_type', 'authorization_code');
		formData.append('code', req.query.code);
		formData.append('redirect_uri', 'https://valorantlabs.xyz/oauth-finished.html');
		const tokens = await axios
			.post('https://auth.riotgames.com/token', formData, {
				headers: {Authorization: `Basic ${Buffer.from(basedata.client_secret).toString('base64')}`},
			})
			.catch(error => {
				return error;
			});
		const userinfo = await axios
			.get('https://europe.api.riotgames.com/riot/account/v1/accounts/me', {
				headers: {Authorization: `Bearer ${tokens.data.access_token}`},
			})
			.catch(error => {
				return error;
			});
		if (userinfo.response) return res.code(500).send({error: `There seems to be an error with the riot server | Status: ${userinfo.response.status}`});
		const region = await axios
			.get(`https://europe.api.riotgames.com/riot/account/v1/active-shards/by-game/val/by-puuid/${userinfo.data.puuid}`, {
				headers: {'X-Riot-Token': basedata.riottoken},
			})
			.catch(error => {
				return error;
			});
		if (region.response)
			return res.code(500).send({
				error: `There seems to be an error with region of your account | Status: ${region.response.status} | Message: ${region.response.message}`,
			});
		const db = await axios
			.get(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURI(userinfo.data.gameName)}/${encodeURI(userinfo.data.tagLine)}?asia=true`)
			.catch(error => {
				return error;
			});
		if (db.response)
			return res.code(500).send({
				error: `There seems to be an error with the requested account | Status: ${db.response.status} | Message: ${db.response.data.message}`,
			});
		if (fstate.type == 'autorole') {
			const guilddata = await getDB('settings').findOne({gid: fstate.guild});
			const mmr = await axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${region.data.activeShard}/${db.data.data.puuid}?asia=true`).catch(error => {
				return error;
			});
			if (mmr.response)
				return res.code(500).send({
					error: `There seems to be an error with the mmr of that account | Status: ${mmr.response.status} | Message: ${mmr.response.data.message}`,
				});
			if (mmr.data.data.current_data.currenttier == null || mmr.data.data.current_data.games_needed_for_rating != 0)
				return res.code(500).send({error: translations[guilddata.lang].mmr.no_rank_desc});
			await manager.broadcastEval(
				async (c, {user, guild, ra, rm}) => {
					if (c.guilds.cache.has(guild)) {
						const member = await c.guilds.cache.get(guild).members.fetch(user);
						await member.roles.remove(rm);
						await member.roles.add(ra);
					}
				},
				{
					context: {
						user: fstate.userid,
						guild: fstate.guild,
						ra: guilddata.autoroles.find(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == item.name).id,
						rm: guilddata.autoroles
							.filter(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() != item.name)
							.map(item => {
								return item.id;
							}),
					},
				}
			);
			getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
			getDB('linkv2').updateOne(
				{userid: fstate.userid},
				{$set: {puuid: db.data.data.puuid, rpuuid: userinfo.data.puuid, region: region.data.activeShard}},
				{upsert: true}
			);
			getDB('state').deleteOne({code: req.query.state});
			return res.code(200).send({message: `Your account was successfully linked and your role was given`});
		}
		if (fstate.type == 'link') {
			getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
			getDB('linkv2').updateOne(
				{userid: fstate.userid},
				{$set: {puuid: db.data.data.puuid, rpuuid: userinfo.data.puuid, region: region.data.activeShard}},
				{upsert: true}
			);
			getDB('state').deleteOne({code: req.query.state});
			return res.code(200).send({message: `Your account was successfully linked`});
		}
		if (fstate.type == 'stats') {
			const matchlist = await axios
				.get(`https://${region.data.activeShard}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${userinfo.data.puuid}`, {
					headers: {'X-Riot-Token': riottoken},
				})
				.catch(error => {
					return error;
				});
			if (matchlist.response)
				return res.code(500).send({
					error: `There seems to be an issue with your matchlist | Status: ${matchlist.response.status} | Message: ${db.data.data.puuid}`,
				});
			matchlist.data.history = [
				{
					matchId: 'b5c24052-273d-40a1-98b3-269e17930643',
					gameStartTimeMillis: 1653607252593,
					queueId: 'competitive',
				},
			];
			patchStats({
				dbstats: {
					puuid: userinfo.data.puuid,
					ingamepuuid: '54942ced-1967-5f66-8a16-1e0dae875641' /*db.data.data.puuid*/,
					region: region.data.activeShard,
					type: 'unofficial',
					tracker: false,
					last_update: Date.now(),
					agents: [],
					matches: [],
					stats: {},
				},
				mmatches: matchlist.data.history,
				agent: getAgents(),
				modes: getGamemodes(),
			});
			getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
			getDB('linkv2').updateOne(
				{userid: fstate.userid},
				{$set: {puuid: db.data.data.puuid, rpuuid: userinfo.data.puuid, region: region.data.activeShard}},
				{upsert: true}
			);
			getDB('state').deleteOne({code: req.query.state});
			return res.redirect(301, 'https://discord.com/channels/@me');
		}
		return;
	}
	//DEPRECATED
	var code = req.query.code;
	var cookies = req.headers.cookie.split(';');
	console.log(cookies);
	var formData = new URLSearchParams();
	formData.append('grant_type', 'authorization_code');
	formData.append('code', code);
	formData.append('redirect_uri', 'https://valorantlabs.xyz/oauth-finished.html');
	var tokens = await axios
		.post('https://auth.riotgames.com/token', formData, {
			headers: {
				Authorization: `Basic ${Buffer.from(`valorantlabs:4uxlkqJzyO5Dm1FOkp5yH8_1WW2d64TL-Xz54535XT0`).toString('base64')}`,
			},
		})
		.catch(error => {
			return error;
		});
	var userinfo = await axios
		.get('https://europe.api.riotgames.com/riot/account/v1/accounts/me', {
			headers: {Authorization: `Bearer ${tokens.data.access_token}`},
		})
		.catch(error => {
			return error;
		});
	console.log(userinfo.data);
	var puuidcookie = cookies.find(item => item.includes('puuid'));
	if (userinfo.data.puuid != puuidcookie.trim().substr(6)) return res.code(403).send('You have logged in into another account then a request was made for');
	var dbentry = await getDB('rso').findOne({puuid: userinfo.data.puuid});
	console.log(userinfo.data.puuid, userinfo.data.gameName, userinfo.data.tagLine);
	if (dbentry == null) {
		var region;
		var ingamepuuid;
		var type;
		var ingameapi = await axios
			.get(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURI(userinfo.data.gameName)}/${encodeURI(userinfo.data.tagLine)}?asia=true`)
			.catch(error => {
				return error;
			});
		if (ingameapi.status) {
			region = ['eu', 'ap', 'na', 'kr'].includes(ingameapi.data.data.region) ? ingameapi.data.data.region : null;
			ingamepuuid = ingameapi.data.data.puuid;
			type = ['eu', 'ap', 'na', 'kr'].includes(ingameapi.data.data.region) ? 'unofficial' : 'official';
		}
		if (ingameapi.response) {
			region = null;
			(ingamepuuid = null), (type = 'official');
		}
		var tracker = await axios
			.get(`https://api.henrikdev.xyz/valorant/v2/profile/${encodeURI(userinfo.data.gameName)}/${encodeURI(userinfo.data.tagLine)}`, {
				headers: {'z-api-token-trn': basedata.hdevtoken},
			})
			.catch(error => {
				return error;
			});
		if (!tracker.response) {
			var agent_array = [];
			var matches_array = [];
			for (const agent of tracker.data.agents) {
				agent_array.push({
					agent: agent.agent,
					playtime: agent.playtime.playtimeraw,
					matches: agent.matches,
					kills: agent.kills,
					deaths: agent.deaths,
					assists: agent.assists,
					headshots: agent.headshots,
					wins: agent.wins,
					firstbloods: agent.firstbloods,
					aces: agent.aces,
					clutches: agent.clutches,
					flawless: agent.flawless,
				});
			}
			if (type == 'official')
				region = await axios
					.get(`https://europe.api.riotgames.com/riot/account/v1/active-shards/by-game/val/by-puuid/${userinfo.data.puuid}`, {
						headers: {'X-Riot-Token': basedata.riottoken},
					})
					.catch(error => {
						return error;
					});
			var matchlist =
				type == 'official'
					? await axios
							.get(`https://${region.data.activeShard}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${userinfo.data.puuid}`, {
								headers: {'X-Riot-Token': basedata.riottoken},
							})
							.catch(error => {
								return error;
							})
					: await axios
							.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${region}/${ingamepuuid}`, {
								headers: {'X-Riot-Token': basedata.riottoken},
							})
							.catch(error => {
								return error;
							});
			if (matchlist.status && matchlist.status == 200) {
				matchlist.data.history.length = 5;
				for await (const matchid of matchlist.data.history) {
					const cmatch =
						type == 'unofficial'
							? await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/match/${region}/${matchid.matchId}`).catch(error => {
									return error;
							  })
							: await axios
									.get(`https://${region.data.activeShard}.api.riotgames.com/val/match/v1/matches/${matchid.matchId}`, {
										headers: {'X-Riot-Token': basedata.riottoken},
									})
									.catch(error => {
										return error;
									});
					if (!cmatch.response) {
						if (type == 'unofficial') {
							if (cmatch.data.data.metadata.mode != 'Deathmatch') {
								if (cmatch.data.data.metadata.mode != 'Custom Game') {
									var player = cmatch.data.data.players.all_players.find(item => item.puuid == ingamepuuid);
									if (player != null) {
										var team = cmatch.data.data.teams[player.team.toLowerCase()];
										const dbcheck = await getDB('games').findOne({matchid: matchid.matchId});
										if (dbcheck != undefined) {
											matches_array.push({
												won: team.has_won,
												gamekey: dbcheck.gamekey,
												id: matchid.matchId,
												start: cmatch.data.data.metadata.game_start * 1000,
												agent: player.character,
												mode: cmatch.data.data.metadata.mode,
												map: cmatch.data.data.metadata.map,
												teamblue_won: team.has_won,
												teamblue_rounds: team.rounds_won,
												teamred_won: team.has_won == true ? false : true,
												teamred_rounds: team.rounds_lost,
												kills: player.stats.kills,
												deaths: player.stats.deaths,
												assists: player.stats.assists,
											});
										} else {
											var rid = randomize('Aa0', 6);
											let available = false;
											while (!available) {
												const ridcheck = await getDB('games').findOne({gamekey: rid});
												if (ridcheck == undefined) {
													await getDB('games').insertOne({gamekey: rid, matchid: matchid.matchId});
													matches_array.push({
														won: team.has_won,
														gamekey: rid,
														id: matchid.matchId,
														start: cmatch.data.data.metadata.game_start * 1000,
														agent: player.character,
														mode: cmatch.data.data.metadata.mode,
														map: cmatch.data.data.metadata.map,
														teamblue_won: team.has_won,
														teamblue_rounds: team.rounds_won,
														teamred_won: team.has_won == true ? false : true,
														teamred_rounds: team.rounds_lost,
														kills: player.stats.kills,
														deaths: player.stats.deaths,
														assists: player.stats.assists,
													});
													available = true;
												} else {
													rid = randomize('Aa0', 6);
												}
											}
										}
									}
								}
							} else {
								if (cmatch.data.data.metadata.mode != 'Custom Game') {
									var player = cmatch.data.data.players.all_players.find(item => item.puuid == ingamepuuid);
									if (player != null) {
										var team = cmatch.data.data.players.all_players.sort((item2, item1) => item2.score - item1.score)[0];
										const dbcheck = await getDB('games').findOne({matchid: matchid.matchId});
										if (dbcheck != undefined) {
											matches_array.push({
												won: team.puuid == ingamepuuid ? true : false,
												gamekey: dbcheck.gamekey,
												id: matchid.matchId,
												start: cmatch.data.data.metadata.game_start * 1000,
												agent: player.character,
												mode: cmatch.data.data.metadata.mode,
												map: cmatch.data.data.metadata.map,
												teamblue_won: team.puuid == ingamepuuid ? true : false,
												teamblue_rounds: team.puuid == ingamepuuid ? 1 : 0,
												teamred_won: team.puuid != ingamepuuid ? true : false,
												teamred_rounds: team.puuid != ingamepuuid ? 1 : 0,
												kills: player.stats.kills,
												deaths: player.stats.deaths,
												assists: player.stats.assists,
											});
										} else {
											var rid = randomize('Aa0', 6);
											let available = false;
											while (!available) {
												const ridcheck = await getDB('games').findOne({gamekey: rid});
												if (ridcheck == undefined) {
													await getDB('games').insertOne({gamekey: rid, matchid: matchid.matchId});
													matches_array.push({
														won: team.puuid == ingamepuuid ? true : false,
														gamekey: rid,
														id: matchid.matchId,
														start: cmatch.data.data.metadata.game_start * 1000,
														agent: player.character,
														mode: cmatch.data.data.metadata.mode,
														map: cmatch.data.data.metadata.map,
														teamblue_won: team.puuid == ingamepuuid ? true : false,
														teamblue_rounds: team.puuid == ingamepuuid ? 1 : 0,
														teamred_won: team.puuid != ingamepuuid ? true : false,
														teamred_rounds: team.puuid != ingamepuuid ? 1 : 0,
														kills: player.stats.kills,
														deaths: player.stats.deaths,
														assists: player.stats.assists,
													});
													available = true;
												} else {
													rid = randomize('Aa0', 6);
												}
											}
										}
									}
								}
							}
						} else {
							if (cmatch.data.matchInfo.queueId != 'deathmatch') {
								if (cmatch.data.matchInfo.queueId != '') {
									var player = cmatch.data.players.find(item => item.puuid == userinfo.data.puuid);
									if (player != null) {
										var team = cmatch.data.teams.find(item => item.teamId == player.teamId);
										var team2 = cmatch.data.teams.filter(item => item.teamId != player.teamId);
										const dbcheck = await getDB('games').findOne({matchid: matchid.matchId});
										if (dbcheck != undefined) {
											matches_array.push({
												won: team.won,
												gamekey: dbcheck.gamekey,
												id: matchid.matchId,
												start: cmatch.data.matchInfo.gameStartMillis,
												agent: agents[player.characterId],
												mode: gamemodes[cmatch.data.matchInfo.queueId],
												map: maps[cmatch.data.matchInfo.mapId],
												teamblue_won: team.won,
												teamblue_rounds: team.roundsWon,
												teamred_won: team2[0].won,
												teamred_rounds: team2[0].roundsWon,
												kills: player.stats.kills,
												deaths: player.stats.deaths,
												assists: player.stats.assists,
											});
										} else {
											var rid = randomize('Aa0', 6);
											let available = false;
											while (!available) {
												const ridcheck = await getDB('games').findOne({gamekey: rid});
												if (ridcheck == undefined) {
													await getDB('games').insertOne({gamekey: rid, matchid: matchid.matchId});
													matches_array.push({
														won: team.won,
														gamekey: rid,
														id: matchid.matchId,
														start: cmatch.data.matchInfo.gameStartMillis,
														agent: agents[player.characterId],
														mode: gamemodes[cmatch.data.matchInfo.queueId],
														map: maps[cmatch.data.matchInfo.mapId],
														teamblue_won: team.won,
														teamblue_rounds: team.roundsWon,
														teamred_won: team2[0].won,
														teamred_rounds: team2[0].roundsWon,
														kills: player.stats.kills,
														deaths: player.stats.deaths,
														assists: player.stats.assists,
													});
													available = true;
												} else {
													rid = randomize('Aa0', 6);
												}
											}
										}
									}
								}
							} else {
								if (cmatch.data.matchInfo.queueId != '') {
									var player = cmatch.data.players.find(item => item.puuid == userinfo.data.puuid);
									if (player != null) {
										var team = cmatch.data.teams.find(item => item.teamId == userinfo.data.puuid);
										var team2 = cmatch.data.teams.filter(item => item.teamId != userinfo.data.puuid);
										const dbcheck = await getDB('games').findOne({matchid: matchid.matchId});
										if (dbcheck != undefined) {
											matches_array.push({
												won: team.won,
												gamekey: dbcheck.gamekey,
												id: matchid.matchId,
												start: cmatch.data.matchInfo.gameStartMillis,
												agent: agents[player.characterId],
												mode: gamemodes[cmatch.data.matchInfo.queueId],
												map: maps[cmatch.data.matchInfo.mapId],
												teamblue_won: team.won,
												teamblue_rounds: team.roundsWon,
												teamred_won: team2[0].won,
												teamred_rounds: team2[0].roundsWon,
												kills: player.stats.kills,
												deaths: player.stats.deaths,
												assists: player.stats.assists,
											});
										} else {
											var rid = randomize('Aa0', 6);
											let available = false;
											while (!available) {
												const ridcheck = await getDB('games').findOne({gamekey: rid});
												if (ridcheck == undefined) {
													await getDB('games').insertOne({gamekey: rid, matchid: matchid.matchId});
													matches_array.push({
														won: team.won,
														gamekey: rid,
														id: matchid.matchId,
														start: cmatch.data.matchInfo.gameStartMillis,
														agent: agents[player.characterId],
														mode: gamemodes[cmatch.data.matchInfo.queueId],
														map: maps[cmatch.data.matchInfo.mapId],
														teamblue_won: team.won,
														teamblue_rounds: team.roundsWon,
														teamred_won: team2[0].won,
														teamred_rounds: team2[0].roundsWon,
														kills: player.stats.kills,
														deaths: player.stats.deaths,
														assists: player.stats.assists,
													});
													available = true;
												} else {
													rid = randomize('Aa0', 6);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			await getDB('userstats').updateOne(
				{puuid: userinfo.data.puuid},
				{
					$set: {
						puuid: userinfo.data.puuid,
						ingamepuuid: ingamepuuid,
						region: type == 'unofficial' ? region : region.data.activeShard,
						type: type,
						tracker: true,
						last_update: Date.now(),
						stats: {
							playtime: tracker.data.stats.playtime.playtime_raw,
							matches: tracker.data.stats.matches,
							kills: tracker.data.stats.kills,
							deaths: tracker.data.stats.deaths,
							assists: tracker.data.stats.assists,
							headshots: tracker.data.stats.headshots,
							wins: tracker.data.stats.wins,
							firstbloods: tracker.data.stats.firstbloods,
							aces: tracker.data.stats.aces,
							clutches: tracker.data.stats.clutches,
							flawless: tracker.data.stats.flawless,
						},
						agents: agent_array,
						matches: matches_array,
					},
				},
				{upsert: true}
			);
			await getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
		} else {
			if (type == 'official')
				region = await axios
					.get(`https://europe.api.riotgames.com/riot/account/v1/active-shards/by-game/val/by-puuid/${userinfo.data.puuid}`, {
						headers: {'X-Riot-Token': basedata.riottoken},
					})
					.catch(error => {
						return error;
					});
			var matchlist =
				type == 'official'
					? await axios
							.get(`https://${region.data.activeShard}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${userinfo.data.puuid}`, {
								headers: {'X-Riot-Token': basedata.riottoken},
							})
							.catch(error => {
								return error;
							})
					: await axios
							.get(`https://api.henrikdev.xyz/valorantlabs/v1/matches/${region}/${ingamepuuid}`, {
								headers: {'X-Riot-Token': basedata.riottoken},
							})
							.catch(error => {
								return error;
							});
			matchlist.data.history.length > 5 ? (matchlist.data.history.length = 5) : (matchlist.data.history.length = matchlist.data.history.length);
			var agent_array = [];
			var matches_array = [];
			var userdata = {
				puuid: userinfo.data.puuid,
				ingamepuuid: ingamepuuid,
				region: type == 'unofficial' ? region : region.data.activeShard,
				type: type,
				tracker: false,
				last_update: Date.now(),
				stats: {
					playtime: 0,
					matches: 0,
					kills: 0,
					deaths: 0,
					assists: 0,
					headshots: 0,
					wins: 0,
					firstbloods: 0,
					aces: 0,
					clutches: 0,
					flawless: 0,
				},
				agents: agent_array,
				matches: matches_array,
			};
			if (matchlist.data.history.length) {
				for await (const matchid of matchlist.data.history) {
					const cmatch =
						type == 'unofficial'
							? await axios.get(`https://api.henrikdev.xyz/valorantlabs/v1/match/${region}/${matchid.matchId}`).catch(error => {
									return error;
							  })
							: await axios
									.get(`https://${region.data.activeShard}.api.riotgames.com/val/match/v1/matches/${matchid.matchId}`, {
										headers: {'X-Riot-Token': basedata.riottoken},
									})
									.catch(error => {
										return error;
									});
					if (!cmatch.response) {
						if (type == 'unofficial') {
							if (cmatch.data.data.metadata.mode != 'Deathmatch') {
								if (cmatch.data.data.metadata.mode != 'Custom Game') {
									var player = cmatch.data.data.players.all_players.find(item => item.puuid == ingamepuuid);
									if (player != undefined) {
										var team = cmatch.data.data.teams[player.team.toLowerCase()];
										userdata.stats.matches = Number(userdata.stats.matches) + 1;
										userdata.stats.kills = Number(userdata.stats.kills) + Number(player.stats.kills);
										userdata.stats.deaths = Number(userdata.stats.deaths) + Number(player.stats.deaths);
										userdata.stats.assists = Number(userdata.stats.assists) + Number(player.stats.assists);
										var headshots = 0;
										var aces = 0;
										for (const round of cmatch.data.data.rounds) {
											for (const stats of round.player_stats) {
												if (stats.player_display_name == `${userinfo.data.gameName}#${userinfo.data.tagLine}`) {
													headshots = headshots + stats.headshots;
													if (stats.kill_events.length <= 5) aces = aces + 1;
												}
											}
										}
										userdata.stats.headshots = Number(userdata.stats.headshots) + headshots;
										userdata.stats.aces = Number(userdata.stats.aces) + aces;
										if (team.has_won) userdata.stats.wins = Number(userdata.stats.wins) + 1;

										var agent = agent_array.find(item => item.agent == player.character);
										var dbindex = agent_array.findIndex(item => item.agent == player.character);
										if (dbindex != -1) agent_array.splice(dbindex, 1);
										var agentarray =
											agent != undefined
												? agent
												: {
														agent: '',
														playtime: 0,
														matches: 0,
														kills: 0,
														deaths: 0,
														assists: 0,
														headshots: 0,
														wins: 0,
														firstbloods: 0,
														aces: 0,
														clutches: 0,
														flawless: 0,
												  };
										agentarray.agent = player.character;
										agentarray.playtime = Number(agentarray.playtime) + Number(cmatch.data.data.metadata.game_length);
										agentarray.matches = Number(agentarray.matches) + 1;
										agentarray.kills = Number(agentarray.kills) + Number(player.stats.kills);
										agentarray.deaths = Number(agentarray.deaths) + Number(player.stats.deaths);
										agentarray.assists = Number(agentarray.assists) + Number(player.stats.assists);
										agentarray.headshots = Number(agentarray.headshots) + headshots;
										agentarray.aces = Number(agentarray.headshots) + aces;
										if (team.has_won) agentarray.wins = Number(agentarray.wins) + 1;
										agent_array.push(agentarray);
										const dbcheck = await getDB('games').findOne({matchid: matchid.matchId});
										if (dbcheck != undefined) {
											matches_array.push({
												won: team.has_won,
												gamekey: dbcheck.gamekey,
												id: matchid.matchId,
												start: cmatch.data.data.metadata.game_start,
												agent: player.character,
												mode: cmatch.data.data.metadata.mode,
												map: cmatch.data.data.metadata.map,
												teamblue_won: team.has_won,
												teamblue_rounds: team.rounds_won,
												teamred_won: team.has_won == true ? false : true,
												teamred_rounds: team.rounds_lost,
												kills: player.stats.kills,
												deaths: player.stats.deaths,
												assists: player.stats.assists,
											});
										} else {
											var rid = randomize('Aa0', 6);
											let available = false;
											while (!available) {
												const ridcheck = await getDB('games').findOne({gamekey: rid});
												if (ridcheck == undefined) {
													await getDB('games').insertOne({gamekey: rid, matchid: matchid.matchId});
													matches_array.push({
														won: team.has_won,
														gamekey: rid,
														id: matchid.matchId,
														start: cmatch.data.data.metadata.game_start,
														agent: player.character,
														mode: cmatch.data.data.metadata.mode,
														map: cmatch.data.data.metadata.map,
														teamblue_won: team.has_won,
														teamblue_rounds: team.rounds_won,
														teamred_won: team.has_won == true ? false : true,
														teamred_rounds: team.rounds_lost,
														kills: player.stats.kills,
														deaths: player.stats.deaths,
														assists: player.stats.assists,
													});
													available = true;
												} else {
													rid = randomize('Aa0', 6);
												}
											}
										}
									}
								}
							} else {
								if (cmatch.data.data.metadata.mode != 'Custom Game') {
									var player = cmatch.data.data.players.all_players.find(item => item.puuid == ingamepuuid);
									if (player != undefined) {
										var team = cmatch.data.data.players.all_players.sort((item2, item1) => item2.score - item1.score)[0];
										const dbcheck = await getDB('games').findOne({matchid: matchid.matchId});
										if (dbcheck != undefined) {
											matches_array.push({
												won: team.puuid == ingamepuuid ? true : false,
												gamekey: dbcheck.gamekey,
												id: matchid.matchId,
												start: cmatch.data.data.metadata.game_start,
												agent: player.character,
												mode: cmatch.data.data.metadata.mode,
												map: cmatch.data.data.metadata.map,
												teamblue_won: team.puuid == ingamepuuid ? true : false,
												teamblue_rounds: team.puuid == ingamepuuid ? 1 : 0,
												teamred_won: team.puuid != ingamepuuid ? true : false,
												teamred_rounds: team.puuid != ingamepuuid ? 1 : 0,
												kills: player.stats.kills,
												deaths: player.stats.deaths,
												assists: player.stats.assists,
											});
										} else {
											var rid = randomize('Aa0', 6);
											let available = false;
											while (!available) {
												const ridcheck = await getDB('games').findOne({gamekey: rid});
												if (ridcheck == undefined) {
													await getDB('games').insertOne({gamekey: rid, matchid: matchid.matchId});
													matches_array.push({
														won: team.puuid == ingamepuuid ? true : false,
														gamekey: rid,
														id: matchid.matchId,
														start: cmatch.data.data.metadata.game_start,
														agent: player.character,
														mode: cmatch.data.data.metadata.mode,
														map: cmatch.data.data.metadata.map,
														teamblue_won: team.puuid == ingamepuuid ? true : false,
														teamblue_rounds: team.puuid == ingamepuuid ? 1 : 0,
														teamred_won: team.puuid != ingamepuuid ? true : false,
														teamred_rounds: team.puuid != ingamepuuid ? 1 : 0,
														kills: player.stats.kills,
														deaths: player.stats.deaths,
														assists: player.stats.assists,
													});
													available = true;
												} else {
													rid = randomize('Aa0', 6);
												}
											}
										}
									}
								}
							}
						} else {
							if (cmatch.data.matchInfo.queueId != 'deathmatch') {
								if (cmatch.data.matchInfo.queueId != '') {
									var player = cmatch.data.players.find(item => item.puuid == userinfo.data.puuid);
									if (player != null) {
										var team = cmatch.data.teams.find(item => item.teamId == player.teamId);
										var team2 = cmatch.data.teams.find(item => item.teamId != player.teamId);
										userdata.stats.matches = Number(userdata.stats.matches) + 1;
										userdata.stats.kills = Number(userdata.stats.kills) + Number(player.stats.kills);
										userdata.stats.deaths = Number(userdata.stats.deaths) + Number(player.stats.deaths);
										userdata.stats.assists = Number(userdata.stats.assists) + Number(player.stats.assists);
										var headshots = 0;
										var aces = 0;
										for (const round of cmatch.data.roundResults) {
											for (const stats of round.playerStats) {
												if (stats.puuid == userinfo.data.puuid) {
													for (const kills of stats.damage) {
														headshots = headshots + kills.headshots;
													}
													if (stats.kills.length <= 5) aces = aces + 1;
												}
											}
										}
										userdata.stats.headshots = Number(userdata.stats.headshots) + headshots;
										userdata.stats.aces = Number(userdata.stats.aces) + aces;
										if (team.won) userdata.stats.wins = Number(userdata.stats.wins) + 1;

										var agent = agent_array.find(item => item.agent == agents[player.characterId]);
										var dbindex = agent_array.findIndex(item => item.agent == agents[player.characterId]);
										if (dbindex != -1) agent_array.splice(dbindex, 1);
										var agentarray =
											agent != undefined
												? agent
												: {
														agent: '',
														playtime: 0,
														matches: 0,
														kills: 0,
														deaths: 0,
														assists: 0,
														headshots: 0,
														wins: 0,
														firstbloods: 0,
														aces: 0,
														clutches: 0,
														flawless: 0,
												  };
										agentarray.agent = agents[player.characterId];
										agentarray.playtime = Number(agentarray.playtime) + cmatch.data.matchInfo.gameLengthMillis;
										agentarray.matches = Number(agentarray.matches) + 1;
										agentarray.kills = Number(agentarray.kills) + Number(player.stats.kills);
										agentarray.deaths = Number(agentarray.deaths) + Number(player.stats.deaths);
										agentarray.assists = Number(agentarray.assists) + Number(player.stats.assists);
										agentarray.headshots = Number(agentarray.headshots) + headshots;
										agentarray.aces = Number(agentarray.headshots) + aces;
										if (team.won) agentarray.wins = Number(agentarray.wins) + 1;
										agent_array.push(agentarray);
										const dbcheck = await getDB('games').findOne({matchid: matchid.matchId});
										if (dbcheck != undefined) {
											matches_array.push({
												won: team.won,
												gamekey: dbcheck.gamekey,
												id: matchid.matchId,
												start: cmatch.data.matchInfo.gameStartMillis,
												agent: agents[player.characterId],
												mode: gamemodes[cmatch.data.matchInfo.queueId],
												map: maps[cmatch.data.matchInfo.mapId],
												teamblue_won: team.won,
												teamblue_rounds: team.roundsWon,
												teamred_won: team2.won,
												teamred_rounds: team2.roundsWon,
												kills: player.stats.kills,
												deaths: player.stats.deaths,
												assists: player.stats.assists,
											});
										} else {
											var rid = randomize('Aa0', 6);
											let available = false;
											while (!available) {
												const ridcheck = await getDB('games').findOne({gamekey: rid});
												if (ridcheck == undefined) {
													await getDB('games').insertOne({gamekey: rid, matchid: matchid.matchId});
													matches_array.push({
														won: team.won,
														gamekey: rid,
														id: matchid.matchId,
														start: cmatch.data.matchInfo.gameStartMillis,
														agent: agents[player.characterId],
														mode: gamemodes[cmatch.data.matchInfo.queueId],
														map: maps[cmatch.data.matchInfo.mapId],
														teamblue_won: team.won,
														teamblue_rounds: team.roundsWon,
														teamred_won: team2.won,
														teamred_rounds: team2.roundsWon,
														kills: player.stats.kills,
														deaths: player.stats.deaths,
														assists: player.stats.assists,
													});
													available = true;
												} else {
													rid = randomize('Aa0', 6);
												}
											}
										}
									}
								}
							} else {
								if (cmatch.data.matchInfo.queueId != '') {
									var player = cmatch.data.players.find(item => item.puuid == userinfo.data.puuid);
									if (player != null) {
										var team = cmatch.data.teams.find(item => item.teamId == userinfo.data.puuid);
										var team2 = cmatch.data.teams.filter(item => item.teamId != userinfo.data.puuid);
										const dbcheck = await getDB('games').findOne({matchid: matchid.matchId});
										if (dbcheck != undefined) {
											matches_array.push({
												won: team.won,
												gamekey: rid,
												id: matchid.matchId,
												start: cmatch.data.matchInfo.gameStartMillis,
												agent: agents[player.characterId],
												mode: gamemodes[cmatch.data.matchInfo.queueId],
												map: maps[cmatch.data.matchInfo.mapId],
												teamblue_won: team.won,
												teamblue_rounds: team.roundsWon,
												teamred_won: team2[0].won,
												teamred_rounds: team2[0].roundsWon,
												kills: player.stats.kills,
												deaths: player.stats.deaths,
												assists: player.stats.assists,
											});
										} else {
											var rid = randomize('Aa0', 6);
											let available = false;
											while (!available) {
												const ridcheck = await getDB('games').findOne({gamekey: rid});
												if (ridcheck == undefined) {
													await getDB('games').insertOne({gamekey: rid, matchid: matchid.matchId});
													matches_array.push({
														won: team.won,
														gamekey: rid,
														id: matchid.matchId,
														start: cmatch.data.matchInfo.gameStartMillis,
														agent: agents[player.characterId],
														mode: gamemodes[cmatch.data.matchInfo.queueId],
														map: maps[cmatch.data.matchInfo.mapId],
														teamblue_won: team.won,
														teamblue_rounds: team.roundsWon,
														teamred_won: team2[0].won,
														teamred_rounds: team2[0].roundsWon,
														kills: player.stats.kills,
														deaths: player.stats.deaths,
														assists: player.stats.assists,
													});
													available = true;
												} else {
													rid = randomize('Aa0', 6);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			await getDB('userstats').updateOne({puuid: userinfo.data.puuid}, {$set: userdata}, {upsert: true});
			await getDB('rso').updateOne({puuid: userinfo.data.puuid}, {$set: {puuid: userinfo.data.puuid}}, {upsert: true});
		}
	} else {
		res.code(403).send('You are already logged in via RSO with this Account');
	}
	res.header('Set-Cookie', `guild=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
	res.header('Set-Cookie', `channel=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
	res.header('Set-Cookie', `message=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
	res.header('Set-Cookie', `puuid=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
	res.code(302).redirect(`https://discord.com/channels/${cookies[0].substr(6)}/${cookies[1].substr(9)}/${cookies[2].substr(9)}`);
});

fastify.get('/v1/login', async (req, res) => {
	if (!req.query.guild || !req.query.channel || !req.query.message || !req.query.puuid) res.code(400).send({status: 400, message: 'Missing Query String'});
	res.header('Set-Cookie', `guild=${req.query.guild}; Path=/`);
	res.header('Set-Cookie', `channel=${req.query.channel}; Path=/`);
	res.header('Set-Cookie', `message=${req.query.message}; Path=/`);
	res.header('Set-Cookie', `puuid=${req.query.puuid}; Path=/`);
	res.redirect(
		'https://auth.riotgames.com/login#client_id=valorantlabs&redirect_uri=https%3A%2F%2Fvalorantlabs.xyz%2Foauth-finished.html&response_type=code&scope=openid%20offline_access&ui_locales=en'
	);
});

fastify.listen(4200, '127.0.0.1', () => {
	console.log('API Online');
});
manager.spawn();
