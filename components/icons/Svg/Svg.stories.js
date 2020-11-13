import { text, withKnobs } from '@storybook/addon-knobs';
import BSvg from './index';

export default { title: 'icons' };

export const Svg = () => ({
    components: { BSvg },
    props: {
        name: {
            default: text('name', 'user'),
        },
    },
    template: '<b-svg v-bind="$props" />',
});

Svg.storyName = 'Svg';
Svg.parameters = { jest: ['Svg.spec.js'] };
Svg.decorators = [withKnobs];
