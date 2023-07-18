import { Products } from '@beautybox/core/entity/Market/Products';
import { STATUS_FILTERS, SORT_FILTERS } from '../../../../../constants';

const productsFiltersMixin = {
    data: () => ({
        products: new Products(),
        statusFilters: STATUS_FILTERS,
        sortFilters: SORT_FILTERS,
    }),
    computed: {
        status: {
            get() {
                return parseInt(this.$route.query.status) || 0;
            },
            set(value) {
                this.$bus.$emit('change-status', { name: 'status', value });
            },
        },
        sortBy: {
            get() {
                return this.$route.query.sort_by || 'newest';
            },
            set(value) {
                this.$bus.$emit('change-sorting', { name: 'sort_by', value });
            },
        },
        category: {
            get() {
                return parseInt(this.$route.query.categoryID) || 0;
            },
            set(value) {
                this.$bus.$emit('change-category', { name: 'categoryID', value });
            },
        },
    },
    async created() {
        await Products.createProvider({
            baseUrl: import.meta.env.VITE_BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });
        await this.getCategories();
    },
    methods: {
        async getCategories() {
            ({ categories: this.products.categories } = await Products.getCategories());
        },
    },
};

export { productsFiltersMixin };
export default { productsFiltersMixin };
