import './style.scss';

import VProgressCircular from 'vuetify/lib/components/VProgressCircular';
import { isNumber } from '@beautybox/core/utils';

export default {
    name: 'BBlockLoader',
    components: { VProgressCircular },
    props: {
        bgc: {
            type: String,
            default: 'transparent',
        },
        color: {
            type: String,
            default: 'primary',
        },
        position: {
            type: String,
            default: 'absolute',
            validator(value) {
                return ['fixed', 'absolute', 'relative', 'static', 'sticky'].indexOf(value) !== -1;
            },
        },
        minHeight: {
            type: [Number, String],
            default: 'auto',
        },
        maxHeight: {
            type: [Number, String],
            default: 'auto',
        },
        zIndex: {
            type: [String, Number],
            default: 10,
        },
        size: {
            type: [String, Number],
            default: 50,
        },
        width: {
            type: Number,
            default: 3,
        },
        indeterminate: {
            type: Boolean,
            default: true,
        },
    },
    render(h) {
        return h(
            'div',
            {
                class: {
                    'c-loader': true,
                },
                style: {
                    '--bg-color': this.bgc,
                    '--position': this.position,
                    '--z-index': this.zIndex,
                    '--min-height': isNumber(this.minHeight)
                        ? this.minHeight + 'px'
                        : this.minHeight,
                    '--max-height': isNumber(this.maxHeight)
                        ? this.maxHeight + 'px'
                        : this.maxHeight,
                },
            },
            [
                h('div', [
                    h('v-progress-circular', {
                        props: {
                            color: this.color,
                            indeterminate: this.indeterminate,
                            size: this.size,
                            width: this.width,
                        },
                    }),
                ]),
            ]
        );
    },
};
