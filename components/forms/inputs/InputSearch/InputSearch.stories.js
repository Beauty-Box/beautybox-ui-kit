import { withKnobs, text, boolean, array, number } from '@storybook/addon-knobs';

import BInputSearch from './index';
import {inputStoriesMixins} from '../mixins'

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const search = () => ({
    components: { BInputSearch },
    mixins: [inputStoriesMixins],
    props: {
        label: {
            default: text('label', 'Поиск'),
        },
        placeholder: {
            default: text('placeholder', 'Введите поисковый запрос'),
        },
    },
    template: '<b-input-search v-bind="$props" />',
});

search.story = {
    parameters: {
        jest: ['InputSearch.spec.js'],
    },
};
