import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import BtnCopy from './index';

export default { title: 'buttons', decorators: [withKnobs] };

export const copyButton = () => ({
    components: { BtnCopy },
    props: {
        message: {
            default: text('message', 'Скопировать'),
        },
        copyText: {
            default: text('copyText', 'Hello, world!'),
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
            default: boolean('text', true),
        },
        color: {
            default: text('color', ''),
        },
    },
    template: '<btn-copy v-bind="$props">{{ message }}</btn-copy>',
});

copyButton.story = {
    parameters: {
        jest: ['BtnCopy.spec.js'],
    },
};
