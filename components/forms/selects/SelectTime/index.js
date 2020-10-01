import FSelect from '../Select';
const VIcon = () => import(/* webpackChunkName: "VIcon" */ 'vuetify/lib/components/VIcon');
import { genFullTime } from '@beautybox/utils';
import './styles.scss';

export default {
    name: 'FSelectTime',
    extends: FSelect,
    components: { FSelect, VIcon },
    props: {
        startWith: {
            type: [Number, String],
            default: 0,
        },
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: 'gender',
        },
        blockTime: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        elements() {
            return genFullTime(parseInt(this.startWith));
        },
    },
    render(h) {
        return h('f-select', {
            attrs: {
                ...this.$attrs,
                value: this.value,
                items: this.elements,
                name: this.name,
                label: this.label,
            },
            on: this.$listeners,
            scopedSlots: {
                selection: (props) => {
                    let children = [
                        h('input', {
                            domProps: { value: props.item },
                            attrs: {
                                type: 'text',
                                readonly: 'readonly',
                            },
                        }),
                    ];
                    if (this.blockTime.includes(props.item)) {
                        children.push(
                            h(
                                'v-icon',
                                { class: 'b-select-time__icon b-select-time__icon--error' },
                                'schedule'
                            )
                        );
                    }
                    return h('div', { class: 'b-select-time__item' }, children);
                },
                item: (props) => {
                    let children = [h('span', props.item)];
                    if (this.blockTime.includes(props.item)) {
                        children.push(
                            h(
                                'v-icon',
                                { class: 'b-select-time__icon b-select-time__icon--error' },
                                'schedule'
                            )
                        );
                    }
                    return h('div', { class: 'b-select-time__item' }, children);
                },
            },
        });
    },
};
