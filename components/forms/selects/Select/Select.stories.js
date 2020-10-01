import { withKnobs, array, text } from '@storybook/addon-knobs';

import BSelect from './index';
import BSelectBirthday from '../SelectBirthday';

export default { title: 'forms/selects', decorators: [withKnobs] };

export const simple = () => ({
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

simple.story = {
    parameters: {
        jest: ['Select.spec.js'],
    },
};
