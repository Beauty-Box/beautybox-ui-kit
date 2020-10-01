export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
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
};
