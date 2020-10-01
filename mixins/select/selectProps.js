export const selectProps = (module) => {
    return {
        props: {
            appendIcon: {
                ...module.options.props.appendIcon,
                default() {
                    if (this.$vuetify.breakpoint.smAndDown) {
                        return this.disabled ? '⌀' : 'arrow_drop_down';
                    } else {
                        return 'arrow_drop_down';
                    }
                },
            },
            height: {
                ...module.options.props.height,
                default: 56,
            },
            color: {
                ...module.options.props.color,
                default() {
                    return this.$vuetify.breakpoint.smAndDown ? 'info' : 'secondary';
                },
            },
            dense: {
                ...module.options.props.dense,
                default() {
                    return !this.$vuetify.breakpoint.smAndDown;
                },
            },
            outlined: {
                ...module.options.props.dense,
                default: true,
                /*default() {
                    return !this.$vuetify.breakpoint.smAndDown;
                },*/
            },
            menuProps: {
                ...module.options.props.menuProps,
                default: 'auto',
            },
        },
    };
};
