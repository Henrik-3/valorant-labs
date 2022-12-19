export const buildText = async function ({ctx, text, size, x, y, color, align, font, rotate} = {}) {
    ctx.font = `${size}px ${font ?? 'DinNext'}`;
    ctx.fillStyle = color ?? '#ffffff';
    ctx.textAlign = align ?? 'left';
    if (rotate) {
        ctx.save();
        ctx.translate(200, 1080);
        ctx.rotate(-0.5 * Math.PI);
        ctx.fillText(text, x, y);
    } else {
        ctx.fillText(text, x, y);
    }
};
export const buildUsername = async function ({ctx, text, size, x, y, color, align}) {
    let lastSize = 0;
    let string_length = 0;
    for (let iText = 0; iText < text.length; iText++) {
        const letter = text[iText];
        if (isJapanese(letter)) {
            ctx.font = `${size}px sawarabigothic`;
            string_length += ctx.measureText(letter).width;
        } else if (isKorean(letter)) {
            ctx.font = `${size}px ibmplexsansKR`;
            string_length += ctx.measureText(letter).width;
        } else if (isThai(letter)) {
            ctx.font = `${size}px aksaramatee`;
            string_length += ctx.measureText(letter).width;
        } else if (isVietnamese(letter)) {
            ctx.font = `${size}px opensansR`;
            string_length += ctx.measureText(letter).width;
        } else {
            ctx.font = `${size}px DinNext`;
            string_length += ctx.measureText(letter).width;
        }
    }
    x -= string_length / 2;
    for (let iText = 0; iText < text.length; iText++) {
        const letter = text[iText];
        if (isJapanese(letter)) {
            buildText({ctx, size: 43, x: lastSize + x, y, color, align, font: 'sawarabigothic', text: letter});
            ctx.font = 'sawarabigothic';
            lastSize += ctx.measureText(letter).width;
        } else if (isKorean(letter)) {
            buildText({ctx, size: 46, x: lastSize + x, y, color, align, font: 'ibmplexsansKR', text: letter});
            ctx.font = 'ibmplexsansKR';
            lastSize += ctx.measureText(letter).width;
        } else if (isThai(letter)) {
            buildText({ctx, size: 68, x: lastSize + x, y, color, align, font: 'aksaramatee', text: letter});
            ctx.font = 'aksaramatee';
            lastSize += ctx.measureText(letter).width;
        } else if (isVietnamese(letter)) {
            buildText({ctx, size: 46, x: lastSize + x, y, color, align, font: 'opensansR', text: letter});
            ctx.font = 'opensansR';
            lastSize += ctx.measureText(letter).width;
        } else {
            buildText({ctx, size, x: lastSize + x, y, color, align, text: letter});
            lastSize += ctx.measureText(letter).width;
        }
    }
};
function isJapanese(text) {
    return text.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/) ? true : false;
}
function isThai(text) {
    return text.match(/[\u0E00-\u0E7F]/) ? true : false;
}
function isKorean(text) {
    return text.match(/[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/) ? true : false;
}
function isVietnamese(text) {
    return text.match(/[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/)
        ? true
        : false;
}
