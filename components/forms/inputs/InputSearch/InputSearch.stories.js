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
    template: '<b-input-search v-bind="$props" />',
});

search.story = {
    parameters: {
        jest: ['InputSearch.spec.js'],
    },
};
