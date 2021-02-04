<script>
import { mapGetters } from 'vuex';
import { Sales } from '@beautybox/core/entity/Orders/Sales';
const AppSaleBlock = () =>
    import(/* webpackChunkName: "sale-block" */ './shared/components/sale-block');
const AppBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../../../components/blocks/BlockLoader');

export default {
    components: { AppSaleBlock, AppBlockLoader },
    data: () => ({
        loading: true,
        current: 0,
        discountCalculation: [],
    }),
    computed: {
        ...mapGetters(['USER_INFO']),
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
        userPhone() {
            return this.USER_INFO.phone;
        },
    },
    created() {
        Sales.createProvider({
            baseUrl: process.env.BASE_URL,
            module: 'market',
            token: localStorage.getItem('access_token'),
        });
        this.requestAll([this.getDiscount(), this.getPercent()]);
        this.requestEnd(() => {
            this.loading = false;
        });
    },
    methods: {
        async getDiscount() {
            ({ discount_calculation: this.discountCalculation = [] } = await Sales.getDiscount(
                this.userPhone
            ));
        },
        async getPercent() {
            ({ percent: this.current = 0 } = await Sales.getPercent(this.userPhone));
        },
    },
};
</script>

<template>
    <v-container class="container--md" :class="{ 'background--lighten px-0 pb-0': isMobile }">
        <app-block-loader v-if="loading" bgc="#fff" />
        <v-row v-else>
            <v-col cols="12" md="6">
                <app-sale-block :class="{ 'mx-4': $vuetify.breakpoint.mobile }" />
            </v-col>
            <v-col cols="12" md="6" :class="{ 'pb-0': isMobile }">
                <v-card :class="{ 'elevation-0 rounded-0': isMobile }">
                    <v-card-title>Расчет скидки</v-card-title>
                    <v-card-text class="pb-0">
                        Скидка зависит от суммы ваших покупок за весь период
                    </v-card-text>
                    <v-stepper :value="current" vertical class="u-no-shadow pb-0">
                        <template v-for="(item, index) in discountCalculation">
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
                                <div class="d-flex justify-space-between" style="width: 100%">
                                    <span>{{ item.sum | price }}</span>
                                    <span>{{ item.percent }}%</span>
                                </div>
                            </v-stepper-step>
                            <v-stepper-content
                                v-if="index + 1 < discountCalculation.length"
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
        }
    }

    ::v-deep &__label {
        width: 100%;
    }
}

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

    &__title {
        padding-bottom: 0;
        color: $color-primary;
        font-size: 20px;
        font-weight: 600;
    }
}
</style>
