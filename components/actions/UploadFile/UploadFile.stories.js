import { withKnobs, text, array } from '@storybook/addon-knobs';

import UploadFile from './index';

export default { title: 'actions', decorators: [withKnobs] };

export const uploadFile = () => ({
    components: { UploadFile },
    props: {
        accept: {
            default: array('accept', ['image/*']),
        },
    },
    template: '<upload-file v-bind="$props"></upload-file>',
});
