<script>
import { Product } from '@beautybox/core/entity/Market/Products';
import AppBtnAddToFavorite from '../../../../../components/buttons/BtnAddToFavorites';

export default {
    name: 'app-market-product',
    components: { AppBtnAddToFavorite },
    filters: {
        numberToPrice(price, currency = 'RUB') {
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency,
                minimumFractionDigits: 0,
            }).format(parseFloat(price));
        },
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
        inCart: {
            type: Number,
            default: 0,
        },
        isFavoriteIds: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        inStock() {
            return Boolean(this.inCart)
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock';
        },
        isFavorite: {
            get() {
                return Boolean(this.isFavoriteIds.find((i) => i === this.product.productID));
            },
            set() {
                this.$bus.$emit('update:favorite-ids', this.product.productID);
            },
        },
    },
    methods: {
        trueEnding(amount) {
            if (amount % 100 <= 20 && amount % 100 >= 5) {
                return 'товаров';
            }

            if (amount % 10 === 1) {
                return 'товар';
            }

            return 'товара';
        },
        buttonText(product) {
            if (Boolean(this.inCart)) {
                return 'В корзине';
            }

            if (Boolean(product.stock)) {
                return 'В корзину';
            }

            return 'Нет в наличии';
        },
        addToFavorites(id) {
            Product.addToFavorites(parseInt(id));
        },
        removeFromFavorites(id) {
            Product.removeFromFavorites(parseInt(id));
        },
        addToCart({ productID }) {
            if (this.inCart) {
                window.open('https://beautybox.ru/market/cart', '_blank');
                return;
            }

            this.$emit('click:add-to-cart', productID);
        },
        removeFromCart({ productID }) {
            this.$emit('click:remove-from-cart', productID);
        },
    },
};
</script>

<template>
    <v-card flat itemscope class="c-product" itemtype="https://schema.org/Product">
        <meta itemprop="name" :content="product.name" />
        <meta itemprop="description" :content="product.description" />
        <v-card-title class="c-product__img">
            <template v-if="product.photo.length">
                <link :key="index" itemprop="image" :href="product.photo" />
                <v-img
                    :key="index"
                    min-height="180"
                    aspect-ratio="1"
                    :alt="product.name"
                    :src="product.photo || '/assets/empty.svg'"
                />
            </template>
            <!-- if photo is empty we show this plug -->
            <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
                    <rect width="180" height="180" fill="#F6F7FA" />
                    <path
                        fill="#CFD5D8"
                        d="M90,84.2c-4.8,0-8.7,3.9-8.7,8.7s3.9,8.7,8.7,8.7s8.7-3.9,8.7-8.7
                        C98.7,88.1,94.8,84.2,90,84.2z M113.2,75.5h-7c-1,0-1.9-0.7-2.3-1.6l-1.8-5.4c-0.4-1-1.3-1.6-2.3-1.6H80.2c-1,0-1.9,0.7-2.3,1.6
                        l-1.8,5.4c-0.4,1-1.3,1.6-2.3,1.6h-7c-3.2,0-5.8,2.6-5.8,5.8v26.1c0,3.2,2.6,5.8,5.8,5.8h46.4c3.2,0,5.8-2.6,5.8-5.8V81.3
                        C119,78.1,116.4,75.5,113.2,75.5L113.2,75.5z M90,107.4c-8,0-14.5-6.5-14.5-14.5S82,78.4,90,78.4s14.5,6.5,14.5,14.5
                        S98,107.4,90,107.4L90,107.4z M111.2,85.4c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C113.2,84.5,112.3,85.4,111.2,85.4
                        C111.2,85.4,111.2,85.4,111.2,85.4L111.2,85.4z"
                    />
                </svg>
                <link itemprop="image" href="/assets/empty.svg" />
            </template>
            <app-btn-add-to-favorite
                :active.sync="isFavorite"
                @add="addToFavorites(product.productID)"
                @remove="removeFromFavorites(product.productID)"
            />
        </v-card-title>
        <v-card-text
            itemprop="offers"
            itemtype="https://schema.org/Offer"
            itemscope
            class="c-product__offer"
            @click="$router.push(product.link)"
        >
            <link itemprop="url" :href="product.link" />
            <meta itemprop="availability" :content="inStock" />
            <div>
                <meta itemprop="price" :content="product.salePrice || product.price" />
                <meta itemprop="priceCurrency" :content="product.currency" />
                <span v-if="product.salePrice" class="c-product__price c-product__price--sale">
                    {{ product.salePrice | numberToPrice(product.currency) }}
                </span>
                <span
                    class="c-product__price"
                    :class="{ 'c-product__price--line-through': product.salePrice }"
                >
                    {{ product.price | numberToPrice(product.currency) }}
                </span>
            </div>
            <a :href="product.link" class="c-product__name">
                {{ product.name }}
            </a>
        </v-card-text>
        <v-card-actions class="c-product__action">
            <v-btn
                depressed
                height="32"
                min-height="32"
                :disabled="!product.stock > 0"
                :color="inCart ? 'success' : 'accent'"
                class="u-text-initial"
                @click="addToCart(product)"
            >
                {{ buttonText(product) }}
            </v-btn>
            <v-btn
                v-if="inCart"
                depressed
                height="32"
                min-height="32"
                min-width="32"
                width="32"
                color="muted"
                title="Убрать из корзины"
                @click="removeFromCart(product)"
            >
                <v-icon>delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss">
.c-product {
    display: flex;
    flex-direction: column;

    &__img,
    &__offer {
        padding: 0;
    }

    &__img {
        position: relative;
        margin-bottom: $gutter / 2;
        cursor: pointer;

        &:not(.c-btn-favorite):hover {
            & + .c-product__offer {
                .c-product__name {
                    color: $color-info;
                }
            }
        }

        .v-image {
            overflow: hidden;
            border-radius: $border-radius;
        }

        .c-btn-favorite {
            position: absolute;
            top: 0;
            right: 0;
            z-index: z(default);
        }
    }

    &__name {
        display: inline-block;
        margin-top: 2px;
        line-height: 1.4;
        text-decoration: none;
        transition: all 0.3s ease-in-out;

        &:hover {
            color: $color-info;
        }
    }

    &__offer {
        padding-bottom: $gutter / 2;
    }

    &__action {
        margin-top: auto;
        padding-right: 0;
        padding-bottom: 0;
        padding-left: 0;
    }

    &__price {
        font-size: 18px;
        font-weight: 700;
        color: $color-primary;

        &--sale {
            color: $color-error;
        }

        &--line-through {
            position: relative;
            font-size: 14px;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgb(255, 255, 255);
                background: linear-gradient(
                    175deg,
                    transparent 47%,
                    rgba(249, 17, 85, 0.8) 47%,
                    rgba(249, 17, 85, 0.8) 57%,
                    transparent 57%
                );
            }
        }
    }
}
</style>
