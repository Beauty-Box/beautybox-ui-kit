import './BtnRemove.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';

export default {
    name: 'BBtnRemove',
    components: { VBtn, VIcon },
    props: {
        ...VBtn.options.props,
        size: {
            ...VBtn.options.size,
            type: [Number, String],
            default: 40,
        },
        icon: {
            type: String,
            default: 'close',
        },
        iconColor: {
            type: String,
            default: 'error',
        },
        ripple: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: true,
        },
        light: {
            type: Boolean,
            default: true,
        },
        tile: {
            type: Boolean,
            default: true,
        },
        text: {
            type: Boolean,
            default: true,
        },
        animateRotate: {
            type: Boolean,
            default: false,
        },
    },
    render(h) {
        return h(
            'v-btn',
            {
                class: {
                    'c-btn-remove': true,
                    'c-btn-remove--animate-rotate': this.animateRotate,
                },
                props: {
                    ...this.$props,
                    width: this.size,
                    minWidth: this.size,
                    height: this.size,
                    small: this.small,
                    light: this.light,
                    tile: this.tile,
                    text: this.text,
                },
                on: this.$listeners,
            },
            [
                h(
                    'v-icon',
                    {
                        props: {
                            size: this.size,
                            color: this.iconColor,
                        },
                    },
                    [this.icon]
                ),
            ]
        );
    },
};
