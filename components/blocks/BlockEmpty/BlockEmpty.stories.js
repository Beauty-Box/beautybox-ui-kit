import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import BBlockEmpty from './index';

export default { title: 'blocks' };

export const BlockEmpty = () => ({
    components: { BBlockEmpty },
    props: {
        icon: {
            default: text('icon', 'empty-star'),
        },
        title: {
            default: text('title', 'Тестовый заголовок'),
        },
        text: {
            default: text('text', 'Тестовый текст'),
        },
        textWidth: {
            default: text('textWidth', '35'),
        },
        center: {
            default: boolean('center', false),
        },
        bigSize: {
            default: boolean('bigSize', false),
        },
    },
    template: '<b-block-empty v-bind="$props" />',
});

BlockEmpty.storyName = 'BlockEmpty';
BlockEmpty.parameters = { jest: ['BlockEmpty.spec.js'] };
BlockEmpty.decorators = [withKnobs];
