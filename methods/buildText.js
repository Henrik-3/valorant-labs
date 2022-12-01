export const buildText = async function ({ctx, text, size, x, y, color, align, font, rotate} = {}) {
    ctx.font = `${size}px ${font ? font : 'DinNext'}`;
    ctx.fillStyle = color ? color : '#ffffff';
    ctx.textAlign = align ? align : 'left';
    if (rotate) {
        ctx.save();
        ctx.translate(200, 1080);
        ctx.rotate(-0.5 * Math.PI);
        ctx.fillText(text, x, y);
    } else {
        ctx.fillText(text, x, y);
    }
};
