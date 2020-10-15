import VAutocomplete from 'vuetify/lib/components/VAutocomplete';

export default {
    name: 'FilterSelectSearch',
    components: { VAutocomplete },
    props: {
        label: {
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
    template: `<v-autocomplete
    v-if="show && firstItem ? elems.length > 2 : elems.length > 1"
    :value="value"
    hide-details
    :solo="$vuetify.breakpoint.mdAndDown ? false : true"
    :dense="$vuetify.breakpoint.mdAndDown ? false : true"
    :height="$vuetify.breakpoint.mdAndDown ? 32 : 44"
    :items="elems"
    :item-text="itemText"
    :item-value="itemValue"
    :label="label"
    v-on="$listeners"
/>`,
};
