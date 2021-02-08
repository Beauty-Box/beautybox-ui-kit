<script>
import { mapGetters } from 'vuex';
import { priceFilter } from '@beautybox/core/filters';
import { Sales } from '@beautybox/core/entity/Orders/Sales';
import AppBottomSheet from '../../../../../components/bottom-sheet/BottomSheet';
import AppSkeletonBoilerplate from '../../../../../components/loaders/SkeletonBoilerplate';

export default {
    name: 'app-sale-block',
    components: { AppSkeletonBoilerplate, AppBottomSheet },
    data: () => ({
        loading: true,
        barcode: {
            small: '',
            large: '',
        },
        modelBarcode: false,
        percent: 0,
        nextLevelSum: 0,
        nextLevelPercent: 0,
        progressPercent: 0,
    }),
    computed: {
        ...mapGetters(['USER_INFO']),
        hasSale() {
            return this.loading || this.percent;
        },
    },
    created() {
        Sales.createProvider({
            baseUrl: process.env.BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });
        this.requestAll([this.getPercent(), this.getLevel(), this.getDiscountCard()]);
        this.requestEnd(() => {
            this.loading = false;
        });
    },
    methods: {
        priceFilter,
        async onShowCode() {
            if (!this.barcode.large.length) {
                ({ barcode: this.barcode.large = '' } = await Sales.getDiscountCard(
                    this.USER_INFO.phone,
                    6
                ));
            }

            this.modelBarcode = true;
        },
        async getPercent() {
            ({ percent: this.percent = 0 } = await Sales.getPercent(this.USER_INFO.phone));
        },
        async getDiscountCard() {
            ({ barcode: this.barcode.small = '' } = await Sales.getDiscountCard(
                this.USER_INFO.phone,
                3
            ));
        },
        async getLevel() {
            ({
                next_level_sum: this.nextLevelSum = 0,
                next_level_percent: this.nextLevelPercent = 0,
                progress_percent: this.progressPercent = 0,
            } = await Sales.getLevel(this.USER_INFO.phone));
        },
    },
};
</script>

<template>
    <v-card v-if="hasSale" :ripple="false" v-on="$listeners" @click="onShowCode">
        <app-skeleton-boilerplate v-if="loading" type="heading, list-item" />
        <div v-else>
            <div class="d-flex align-center">
                <div class="d-flex flex-column flex-grow-1">
                    <v-card-title class="py-4">Моя скидка</v-card-title>
                    <v-card-text class="sale-text"> {{ percent }} % </v-card-text>
                </div>
                <div class="mr-4" v-html="barcode.small" />
            </div>
            <v-card-text class="next-lvl-text">
                {{ priceFilter(nextLevelSum) }} до скидки {{ nextLevelPercent }}%
            </v-card-text>
            <v-card-actions class="pt-2" :class="{ 'pb-6': !$vuetify.breakpoint.mobile }">
                <v-progress-linear
                    height="6"
                    rounded
                    :width="5"
                    :value="progressPercent"
                    color="#de81e0"
                />
            </v-card-actions>
        </div>
        <app-bottom-sheet v-if="$vuetify.breakpoint.mobile" v-model="modelBarcode" hide-footer>
            <div class="d-flex flex-column align-center pt-6 pb-10">
                <p class="text-center text--primary">
                    Покажите QR-код менеджеру <br />
                    для получения персональной скидки
                </p>
                <div class="my-6" v-html="barcode.large" />
                <v-btn
                    color="link"
                    text
                    :ripple="false"
                    class="u-hide-before"
                    @click="$router.push({ name: 'orders-sale' })"
                >
                    Узнать о системе скидок
                </v-btn>
            </div>
        </app-bottom-sheet>
    </v-card>
</template>

<style lang="scss" scoped>
.v-card {
    &:not(.u-no-shadow) {
        transition: box-shadow 0.3s ease-out;
        box-shadow: $box-shadow-base !important;

        &:hover {
            @include min(xs) {
                box-shadow: $box-shadow-base--hover !important;
            }
        }
    }

    &::before {
        display: none;
    }

    &__title,
    &__text,
    &__actions {
        @include min(sm) {
            padding-right: $gutter;
            padding-left: $gutter;
        }
    }

    &__title {
        color: $color-primary;
        font-size: 18px;
        font-weight: 500;
    }

    &__text {
        &.sale-text {
            color: $color-primary;
            font-size: 30px;
            font-weight: 600;

            @include min(sm) {
                padding-bottom: $gutter;
            }
        }

        &.next-lvl-text {
            padding-top: 0;
            padding-bottom: 0;
            color: $color-primary;
            font-size: 16px;
        }
    }
}

::v-deep {
    .v-skeleton-loader {
        padding: $gutter - 4px $gutter 0;

        &__list-item {
            padding: 0;
        }
    }
}
</style>
