import { withKnobs, text } from '@storybook/addon-knobs';

import BInput from './index';
import {inputStoriesMixins} from '../mixins'

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const simple = () => ({
    components: { BInput },
    mixins: [inputStoriesMixins],
    props: {
        label: {
            default: text('label', 'Текст'),
        },
        placeholder: {
            default: text('placeholder', 'Введите текст'),
        },
    },
    template: '<b-input v-bind="$props" />',
});

simple.story = {
    parameters: {
        jest: ['Input.spec.js'],
    },
};
