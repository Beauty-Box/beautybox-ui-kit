import VSelect from 'vuetify/lib/components/VSelect';

export default {
    name: 'FilterSelect',
    components: { VSelect },
    props: {
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        items: {
            type: Array,
            default: () => [],
        },
        itemText: {
            type: String,
            default: 'text',
        },
        itemValue: {
            type: String,
            default: 'value',
        },
        firstItem: {
            type: [String, Object],
            default: '',
        },
        permission: {
            type: [String, Array],
            default: '',
        },
        value: {
            type: [String, Number, Array, Object],
            default: '',
        },
        clearable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        show() {
            if (!this.permission) {
                return true;
            } else {
                return this.checkPermission(this.permission);
            }
        },
        elems() {
            if (this.firstItem) {
                return [this.firstItem, ...this.items];
            } else {
                return this.items;
            }
        },
    },
    template: `    <v-select
    v-if="show && firstItem ? elems.length > 2 : elems.length > 1"
    hide-details
    :height="44"
    :value="value"
    :label="label"
    :items="elems"
    :item-text="itemText"
    :item-value="itemValue"
    :clearable="clearable"
    :placeholder="placeholder"
    :solo="!$vuetify.breakpoint.mdAndDown"
    :dense="!$vuetify.breakpoint.mdAndDown"
    :class="{
        'c-input--clearable': clearable,
        'placeholder-is-visible': placeholder && !label,
    }"
    v-on="$listeners"
/>`,
};
