import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import BSideDrawer from './index';

export default { title: 'widgets', decorators: [withKnobs] };

export const sideDrawer = () => ({
    components: { BSideDrawer },
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
    template: '<b-side-drawer v-bind="$props"></b-side-drawer>',
});
