import * as FigmaExport from '@figma-export/types';
import { kebabCase } from '@figma-export/utils';

import { writeVariable, rgba2hex } from './utils';
import { Extension } from './types';

import fs = require('fs');
import path = require('path');

type Options = {
    output: string;
    getExtension?: () => Extension;
    getFilename?: () => string;
    getVariableName?: (style: FigmaExport.Style) => string;
}

type Colors = {
    [key: string]: string;
}

type Obj = {
    colors: Colors
}

export = ({
    output,
    getExtension = () => 'json',
    getFilename = () => '_variables',
    getVariableName = (style) => kebabCase(style.name).toLowerCase(),
}: Options): FigmaExport.StyleOutputter => {
    return async (styles) => {
        const extension = getExtension();

        const obj:Obj = {
            colors: {},
            // typography: {
            //     letterSpacings: {},
            //     lineHeights: {},
            //     fontWeights: {},
            //     fontSizes: {},
            //     fontConfig: {},
            // },
        };

        styles.forEach((style) => {
            if (style.visible) {
                const variableName = getVariableName(style);

                // eslint-disable-next-line default-case
                switch (style.styleType) {
                    case 'FILL': {
                        const value = style.fills
                            .filter((fill) => fill.visible)
                            .map((fill) => fill.value)
                            .join(', ');
                        obj.colors = { ...obj.colors, ...writeVariable(variableName, rgba2hex(value)) };
                        break;
                    }

                    case 'EFFECT': {
                        // const visibleEffects = style.effects.filter((effect) => effect.visible);

                        // const boxShadowValue = visibleEffects
                        //     .filter((effect) => effect.type === 'INNER_SHADOW' || effect.type === 'DROP_SHADOW')
                        //     .map((effect) => effect.value)
                        //     .join(', ');

                        // const filterBlurValue = visibleEffects
                        //     .filter((effect) => effect.type === 'LAYER_BLUR')
                        //     .map((effect) => effect.value)
                        //     .join(', ');

                        // Shadow and Blur effects cannot be combined together since they use two different CSS properties.
                        // text += writeVariable(style.comment, variableName, boxShadowValue || filterBlurValue);
                        // obj = {};
                        break;
                    }

                    case 'TEXT': {
                        // const value = `(
                        //     "font-family": "${style.style.fontFamily}",
                        //     "font-size": ${style.style.fontSize}px,
                        //     "font-style": ${style.style.fontStyle},
                        //     "font-variant": ${style.style.fontVariant},
                        //     "font-weight": ${style.style.fontWeight},
                        //     "letter-spacing": ${style.style.letterSpacing}px,
                        //     "line-height": ${style.style.lineHeight}px,
                        //     "text-align": ${style.style.textAlign},
                        //     "text-decoration": ${style.style.textDecoration},
                        //     "text-transform": ${style.style.textTransform},
                        //     "vertical-align": ${style.style.verticalAlign}
                        // )`;

                        // text += writeVariable(style.comment, variableName, value);
                        // obj = {};
                        break;
                    }
                }
            }
        });

        const ordered = Object.keys(obj.colors).sort().reduce((acc, key) => {
            return { ...acc, [key]: obj.colors[key] };
        }, {});

        obj.colors = ordered;

        const filePath = path.resolve(output);
        fs.mkdirSync(filePath, { recursive: true });
        fs.writeFileSync(path.resolve(filePath, `${getFilename()}.${extension.toLowerCase()}`), JSON.stringify(obj, null, 2), 'utf-8');
    };
};
