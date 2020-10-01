import Input from '../Input';

export default {
    name: 'InputSearch',
    extends: Input,
    props: {
        autocomplete: {
            type: String,
            default: 'on',
        },
        appendIcon: {
            ...Input.props.appendIcon,
            default: 'search',
        },
        /*height: {
            ...Input.props.height,
            default() {
                return this.$vuetify.breakpoint.mobile ? 44 : 56;
            },
        },*/
        /*rounded: {
            ...Input.props.rounded,
            default() {
                return !!this.$vuetify.breakpoint.mobile;
            },
        },*/
        /*small: {
            ...Input.props.small,
            default() {
                return !!this.$vuetify.breakpoint.mobile;
            },
        },*/
    },
    computed: {
        classes() {
            return {
                ...Input.computed.classes.call(this),
                'c-input': true,
                'c-input--small': this.small,
                'c-input--price': this.currency,
                'c-input--clearable': this.clearable,
                'placeholder-is-visible': this.placeholder && !this.label,
            };
        },
    },
};
