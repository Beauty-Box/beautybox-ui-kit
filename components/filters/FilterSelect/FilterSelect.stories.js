import { withKnobs, text, array, object, boolean } from '@storybook/addon-knobs';

import FilterSelect from './index';

export default { title: 'filters', decorators: [withKnobs] };

const items = [
    {
        value: 0,
        text: 'Элемент 0',
    },
    {
        value: 1,
        text: 'Элемент 1',
    },
    {
        value: 2,
        text: 'Элемент 2',
    },
    {
        value: 3,
        text: 'Элемент 3',
    },
    {
        value: 4,
        text: 'Элемент 4',
    },
];

export const filterselect = () => ({
    components: { FilterSelect },
    props: {
        label: {
            default: text('label', ''),
        },
        placeholder: {
            default: text('placeholder', ''),
        },
        items: {
            default: array('items', items),
        },
        itemText: {
            default: text('itemText', 'text'),
        },
        itemValue: {
            default: text('itemValue', 'value'),
        },
        firstItem: {
            default: object('firstItem', items[0]),
        },
        permission: {
            default: text('permissions', ''),
        },
        clearable: {
            default: boolean('clearable', false),
        },
    },
    template: '<filter-select v-bind="$props"></filter-select>',
});
