import { withKnobs, text } from '@storybook/addon-knobs';

import BInputPassword from './index';
import {inputStoriesMixins} from '../mixins'

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const password = () => ({
    components: { BInputPassword },
    mixins: [inputStoriesMixins],
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
    },
    template: '<b-input-password value="password" v-bind="$props"/>',
});

password.story = {
    parameters: {
        jest: ['InputPassword.spec.js'],
    },
};
