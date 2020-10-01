import VRadioGroup from 'vuetify/lib/components/VRadioGroup/VRadioGroup';
import VRadio from 'vuetify/lib/components/VRadioGroup/VRadio';

export default {
    name: 'BRadioGenders',
    components: { VRadioGroup, VRadio },
    props: {
        data: {
            type: [Array],
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
    template: `<v-radio-group v-if="data && data.length" v-model="input" row>
    <v-radio
        v-for="item in data"
        :key="item.genderID"
        :name="name"
        :label="item.title"
        :value="item.genderID"
    />
</v-radio-group>`,
};
