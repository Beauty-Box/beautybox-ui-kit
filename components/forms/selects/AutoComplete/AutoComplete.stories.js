import { text, boolean, array, withKnobs } from '@storybook/addon-knobs';

import BAutoComplete from './index';

export const AutoComplete = () => ({
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

AutoComplete.storyName = 'AutoComplete';
AutoComplete.parameters = { jest: ['AutoComplete.spec.js'] };
AutoComplete.decorators = [withKnobs];
