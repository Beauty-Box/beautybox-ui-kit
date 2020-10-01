import { withKnobs, text, boolean, number, array } from '@storybook/addon-knobs';

import BInput from './index';

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const simple = () => ({
    components: { BInput },
    props: {
        label: {
            default: text('label', 'Текст'),
        },
        placeholder: {
            default: text('placeholder', 'Введите текст'),
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
    template: '<b-input v-bind="$props" />',
});

simple.story = {
    parameters: {
        jest: ['Input.spec.js'],
    },
};
