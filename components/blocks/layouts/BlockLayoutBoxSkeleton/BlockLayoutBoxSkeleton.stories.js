import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import BBlockLayoutBoxSkeleton from './index';

export const BlockLayoutBoxSkeleton = () => ({
    components: { BBlockLayoutBoxSkeleton },
    props: {
        loading: {
            default: boolean('loading', true),
        },
        hideHeader: {
            default: boolean('hideHeader', false),
        },
        title: {
            default: text('title', 'Title'),
        },
        titleIsSmall: {
            default: boolean('titleIsSmall', false),
        },
        hideTitle: {
            default: boolean('hideTitle', false),
        },
        description: {
            default: text('description', 'Description test paragraph'),
        },
        btnText: {
            default: text('btnText', 'Show map'),
        },
        btnIsVisible: {
            default: boolean('btnIsVisible', true),
        },
    },
    template: `<b-block-layout-box-skeleton v-bind="$props">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, perspiciatis.
                        </b-block-layout-box-skeleton>`,
});

BlockLayoutBoxSkeleton.storyName = 'BlockLayoutBoxSkeleton';
BlockLayoutBoxSkeleton.parameters = { jest: ['BlockLayoutBoxSkeleton.spec.js'] };
BlockLayoutBoxSkeleton.decorators = [withKnobs];
