<template>
    <v-card flat itemscope class="c-product" itemtype="https://schema.org/Product">
        <meta itemprop="name" :content="product.name" />
        <meta itemprop="description" :content="product.description" />
        <v-card-title class="c-product__img">
            <template v-if="product.photos && product.photos.length">
                <template v-for="(photo, index) in product.photos">
                    <link :key="index" itemprop="image" :href="photo" />
                    <v-img
                        :key="index"
                        min-height="180"
                        aspect-ratio="1"
                        :alt="product.name"
                        :src="photo || '/assets/empty.svg'"
                    />
                </template>
            </template>
            <template v-else>
                <v-img min-height="180" aspect-ratio="1" src="/assets/empty.svg" />
                <link itemprop="image" href="/assets/empty.svg" />
            </template>
            <app-btn-add-to-favorite
                :active.sync="isFavorite"
                @add="$emit('add-to-favorite')"
                @remove="$emit('remove-from-favorite')"
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
            >
                {{ buttonText(product) }}
            </v-btn>
            <v-btn v-if="inCart" icon color="primary" @click="">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
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
        isFavorite: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        // isFavorite: false,
    }),
    computed: {
        inStock() {
            return Boolean(this.inCart)
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock';
        },
        // isFavorite() {
        //     return true;
        // },
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
                return 'В корзину';
            }

            if (Boolean(product.stock)) {
                return 'В корзину';
            }

            return 'Нет в наличии';
        },
    },
};
</script>

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
