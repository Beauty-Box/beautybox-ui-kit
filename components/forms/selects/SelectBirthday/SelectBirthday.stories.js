import { withKnobs } from '@storybook/addon-knobs';

import BSelectBirthday from './index';

export const SelectBirthday = () => ({
    components: { BSelectBirthday },
    template: '<b-select-birthday v-bind="$props" label="test" />',
});

SelectBirthday.storyName = 'SelectBirthday';
SelectBirthday.parameters = { jest: ['SelectBirthday.spec.js'] };
SelectBirthday.decorators = [withKnobs];
