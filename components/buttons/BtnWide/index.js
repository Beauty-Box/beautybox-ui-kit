import './BtnWide.scss';

import VIcon from 'vuetify/lib/components/VIcon';

export default {
    name: 'BBtnWide',
    components: { VIcon },
    props: {
        type: {
            type: String,
            default: 'button',
        },
        color: {
            type: String,
            default: 'info',
        },
        icon: {
            type: String,
            default: 'control_point',
        },
        iconSize: {
            type: [String, Number],
            default: 28,
        },
    },
    computed: {
        textColor() {
            return `${this.iconColor}--text`;
        },
    },
    render(h, context) {
        return h(
            'button',
            {
                attrs: {
                    type: this.type,
                },
                class: {
                    'c-btn-wide': true,
                    [this.color + '--text']: true,
                },
                on: this.$listeners,
            },
            [
                h('span', this.$slots.default),
                h(
                    'v-icon',
                    {
                        props: {
                            size: this.iconSize,
                            color: this.color,
                        },
                        class: {
                            'ml-auto': true,
                        },
                    },
                    [this.icon]
                ),
            ]
        );
    },
};
