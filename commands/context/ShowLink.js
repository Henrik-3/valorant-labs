import {embedBuilder, getTranslations, ComponentType, ButtonStyle, getFunction} from '../../methods.js';
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
    return interaction.editReply({
        embeds: [
            embedBuilder({
                title: translations[guilddata.lang].link.clink_title,
                desc: translations[guilddata.lang].link.clink_desc + ` \`${link.name}#${link.tag}\``,
                footer: 'VALORANT LABS [LINK GET]',
            }),
        ],
    });
}
export const name = 'Show Link';
