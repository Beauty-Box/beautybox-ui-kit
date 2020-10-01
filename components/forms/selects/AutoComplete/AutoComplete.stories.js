import { text, boolean, array, withKnobs } from '@storybook/addon-knobs';

import BAutoComplete from './index';

export default { title: 'forms/selects', decorators: [withKnobs] };

export const autoComplete = () => ({
    components: { BAutoComplete },
    props: {
        clearable: {
            default: boolean('clearable', true),
        },
        label: {
            default: text('label', 'Выберите элементы'),
        },
        items: {
            default: array('items', ['Элемент 1', 'Элемент 2']),
        },
    },
    template: '<b-auto-complete v-bind="$props" />',
});

autoComplete.story = {
    parameters: {
        jest: ['AutoComplete.spec.js'],
    },
};
