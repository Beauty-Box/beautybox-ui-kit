import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';

import BottomSheetSimple from './index';

export default { title: 'bottom-sheets', decorators: [withKnobs] };

export const simple = () => ({
    components: { BottomSheetSimple },
    props: {
        selected: {
            default: text('selected', 'asdf'),
        },
        titleDropdown: {
            default: text('titleDropdown', 'dropdown'),
        },
        value: {
            default: boolean('value', false),
        },
        label: {
            default: text('label', ''),
        },
        clearable: {
            default: boolean('clearable', false),
        },
        title: {
            default: text('title', ''),
        },
        subTitle: {
            default: text('subTitle', ''),
        },
        subTitleDropdown: {
            default: text('subTitleDropdown', ''),
        },
        hideOverlay: {
            default: boolean('hideOverlay', false),
        },
        closeBtn: {
            default: boolean('closeBtn', false),
        },
        errorMessages: {
            default: array('errorMessages', []),
        },
    },
    template: '<bottom-sheet-simple v-bind="$props"></bottom-sheet-simple>',
});
