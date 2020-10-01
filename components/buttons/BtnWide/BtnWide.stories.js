import { withKnobs, text, number } from '@storybook/addon-knobs';

import BtnWide from './index';

export default { title: 'buttons', decorators: [withKnobs] };

export const wideButton = () => ({
    components: { BtnWide },
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
    template: '<btn-wide v-bind="$props"></btn-wide>',
});

wideButton.story = {
    parameters: {
        jest: ['BtnWide.spec.js'],
    },
};
