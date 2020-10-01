import { withKnobs, array } from '@storybook/addon-knobs';

import UploadFileResize from './index';

export default { title: 'actions', decorators: [withKnobs] };

export const uploadFileResize = () => ({
    components: { UploadFileResize },
    props: {
        accept: {
            default: array('accept', ['image/*']),
        },
    },
    template: '<upload-file-resize v-bind="$props"></upload-file-resize>',
});
