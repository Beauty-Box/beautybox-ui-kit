import { withKnobs, text } from '@storybook/addon-knobs';

import BTextarea from './index';

export default { title: 'forms/textareas', decorators: [withKnobs] };

export const simple = () => ({
    components: { BTextarea },
    props: {
        label: {
            default: text('label', 'Текст'),
        },
    },
    template: '<b-textarea v-bind="$props" >rounded</b-textarea>',
});

simple.story = {
    parameters: {
        jest: ['Textarea.spec.js'],
    },
};
