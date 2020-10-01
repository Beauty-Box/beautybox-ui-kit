import { withKnobs, text, radios, number, boolean } from '@storybook/addon-knobs';

import BlockLoader from './index';

export default { title: 'loaders', decorators: [withKnobs] };

export const blockLoader = () => ({
    components: { BlockLoader },
    template: '<block-loader v-bind="$props"></block-loader>',
    props: {
        color: {
            default: text('color', 'primary'),
        },
        className: {
            default: text('className', ''),
        },
        position: {
            default: radios('position', {
                fixed: 'fixed',
                absolute: 'absolute',
                relative: 'relative',
                static: 'static',
                sticky: 'sticky',
            }),
        },
        bgc: {
            default: text('bgc', 'transparent'),
        },
        zIndex: {
            default: number('zIndex', 10),
        },
        indeterminate: {
            default: boolean('indeterminate', true),
        },
        size: {
            default: number('size', 50),
        },
        width: {
            default: number('width', 3),
        },
    },
});
