import { withKnobs, text, number } from '@storybook/addon-knobs';

import BBtnWide from './index';

export const WideButton = () => ({
    components: { BBtnWide },
    props: {
        text: {
            default: text('text', ''),
        },
        type: {
            default: text('type', 'button'),
        },
        icon: {
            default: text('icon', 'add_circle'),
        },
        iconColor: {
            default: text('iconColor', 'primary'),
        },
        iconSize: {
            default: number('iconSize', 28),
        },
        iconSvg: {
            default: text('plus--filled'),
        },
    },
    template: '<b-btn-wide v-bind="$props"></b-btn-wide>',
});

WideButton.storyName = 'WideButton';
WideButton.parameters = { jest: ['WideButton.spec.js'] };
WideButton.decorators = [withKnobs];
