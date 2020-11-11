import BInput from '../Input';
import { mask } from 'vue-the-mask';

export default {
    name: 'InputPhone',
    components: { BInput },
    directives: {
        mask,
    },
    props: {
        label: {
            type: String,
            default: 'Телефон',
        },
    },
    data: () => ({
        customTokens: {
            mask: '+Y (###) ###-##-##',
            tokens: {
                Y: {
                    pattern: /\d/,
                    transform: (v) => {
                        if (v != '7') {
                            if (v == '8') {
                                return (v = '7');
                            } else {
                                return (v = `7${v}`);
                            }
                        } else {
                            return v;
                        }
                    },
                },
                '#': { pattern: /\d/ },
            },
        },
        masked: true,
    }),
    computed: {
        attributes() {
            return {
                ...this.$attrs,
                label: this.label,
            };
        },
    },
    render(h) {
        return h('b-input', {
            on: this.$listeners,
            attrs: { ...this.attributes, type: 'tel' },
            directives: [
                {
                    name: 'mask',
                    value: this.customTokens,
                },
            ],
        });
    },
};
