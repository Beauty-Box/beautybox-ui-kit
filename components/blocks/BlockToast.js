import VSnackbar from 'vuetify/lib/components/VSnackbar';
let types = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
};

export default {
    name: 'block-toast',
    extends: VSnackbar,
    props: {
        top: {
            ...VSnackbar.options.props.top,
            default: true,
        },
        color: {
            ...VSnackbar.options.props.color,
            default() {
                return types[this.typed];
            },
        },
        typed: {
            type: String,
            required: true,
            validator(value) {
                return !!types[value];
            },
        },
        app: {
            ...VSnackbar.options.props.app,
            default: true,
        },
    },
};
