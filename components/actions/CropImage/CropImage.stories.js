import { withKnobs, text, object, boolean } from '@storybook/addon-knobs';

import CropImage from './index';

export default { title: 'actions', decorators: [withKnobs] };

export const cropImage = () => ({
    components: { CropImage },
    props: {
        image: {
            default: text(
                'image',
                'https://images.unsplash.com/photo-1595132169434-097c5ae1a145?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
            ),
        },
        crop: {
            default: object('crop', { x: 0, y: 0, width: 400, height: 400 }),
        },
        box: {
            default: boolean('box', false),
        },
    },
    template: '<crop-image v-bind="$props"></crop-image>',
});
