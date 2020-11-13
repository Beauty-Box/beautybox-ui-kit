import { withKnobs, number, text } from '@storybook/addon-knobs';

import BBtnIcon from './index';

export const IconButton = () => ({
    components: { BBtnIcon },
    props: {
        icon: {
            default: text('icon', 'phone'),
        },
        iconColor: {
            default: text('iconColor', 'success'),
        },
        iconSize: {
            default: number('iconSize', 40),
        },
        width: {
            default: number('width', 60),
        },
        height: {
            default: number('height', 60),
        },
    },
    template: '<b-btn-icon v-bind="$props" />',
});

IconButton.storyName = 'IconButton';
IconButton.parameters = { jest: ['IconButton.spec.js'] };
IconButton.decorators = [withKnobs];
