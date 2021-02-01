<script>
import { Products } from '@beautybox/core/entity/Orders/Products';
import { infoLinkItemMixin } from './info-link-item.mixin';
import AppInfoLinkItemLoader from './info-link-item-loader';

export default {
    name: 'app-info-link-item-bought-products',
    components: { AppInfoLinkItemLoader },
    mixins: [infoLinkItemMixin],
    created() {
        Products.createProvider({
            baseUrl: process.env.BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });
    },
    methods: {
        getData() {
            this.getBoughtProducts();
        },
        async getBoughtProducts() {
            ({ count: this.count } = await Products.getBoughtProducts());
        },
    },
};
</script>

<template>
    <v-list-item v-on="$listeners">
        <app-info-link-item-loader v-if="loading" />
        <template v-else>
            <v-list-item-content>
                <v-list-item-title>Купленные товары</v-list-item-title>
                <v-list-item-subtitle>Товаров: {{ count }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
                <v-icon size="25">local_grocery_store</v-icon>
            </v-list-item-icon>
        </template>
    </v-list-item>
</template>

<style lang="scss" scoped src="./style.scss" />
