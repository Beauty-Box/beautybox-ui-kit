import { withKnobs } from '@storybook/addon-knobs';

import BSelectGender from './index';

export default { title: 'forms/selects', decorators: [withKnobs] };

export const gender = () => ({
    components: { BSelectGender },
    template: '<b-select-gender lable="test" />',
});

gender.story = {
    parameters: {
        jest: ['SelectGender.spec.js'],
    },
};
