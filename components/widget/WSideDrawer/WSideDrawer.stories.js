import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import WSideDrawer from './index';

export default { title: 'widgets', decorators: [withKnobs] };

export const sideDrawer = () => ({
    components: { WSideDrawer },
    props: {
        value: {
            default: boolean('value', true),
        },
        withOutFooter: {
            default: boolean('withOutFooter', false),
        },
        title: {
            default: text('title', ''),
        },
    },
    template: '<w-side-drawer v-bind="$props"></w-side-drawer>',
});
