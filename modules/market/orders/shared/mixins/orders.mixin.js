import { Orders } from '@beautybox/core/entity/Market/Orders';

const ordersMixin = {
    data: () => ({
        modelOrderId: '',
        modelOrderStatus: 0,
        orders: new Orders(),
    }),
    async mounted() {
        await this.getStatuses();

        if (this.$route.query.status !== undefined) {
            this.modelOrderStatus = parseInt(this.$route.query.status);
        }

        if (this.$route.query.orderID !== undefined) {
            this.modelOrderId = this.$route.query.orderID;
        }
    },
    methods: {
        async getStatuses() {
            ({ status: this.orders.status } = await Orders.getOrderStatuses());
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
            if (this.modelOrderId && this.modelOrderId.length > 0) {
                this.$router.push({
                    query: Object.assign({}, this.$route.query, {
                        orderID: this.modelOrderId,
                    }),
                });
            } else {
                this.deleteQuery('orderID');
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
