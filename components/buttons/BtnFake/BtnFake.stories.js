import { withKnobs, text } from '@storybook/addon-knobs';
import BBtnFake from './index';

export const FakeButton = () => ({
    components: { BBtnFake },
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
    template: '<b-btn-fake v-bind="$props" v-on="$listeners"></b-btn-fake>',
});

FakeButton.storyName = 'FakeButton';
FakeButton.parameters = { jest: ['FakeButton.spec.js'] };
FakeButton.decorators = [withKnobs];
