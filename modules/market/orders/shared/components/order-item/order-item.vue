<script>
import { EMPTY_PHOTO } from '@/constants';
import AppOrderItemStatus from './order-item-status';
const AppBtnCopy = () =>
    import(/* webpackChunkName: "BtnCopy" */ '../../../../../../components/buttons/AppBtnCopy');

export default {
    name: 'app-order-item',
    components: { AppBtnCopy, AppOrderItemStatus },
    props: {
        date: {
            type: String,
            default: '',
        },
        status: {
            type: Object,
            default: () => ({}),
        },
        orderID: {
            type: [Number, String],
            default: null,
        },
        sum: {
            type: [Number, String],
            default: null,
        },
        products: {
            type: Array,
            default: () => [],
        },
    },
    data: () => ({}),
    methods: {
        checkPhoto(item) {
            return item.photo.length ? item.photo : EMPTY_PHOTO;
        },
    },
};
</script>

<template>
    <v-list-item v-on="$listeners">
        <v-list-item-content class="pa-0">
            <v-list-item-title class="font-weight-medium d-flex align-center mb-2">
                Заказ от {{ date }}
                <app-order-item-status v-bind="status" class="ml-4" />
            </v-list-item-title>
            <v-list-item-subtitle>
                Номер заказа:
                <app-btn-copy
                    :copy-text="String(orderID)"
                    color="info"
                    class="u-text-initial u-hide-before pa-0"
                    small
                    title="Скопировать"
                    style="height: auto"
                >
                    {{ orderID }}
                </app-btn-copy>
                &bull; Сумма заказа: {{ sum | price }}
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="products.length">
            <div class="d-flex align-center">
                <v-img
                    v-for="(product, j) in products"
                    :key="j"
                    max-width="60"
                    max-height="60"
                    class="rounded"
                    :class="{ 'ml-4': j > 0 }"
                    :src="checkPhoto(product)"
                />
                <span
                    v-if="products.length > 3"
                    class="rounded-lg text--secondary background--light ml-4 px-2 py-1"
                    style="font-size: 14px"
                >
                    + {{ products.length - 3 }}
                    {{ products.length - 3 > 1 ? 'товара' : 'товар' }}
                </span>
            </div>
        </v-list-item-action>
    </v-list-item>
</template>

<style lang="scss" scoped>
.v-list-item {
    padding: $base-indent $gutter;
    cursor: pointer;

    &:after {
        display: none;
    }

    & + .v-list-item {
        &::before {
            content: '';
            display: block;
            height: 1px;
            background-color: $color-border--lighten;
            opacity: 1;
            left: $gutter;
            right: $gutter;

            @include max(xs) {
                left: $base-indent;
                right: $base-indent;
            }
        }
    }

    &:hover {
        background-color: $color-bg--hover;
    }

    @include max(xs) {
        padding: $base-indent;
        flex-direction: column;
        flex-grow: 1;
    }

    &__action {
        @include max(xs) {
            margin-top: $base-indent !important;
            margin-left: 0 !important;
            margin-bottom: 6px !important;
            align-self: flex-start;
        }
        @include min(md) {
            margin-top: auto;
            margin-bottom: auto;
        }
    }

    &__title {
        @include max(xs) {
            font-size: 18px;
        }
    }
}
</style>
