import {embedBuilder, getTranslations, ComponentType, ButtonStyle, getFunction, getDB, moment, firstletter} from '../../methods.js';
export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferReply({ephemeral: true});
    const translations = getTranslations();
    const getLink = getFunction('getLink');
    const link = await getLink({user: interaction.targetUser});
    if (link == null || typeof link.error == 'number')
        return interaction.editReply({
            embeds: [
                embedBuilder({
                    title: translations[guilddata.lang].link.nolink_title,
                    desc: translations[guilddata.lang].link[interaction.targetUser.id != interaction.user.id ? 'nolink_other_desc' : 'nolink_desc'],
                    footer: 'VALORANT LABS [LINK UNKNOWN]',
                }),
            ],
            components:
                interaction.targetUser.id != interaction.user.id
                    ? []
                    : [
                          {
                              type: ComponentType.ActionRow,
                              components: [
                                  {
                                      type: ComponentType.Button,
                                      style: ButtonStyle.Danger,
                                      customId: 'link;generate',
                                      label: translations[guilddata.lang].link.generate_link,
                                  },
                              ],
                          },
                      ],
        });
    const link_data = await getDB('linkv2-logs').find({userid: interaction.targetUser.id}).sort({date: -1}).limit(10).toArray();
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].link.clink_title,
                desc: translations[guilddata.lang].link.clink_desc + ` \`${link.name}#${link.tag}\``,
                additionalFields: link_data.map((i, index) => {
                    console.log(
                        `**${translations[guilddata.lang].autorole.date}:** <t:${moment(i.date).unix()}:F>
                        **${translations[guilddata.lang].autorole.admin}:** ${i.admin ? `<@${i.admin}> (${i.admin})` : '-'}
                        **${translations[guilddata.lang].autorole.guild}:** ${i.guild.id} (${i.guild.name ?? '-'})
                        **${translations[guilddata.lang].autorole.event}:** ${firstletter(i.event)}
                        **${translations[guilddata.lang].autorole.type}:** ${firstletter(i.type)}
                        **${translations[guilddata.lang].autorole.rank}:** ${
                            i.rank ? `${i.rank.name} ${interaction.guild.roles.cache.has(i.rank.id) ? `(<@&${i.rank.id}>)` : ''}` : '-'
                        }
                        **${translations[guilddata.lang].autorole.riotid}:** ${i.riotid ?? '-'}
                        **${translations[guilddata.lang].autorole.riotpuuid}:** ${i.rpuuid ?? '-'}`.length
                    );
                    return {
                        name: `${translations[guilddata.lang].autorole.entry} #${index + 1}`,
                        value: `**${translations[guilddata.lang].autorole.date}:** <t:${moment(i.date).unix()}:F>
                        **${translations[guilddata.lang].autorole.admin}:** ${i.admin ? `<@${i.admin}> (${i.admin})` : '-'}
                        **${translations[guilddata.lang].autorole.guild}:** ${i.guild.id} (${i.guild.name ?? '-'})
                        **${translations[guilddata.lang].autorole.event}:** ${firstletter(i.event)}
                        **${translations[guilddata.lang].autorole.type}:** ${firstletter(i.type)}
                        **${translations[guilddata.lang].autorole.rank}:** ${
                            i.rank ? `${i.rank.name} ${interaction.guild.roles.cache.has(i.rank.id) ? `(<@&${i.rank.id}>)` : ''}` : '-'
                        }
                        **${translations[guilddata.lang].autorole.riotid}:** ${i.riotid ?? '-'}
                        **${translations[guilddata.lang].autorole.riotpuuid}:** ${i.rpuuid ?? '-'}`,
                        inline: true,
                    };
                }),
                footer: 'VALORANT LABS [LINK GET]',
            }),
        ],
    });
}
export const name = 'Show Link';
