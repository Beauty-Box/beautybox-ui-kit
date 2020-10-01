import { withKnobs, text, boolean, number, array } from '@storybook/addon-knobs';
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
            default: text('maxlength', 'auto'),
        },
        hideDetails: {
            default: boolean('hideDetails', false),
        },
        name: {
            default: text('name', 'password'),
        },
        label: {
            default: text('label', 'Пароль'),
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
    template: '<b-input-password value="password" v-bind="$props"/>',
});

password.story = {
    parameters: {
        jest: ['InputPassword.spec.js'],
    },
};
