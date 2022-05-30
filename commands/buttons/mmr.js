import {
	ComponentType,
	ButtonStyle,
	getDB,
	getLink,
	axios,
	errorhandlerinteraction,
	embedBuilder,
	translations,
	topgg,
	buildBackground,
	getCustomBackground,
	ranks,
	buildMMRImage,
} from '../../methods.js';
export async function execute({interaction, args, guilddata} = {}) {
	await interaction.deferUpdate();
	const puuid = await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${args[1]}/${args[2]}?asia=true`).catch(error => {
		return error;
	});
	if (puuid.response) return errorhandlerinteraction({interaction: interaction, status: puuid.response.status, type: 'account', lang: guilddata.lang});
	const mmrdb = await getDB('mmr').findOne({puuid: puuid.data.data.puuid});
	const mmr = mmrdb
		? mmrdb
		: await axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${puuid.data.data.region}/${puuid.data.data.puuid}`).catch(error => {
				return error;
		  });
	if (mmr.response) return Uts.errorhandlerinteraction({interaction: interaction, status: mmr.response.status, type: 'stats', lang: guilddata.lang});
	const bgcanvas = guilddata.background_mmr ? await buildBackground(getCustomBackground(guilddata.background_mmr), 'mmr') : null;
	if (!mmrdb) await getDB('mmr').insertOne({puuid: puuid.data.data.puuid, data: mmr.data, createdAt: new Date()});
	const seasonsvalues = Object.entries(mmr.data.data.by_season).filter(item => !item[1].error);
	const seasonscomponents = [];
	for (let i = 0; seasonsvalues.length > i; i++) {
		const emoji = ranks[seasonsvalues[i][1].final_rank].discordid.substring(2, ranks[seasonsvalues[i][1].final_rank].discordid.length - 1).split(':');
		seasonscomponents.push({
			label: seasonsvalues[i][0],
			value: seasonsvalues[i][0],
			description: `${seasonsvalues[i][1].act_rank_wins[seasonsvalues[i][1].act_rank_wins.length - 1].patched_tier} - ${
				seasonsvalues[i][1].act_rank_wins[0].patched_tier
			}`,
			emoji: {
				name: emoji[0],
				id: emoji[1],
			},
		});
	}
	const attachment = await buildMMRImage({mmrdata: mmr.data.data, bgcanvas});
	interaction.editReply({
		files: [attachment],
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.SelectMenu,
						customId: `mmr;${puuid.data.data.region};${puuid.data.data.puuid}`,
						maxValues: 1,
						minValues: 0,
						options: seasonscomponents,
						placeholder: translations[guilddata.lang].mmr.season_select,
					},
				],
			},
		],
	});
}
export const name = 'mmr';
