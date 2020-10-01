import FilterSelect from '@ui-kit/components/filters/FilterSelect';

export default {
    name: 'FilterSelectSalon',
    components: { FilterSelect },
    props: {
        queryName: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: '',
        },
        items: {
            type: Array,
            default: () => [],
        },
        firstItem: {
            type: [String, Object],
            default: '',
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
        value: {
            get() {
                return this.$route.query[this.queryName] || 0;
            },
            set(value) {
                if (!value) {
                    delete this.$route.query[this.queryName];
                    this.$router.replace({ query: { ...this.$route.query } });
                    return;
                }
                if (this.$route.query[this.queryName] !== value) {
                    this.$router.replace({
                        query: { ...this.$route.query, [this.queryName]: value },
                    });
                    return;
                }
                return;
            },
        },
    },
    template: ` <filter-select
    v-if="show && firstItem ? elems.length > 2 : elems.length > 1"
    v-model="value"
    :items="elems"
    :label="label"
/>`,
};
