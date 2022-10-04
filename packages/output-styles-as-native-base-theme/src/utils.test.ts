import { expect } from 'chai';

import { writeVariable, rgba2hex } from './utils';

describe('utils', () => {
    describe('writeVariable', () => {
        describe('json', () => {
            it('should return empty obj is the value is empty', () => {
                const text = writeVariable(
                    'variable-name',
                    '',
                );

                expect(text).to.eql({});
            });

            it('should be able to print-out simple variable', () => {
                const text = writeVariable(
                    'variable-name',
                    '#fff',
                );

                expect(text).to.eql({ 'variable-name': '#fff' });
            });

            it('should convert rgba to hex 6', () => {
                const hex = rgba2hex('rgba(81, 69, 158, 1)');
                expect(hex).to.eql('#51459e');
            });

            // it('should be able to print-out simple variable with an empty comment', () => {
            //     const text = writeVariable('', 'variable-name', '#fff');
            //     expect(text).to.eql('\n\n$variable-name: #fff;\n');
            // });

            // it('should be able to print-out a comment in multiline', () => {
            //     const text = writeVariable(
            //         'This is a comment\nin two lines',
            //         'variable-name',
            //         '#fff',
            //     );

            //     expect(text).to.eql(
            //         // eslint-disable-next-line indent
            //           '\n'
            //         + '/**\n'
            //         + ' * This is a comment\n'
            //         + ' * in two lines\n'
            //         + ' */\n'
            //         + '$variable-name: #fff;\n',
            //     );
            // });

            // it('should be able to print-out a complex variable (like a sass:map)', () => {
            //     const text = writeVariable(
            //         'This is a comment\nin two lines',
            //         'variable-name',
            //         '(\n"color-1": #fff,\n"color-2": #000\n)',
            //     );

            //     expect(text).to.eql(
            //         // eslint-disable-next-line indent
            //           '\n'
            //         + '/**\n'
            //         + ' * This is a comment\n'
            //         + ' * in two lines\n'
            //         + ' */\n'
            //         + '$variable-name: (\n'
            //         + '  "color-1": #fff,\n'
            //         + '  "color-2": #000\n'
            //         + ');\n',
            //     );
            // });
        });

        // describe('SASS', () => {
        //     const extension = 'SASS';

        //     it('should return empty string is the value is empty', () => {
        //         const text = writeVariable(
        //             'This is a comment',
        //             'variable-name',
        //             '',
        //             extension,
        //         );

        //         expect(text).to.eql('');
        //     });

        //     it('should be able to print-out simple variable', () => {
        //         const text = writeVariable(
        //             'This is a comment',
        //             'variable-name',
        //             '#fff',
        //             extension,
        //         );

        //         expect(text).to.eql(
        //             // eslint-disable-next-line indent
        //               '\n'
        //             + '/**\n'
        //             + ' * This is a comment\n'
        //             + ' */\n'
        //             + '$variable-name: #fff\n',
        //         );
        //     });

        //     it('should be able to print-out simple variable with an empty comment', () => {
        //         const text = writeVariable('', 'variable-name', '#fff', extension);
        //         expect(text).to.eql('\n\n$variable-name: #fff\n');
        //     });

        //     it('should be able to print-out a comment in multiline', () => {
        //         const text = writeVariable(
        //             'This is a comment\nin two lines',
        //             'variable-name',
        //             '#fff',
        //             extension,
        //         );

        //         expect(text).to.eql(
        //             // eslint-disable-next-line indent
        //               '\n'
        //             + '/**\n'
        //             + ' * This is a comment\n'
        //             + ' * in two lines\n'
        //             + ' */\n'
        //             + '$variable-name: #fff\n',
        //         );
        //     });

        //     it('should be able to print-out a complex variable (like a sass:map)', () => {
        //         const text = writeVariable(
        //             'This is a comment\nin two lines',
        //             'variable-name',
        //             '(\n"color-1": #fff,\n"color-2": #000\n)',
        //             extension,
        //         );

        //         expect(text).to.eql(
        //             // eslint-disable-next-line indent
        //               '\n'
        //             + '/**\n'
        //             + ' * This is a comment\n'
        //             + ' * in two lines\n'
        //             + ' */\n'
        //             + '$variable-name: ( "color-1": #fff, "color-2": #000 )\n',
        //         );
        //     });
        // });
    });
});
