export const selectProps = (module) => {
    return {
        props: {
            /*appendIcon: {
                ...module.options.props.appendIcon,
                default() {
                    if (this.$vuetify.breakpoint.mobile) {
                        return this.disabled ? '⌀' : 'arrow_drop_down';
                    } else {
                        return 'arrow_drop_down';
                    }
                },
            },*/
            height: {
                ...module.options.props.height,
                default: 56,
            },
            color: {
                ...module.options.props.color,
                default() {
                    return this.$vuetify.breakpoint.mobile ? 'info' : 'secondary';
                },
            },
            dense: {
                ...module.options.props.dense,
                default() {
                    return !this.$vuetify.breakpoint.mobile;
                },
            },
            outlined: {
                ...module.options.props.outlined,
                default: true,
            },
            menuProps: {
                ...module.options.props.menuProps,
                default() {
                    return {
                        auto: true,
                        closeOnClick: true,
                        nudgeLeft: -16,
                    };
                },
            },
        },
    };
};
