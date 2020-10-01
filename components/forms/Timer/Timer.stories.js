import { withKnobs, text } from '@storybook/addon-knobs';
import Timer from './index';

export default { title: 'forms/timers', decorators: [withKnobs] };

export const simple = () => ({
    components: { Timer },
    props: {
        time: {
            default: text('time', 100),
        },
    },
    template: '<timer v-bind="$props"></timer>',
});

simple.story = {
    parameters: {
        jest: ['Timer.spec.js'],
    },
};
