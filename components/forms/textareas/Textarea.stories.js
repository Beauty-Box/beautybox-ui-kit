import { withKnobs, text } from '@storybook/addon-knobs';

import BTextarea from './index';

export default { title: 'forms/textareas' };

export const Simple = () => ({
    components: { BTextarea },
    props: {
        label: {
            default: text('label', 'Текст'),
        },
    },
    template: '<b-textarea v-bind="$props" >rounded</b-textarea>',
});

Simple.storyName = 'Simple';
Simple.parameters = { jest: ['SimpleSlider.spec.js'] };
Simple.decorators = [withKnobs];
