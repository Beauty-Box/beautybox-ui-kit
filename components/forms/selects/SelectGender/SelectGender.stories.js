import { withKnobs } from '@storybook/addon-knobs';

import BSelectGender from './index';

export const SelectGender = () => ({
    components: { BSelectGender },
    template: '<b-select-gender lable="test" />',
});

SelectGender.storyName = 'SelectGender';
SelectGender.parameters = { jest: ['SelectGender.spec.js'] };
SelectGender.decorators = [withKnobs];
