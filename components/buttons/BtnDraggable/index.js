import './style.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import BSvg from '../../icons/Svg';

export default {
    name: 'BBtnDraggable',
    components: { VBtn, BSvg },
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
            default: 'hamburger',
        },
        iconSize: {
            type: [String, Number],
            default: 28,
        },
    },
    render(h) {
        return h(
            'v-btn',
            {
                attrs: {
                    type: this.type,
                },
                props: {
                    icon: true,
                    large: true,
                    ripple: false,
                },
                class: {
                    'c-btn-draggable': true,
                    [this.color + '--text']: true,
                },
                on: this.$listeners,
            },
            [
                h('b-svg', {
                    props: {
                        size: this.iconSize,
                        color: this.color,
                        name: this.icon,
                    },
                }),
            ]
        );
    },
};
