import { withKnobs, text, boolean, array, number } from '@storybook/addon-knobs';

import BInputSearch from './index';

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const search = () => ({
    components: { BInputSearch },
    props: {
        label: {
            default: text('label', 'Поиск'),
        },
        placeholder: {
            default: text('placeholder', 'Введите поисковый запрос'),
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
    template: '<b-input-search v-bind="$props" />',
});

search.story = {
    parameters: {
        jest: ['InputSearch.spec.js'],
    },
};
