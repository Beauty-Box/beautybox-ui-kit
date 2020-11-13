import { withKnobs, number, text } from '@storybook/addon-knobs';

import BBtnRemove from './index';

export const RemoveButton = () => ({
    components: { BBtnRemove },
    props: {
        size: {
            default: number('size', 40),
        },
        icon: {
            default: text('icon', 'close'),
        },
        iconColor: {
            default: text('iconColor', 'error'),
        },
    },
    template: '<b-btn-remove v-bind="$props"></b-btn-remove>',
});

RemoveButton.storyName = 'RemoveButton';
RemoveButton.parameters = { jest: ['RemoveButton.spec.js'] };
RemoveButton.decorators = [withKnobs];
