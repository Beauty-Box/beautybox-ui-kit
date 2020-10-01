import { withKnobs } from '@storybook/addon-knobs';

import UploadAvatar from './index';

export default { title: 'actions', decorators: [withKnobs] };

export const uploadAvatar = () => ({
    components: { UploadAvatar },
    template: '<upload-avatar></upload-avatar>',
});
