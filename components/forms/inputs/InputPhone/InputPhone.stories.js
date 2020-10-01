import { withKnobs, text, boolean, array, number } from '@storybook/addon-knobs';
import BInputPhone from './index';

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const phone = () => ({
    components: { BInputPhone },
    props: {
        label: {
            default: text('label', 'Телефон'),
        },
        placeholder: {
            default: text('placeholder', 'Введите телефон'),
        },
        error: {
            default: boolean('errorState', false),
        },
        color: {
            default: text('color', 'info'),
        },
        height: {
            default: number('height', 56),
        },
        outlined: {
            default: boolean('outlined', false),
        },
        hint: {
            default: text('hint', ''),
        },
        maxlength: {
            default: text('maxlength', '5'),
        },
        hideDetails: {
            default: boolean('hideDetails', false),
        },
        errorMessages: {
            default: array('errors array', []),
        },
        small: {
            default: boolean('small', false),
        },
        rounded: {
            default: boolean('rounded', false),
        },
    },
    template: '<b-input-phone v-bind="$props"/>',
});

phone.story = {
    parameters: {
        jest: ['InputPhone.spec.js'],
    },
};
