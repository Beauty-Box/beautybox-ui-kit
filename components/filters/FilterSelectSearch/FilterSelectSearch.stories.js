import { withKnobs, array, text, object } from '@storybook/addon-knobs';

import FilterSelectSearch from './index';

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

export const filterSelectSearch = () => ({
    components: { FilterSelectSearch },
    props: {
        label: {
            default: text('label', ''),
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
            default: text('permission', ''),
        },
    },
    template: '<filter-select-search v-bind="$props"></filter-select-search>',
});
