/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */

type StyleFormat = {
    [key: string]: string
}

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

export const sortStringsOrNumbers = (arr: string[] | number[]) => {
    return arr.sort();
};

type Mapping = {
    [key: string]: string
}
export const fontWeightMapping = (fontWeights: Set<number>) => {
    const mappings: Mapping = {
        100: 'hairline',
        200: 'thin',
        300: 'light',
        400: 'normal',
        500: 'medium',
        600: 'semibold',
        700: 'bold',
        800: 'extrabold',
        900: 'black',
        950: 'extraBlack',
    };
    const sorted: number[] = Array.from(new Set(fontWeights)).sort();
    return sorted.reduce((acc, key) => {
        return { ...acc, [key]: mappings[key] };
    }, {});
};

export const sizeMapping = (sizes: Set<number>) => {
    const mappings: Mapping = {
        10: '2xs',
        12: 'xs',
        14: 'sm',
        16: 'md',
        18: 'lg',
        20: 'xl',
        24: '2xl',
        26: '3xl',
        28: '4xl',
        32: '5xl',
        40: '6xl',
        80: '7xl',
        96: '8xl',
        128: '9xl',
    };
    const sorted: number[] = Array.from(new Set(sizes)).sort();
    return sorted.reduce((acc, key) => {
        return { ...acc, [mappings[key]]: key };
    }, {});
};

export const letterSpaceMapping = (spacing: Set<number>) => {
    const sorted: number[] = Array.from(new Set(spacing)).sort();
    return sorted.reduce((acc, num) => {
        const percentage = Math.floor(num * 100);
        return { ...acc, [percentage]: num };
    }, {});
};
