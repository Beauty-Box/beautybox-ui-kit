import { withKnobs, text } from '@storybook/addon-knobs';
import BtnFake from './index';

export default { title: 'buttons', decorators: [withKnobs] };

export const fakeButton = () => ({
    components: { BtnFake },
    props: {
        title: {
            default: text('title', ''),
        },
        subTitle: {
            default: text('subTitle', ''),
        },
        iconSvg: {
            default: text('iconSvg', 'angle'),
        },
        type: {
            default: text('type', 'button'),
        },
    },
    template: '<btn-fake v-bind="$props" v-on="$listeners"></btn-fake>',
});

fakeButton.story = {
    parameters: {
        jest: ['BtnFake'],
    },
};
