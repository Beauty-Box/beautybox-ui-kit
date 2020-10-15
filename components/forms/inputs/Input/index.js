import VTextField from 'vuetify/lib/components/VTextField';
import '../style/input.scss';

export default {
    name: 'FInput',
    inheritAttrs: false,
    extends: VTextField,
    props: {
        ...VTextField.options.props,
        color: {
            ...VTextField.options.props.color,
            default() {
                return this.$vuetify.breakpoint.mobile ? 'info' : 'secondary';
            },
        },
        height: {
            ...VTextField.options.props.height,
            default: 56,
        },
        outlined: {
            ...VTextField.options.props.outlined,
            default: true,
            // default() {
            //     return !this.$vuetify.breakpoint.mobile || this.rounded;
            // },
        },
        hint: {
            ...VTextField.options.props.hint,
            default: '',
        },
        maxlength: {
            type: [Number, String],
            default: 'auto',
        },
        autocomplete: {
            type: String,
            default: 'on',
        },
        autofocus: {
            ...VTextField.options.props.autofocus,
            default: false,
        },
    },
    computed: {
        classes() {
            return {
                ...VTextField.options.computed.classes.call(this),
                'c-input': true,
                'c-input--small': this.small,
                'c-input--price': this.currency,
                'c-input--clearable': this.clearable,
                'placeholder-is-visible': this.placeholder && !this.label,
            };
        },
    },
};
