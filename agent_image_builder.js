import Canvas from 'canvas';
import axios from 'axios';
import {writeFileSync} from 'fs';

async function buildAgent() {
    const agents = await axios.get('https://valorant-api.com/v1/agents').catch(e => e);
    if (agents.response) return console.error(agents);
    for (let i = 0; agents.data.data.length > i; i++) {
        if (!agents.data.data[i].isPlayableCharacter) continue;
        const canvas = Canvas.createCanvas(3840, 2160);
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(canvas.width * -1, 0, canvas.width * 2, canvas.height * 2);
        gradient.addColorStop(0, `#${agents.data.data[i].backgroundGradientColors[0]}`);
        gradient.addColorStop(0.33, `#${agents.data.data[i].backgroundGradientColors[1]}`);
        gradient.addColorStop(0.66, `#${agents.data.data[i].backgroundGradientColors[2]}`);
        gradient.addColorStop(1, `#${agents.data.data[i].backgroundGradientColors[3]}`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width * 2, canvas.height * 2);
        const background = await Canvas.loadImage(agents.data.data[i].background);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(background, canvas.width / 2 - 1400 * 0.87, -550, 1400 * 1.7, 2160 * 1.7);
        ctx.globalAlpha = 1;
        const agent = await Canvas.loadImage(agents.data.data[i].fullPortraitV2);
        ctx.drawImage(agent, canvas.width / 2 - 1024, 0, 2048, 2048);
        const valolabs = await Canvas.loadImage('Z:/Coding/Designs/VALORANT LABS/Variants/WhiteGrey.png');
        ctx.drawImage(valolabs, 100, 75, 270, 356);
        writeFileSync(`./assets/agents/${agents.data.data[i].uuid}.png`, canvas.toBuffer('image/png'));
    }
    process.exit(1);
}
buildAgent();
