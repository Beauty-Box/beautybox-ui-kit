import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';

import ImageUserAvatar from './index';

export default { title: 'image', decorators: [withKnobs] };

export const imageUserAvatar = () => ({
    components: { ImageUserAvatar },
    props: {
        image: {
            default: text(
                'image',
                'https://images.unsplash.com/photo-1594899088250-49f2bf880d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
            ),
        },
        size: {
            default: number('size', 60),
        },
        square: {
            default: boolean('square', false),
        },
        name: {
            default: text('name', ''),
        },
        color: {
            default: text('color', 'grey lighten-4'),
        },
        imgType: {
            default: text('imgType', 'user'),
        },
    },
    template: '<image-user-avatar v-bind="$props"></image-user-avatar>',
});
