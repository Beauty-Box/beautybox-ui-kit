<script>
import { Products, Product } from '@beautybox/core/entity/Market/Products';
import { objectToURLParams } from '@beautybox/core/utils';
import { updateRouteMixin, getOnScrollMixin } from '../../../mixins';

const AppBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../../components/blocks/BlockEmpty');
const AppBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../../../components/blocks/BlockLoader');

import { productsFavoriteMixin, productsAddToCartMixin } from './shared/mixins/products.mixin';
import AppMarketProductItem from '../shared/components/market-product-item/market-product-item';

export default {
    components: { AppMarketProductItem, AppBlockLoader, AppBlockEmpty },
    mixins: [updateRouteMixin, getOnScrollMixin, productsFavoriteMixin, productsAddToCartMixin],
    data: () => ({
        loading: true,
        products: new Products(),
        itemsInCart: [],

        // Get on scroll
        loadingProducts: false,
        nowItemsLength: 0,
        allItemsLength: 0,
        readyToGetElements: true,
        heightForActiveScroll: 100,
    }),
    async created() {
        await Products.createProvider({
            baseUrl: process.env.BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });

        this.requestAll([this.getFavoritesProductsId(), this.getProducts(), this.getCartItems()]);

        this.requestEnd(() => {
            this.loading = false;
        });

        this.$bus.$on('change-status', this.updateRoute);
        this.$bus.$on('change-category', this.updateRoute);
        this.$bus.$on('change-sorting', this.updateRoute);
        this.$bus.$on('route-update', this.getProducts);
    },
    beforeDestroy() {
        this.$bus.$off('change-status', this.updateRoute);
        this.$bus.$off('change-category', this.updateRoute);
        this.$bus.$off('change-sorting', this.updateRoute);
        this.$bus.$off('route-update', this.getProducts);
    },
    methods: {
        async getProducts() {
            console.log('--- getProducts');

            ({
                products: this.products.items,
                total: this.allItemsLength,
            } = await Products.getProducts(objectToURLParams(this.$route.query)));

            this.nowItemsLength = this.products.items.length;
        },
        async getCartItems() {
            this.itemsInCart = await Products.getCartItems();
        },
        async getFavoritesProductsId() {
            ({ favorites_id: this.favoritesProductsId } = await Products.getFavoritesProductsId());
            console.log('--- favoritesProductsId', this.favoritesProductsId);
        },
        async onScrollEndHandler() {
            this.loadingProducts = true;
            this.readyToGetElements = false;

            const query = { ...this.$route.query, skip: this.products.items.length };
            const newProducts = (await Products.getProducts(objectToURLParams(query))).products;

            this.products.items.push(...newProducts);
            this.nowItemsLength = this.products.items.length;

            if (this.products.items.length < this.allItemsLength) {
                this.readyToGetElements = true;
            }

            this.loadingProducts = false;
        },

        /*changeSortingMethod(method) {
            console.log('--- method', method);
            // console.log('--- changeSortingMethod', this.sortingBy);
            this.sortingBy = method;
            // console.log('--- changeSortingMethod', this.sortingBy);
            // console.log('--- sortingMethod', this.sortingMethod);
            // this.replaceToQuery({ ...this.$route.query, ...this.sortingMethod.queryNew });
        },*/

        /*addToCart(productID) {
            console.log('--- addToCart');
            const formData = new FormData();
            formData.append('productID', productID);
            formData.append('quantity', 1);
            Product.addToCart(formData);

            this.$set(this.itemsInCart, productID, 1);
        },
        removeFromCart(productID) {
            console.log('--- removeFromCart');
            const formData = new FormData();
            formData.append('productID', productID);
            Product.removeFromCart(formData);

            this.$set(this.itemsInCart, productID, 0);
        },*/
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
            v-else-if="!products.items.length"
            icon="cart"
            title="В списке пока ничего нет"
            text="Перейдите в магазин, чтобы найти все, что нужно"
        >
            <template #buttons>
                <v-btn
                    large
                    color="primary"
                    class="empty__btn"
                    target="_blank"
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
                            v-for="(product, index) in products.items"
                            :key="index"
                            cols="6"
                            md="4"
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
