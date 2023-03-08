import { defineComponent, PropType, PropOptions } from 'vue';

type value = boolean | string | Array<any> | number | object;

const modalToggleMixin = defineComponent({
    props: {
        value: {
            type: [Boolean, String, Array, Number, Object] as PropType<value>,
            required: true,
        },
    },
    computed: {
        modal: {
            get(): value {
                return this.value;
            },
            set(value: value): void {
                this.$emit('input', value);
            },
        },
    },
});

export { modalToggleMixin };
export default modalToggleMixin;
