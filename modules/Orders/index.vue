<script>
import { Orders } from '@beautybox/core/entity/Orders';
import { objectToURLParams } from '@beautybox/core/utils';
import { scroll } from '../../mixins/ScrollControl';

const AppBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../../components/blocks/BlockLoader');
const AppBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../components/blocks/BlockEmpty');
const AppSelect = () =>
    import(/* webpackChunkName: "Select" */ '../../components/forms/selects/Select');
import AppOrderItem from './shared/components/order-item/order-item';

export default {
    name: 'app-orders-page',
    components: { AppBlockLoader, AppBlockEmpty, AppSelect, AppOrderItem },
    mixins: [scroll],
    props: {},
    data: () => ({
        loading: true,
        ordersLoading: false,
        count: null,
        orders: new Orders(),

        // For scroll loading
        heightForActiveScroll: 100,
        readyToGetElements: true,
        allItemsLength: 0,
        nowItemsLength: 0,
    }),
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
    },
    watch: {
        '$route.query.status': {
            handler() {
                this.getOrders();
            },
            deep: true,
            immediate: true,
        },
        '$route.query.orderID': {
            handler() {
                setTimeout(() => this.getOrders(), 900);
            },
            deep: true,
            immediate: true,
        },
    },
    async created() {
        Orders.createProvider({
            baseUrl: process.env.BASE_URL,
            module: process.env.MODULE_NAME,
            token: localStorage.getItem('access_token'),
        });
        await this.getOrders();
        this.loading = false;
    },
    methods: {
        async getOrders() {
            ({ orders: this.orders.items, count: this.orders.count } = await Orders.getOrders(
                objectToURLParams(this.$route.query)
            ));

            this.allItemsLength = this.orders.count;
            this.nowItemsLength = this.orders.items.length;
        },
        async onScrollEndHandler() {
            this.ordersLoading = true;
            this.readyToGetElements = false;

            const response = await Orders.getOrdersOnScroll(this.orders.length);

            this.orders.items = [...this.orders.items, ...response.orders];
            this.nowItemsLength = this.orders.items.length;
            this.testCount();
            this.ordersLoading = false;
        },
        testCount() {
            if (this.orders.items.length < this.orders.count) {
                this.readyToGetElements = true;
            }
        },
    },
};
</script>

<template>
    <v-container
        class="container--md d-flex flex-column flex-grow-1"
        :class="{ 'px-0 pb-0': isMobile }"
    >
        <app-block-loader v-if="loading" bgc="#fff" />
        <template v-else>
            <v-list
                v-if="orders.items.length"
                v-scroll:#main="onScrollControl"
                class="c-list-orders"
            >
                <app-order-item
                    v-for="(order, i) in orders.items"
                    :key="i"
                    v-bind="order"
                    @click="
                        $router.push({ name: 'page-order-info', params: { id: order.orderID } })
                    "
                />
                <app-block-loader
                    v-if="ordersLoading"
                    position="static"
                    min-height="60"
                    size="30"
                />
            </v-list>
            <app-block-empty
                v-else
                center
                icon="empty-cart"
                title="У вас пока нет покупок"
                text="Перейдите в магазин, чтобы начать покупки"
                text-width="auto"
                class="pa-0"
            >
                <template #buttons>
                    <v-btn
                        large
                        :ripple="false"
                        color="primary"
                        class="u-hide-before font-weight-regular"
                        target="_blank"
                        href="https://beautybox.ru/market"
                    >
                        Перейти в магазин
                    </v-btn>
                </template>
            </app-block-empty>
        </template>
    </v-container>
</template>

<style lang="scss" scoped>
.c-list-orders {
    padding: 0 !important;

    @include min(sm) {
        border-radius: $border-radius !important;
        box-shadow: $box-shadow-secondary !important;
    }
}
</style>
