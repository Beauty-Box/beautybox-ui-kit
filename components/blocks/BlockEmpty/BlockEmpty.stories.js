import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import BlockEmpty from './index';

export default { title: 'blocks', decorators: [withKnobs] };

export const blockEmpty = () => ({
    components: { BlockEmpty },
    props: {
        icon: {
            default: text('icon', ''),
        },
        title: {
            default: text('title', ''),
        },
        text: {
            default: text('text', ''),
        },
        center: {
            default: boolean('center', false),
        },
        bigSize: {
            default: boolean('bigSize', false),
        },
    },
    template: '<b-block-empty v-bind="$props"></b-block-empty>',
});
