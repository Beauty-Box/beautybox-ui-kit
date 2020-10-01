import BlockAlert from './index';

import { withKnobs, text } from '@storybook/addon-knobs';

export default { title: 'blocks', decorators: [withKnobs] };

export const blockAlert = () => ({
    components: { BlockAlert },
    props: {
        color: {
            default: text('color', '#E8F6FF'),
        },
        shadow: {
            default: text('shadow', '#2b72bd33'),
        },
        icon: {
            default: text('icon', 'info'),
        },
        iconColor: {
            default: text('iconColor', '#2B72BD'),
        },
        title: {
            default: text('title', ''),
        },
        description: {
            default: text('description', 'Lorem ipsum dolor sit amet'),
        },
    },
    template: '<block-alert v-bind="$props"></block-alert>',
});
