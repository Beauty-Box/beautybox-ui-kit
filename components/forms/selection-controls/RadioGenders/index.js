import VRadioGroup from 'vuetify/lib/components/VRadioGroup/VRadioGroup';
import VRadio from 'vuetify/lib/components/VRadioGroup/VRadio';

export default {
    name: 'BRadioGenders',
    components: { VRadioGroup, VRadio },
    props: {
        items: {
            type: [Array],
            default: () => [],
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
    /*template: `<v-radio-group v-if="items.length" v-model="input" row>
                            <v-radio
                                v-for="item in items"
                                :key="item.genderID"
                                :name="name"
                                :label="item.title"
                                :value="item.genderID"
                            />
                        </v-radio-group>`,*/
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
