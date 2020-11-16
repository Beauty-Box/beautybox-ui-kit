import './BlockEmpty.scss';

import VSvg from '../../icons/Svg';
import { isNumber } from '@beautybox/core/utils';

export default {
    name: 'BlockEmpty',
    components: { VSvg },
    props: {
        icon: {
            type: String,
            default: 'user',
        },
        title: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
        center: {
            type: Boolean,
            default: false,
        },
        bigSize: {
            type: Boolean,
            default: false,
        },
        textWidth: {
            type: [String, Number],
            default: '35',
        },
    },
    render(h) {
        const textWidth = isNumber(this.textWidth) ? `${this.textWidth}ch` : this.textWidth;
        let children = [this.$slots.image];

        if (!this.$slots.image && this.icon) {
            children.push(
                h('v-svg', {
                    class: {
                        'icon c-empty__icon': true,
                        ['icon-' + this.icon]: true,
                    },
                    props: {
                        name: this.icon,
                    },
                    slot: 'image',
                })
            );
        }

        if (this.title.length) {
            children.push(
                h(
                    'h4',
                    {
                        class: {
                            'c-empty__title': true,
                        },
                        style: {
                            maxWidth: textWidth,
                        },
                    },
                    [this.title]
                )
            );
        }

        if (this.text.length) {
            children.push(
                h(
                    'p',
                    {
                        class: {
                            'c-empty__text': true,
                        },
                        style: {
                            maxWidth: textWidth,
                        },
                    },
                    [this.text]
                )
            );
        }

        if (this.$slots.buttons) {
            children.push(this.$slots.buttons);
        }

        return h(
            'div',
            {
                class: {
                    'c-empty': true,
                    'c-empty--centre': this.center,
                    'c-empty--big': this.bigSize,
                },
            },
            children
        );
    },
};
