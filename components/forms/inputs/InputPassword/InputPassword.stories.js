import { withKnobs, text, boolean, array, number } from '@storybook/addon-knobs';

import BInputPassword from './index';

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const password = () => ({
    components: { BInputPassword },
    props: {
        label: {
            default: text('label', 'Пароль'),
        },
        placeholder: {
            default: text('placeholder', 'Введите пароль'),
        },
        name: {
            default: text('name', 'password'),
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
    template: '<b-input-password value="password" v-bind="$props"/>',
});

password.story = {
    parameters: {
        jest: ['InputPassword.spec.js'],
    },
};
