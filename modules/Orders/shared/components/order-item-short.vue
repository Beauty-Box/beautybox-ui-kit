<script>
import AppProductPhoto from './order-item-product-photo';

export default {
    name: 'app-order-item-short',
    components: { AppProductPhoto },
    props: {
        index: {
            type: Number,
            default: 0,
        },
        photo: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        sum: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<template>
    <v-list-item class="text-start u-no-border pa-0">
        <v-list-item-avatar class="rounded" min-width="60" height="60" width="60">
            <app-product-photo :src="photo" />
        </v-list-item-avatar>
        <v-list-item-content
            class="align-start align-self-start"
            :class="{ 'u-border--top': index > 0 }"
        >
            <v-list-item-title class="font-weight-regular text-wrap mb-2">
                {{ name }}
            </v-list-item-title>
            <v-list-item-title class="mb-2">{{ sum | price }}</v-list-item-title>
            <v-list-item-subtitle class="font-weight-regular mb-0">
                {{ quantity }}
                {{ quantity > 1 ? 'товара' : 'товар' }} &bull;
                {{ price | price }}
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>
