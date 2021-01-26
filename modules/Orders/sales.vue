<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="card-sale-title"> Моя скидка </v-card-title>
                    <v-card-text class="progress-price"> {{ percent }} % </v-card-text>
                    <v-card-text class="progress-subtitle">
                        {{ priceFilter(next_level_sum) }} до скидки {{ next_level_percent }}%
                    </v-card-text>
                    <v-card-actions>
                        <v-progress-linear
                            height="6"
                            rounded
                            :width="5"
                            :value="progress_percent"
                            color="#DE81E0"
                        />
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="card-sale-title"> Расчет скидки </v-card-title>
                    <v-card-text>
                        Скидка зависит от суммы ваших покупок за весь период
                    </v-card-text>
                    <v-stepper :value="current" vertical class="u-no-shadow">
                        <template v-for="(item, index) in discount_calculation">
                            <v-stepper-step
                                :key="index"
                                class="steps"
                                :class="{
                                    'steps--done': index + 1 < current,
                                    'steps--next': index + 1 > current,
                                }"
                                color="#DE81E0"
                                :step="''"
                                :complete-icon="index + 1 === current ? 'done' : ''"
                                :complete="index < current"
                            >
                                <div class="steps__text">
                                    <span>{{ item.sum }}</span>
                                    <span>{{ item.percent }}%</span>
                                </div>
                            </v-stepper-step>
                            <v-stepper-content
                                v-if="index + 1 < discount_calculation.length"
                                :key="index + 'd'"
                                :step="''"
                                class="steps-content"
                                :class="{ 'steps-content--done': index + 1 < current }"
                            />
                        </template>
                    </v-stepper>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { priceFilter } from '@beautybox/core/filters';
import { Sales } from '@beautybox/core/entity/Orders/Sales';

export default {
    data: () => ({
        current: 0,
        next_level_sum: 0,
        next_level_percent: 0,
        progress_percent: 0,
        percent: 0,
        discount_calculation: [],
    }),
    created() {
        Sales.createProvider({
            baseUrl: process.env.BASE_URL,
            module: 'link',
            token: localStorage.getItem('access_token'),
        });
        this.requestAll([this.getPercent(), this.getLevel(), this.getDiscount()]);
    },
    methods: {
        priceFilter,
        async getPercent() {
            ({ percent: this.percent = 0 } = await Sales.getPercent());
        },
        async getLevel() {
            ({
                next_level_sum: this.next_level_sum = 0,
                next_level_percent: this.next_level_percent = 0,
                progress_percent: this.progress_percent = 0,
            } = await Sales.getLevel());
        },
        async getDiscount() {
            ({
                discount_calculation: this.discount_calculation = [],
                current: this.current = 0,
            } = await Sales.getDiscount());
            console.log('discount_calculation', this.discount_calculation);
        },
    },
};
</script>

<style lang="scss">
.card-sale-title {
    margin-bottom: 12px !important;
    padding-bottom: 0;
    color: #101928;
    font-size: 18px;
    font-weight: 600;
}
.progress-text {
    color: #101928;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -3px;
}
.progress-subtitle {
    margin-bottom: -15px;
    padding-top: 0;
    padding-bottom: 0;
    color: #101928 !important;
    font-size: 15px;
}
.progress-price {
    margin-bottom: 4px;
    color: #101928 !important;
    font-size: 32px;
    font-weight: 600;
}
.steps {
    .v-stepper__label,
    &__text {
        width: 100%;
    }
    &__text {
        display: flex;
        justify-content: space-between;
    }

    .v-stepper__step__step {
        background: linear-gradient(45deg, #c578f0 40%, #de81e0 65%) !important;
    }

    &--done,
    &--next {
        .v-stepper__step__step {
            width: 16px;
            min-width: 16px;
            height: 16px;
            margin: 4px;
            margin-right: 16px !important;
        }
    }

    &--next {
        .v-stepper__step__step {
            border: 1px solid #dee3e7 !important;
            background: #fff !important;
        }
    }
}
.steps-content {
    margin: -12px -36px -16px 36px !important;
    padding-top: 7px !important;
    padding-bottom: 7px !important;
    border-left: 1px dashed #dee3e7 !important;

    &--done {
        border-left-color: #de81e0 !important;
    }
}
</style>
