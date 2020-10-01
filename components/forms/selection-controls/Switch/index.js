import VSwitch from 'vuetify/lib/components/VSwitch';

export default {
    name: 'BSwitch',
    extends: VSwitch,
    computed: {
        input: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
    props: {
        disabled: {
            type: Boolean,
            default: null,
        },
        name: {
            type: String,
            default: '',
        },
        value: {
            type: [Number, Boolean],
            default: 0,
        },
    },
};
