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
        color: {
            default: text('color', 'info'),
        },
        error: {
            default: boolean('errorState', false),
        },
        errorMessages: {
            default: array('errors array', []),
        },
        height: {
            default: number('height', 56),
        },
        hideDetails: {
            default: boolean('hideDetails', false),
        },
        hint: {
            default: text('hint', ''),
        },
        maxlength: {
            default: text('maxlength', 'auto'),
        },
        outlined: {
            default: boolean('outlined', true),
        },
        rounded: {
            default: boolean('rounded', false),
        },
        small: {
            default: boolean('small', false),
        },
    },
    template: '<b-input-phone v-bind="$props"/>',
});

phone.parameters = {
    jest: ['InputPhone.spec.js'],
};
