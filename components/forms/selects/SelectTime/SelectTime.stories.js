import { withKnobs, text } from '@storybook/addon-knobs';

import BSelectTime from './index';

export const SelectTime = () => ({
    components: { BSelectTime },
    props: {
        label: text('label', 'Выберите время'),
    },
    template: '<b-select-time :label="label" />',
});

SelectTime.storyName = 'SelectTime';
// SelectTime.parameters = { jest: ['SelectTime.spec.js'] };
SelectTime.decorators = [withKnobs];
