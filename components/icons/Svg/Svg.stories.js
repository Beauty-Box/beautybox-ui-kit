import BSvg from './index';
import { text, withKnobs } from '@storybook/addon-knobs';

export default { title: 'icons', decorators: [withKnobs] };

export const user = () => ({
    components: { BSvg },
    props: {
        name: {
            default: text('name', 'user'),
        },
    },
    template: '<b-svg v-bind="$props" />',
});
