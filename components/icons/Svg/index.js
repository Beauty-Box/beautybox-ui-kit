import './Svg.scss';

export default {
    name: 'BSvg',
    inheritAttrs: false,
    render(h) {
        return h(
            'svg',
            {
                class: this.classes,
                style: this.styles,
                attrs: {
                    xmlns: 'http://www.w3.org/2000/svg',
                    'aria-labelledby': this.name,
                    focusable: false,
                    role: 'img',
                    ...this.$attrs,
                },
            },
            [
                h('use', {
                    attrs: {
                        href: this.iconPath,
                        xmlns: 'http://www.w3.org/2000/svg',
                    },
                }),
            ]
        );
    },
    props: {
        fill: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        xs: {
            type: Boolean,
            default: false,
        },
        sm: {
            type: Boolean,
            default: false,
        },
        md: {
            type: Boolean,
            default: false,
        },
        lg: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return {
                icon: true,
                ['icon-' + this.name]: this.name,
                'icon--xs': this.xs,
                'icon--sm': this.sm,
                'icon--md': this.md,
                'icon--lg': this.lg,
            };
        },
        styles() {
            return {
                fill: this.fill,
            };
        },
        iconPath() {
            let icon = require(`../../../assets/spriteSVG/${this.name}.svg`);
            if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
                icon = icon.default;
            }
            return icon.url;
        },
    },
};
