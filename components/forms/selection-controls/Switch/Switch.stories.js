import BSwitch from './index';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export const Switch = () => ({
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

Switch.storyName = 'Switch';
Switch.parameters = { jest: ['Switch.spec.js'] };
Switch.decorators = [withKnobs];
