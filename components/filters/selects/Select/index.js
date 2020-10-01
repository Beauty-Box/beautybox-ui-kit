// <v-select
//     v-if="show && firstItem ? elems.length > 2 : elems.length > 1"
//     hide-details
//     :height="$vuetify.breakpoint.mdAndDown ? 56 : 44"
//     :value="value"
//     :label="label"
//     :items="elems"
//     :item-text="itemText"
//     :item-value="itemValue"
//     :clearable="clearable"
//     :placeholder="placeholder"
//     :solo="!$vuetify.breakpoint.mdAndDown"
//     :outlined="$vuetify.breakpoint.mdAndDown"
//     :dense="!$vuetify.breakpoint.mdAndDown"
//     :class="{
//         'c-input--clearable': clearable,
//         'placeholder-is-visible': placeholder && !label,
//     }"
//     v-on="$listeners"
// />
import VSelect from 'vuetify/lib/components/VSelect';
export default {
    name: 'FilterSelect',
    extends: VSelect,
    inheritAttrs: false,
    props: {
        height: {
            ...VSelect.options.props.height,
            default() {
                return this.$vuetify.breakpoint.mdAndDown ? 56 : 44;
            },
        },
        permission: {
            type: [String, Array],
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
};
