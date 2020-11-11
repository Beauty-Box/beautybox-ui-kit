import { withKnobs, text, boolean, array, number } from '@storybook/addon-knobs';

import BInputPhone from './index';
import {inputStoriesMixins} from '../mixins'

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const phone = () => ({
    components: { BInputPhone },
    mixins: [inputStoriesMixins],
    props: {
        label: {
            default: text('label', 'Телефон'),
        },
        placeholder: {
            default: text('placeholder', 'Введите телефон'),
        },
    },
    template: '<b-input-phone v-bind="$props"/>',
});

phone.story = {
    parameters: {
        jest: ['InputPhone.spec.js'],
    },
};
