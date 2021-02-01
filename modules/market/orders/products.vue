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
                <v-btn class="empty__btn" color="primary" large @click="goToMarket">
                    Перейти в магазин
                </v-btn>
            </template>
        </app-block-empty>

        <v-card
            v-else
            v-scroll:#scroll-container="onScrollControl"
            :flat="$vuetify.breakpoint.mobile"
        >
            <!-- <v-card-title :class="{ 'px-6': !$vuetify.breakpoint.mobile }">
                  <div class="d-flex align-center justify-space-between flex-grow-1">
                    <div v-if="!$vuetify.breakpoint.mobile">Товары</div>
                    <div>
                        <v-menu offset-y right nudge-right="-16">
                            <template #activator="{ on }">
                                <v-btn text :ripple="false" class="pa-0 u-hide-before" v-on="on">
                                    {{ sortingMethod.text }}
                                    <v-icon>keyboard_arrow_down</v-icon>
                                </v-btn>
                            </template>
                            <v-list class="pa-0">
                                <v-list-item
                                    v-for="(filter, index) in sortFilters"
                                    :key="index"
                                    @click="changeSortingMethod(filter.value)"
                                >
                                    {{ filter.text }}
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </v-card-title>-->
            <v-card-text
                :class="{
                    'px-3 pb-3': !$vuetify.breakpoint.mobile,
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
                            <!-- <app-market-product-item
                                class="flex-grow-1"
                                :product="product"
                                :in-cart="parseInt(itemsInCart[product.productID])"
                                @add="addToCart(product.productID)"
                                @remove="removeFromCart(product.productID)"
                            />-->
                            <app-market-product-item
                                :product="product"
                                class="flex-grow-1"
                                :is-favorite="true"
                                :in-cart="parseInt(itemsInCart[product.productID])"
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

<script>
// import { SORT_FILTERS } from '../../constants';
import { Products } from '@beautybox/core/entity/Orders/Products';
import { objectToURLParams } from '@beautybox/core/utils';
import { updateRouteMixin, getOnScrollMixin } from '../../../mixins';

const AppBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../../components/blocks/BlockEmpty');
const AppBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../../../components/blocks/BlockLoader');

import AppMarketProductItem from '../shared/components/market-product-item/market-product-item';

export default {
    components: { AppMarketProductItem, AppBlockLoader, AppBlockEmpty },
    mixins: [updateRouteMixin, getOnScrollMixin],
    data: () => ({
        loading: true,
        products: new Products(),
        // modelSorting: 'newest',
        itemsInCart: [],
        favoritesProducts: [],
        // sortFilters: SORT_FILTERS,

        // Get on scroll
        loadingProducts: false,
        nowItemsLength: 0,
        allItemsLength: 0,
        readyToGetElements: true,
        heightForActiveScroll: 100,
    }),
    /*computed: {
        sortingBy: {
            get() {
                return this.$route.query.sort_by || 'newest';
            },
            set(value) {
                this.$bus.$emit('change-sorting', { name: 'sort_by', value });
            },
        },
        sortingMethod() {
            return this.sortFilters.find((f) => f.value === this.sortingBy);
        },
    },*/
    async created() {
        await Products.createProvider({
            baseUrl: process.env.BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });

        await this.getProducts();
        await this.getCartItems();

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
            this.loading = true;

            ({
                products: this.products.items,
                total: this.allItemsLength,
            } = await Products.getProducts(objectToURLParams(this.$route.query)));

            this.nowItemsLength = this.products.items.length;
            this.loading = false;
        },
        async getCartItems() {
            this.itemsInCart = await Products.getCartItems();
        },
        async getFavoritesProducts() {},
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

        addToCart(productID) {
            const formData = new FormData();
            formData.append('productID', productID);
            formData.append('quantity', 1);
            Products.addToCart(formData);

            this.$set(this.itemsInCart, productID, 1);
        },
        removeFromCart(productID) {
            const formData = new FormData();
            formData.append('productID', productID);
            Products.removeFromCart(formData);

            this.$set(this.itemsInCart, productID, 0);
        },
        goToMarket() {
            window.location.href = '/market';
        },
    },
};
</script>

<style lang="scss">
.filter {
    display: flex;
    justify-items: center;
    color: $color-text--light;
    cursor: pointer;

    &__icon {
        margin-left: 5px;
        width: 10px !important;
    }
}
</style>
