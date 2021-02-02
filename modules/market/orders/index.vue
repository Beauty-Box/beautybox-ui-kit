<script>
import AppPromoBlock from './shared/components/promo-block';
import AppInfoLinkItemMyOrders from './shared/components/info-link-item/info-link-item-my-orders.vue';
import AppInfoLinkItemFavoriteProducts from './shared/components/info-link-item/info-link-item-favorite-products.vue';
import AppInfoLinkItemBoughtProducts from './shared/components/info-link-item/info-link-item-bought-products.vue';
const AppSaleBlock = () =>
    import(/* webpackChunkName: "sale-block" */ './shared/components/sale-block');

export default {
    name: 'app-purchases-page',
    components: {
        AppInfoLinkItemBoughtProducts,
        AppInfoLinkItemFavoriteProducts,
        AppInfoLinkItemMyOrders,
        AppPromoBlock,
        AppSaleBlock,
    },
    props: {},
    data: () => ({
        loading: true,
    }),
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
    },
    async created() {},
    methods: {},
};
</script>

<template>
    <v-container
        class="container--md d-flex flex-column flex-grow-1"
        :class="{ 'pt-6 pb-6': !isMobile }"
    >
        <app-promo-block class="mb-6" />

        <!-- <app-sale-block
            class="mb-6"
            style="cursor: pointer"
            @click="$router.push({ name: 'orders-sale' })"
        />-->

        <app-info-link-item-my-orders class="mb-6" @click="$router.push({ name: 'orders-all' })" />

        <app-info-link-item-bought-products
            class="mb-6"
            @click="$router.push({ name: 'orders-bought-products' })"
        />

        <app-info-link-item-favorite-products
            class="mb-2"
            @click="$router.push({ name: 'orders-favorite-products' })"
        />
    </v-container>
</template>
