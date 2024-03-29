<script>
import { Products } from '@beautybox/core/entity/Market/Products';
import { objectToURLParams } from '@beautybox/core/utils';
import { updateRouteMixin, getOnScrollMixin } from '../../../mixins';

const AppBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../../components/blocks/BlockEmpty');
const AppBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../../../components/blocks/BlockLoader');

import { productsFavoriteMixin, productsAddToCartMixin } from './shared/mixins/products.mixin';
import AppMarketProductItem from '../shared/components/market-product-item/market-product-item';

export default {
    name: 'AppProductsFavorite',
    components: { AppMarketProductItem, AppBlockLoader, AppBlockEmpty },
    mixins: [updateRouteMixin, getOnScrollMixin, productsFavoriteMixin, productsAddToCartMixin],
    data: () => ({
        loading: true,
        itemsInCart: [],
        favorites: [],
        favoritesProductsId: [],

        // Get on scroll
        loadingProducts: false,
        nowItemsLength: 0,
        allItemsLength: 0,
        readyToGetElements: true,
        heightForActiveScroll: 100,
    }),
    async created() {
        await Products.createProvider({
            baseUrl: import.meta.env.VITE_BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });

        this.requestAll([
            this.getFavoritesProductsId(),
            this.getFavoritesProducts(),
            this.getCartItems(),
        ]);

        this.requestEnd(() => {
            this.loading = false;
        });

        this.$bus.$on('change-category', this.updateRoute);
        this.$bus.$on('route-update', this.getFavoritesProducts);
    },
    beforeDestroy() {
        this.$bus.$off('change-category', this.updateRoute);
        this.$bus.$off('route-update', this.getFavoritesProducts);
    },
    methods: {
        async getFavoritesProducts() {
            console.log('--- getFavoritesProducts');
            this.loading = true;

            ({
                favorites: this.favorites,
                total: this.allItemsLength,
            } = await Products.getFavoritesProducts(objectToURLParams(this.$route.query)));

            this.nowItemsLength = this.favorites.length;
            this.loading = false;
        },
        async getCartItems() {
            this.itemsInCart = await Products.getCartItems();
            console.log('--- getCartItems', this.itemsInCart);
        },
        async getFavoritesProductsId() {
            ({ favorites_id: this.favoritesProductsId } = await Products.getFavoritesProductsId());
        },
        async onScrollEndHandler() {
            this.loadingProducts = true;
            this.readyToGetElements = false;

            const query = { ...this.$route.query, skip: this.favorites.length };
            const newProducts = (await Products.getFavoritesProducts(objectToURLParams(query)))
                .favorites;

            this.favorites.push(...newProducts);
            this.nowItemsLength = this.favorites.length;

            if (this.favorites.length < this.allItemsLength) {
                this.readyToGetElements = true;
            }

            this.loadingProducts = false;
        },
    },
};
</script>

<template>
    <v-container
        fluid
        class="container--md u-no-padding-top--sm flex-grow-1"
        :class="{ 'px-0': $vuetify.breakpoint.mobile }"
    >
        <app-block-loader v-if="loading" bgc="transparent" />

        <app-block-empty
            v-else-if="!favorites.length"
            icon="cart"
            title="В избранном пока ничего нет"
            text="Перейдите в магазин, чтобы найти все, что нужно"
        >
            <template #buttons>
                <v-btn
                    large
                    target="_blank"
                    color="primary"
                    class="empty__btn"
                    href="https://beautybox.ru/market"
                >
                    Перейти в магазин
                </v-btn>
            </template>
        </app-block-empty>

        <v-card
            v-else
            v-scroll:#scroll-container="onScrollControl"
            :flat="$vuetify.breakpoint.mobile"
        >
            <v-card-text
                :class="{
                    'pa-3': !$vuetify.breakpoint.mobile,
                    'pa-0': $vuetify.breakpoint.mobile,
                }"
            >
                <v-container class="py-0">
                    <v-row>
                        <v-col
                            v-for="(product, index) in favorites"
                            :key="index"
                            cols="6"
                            sm="4"
                            lg="4"
                            class="d-flex flex-column"
                        >
                            <app-market-product-item
                                :product="product"
                                class="flex-grow-1"
                                :is-favorite-ids="favoritesProductsId"
                                :in-cart="parseInt(itemsInCart[product.productID])"
                                @click:add-to-cart="addToCart(product.productID)"
                                @click:remove-from-cart="removeFromCart(product.productID)"
                            />
                        </v-col>
                    </v-row>
                    <v-row v-if="loadingProducts">
                        <v-col>
                            <app-block-loader
                                size="30"
                                min-height="30"
                                position="static"
                                bgc="transparent"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>
