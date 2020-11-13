import './style.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';

export default {
    name: 'BBtnIcon',
    components: { VBtn, VIcon },
    props: {
        ...VBtn.options.props,
        iconSize: {
            ...VBtn.options.size,
            type: [Number, String],
            default: 40,
        },
        icon: {
            type: String,
            default: '',
        },
        width: {
            type: [String, Number],
            default: '40',
        },
        height: {
            type: [String, Number],
            default: '40',
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
    },
    render(h) {
        return h(
            'v-btn',
            {
                class: {
                    'c-btn-icon': true,
                },
                props: {
                    width: this.width,
                    minWidth: this.width,
                    height: this.height,
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
                            size: this.iconSize,
                            color: this.iconColor,
                        },
                    },
                    [this.icon]
                ),
            ]
        );
    },
};
