import { Orders } from '@beautybox/core/entity/Orders';

const ordersMixin = {
    data: () => ({
        modelOrderId: '',
        modelOrderStatus: 0,
        orders: new Orders(),
    }),
    methods: {
        async getStatuses() {
            ({ status: this.orders.status } = await Orders.getOrderStatuses());

            if (this.$route.query.status !== undefined) {
                this.modelOrderStatus = parseInt(this.$route.query.status);
            }
        },
        changeStatus() {
            if (this.modelOrderStatus === 0) {
                this.deleteQuery('status');
            }

            if (this.modelOrderStatus > 0) {
                this.$router.push({
                    query: Object.assign({}, this.$route.query, { status: this.modelOrderStatus }),
                });
            }
        },
        changeOrderId() {
            if (this.modelOrderId.length > 0) {
                this.$router.push({
                    query: Object.assign({}, this.$route.query, {
                        order_id: this.modelOrderId,
                    }),
                });
            } else {
                this.deleteQuery('order_id');
            }
        },
        deleteQuery(queryName = '') {
            let query = Object.assign({}, this.$route.query);
            delete query[queryName];
            this.$router.push({ query });
        },
    },
};

export { ordersMixin };
export default { ordersMixin };
