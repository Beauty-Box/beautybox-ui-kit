<script>
import { mapGetters } from 'vuex';
import { priceFilter } from '@beautybox/core/filters';
import { Sales } from '@beautybox/core/entity/Orders/Sales';
import AppSkeletonBoilerplate from '../../../../../components/loaders/SkeletonBoilerplate';

export default {
    name: 'app-sale-block',
    components: { AppSkeletonBoilerplate },
    data: () => ({
        loading: true,
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
        this.requestAll([this.getPercent(), this.getLevel()]);
        this.requestEnd(() => {
            this.loading = false;
        });
    },
    methods: {
        priceFilter,
        async getPercent() {
            ({ percent: this.percent = 0 } = await Sales.getPercent(this.USER_INFO.phone));
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
    <v-card v-if="hasSale" v-on="$listeners">
        <app-skeleton-boilerplate v-if="loading" type="heading, list-item" />
        <template v-else>
            <v-card-title class="py-4">Моя скидка</v-card-title>
            <v-card-text class="sale-text"> {{ percent }} % </v-card-text>
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
        </template>
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
