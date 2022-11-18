import {Canvas} from '../methods.js';
export const buildBackground = async function (data, type) {
    const canvas = Canvas.createCanvas(3840, 2160);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(data);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const stats = await Canvas.loadImage(`assets/background/VALORANT_${type}_template.png`);
    ctx.drawImage(stats, 0, 0, canvas.width, canvas.height);
    return canvas;
};
