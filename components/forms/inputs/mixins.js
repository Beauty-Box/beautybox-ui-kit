import { array, boolean, number, text } from '@storybook/addon-knobs';

export const inputStoriesMixins = {
    props: {
        color: {
            default: text('color', 'info'),
        },
        error: {
            default: boolean('errorState', false),
        },
        errorMessages: {
            default: array('errors array', []),
        },
        height: {
            default: number('height', 56),
        },
        hideDetails: {
            default: boolean('hideDetails', false),
        },
        hint: {
            default: text('hint', ''),
        },
        maxlength: {
            default: text('maxlength', 'auto'),
        },
        outlined: {
            default: boolean('outlined', true),
        },
        rounded: {
            default: boolean('rounded', false),
        },
        small: {
            default: boolean('small', false),
        },
    },
}
