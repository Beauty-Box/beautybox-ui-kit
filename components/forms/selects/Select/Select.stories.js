import { withKnobs, array, text } from '@storybook/addon-knobs';

import BSelect from './index';

export const Simple = () => ({
    components: { BSelect },
    props: {
        items: {
            default: array('items', ['Элемент 1', 'Элемент 2']),
        },
        label: {
            default: text('label', 'Выберите элемент'),
        },
    },
    template: '<b-select v-bind="$props"/>',
});

Simple.storyName = 'Simple';
Simple.parameters = { jest: ['Simple.spec.js'] };
Simple.decorators = [withKnobs];
