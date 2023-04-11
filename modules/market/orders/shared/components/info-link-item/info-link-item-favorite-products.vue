<script>
import { Products } from '@beautybox/core/entity/Market/Products';
import { infoLinkItemMixin } from './info-link-item.mixin';
import AppInfoLinkItemLoader from './info-link-item-loader';

export default {
    name: 'AppInfoLinkItemFavoriteProducts',
    components: { AppInfoLinkItemLoader },
    mixins: [infoLinkItemMixin],
    created() {
        Products.createProvider({
            baseUrl: import.meta.env.VITE_BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });
    },
    methods: {
        getData() {
            this.getFavoriteProductsCount();
        },
        async getFavoriteProductsCount() {
            ({ count: this.count } = await Products.getFavoriteProductsCount());
        },
    },
};
</script>

<template>
    <v-list-item v-on="$listeners">
        <app-info-link-item-loader v-if="loading" />
        <template v-else>
            <v-list-item-content>
                <v-list-item-title>Избранное</v-list-item-title>
                <v-list-item-subtitle>Товаров: {{ count }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
                <v-icon size="25">favorite</v-icon>
            </v-list-item-icon>
        </template>
    </v-list-item>
</template>

<style lang="scss" scoped src="./info-link-item.scss" />
