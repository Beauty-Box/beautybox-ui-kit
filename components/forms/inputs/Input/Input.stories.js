import { withKnobs, text, boolean, array, number } from '@storybook/addon-knobs';

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
        appendIcon: {
            default: text('appendIcon', 'search'),
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
    template: '<b-input v-bind="$props" />',
});

simple.story = {
    parameters: {
        jest: ['Input.spec.js'],
    },
};
