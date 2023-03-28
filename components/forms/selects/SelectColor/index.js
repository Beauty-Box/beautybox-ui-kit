import VChipGroup from 'vuetify/lib/components/VChipGroup/VChipGroup';
import VChip from 'vuetify/lib/components/VChip/VChip';
import svgComponentMixin from '../../../../mixins/svgComponent.mixin';

export default {
    name: 'BSelectColor',
    components: {
        VChipGroup,
        VChip,
    },
    mixins: [svgComponentMixin],
    props: {
        items: {
            type: Array,
            default: () => [
                '#fe0061',
                '#ab00b6',
                '#3c4ebc',
                '#0096fb',
                '#00bfd8',
                '#f76c66',
                '#00b341',
                '#c9df00',
                '#718831',
                '#ff9300',
                '#91c8ae',
                '#009988',
                '#f7c659',
                '#00F4EF',
                '#9131F7',
            ],
        },
        value: {
            type: String,
            default: '',
            validator(value) {
                return (
                    value === '' || /^#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)
                );
            },
        },
    },
    created() {
        this.setDefault();
    },
    methods: {
        setDefault() {
            if (this.value === '') {
                this.$emit('input', this.items[0]);
            }
        },
    },
    render(h) {
        const self = this;
        const children = this.items.map((item) => {
            return h(
                'v-chip',
                {
                    key: item,
                    attrs: {
                        color: item,
                        large: true,
                        value: item,
                    },
                    style: { height: '42px', width: '42px' },
                },
                [
                    h(this.svgComponent, {
                        attrs: {
                            name: 'checked--bold',
                        },
                    }),
                ]
            );
        });
        return h(
            'v-chip-group',
            {
                attrs: {
                    mandatory: true,
                    column: !this.$vuetify.breakpoint.mobile,
                    activeClass: 'select-color__selected',
                },
                class: { 'select-color': true },
                props: {
                    value: this.value,
                },
                on: {
                    change(value) {
                        self.$emit('input', value);
                    },
                },
            },
            children
        );
    },
};
