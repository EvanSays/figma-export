import * as FigmaExport from '@figma-export/types';
import { kebabCase } from '@figma-export/utils';

import {
    rgba2hex, fontWeightMapping, fontSizeMapping,
} from './utils';
import { Extension } from './types';

import fs = require('fs');
import path = require('path');

type Options = {
    output: string;
    getExtension?: () => Extension;
    getFilename?: () => string;
    getVariableName?: (style: FigmaExport.Style) => string;
}

type Weights = {
    [key: string]: string;
}

type Colors = {
    [key: string]: Weights;
}

type FontWeight = {
    [type: string]: string;
}

type FontSize = {
    [type: string]: string
}

type Obj = {
    colors: Colors;
    fontSizes: FontSize;
    letterSpacings: string[];
    lineHeights: string[]
    fontWeights: FontWeight;
    // fontConfig: Theme;
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
            fontWeights: {},
            fontSizes: {},
            letterSpacings: [],
            lineHeights: [],
            // fontConfig: {},
        };

        const fontWeights = new Set<number>();
        const fontSizes = new Set<number>();
        // const letterSpacings = new Set<string>();
        // const lineHeights = new Set<string>();

        styles.forEach((style) => {
            if (style.visible) {
                const variableName = getVariableName(style);

                // eslint-disable-next-line default-case
                switch (style.styleType) {
                    case 'FILL': {
                        const filterOutColors = /(gradient)|(greyscale)|(transparent)/;
                        if (variableName.match(filterOutColors)) {
                            break;
                        }

                        const value = style.fills
                            .filter((fill) => fill.visible)
                            .map((fill) => fill.value)
                            .join(', ');

                        // move to a helper function for separating names from weights.
                        const lastHyphen = variableName.lastIndexOf('-');
                        const name = variableName.substring(0, lastHyphen);
                        const weight = variableName.substring(lastHyphen + 1);

                        obj.colors = { ...obj.colors, [name]: { ...obj.colors[name], [weight]: rgba2hex(value) } };
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
                        // const {
                        //     fontWeight, fontSize, letterSpacing, lineHeight,
                        // }: { fontWeight: string, fontSize: string, letterSpacing: string, lineHeight: string} = style.style;
                        const {
                            fontWeight,
                            fontSize,
                        }: { fontWeight: number, fontSize: number } = style.style;

                        fontWeights.add(fontWeight);
                        fontSizes.add(fontSize);
                        // letterSpacings.add(letterSpacing);
                        // lineHeights.add(lineHeight);
                        break;
                    }
                }
            }
        });

        obj.fontWeights = fontWeightMapping(fontWeights);
        obj.fontSizes = fontSizeMapping(fontSizes);
        // obj.letterSpacings = Array.from(new Set(letterSpacings)).sort();
        // obj.lineHeights = Array.from(new Set(lineHeights)).sort();

        const filePath = path.resolve(output);
        fs.mkdirSync(filePath, { recursive: true });
        fs.writeFileSync(path.resolve(filePath, `${getFilename()}.${extension.toLowerCase()}`), JSON.stringify(obj, null, 2), 'utf-8');
    };
};
