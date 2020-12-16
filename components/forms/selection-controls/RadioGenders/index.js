import VRadioGroup from 'vuetify/lib/components/VRadioGroup/VRadioGroup';
import VRadio from 'vuetify/lib/components/VRadioGroup/VRadio';

export default {
    name: 'BRadioGenders',
    components: { VRadioGroup, VRadio },
    props: {
        items: {
            type: Array,
            default: () => [
                {
                    title: 'Мужской',
                    genderID: 0,
                },
                {
                    title: 'Женский',
                    genderID: 1,
                },
                {
                    title: 'Небинарный',
                    genderID: 2,
                },
            ],
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
    render(h) {
        if (this.items.length) {
            return h(
                'v-radio-group',
                {
                    props: {
                        row: true,
                        value: this.input,
                    },
                },
                [
                    this.items.map((item) => {
                        return h('v-radio', {
                            props: {
                                key: item.genderID,
                                name: this.name,
                                label: item.title,
                                value: item.genderID,
                            },
                        });
                    }),
                ]
            );
        }
    },
};
