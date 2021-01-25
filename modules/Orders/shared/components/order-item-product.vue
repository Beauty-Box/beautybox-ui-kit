<script>
import AppProductPhoto from './order-item-product-photo';

export default {
    name: 'app-order-item-product',
    components: { AppProductPhoto },
    props: {
        article: {
            type: String,
            default: '',
        },
        id: {
            type: Number,
            default: null,
        },
        name: {
            type: String,
            default: '',
        },
        photo: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: null,
        },
        salePrice: {
            type: Number,
            default: null,
        },
        sum: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<template>
    <v-list-item>
        <v-list-item-action>
            <app-product-photo :src="this.photo" />
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title class="text-wrap">
                {{ name }}
            </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
            <v-list-item-title>{{ quantity }} шт</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-title class="d-flex align-center ml-auto">
                {{ sum | price }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="quantity > 1" class="d-flex align-center ml-auto">
                {{ price | price }} за шт
            </v-list-item-subtitle>
        </v-list-item-action>
    </v-list-item>
</template>

<style lang="scss" scoped>
.v-list-item {
    padding-left: 0 !important;
    padding-right: 0 !important;

    & + .v-list-item {
        @include border(top);
    }
}
</style>
