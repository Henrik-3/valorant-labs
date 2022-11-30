import {embedBuilder, getTranslations} from '../../methods.js';
export async function execute({interaction, args, guilddata} = {}) {
    const translations = getTranslations();
    await interaction.client.shard.broadcastEval(
        (c, {embed}) => {
            if (c.channels.cache.has('975850839040200763'))
                c.channels.cache.get('975850839040200763').send({
                    embeds: [embed],
                });
        },
        {
            context: {
                embed: embedBuilder({
                    title: 'Feedback',
                    desc: interaction.fields.getTextInputValue('feedback'),
                    additionalFields: [{name: 'UserID', value: `<@${String(args[1])}> | ${String(args[1])}`}],
                }),
            },
        }
    );
    return interaction.reply({
        ephemeral: true,
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].feedback.send_title,
                desc: translations[guilddata.lang].feedback.send_desc,
                footer: 'VALORANT LABS [FEEDBACK SEND]',
            }),
        ],
    });
}
export const name = 'feedback';
