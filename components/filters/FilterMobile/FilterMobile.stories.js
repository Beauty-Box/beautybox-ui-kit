import { withKnobs, boolean } from '@storybook/addon-knobs';

import FilterMobile from './index';

export default { title: 'filters', decorators: [withKnobs] };

export const filterMobile = () => ({
    components: { FilterMobile },
    props: {
        value: {
            default: boolean('value', true),
        },
        withOutFooter: {
            default: boolean('withOutFooter', false),
        },
    },
    template: '<filter-mobile v-bind="$props"></filter-mobile>',
});

filterMobile.story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
};
