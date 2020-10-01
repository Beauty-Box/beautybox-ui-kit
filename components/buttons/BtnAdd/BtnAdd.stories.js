import { withKnobs, radios, boolean, text } from '@storybook/addon-knobs';

import BtnAdd from './index';
export default { title: 'buttons', decorators: [withKnobs] };

export const addButton = () => ({
    components: { BtnAdd },
    props: {
        transition: {
            default: radios(
                'transition',
                {
                    slideYReverseTransition: 'slide-y-reverse-transition',
                    slideYTransition: 'slide-y-transition',
                    slideXTransition: 'slide-x-transition',
                    slideXReverseTransition: 'slide-x-reverse-transition',
                },
                'slide-y-reverse-transition'
            ),
        },
        dark: {
            default: boolean('dark', true),
        },
        forever: {
            default: boolean('forever', true),
        },
        color: {
            default: text('color', 'primary'),
        },
        ripple: {
            default: boolean('ripple', false),
        },
    },
    template: '<btn-add v-bind="$props"></btn-add>',
});

addButton.story = {
    parameters: {
        jest: ['BtnAdd.spec.js'],
    },
};
