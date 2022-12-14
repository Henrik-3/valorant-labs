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
export const buildUsername = async function ({ctx, text, size, x, y, color, align, rotate}) {
    let lastSize = 0;
    for (let iText = 0; iText < text.length; iText++) {
        const letter = text[iText];

        if (isJapanese(letter)) {
            buildText({ ctx: ctx, size: 43, x: lastSize + x, y: y, color: color, align: align, font: 'sawarabigothic', text: letter });
            lastSize += ctx.measureText(letter).width;
        }
        else if (isKorean(letter)) {
            buildText({ ctx: ctx, size: 46, x: lastSize + x, y: y, color: color, align: align, font: 'ibmplexsansKR', text: letter });
            lastSize += ctx.measureText(letter).width;
        }
        else if (isThai(letter)) {
            buildText({ ctx: ctx, size: 68, x: lastSize + x, y: y, color: color, align: align, font: 'aksaramatee', text: letter });
            lastSize += ctx.measureText(letter).width;
        }
        else if (isVietnamese(letter)) {
            buildText({ ctx: ctx, size: 46, x: lastSize + x, y: y, color: color, align: align, font: 'opensansR', text: letter });
            lastSize += ctx.measureText(letter).width;
        } else {
            buildText({ ctx: ctx, size: size, x: lastSize + x, y: y, color: color, align: align, text: letter });
            lastSize += ctx.measureText(letter).width;
        }
    }
}
function isJapanese(text) {
    if (text.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/))
        return true;
    else return false;
}
function isThai(text) {
    if (text.match(/[\u0E00-\u0E7F]/)) return true;
    else return false;
}
function isKorean(text) {
    if (text.match(/[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/))
        return true;
    else return false;
}
function isVietnamese(text) {
    if (text.match(/[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/))
        return true;
    else return false;
}