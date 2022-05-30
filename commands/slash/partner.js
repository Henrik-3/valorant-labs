import {embedBuilder} from '../../methods.js';
export async function execute({interaction, guilddata} = {}) {
	const fg = await interaction.client.shard.broadcastEval(c => {
		return c.guilds.cache.get();
	});
	const carray = [];
	for (let i = 0; fg.length > i; i++) {
		for (let k = 0; fg[i].length > k; k++) {
			carray.push(fg[i][k]);
		}
	}
	const sort_array = carray.sort((g1, g2) => g2.memberCount - g1.memberCount);
	const fields = [];
	for (let i = 0; sort_array.length > i; i++) {
		fields.push({
			name: String(i),
			value: `Locale: ${sort_array[i].preferredLocale} | Member: ${sort_array[i].memberCount} | Name: ${sort_array[i].name} | ID: ${sort_array[i].id}`,
		});
	}
	return interaction.editReply({embeds: [embedBuilder({title: 'Guilds', additionalFields: fields})]});
}
export const name = 'partner';
