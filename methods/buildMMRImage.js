import {Canvas, AttachmentBuilder} from '../methods.js';
import {buildText} from './buildText.js';
export const buildMMRImage = async function ({mmrdata, bgcanvas, seasonid} = {}) {
    const canvas = Canvas.createCanvas(3840, 2160);
    const ctx = canvas.getContext('2d');
    let seasonvalue;
    let seasonkey;
    let entries;
    if (!seasonid) {
        entries = Object.entries(mmrdata.by_season).find(item => !item[1].error && item[1].wins != 0);
        if (entries == undefined) console.error(mmrdata.by_season);
        seasonvalue = entries[1].act_rank_wins.filter(item => item.tier != 0);
        seasonkey = entries[0];
    } else {
        entries = Object.entries(mmrdata.by_season).find(item => item[0] == seasonid && item[1].wins != 0);
        if (entries == undefined) console.error(mmrdata.by_season);
        seasonvalue = entries[1].act_rank_wins.filter(item => item.tier != 0);
        seasonkey = entries[0];
    }
    const multiplier = {
        triangle: 1.25,
        x: 1375.5,
        y: 200,
    };
    const background = bgcanvas
        ? bgcanvas
        : await Canvas.loadImage((entries[1].old ? old_ranks[seasonvalue[0].tier ? seasonvalue[0].tier : 0] : ranks[seasonvalue[0].tier ? seasonvalue[0].tier : 0]).mmr);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const wins = entries[1].wins;
    const color = (entries[1].old ? old_ranks[seasonvalue[0].tier] : ranks[seasonvalue[0].tier]).color;
    let border;
    if (wins < 9) border = await Canvas.loadImage('assets/mmr/border0.png');
    else if (9 <= wins && wins < 25) border = await Canvas.loadImage('assets/mmr/border1.png');
    else if (25 <= wins && wins < 50) border = await Canvas.loadImage('assets/mmr/border2.png');
    else if (50 <= wins && wins < 75) border = await Canvas.loadImage('assets/mmr/border3.png');
    else if (75 <= wins && wins < 100) border = await Canvas.loadImage('assets/mmr/border4.png');
    else border = await Canvas.loadImage('assets/mmr/border5.png');
    ctx.drawImage(border, 1135, 200, 1765, 1765);

    buildText({
        ctx,
        text: seasonkey.toUpperCase(),
        size: 200,
        x: multiplier.x + ((125 * multiplier.triangle) / 2) * 8.25,
        y: 325,
        color: color,
        align: 'center',
        font: 'anton',
    });
    buildText({
        ctx,
        text: seasonvalue[0].patched_tier.toUpperCase(),
        size: 200,
        x: multiplier.x + ((125 * multiplier.triangle) / 2) * 8.25,
        y: 2025,
        color: color,
        align: 'center',
        font: 'anton',
    });
    buildText({ctx, text: mmrdata.current_data.currenttierpatched, size: 125, x: 400, y: 1245, color: color, align: 'left', font: 'anton'});
    buildText({ctx, text: mmrdata.current_data.ranking_in_tier + ' RR', size: 125, x: 675, y: 1445, color: color, align: 'left', font: 'anton'});
    buildText({ctx, text: mmrdata.current_data.mmr_change_to_last_game, size: 125, x: 800, y: 1645, color: color, align: 'left', font: 'anton'});
    buildText({ctx, text: mmrdata.current_data.elo, size: 125, x: 325, y: 1845, color: color, align: 'left', font: 'anton'});

    //TODO
    buildText({ctx, text: entries[1].wins, size: 110, x: 3700, y: 437.5, color: color, align: 'right', font: 'anton'});
    buildText({ctx, text: entries[1].number_of_games, size: 110, x: 3700, y: 737.5, color: color, align: 'right', font: 'anton'});
    buildText({
        ctx,
        text: `${((entries[1].wins / entries[1].number_of_games) * 100).toFixed(2)}%`,
        size: 110,
        x: 3700,
        y: 1037.5,
        color: color,
        align: 'right',
        font: 'anton',
    });
    buildText({ctx, text: seasonvalue[0].patched_tier, size: 110, x: 3700, y: 1337.5, color: color, align: 'right', font: 'anton'});
    buildText({ctx, text: seasonvalue[seasonvalue.length - 1].patched_tier, size: 110, x: 3700, y: 1637.5, color: color, align: 'right', font: 'anton'});
    buildText({ctx, text: entries[1].final_rank_patched, size: 110, x: 3700, y: 1937.5, color: color, align: 'right', font: 'anton'});

    const squareroot = Math.ceil(Math.sqrt(wins));
    const rowcount = squareroot >= 8 ? 7 : squareroot;
    for (let i = 0; rowcount > i; i++) {
        const tierCount = i * 2 + 1;
        let tiers = seasonvalue.splice(0, tierCount);
        for (let k = 0; tiers.length > k; k++) {
            const triangle =
                k % 2 == 0
                    ? `assets/mmr/${tiers[k].tier >= 21 && entries[1].old ? tiers[k].tier + 3 : tiers[k].tier}_up.png`
                    : `assets/mmr/${tiers[k].tier >= 21 && entries[1].old ? tiers[k].tier + 3 : tiers[k].tier}_down.png`;
            const triangleimage = await Canvas.loadImage(triangle);
            const x = (125 * multiplier.triangle) / 2 + 2.75;
            ctx.drawImage(
                triangleimage,
                k * x + (rowcount - i) * x + (multiplier.x + ((125 * multiplier.triangle) / 2) * (7 - rowcount)),
                i * (111 * multiplier.triangle + 2.75) + (multiplier.y + 400),
                125 * multiplier.triangle,
                111 * multiplier.triangle
            );
        }
    }
    return new AttachmentBuilder(canvas.toBuffer(), `valorant-mmr.png`, {description: 'VALORANT LABS MMR'});
};
