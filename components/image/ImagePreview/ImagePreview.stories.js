import { withKnobs, array } from '@storybook/addon-knobs';

import ImagePreview from './index';

export default { title: 'image', decorators: [withKnobs] };

const photos = [
    'https://images.unsplash.com/photo-1594552072238-b8a33785b261?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1595134975524-68a20e51bf39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
];

export const imagePreview = () => ({
    components: { ImagePreview },
    props: {
        data: {
            default: array('data', photos),
        },
    },
    template: '<image-preview v-bind="$props"></image-preview>',
});
