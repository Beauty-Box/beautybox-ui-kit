import { withKnobs } from '@storybook/addon-knobs';

import BSelectBirthday from './index';

export default { title: 'forms/selects', decorators: [withKnobs] };

export const birthday = () => ({
    components: { BSelectBirthday },
    template: '<b-select-birthday v-bind="$props" label="test" />',
});

birthday.story = {
    parameters: {
        jest: ['SelectBirthday.spec.js'],
    },
};
