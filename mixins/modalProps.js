export const modalProps = {
    props: {
        value: {
            type: [Boolean, String, Array, Number, Object],
            required: true,
        },
    },
    computed: {
        modal: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
