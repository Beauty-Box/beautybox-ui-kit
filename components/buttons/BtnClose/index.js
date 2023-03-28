import './BtnClose.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';
import VSvg from '../../icons/Svg';
import BSvg from '../../icons/BSvg.vue';

export default {
    name: 'BBtnClose',
    components: { VBtn, VIcon, VSvg, BSvg },
    props: {
        ...VBtn.options.props,
        size: {
            ...VBtn.options.size,
            type: [Number, String],
            default: 40,
        },
        hasBg: {
            type: Boolean,
            default: false,
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
    computed: {
        svgComponent() {
            return !!require ? 'v-svg' : 'b-svg';
        },
    },
    render(h) {
        let children = [];
        if (this.hasBg) {
            children.push(h('v-icon', { props: { size: this.size / 1.3 } }, 'close'));
        } else {
            children.push(
                h(this.svgComponent, {
                    props: { name: 'close' },
                    attrs: { style: { width: this.size / 2, height: this.size / 2 } },
                })
            );
        }

        return h(
            'v-btn',
            {
                class: {
                    'c-btn-close': true,
                    'c-btn-close--bg': this.hasBg,
                },
                props: {
                    hasBg: this.hasBg,
                    width: this.size,
                    ripple: this.ripple,
                    minWidth: this.size,
                    height: this.size,
                    small: this.small,
                    light: this.light,
                    tile: this.tile,
                    text: this.text,
                },
                on: this.$listeners,
            },
            children
        );
    },
};
