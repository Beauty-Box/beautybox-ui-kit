import { withKnobs } from '@storybook/addon-knobs';

import BSelectColor from './index';

export const SelectColor = () => ({
    components: { BSelectColor },
    template: '<b-select-color v-bind="$props" />',
});

SelectColor.storyName = 'SelectColor';
// SelectColor.parameters = { jest: ['SelectColor.spec.js'] };
SelectColor.decorators = [withKnobs];
