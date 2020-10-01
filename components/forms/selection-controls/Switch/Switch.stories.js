import BSwitch from './index';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default { title: 'forms/selection-controls', decorators: [withKnobs] };

export const BeautySwitch = () => ({
    components: { BSwitch },
    props: {
        label: {
            default: text('label', 'Переключатель'),
        },
        disabled: {
            default: boolean('disabled', false),
        },
    },
    template: '<b-switch v-bind="$props"></b-switch>',
});

BeautySwitch.story = {
    parameters: {
        jest: ['Switch.spec.js'],
    },
};
