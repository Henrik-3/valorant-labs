import {getDB, unlinkSync, embedBuilder, ComponentType, ButtonStyle, writeFileSync, brotliCompressSync, getTranslations} from '../methods.js';
import {buildBackground} from './buildBackground.js';
import {buildStatsImage} from './buildStatsImage.js';
import {buildGameImage} from './buildGameImage.js';
import {buildMMRImage} from './buildMMRImage.js';
import {getAutoRoles} from './getAutoRoles.js';
import {getGuild} from './getGuild.js';

export const patchGuild = async function ({interaction, key, value, additionaldata, guilddata} = {}) {
    let doc;
    const translations = getTranslations();
    switch (key) {
        case 'prefix': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {prefix: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'language': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {lang: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'patchnotes': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {news: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'othernews': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {onews: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'serverstatus': {
            doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {serverstatus: value}}, {upsert: false, returnDocument: 'after'})).value;
            break;
        }
        case 'background': {
            if (value == false) {
                doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {background: value}}, {upsert: false, returnDocument: 'before'}))
                    .value;
                unlinkSync(`./settings/backgrounds/${doc.background}.png`);
                doc.background = false;
            } else {
                doc = await getDB('settings').findOne({gid: interaction.guild.id});
                await interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[doc.lang].settings.imggeneration_title,
                            desc: translations[doc.lang].settings.imggeneration_desc,
                        }),
                    ],
                });
                let bgcanvas;
                let image;
                switch (interaction.options.get('type').value) {
                    case 'stats': {
                        const dbstats = await getDB('userstats').findOne({ingamepuuid: '54942ced-1967-5f66-8a16-1e0dae875641'});
                        dbstats.name = 'Henrik3';
                        dbstats.tag = 'VALO';
                        bgcanvas = await buildBackground(interaction.options.getAttachment('image').url, 'stats');
                        image = await buildStatsImage({dbstats, agent: getAgents(), modes: getGamemodes(), bgcanvas});
                        break;
                    }
                    case 'game': {
                        bgcanvas = await buildBackground(interaction.options.getAttachment('image').url, 'game');
                        image = (await buildGameImage({matchid: 'd6007c31-b293-41c3-b1f6-0e797978447b', guilddata: doc, bgcanvas})).image;
                        break;
                    }
                    case 'mmr': {
                        const mmrdata = await getDB('mmr').findOne({puuid: '54942ced-1967-5f66-8a16-1e0dae875641'});
                        bgcanvas = await buildBackground(interaction.options.getAttachment('image').url, 'mmr');
                        image = await buildMMRImage({mmrdata, bgcanvas, seasonid: 'e1a2'});
                        break;
                    }
                }
                return interaction.editReply({
                    files: [image],
                    embeds: [
                        embedBuilder({
                            title: translations[doc.lang].settings.imggenerated_title,
                            desc: translations[doc.lang].settings.imggenerated_desc,
                            footer: interaction.options.getAttachment('image').url,
                        }),
                    ],
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Success,
                                    label: translations[doc.lang].settings.imggenerated_label_accept,
                                    customId: `settings;background;${interaction.options.get('type').value};accept`,
                                },
                                {
                                    type: ComponentType.Button,
                                    style: ButtonStyle.Danger,
                                    label: translations[doc.lang].settings.imggenerated_label_deny,
                                    customId: `settings;background;${interaction.options.get('type').value};deny`,
                                },
                            ],
                        },
                    ],
                });
            }
            break;
        }
        case '_background': {
            const background = await axios.get(interaction.message.embeds[0].footer.text, {responseType: 'arraybuffer'}).catch(error => {
                return error;
            });
            if (background.response) {
                doc = await getDB('settings').findOne({gid: interaction.guild.id});
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[doc.lang].settings.imgsaveerror_title,
                            desc: translations[doc.lang].settings.imgsaveerror_desc + `\n\n\`\`\`${background.response.data}\`\`\``,
                        }),
                    ],
                });
            }
            const compressed = brotliCompressSync(background.data, {params: {[constants.BROTLI_PARAM_QUALITY]: 6}});
            writeFileSync(`./settings/backgrounds/${value}.png`, compressed);
            if (additionaldata == 'stats')
                doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {background_stats: value}}, {upsert: false, returnDocument: 'after'}))
                    .value;
            if (additionaldata == 'game')
                doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {background_game: value}}, {upsert: false, returnDocument: 'after'}))
                    .value;
            if (additionaldata == 'mmr')
                doc = (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: {background_mmr: value}}, {upsert: false, returnDocument: 'after'}))
                    .value;
            break;
        }
        case 'autoroles': {
            const autoroleupdate = {};
            autoroleupdate[`autoroles.${guilddata.autoroles?.findIndex(item => item.name == value)}`] = {id: additionaldata, name: value};
            doc =
                guilddata.autoroles && guilddata.autoroles.some(item => item.name == value)
                    ? (await getDB('settings').findOneAndUpdate({gid: interaction.guild.id}, {$set: autoroleupdate}, {upsert: false, returnDocument: 'after'})).value
                    : (
                          await getDB('settings').findOneAndUpdate(
                              {gid: interaction.guild.id},
                              {$push: {autoroles: {id: additionaldata, name: value}}},
                              {upsert: false, returnDocument: 'after'}
                          )
                      ).value;
            return getAutoRoles(interaction);
        }
    }
    getGuild(interaction);
};
