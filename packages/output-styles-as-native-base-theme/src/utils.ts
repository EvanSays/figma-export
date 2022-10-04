/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
// const sanitizeText = (text: string): string => {
//     return text
//         .replace(/^[^\S\r\n]+/gm, '')
//         .replace(/^\*/gm, ' *')
//         .replace(/^"/gm, '  "');
// };

// const writeComment = (message: string): string => {
//     return message && `/**
//                         * ${message.replace(/\*\//g, '').split('\n').join('\n  * ')}
//                         */`;
// };

type StyleFormat = {
    [key: string]: string
}
// const createVariable = (name: string, value: string): StyleFormat => {
//     // eslint-disable-next-line default-case
//     console.log("name", name)
//     console.log("value", value)
//     return { [name]: value };
// };

export const writeVariable = (name: string, value: string): StyleFormat => {
    if (value) {
        return { [name]: value };
    }

    return {};
};

export const rgba2hex = (orig: string): string => {
    const rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    if (rgb) {
        const red = Number(rgb[1]);
        const green = Number(rgb[2]);
        const blue = Number(rgb[3]);
        const hex = rgb ? (red | 1 << 8).toString(16).slice(1)
            + (green | 1 << 8).toString(16).slice(1)
            + (blue | 1 << 8).toString(16).slice(1) : orig;
        return `#${hex}`;
    }

    return '';
};
