<template>
    <v-card>
        <v-list-item>
            <v-list-item-content class="pt-4">
                <v-list-item-title class="headline font-weight-bold text-wrap mb-2">
                    Все для lash и brow мастеров
                </v-list-item-title>
                <v-list-item-subtitle class="text-wrap">
                    Beauty Market - магазин косметики и расходных материалов
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile rounded size="60">
                <v-img src="/assets/bbox_logo_circle_white.svg" />
            </v-list-item-avatar>
        </v-list-item>

        <v-card-actions class="pt-4">
            <v-btn
                text
                color="link"
                :ripple="false"
                class="like-link u-hide-before pa-0"
                target="_blank"
                href="https://beautybox.ru/market"
            >
                Перейти в магазин
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'app-promo-block',
    components: {},
    props: {},
    data: () => ({
        loading: true,
    }),
    computed: {},
    async created() {
        this.loading = false;
    },
    mounted() {},
    methods: {
        async getData() {},
    },
};
</script>

<style lang="scss" scoped>
.v-card {
    border-left: 5px solid #de81e0 !important;

    &.theme--light {
        &:not(.u-no-shadow) {
            transition: box-shadow 0.3s ease-out;
            box-shadow: $box-shadow-base !important;

            &:hover {
                @include min(xs) {
                    box-shadow: $box-shadow-base--hover !important;
                }
            }
        }
    }

    .v-list-item {
        &__title,
        &__subtitle {
            cursor: default;
        }
    }

    .headline {
        @include max(xs) {
            font-size: 20px !important;
            line-height: 1.1 !important;
        }
    }
}
</style>
