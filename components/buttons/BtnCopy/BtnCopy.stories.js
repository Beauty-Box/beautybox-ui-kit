import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import BBtnCopy from './index';

export const CopyButton = () => ({
    components: { BBtnCopy },
    props: {
        copyText: {
            default: text('copyText', 'Hello, world!'),
        },
        color: {
            default: text('color', 'primary'),
        },
        small: {
            default: boolean('small', false),
        },
        outlined: {
            default: boolean('outlined', false),
        },
        icon: {
            default: boolean('icon', false),
        },
        disabled: {
            default: boolean('disabled', false),
        },
        block: {
            default: boolean('block', false),
        },
        depressed: {
            default: boolean('depressed', false),
        },
        text: {
            default: boolean('text', false),
        },
        large: {
            default: boolean('large', true),
        },
    },
    template: '<b-btn-copy v-bind="$props">Скопировать</b-btn-copy>',
});

CopyButton.storyName = 'CopyButton';
CopyButton.parameters = { jest: ['CopyButton.spec.js'] };
CopyButton.decorators = [withKnobs];
