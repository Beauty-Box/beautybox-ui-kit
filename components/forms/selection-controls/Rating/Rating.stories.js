import { withKnobs, text } from '@storybook/addon-knobs';

import BRating from './index';

export const Rating = () => ({
    components: { BRating },
    props: {
        color: {
            default: text('color', 'orange'),
        },
        backgroundColor: {
            default: text('backgroundColor', 'grey lighten-2'),
        },
    },
    template: '<b-rating v-bind="$props" />',
});

Rating.storyName = 'Rating';
Rating.parameters = { jest: ['Rating.spec.js'] };
Rating.decorators = [withKnobs];
