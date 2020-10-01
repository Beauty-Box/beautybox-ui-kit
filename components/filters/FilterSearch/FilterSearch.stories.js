import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';

import FilterSearch from './index';

export default { title: 'filters', decorators: [withKnobs] };

export const filterSearch = () => ({
    components: { FilterSearch },
    props: {
        solo: {
            default: boolean('solo', true),
        },
        dense: {
            default: boolean('dense', true),
        },
        label: {
            default: text('label', 'Имя или телефон'),
        },
        icon: {
            default: text('icon', 'search'),
        },
        height: {
            default: number('height', 44),
        },
        flat: {
            default: boolean('flat', false),
        },
        type: {
            default: text('type', 'search'),
        },
        permission: {
            default: text('permission', ''),
        },
    },
    template: '<filter-search v-bind="$props"></filter-search>',
});
