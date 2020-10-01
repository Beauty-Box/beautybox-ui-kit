import VTextarea from 'vuetify/lib/components/VTextarea';

export default {
    name: 'Textarea',
    extends: VTextarea,
    props: {
        autoGrow: {
            ...VTextarea.options.props.autoGrow,
            default() {
                return !!this.$vuetify.breakpoint.mobile;
            },
        },
        color: {
            ...VTextarea.options.props.color,
            default() {
                return this.$vuetify.breakpoint.mobile ? 'info' : 'secondary';
            },
        },
        outlined: {
            ...VTextarea.options.props.outlined,
            default: true,
            // default() {
            //     return !this.$vuetify.breakpoint.mobile || this.rounded;
            // },
        },
        rows: {
            ...VTextarea.options.props.rows,
            default() {
                return !!this.$vuetify.breakpoint.mobile ? 1 : 5;
            },
        },
    },
    computed: {
        classes() {
            return {
                ...VTextarea.options.computed.classes.call(this),
                'form-items-inline': true,
                'primary--text': true,
            };
        },
    },
};
