import { withKnobs, array } from '@storybook/addon-knobs';
import BRadioGenders from './index';

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

export const RadioGenders = () => ({
    components: { BRadioGenders },
    props: {
        data: {
            default: array('items', genders),
        },
    },
    template: '<b-radio-genders v-bind="$props"></b-radio-genders>',
});

RadioGenders.storyName = 'RadioGenders';
RadioGenders.parameters = { jest: ['RadioGenders.spec.js'] };
RadioGenders.decorators = [withKnobs];
