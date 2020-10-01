<template>
    <v-select
        v-if="show && firstItem ? elems.length > 2 : elems.length > 1"
        hide-details
        :height="$vuetify.breakpoint.mdAndDown ? 56 : 44"
        :value="value"
        :label="label"
        :items="elems"
        :item-text="itemText"
        :item-value="itemValue"
        :loading="loading"
        :clearable="clearable"
        :placeholder="placeholder"
        :solo="!$vuetify.breakpoint.mdAndDown"
        :outlined="$vuetify.breakpoint.mdAndDown"
        :dense="!$vuetify.breakpoint.mdAndDown"
        :append-icon="appendIcon"
        :type="type"
        :class="{
            'c-input--clearable': clearable,
            'placeholder-is-visible': placeholder && !label,
        }"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'FilterSelect',
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
        type: {
            type: String,
            default: 'text',
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
        appendIcon: {
            type: String,
            default: undefined,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        loading: {
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
};
</script>
