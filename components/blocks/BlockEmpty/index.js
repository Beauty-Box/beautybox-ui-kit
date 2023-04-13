import './BlockEmpty.scss';
import svgComponentMixin from '../../../mixins/svgComponent.mixin';

import { isNumber } from '@beautybox/core/utils';

export default {
    name: 'BlockEmpty',
    mixins: [svgComponentMixin],
    props: {
        icon: {
            type: String,
            default: '',
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
        titleNormal: {
            type: Boolean,
            deafult: false,
        },
    },

    render(h) {
        const textWidth = isNumber(this.textWidth) ? `${this.textWidth}ch` : this.textWidth;
        let children = [this.$slots.image];

        if (!this.$slots.image && this.icon) {
            children.push(
                h(this.svgComponent, {
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
                            'c-empty__title--normal': this.titleNormal,
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
