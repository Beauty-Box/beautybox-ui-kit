import { withKnobs, text } from '@storybook/addon-knobs';

import Checkbox from './index';

export default { title: 'forms/selection-controls', decorators: [withKnobs] };

export const checkbox = () => ({
    components: { Checkbox },
    props: {
        label: {
            default: text('label', 'Элемент 1'),
        },
    },
    template: '<checkbox v-bind="$props"></checkbox>',
});

checkbox.story = {
    parameters: {
        jest: ['Checkbox.spec.js'],
    },
};
