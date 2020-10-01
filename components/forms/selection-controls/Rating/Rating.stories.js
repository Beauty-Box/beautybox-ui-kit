import { withKnobs, text } from '@storybook/addon-knobs';

import Rating from './index';

export default { title: 'forms/selection-controls', decorators: [withKnobs] };

export const rating = () => ({
    components: { Rating },
    props: {
        color: {
            default: text('color', 'orange'),
        },
        backgroundColor: {
            default: text('backgroundColor', 'grey lighten-2'),
        },
    },
    template: '<rating v-bind="$props" />',
});

rating.story = {
    parameters: {
        jest: ['Rating.spec.js'],
    },
};
