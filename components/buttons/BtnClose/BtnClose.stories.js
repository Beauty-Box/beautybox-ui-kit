import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import BBtnClose from './index';

export const CloseButton = () => ({
    components: { BBtnClose },
    props: {
        size: {
            default: number('size', 40),
        },
        hasBg: {
            default: boolean('hasBg', false),
        },
    },
    template: '<b-btn-close v-bind="$props"></b-btn-close>',
});

CloseButton.storyName = 'CloseButton';
CloseButton.parameters = { jest: ['CloseButton.spec.js'] };
CloseButton.decorators = [withKnobs];
