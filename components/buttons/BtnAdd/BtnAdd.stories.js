import { withKnobs, radios, boolean, text } from '@storybook/addon-knobs';

import BBtnAdd from './index';

export const AddButton = () => ({
    components: { BBtnAdd },
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
    template: '<b-btn-add v-bind="$props"></b-btn-add>',
});

AddButton.storyName = 'AddButton';
AddButton.parameters = { jest: ['AddButton.spec.js'] };
AddButton.decorators = [withKnobs];
