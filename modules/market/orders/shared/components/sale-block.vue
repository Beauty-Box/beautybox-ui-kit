<script>
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
        async getData() {},
        async getPercent() {
            ({ percent: this.percent = 0 } = await Sales.getPercent());
        },
        async getLevel() {
            ({
                next_level_sum: this.nextLevelSum = 0,
                next_level_percent: this.nextLevelPercent = 0,
                progress_percent: this.progressPercent = 0,
            } = await Sales.getLevel());
        },
    },
};
</script>

<template>
    <v-card v-on="$listeners">
        <app-skeleton-boilerplate v-if="loading" type="heading, list-item" />
        <template v-else>
            <v-card-title class="pt-4 pb-6">Моя скидка</v-card-title>
            <v-card-text class="primary--text" style="font-size: 32px; font-weight: 600">
                {{ percent }} %
            </v-card-text>
            <v-card-text class="primary--text pt-0 pb-0" style="font-size: 16px">
                {{ priceFilter(nextLevelSum) }} до скидки {{ nextLevelPercent }}%
            </v-card-text>
            <v-card-actions class="pt-3">
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
        box-shadow: $box-shadow-secondary !important;

        &:hover {
            @include min(xs) {
                box-shadow: $box-shadow-secondary--hover !important;
            }
        }
    }

    &__title {
        color: #101928;
        font-size: 20px;
        font-weight: 600;
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
