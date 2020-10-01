import BRadioGenders from './index';

import { withKnobs, array } from '@storybook/addon-knobs';

export default { title: 'forms/selection-controls', decorators: [withKnobs] };

const genders = [
    {
        title: 'Мужской',
        genderID: 0,
    },
    {
        title: 'Женский',
        genderID: 1,
    },
    {
        title: 'Небинарный',
        genderID: 2,
    },
];

export const radioGenders = () => ({
    components: { BRadioGenders },
    props: {
        data: {
            default: array('data', genders),
        },
    },
    template: '<b-radio-genders v-bind="$props"></b-radio-genders>',
});

radioGenders.story = {
    parameters: {
        jest: ['RadioGenders.spec.js'],
    },
};
