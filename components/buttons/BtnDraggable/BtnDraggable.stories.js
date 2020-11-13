import { withKnobs, number, text } from '@storybook/addon-knobs';

import BBtnDraggable from './index';

export const DraggableButton = () => ({
    components: { BBtnDraggable },
    props: {
        iconSize: {
            default: number('iconSize', 22),
        },
        color: {
            default: text('color', 'secondary'),
        },
        icon: {
            default: text('icon', 'menu'),
        },
    },
    template: '<b-btn-draggable v-bind="$props"></b-btn-draggable>',
});

DraggableButton.storyName = 'DraggableButton';
DraggableButton.parameters = { jest: ['DraggableButton.spec.js'] };
DraggableButton.decorators = [withKnobs];
