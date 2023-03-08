import './BtnDraggable.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';
// import VSvg from '../../icons/Svg';

export default {
    name: 'BBtnDraggable',
    components: { VBtn, VIcon },
    props: {
        type: {
            type: String,
            default: 'button',
        },
        color: {
            type: String,
            default: 'secondary',
        },
        icon: {
            type: String,
            default: 'menu',
        },
        iconSize: {
            type: [String, Number],
            default: 22,
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
                /*h('v-svg', {
                    props: {
                        size: this.iconSize,
                        color: this.color,
                        name: this.icon,
                    },
                }),*/
                h(
                    'v-icon',
                    {
                        props: {
                            size: this.iconSize,
                            color: this.color,
                        },
                    },
                    [this.icon]
                ),
            ]
        );
    },
};
