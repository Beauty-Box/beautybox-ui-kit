const SORT_FILTERS = [
    {
        text: 'Сначала новые',
        value: 'newest',
    },
    {
        text: 'Сначала старые',
        value: 'oldest',
    },
    {
        text: 'Сначала дорогие',
        value: 'most expensive',
    },
    {
        text: 'Сначала дешевые',
        value: 'cheapest',
    },
];

const STATUS_FILTERS = [
    {
        text: 'Все товары',
        value: 0,
    },
    {
        text: 'В наличии',
        value: 1,
    },
    {
        text: 'Не в наличии',
        value: 2,
    },
];

export { SORT_FILTERS, STATUS_FILTERS };
export default { SORT_FILTERS, STATUS_FILTERS };
