<script>
import { Order } from '@beautybox/core/entity/Market/Orders';

const AppBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../../../../components/blocks/BlockLoader');
const AppBtnCopy = () =>
    import(/* webpackChunkName: "BtnCopy" */ '../../../../components/buttons/AppBtnCopy');

import AppBottomSheet from '../../../../components/bottom-sheet/BottomSheet';
import AppProductPhoto from '../shared/components/order-item/order-item-product-photo';
import AppOrderItemProduct from '../shared/components/order-item/order-item-product';
import AppOrderItemStatus from '../shared/components/order-item/order-item-status';
import AppOrderItemShort from '../shared/components/order-item/order-item-short';
import AppOrderItemInfo from '../shared/components/order-item/order-item-info';

export default {
    name: 'AppOrderInfo',
    components: {
        AppBtnCopy,
        AppBlockLoader,
        AppBottomSheet,
        AppProductPhoto,
        AppOrderItemInfo,
        AppOrderItemShort,
        AppOrderItemStatus,
        AppOrderItemProduct,
    },
    data: () => ({
        loading: true,
        order: new Order(),
        modelOrdersSheet: false,
    }),
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
    },
    async created() {
        await Order.createProvider({
            baseUrl: import.meta.env.VITE_BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });
        await this.getData();
        this.loading = false;
    },
    methods: {
        async getData() {
            ({
                address: this.order.address,
                date: this.order.date,
                deliveryPrice: this.order.deliveryPrice,
                deliveryType: this.order.deliveryType,
                orderID: this.order.orderID,
                price: this.order.price,
                products: this.order.products,
                sale: this.order.sale,
                status: this.order.status,
                stock: this.order.stock,
                total: this.order.total,
                trackNumber: this.order.trackNumber,
            } = await Order.show(this.$route.params.id));
            console.log('--- ORDER', this.order);
        },
    },
};
</script>

<template>
    <v-container class="container--md" :class="{ 'px-0 pb-0': isMobile }">
        <app-block-loader v-if="loading" bgc="#f2f2f7" />
        <template v-else>
            <div :class="{ 'mx-4': isMobile, 'mb-8': !isMobile }">
                <!-- TITLE -->
                <div class="title-wrap">
                    <div class="title">Заказ от {{ order.date }}</div>
                    <!-- STATUS -->
                    <app-order-item-status v-if="!isMobile" v-bind="order.status" class="ml-4" />
                </div>
                <div class="text--secondary d-flex" :class="{ 'mb-2': isMobile }">
                    Номер заказа: &nbsp;{{ order.orderID }}
                </div>

                <!-- STATUS -->
                <app-order-item-status
                    v-if="isMobile"
                    class="mb-8"
                    v-bind="order.status"
                    style="width: max-content"
                />
            </div>

            <div
                class="d-flex flex-grow-1"
                :class="{
                    'flex-column justify-start': !isMobile,
                    'flex-column-reverse justify-end': isMobile,
                }"
            >
                <app-order-item-info
                    v-bind="order"
                    :class="{ 'mb-6': !isMobile, 'flex-grow-1': isMobile }"
                    style="width: 100%"
                />

                <v-card
                    class="u-hide-before c-orders-list"
                    :class="{ 'mx-4 mb-4': isMobile }"
                    :ripple="false"
                    @click="modelOrdersSheet = !modelOrdersSheet"
                >
                    <v-card-title class="px-sm-6">{{ order.products.length }} товара</v-card-title>
                    <v-card-text class="px-sm-6 pb-sm-3">
                        <!-- DESKTOP PRODUCT'S -->
                        <v-list v-if="!isMobile" class="pa-0">
                            <app-order-item-product
                                v-for="(itemOrder, index) in order.products"
                                :key="index"
                                v-bind="itemOrder"
                            />
                        </v-list>
                        <!-- MOBILE PRODUCT'S -->
                        <div v-else class="d-flex">
                            <app-product-photo
                                v-for="(itemOrder, index) in order.products"
                                :key="index"
                                :src="itemOrder.photo"
                                :class="{ 'ml-4': index > 0 }"
                            />
                            <span
                                v-if="order.products.length > 3"
                                class="rounded-lg text--secondary background--light ml-4 px-2 py-1 align-self-center"
                                style="font-size: 14px"
                            >
                                + {{ order.products.length - 3 }}
                                {{ order.products.length - 3 > 1 ? 'товара' : 'товар' }}
                            </span>
                        </div>
                    </v-card-text>
                </v-card>
            </div>

            <app-bottom-sheet
                v-if="isMobile"
                v-model="modelOrdersSheet"
                :title="`${order.products.length} товара`"
                btn-text="Закрыть"
            >
                <app-order-item-short
                    v-for="(itemOrder, index) in order.products"
                    :key="index"
                    v-bind="{ ...itemOrder, index }"
                />
            </app-bottom-sheet>
        </template>
    </v-container>
</template>

<style lang="scss" scoped>
.beauty-link {
    .title-wrap {
        margin-top: $gutter;
    }
}

.v-application {
    .title {
        font-size: 28px !important;
        font-weight: 600 !important;
        line-height: 42px;
    } //.title
}

.title-wrap {
    display: flex;
    align-items: center;
}

.c-orders-list {
    @include max(sm) {
        &:hover {
            box-shadow: 0 0 0 0 rgba(16, 25, 40, 0.08) !important;
        }
    }
}
</style>
