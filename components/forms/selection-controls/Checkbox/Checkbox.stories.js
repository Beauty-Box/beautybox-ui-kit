import { withKnobs, text } from '@storybook/addon-knobs';

import BCheckbox from './index';

export const Checkbox = () => ({
    components: { BCheckbox },
    props: {
        label: {
            default: text('label', 'Элемент 1'),
        },
    },
    template: '<b-checkbox v-bind="$props"></b-checkbox>',
});

Checkbox.storyName = 'Checkbox';
Checkbox.parameters = { jest: ['Checkbox.spec.js'] };
Checkbox.decorators = [withKnobs];
