<template>
    <v-container class="container--md" :class="{ 'background--lighten px-0 pb-0': isMobile }">
        <app-block-loader v-if="loading" bgc="#fff" />
        <v-row v-else>
            <v-col cols="12" md="6">
                <v-card :class="{ 'mx-4': isMobile }">
                    <v-card-title class="mb-6">Моя скидка</v-card-title>
                    <v-card-text class="primary--text" style="font-size: 32px; font-weight: 600">
                        {{ percent }} %
                    </v-card-text>
                    <v-card-text class="primary--text pt-0 pb-0" style="font-size: 16px">
                        {{ priceFilter(next_level_sum) }} до скидки {{ next_level_percent }}%
                    </v-card-text>
                    <v-card-actions class="pt-3">
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
            <v-col cols="12" md="6" :class="{ 'pb-0': isMobile }">
                <v-card :class="{ 'elevation-0 rounded-0': isMobile }">
                    <v-card-title>Расчет скидки</v-card-title>
                    <v-card-text class="pb-0">
                        Скидка зависит от суммы ваших покупок за весь период
                    </v-card-text>
                    <v-stepper :value="current" vertical class="u-no-shadow pb-0">
                        <template v-for="(item, index) in discount_calculation">
                            <v-stepper-step
                                :key="index"
                                class="pb-6"
                                :class="{
                                    'is-done': index + 1 < current,
                                    'px-3': isMobile,
                                }"
                                color="#DE81E0"
                                :step="''"
                                :complete-icon="index + 1 === current ? 'done' : ''"
                                :complete="index < current"
                            >
                                <div>
                                    <span>{{ item.sum }}</span>
                                    <span>{{ item.percent }}%</span>
                                </div>
                            </v-stepper-step>
                            <v-stepper-content
                                v-if="index + 1 < discount_calculation.length"
                                :key="index + 'd'"
                                :step="''"
                                :class="{ 'is-done': index + 1 < current }"
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

const AppBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../../components/blocks/BlockLoader');

export default {
    components: { AppBlockLoader },
    data: () => ({
        loading: true,
        current: 0,
        next_level_sum: 0,
        next_level_percent: 0,
        progress_percent: 0,
        percent: 0,
        discount_calculation: [],
    }),
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
    },
    created() {
        Sales.createProvider({
            baseUrl: process.env.BASE_URL,
            module: process.env.MODULE_NAME,
            token: localStorage.getItem('access_token'),
        });
        this.requestAll([this.getPercent(), this.getLevel(), this.getDiscount()]);
        this.requestEnd(() => {
            this.loading = false;
        });
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
        },
    },
};
</script>

<style lang="scss" scoped>
.v-application--is-ltr {
    .v-stepper--vertical {
        &.theme--light {
            .v-stepper {
                &__content {
                    margin: -12px -36px -16px 36px;
                    padding-top: 7px;
                    padding-bottom: 7px;

                    @include max(xs) {
                        margin: -12px 0 -16px 24px;
                    }

                    &:not(:last-child) {
                        border-left: 1px dashed $color-border--lighten;

                        &.is-done {
                            border-left-color: #de81e0;
                        }
                    }
                }
            }
        }
    }
}

.v-stepper {
    &__label {
        width: 100%;
    }

    &__step {
        &:not(.v-stepper__step--complete) {
            ::v-deep .v-stepper__step__step {
                @include border(all);
                background: #fff !important;
            }
        }

        &__step {
            background: linear-gradient(45deg, #c578f0 40%, #de81e0 65%) !important;
        }

        &--complete {
            &.is-done {
                ::v-deep .v-stepper__step__step {
                    width: 16px;
                    min-width: 16px;
                    height: 16px;
                    margin: 4px;
                    margin-right: 16px !important;
                }
            }

            &.is-next {
            }

            &:last-child {
            }

            &:not(:last-child) {
            }
        }
    }
}

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
        padding-bottom: 0;
        color: #101928;
        font-size: 20px;
        font-weight: 600;
    }
}
</style>
