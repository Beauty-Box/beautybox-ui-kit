import { withKnobs, text, number, array, boolean } from '@storybook/addon-knobs';

import BInputSecurityCode from './index';

export default { title: 'forms/inputs', decorators: [withKnobs] };

export const securityCode = () => ({
    components: { BInputSecurityCode },
    props: {
        blurOnComplete: {
            default: boolean('blurOnComplete', false),
        },
        securityCodeLength: {
            default: number('securityCodeLength', 4),
        },
        bg: {
            default: text('bg', '#F7F7F8'),
        },
        error: {
            default: boolean('error', false),
        },
        errorMessages: {
            default: array('errorsArray', []),
        },
    },
    template: '<b-input-security-code v-bind="$props" value="1234" />',
});

securityCode.parameters = {
    jest: ['InputSecurityCode.spec.js'],
};
