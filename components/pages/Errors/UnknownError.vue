<template>
    <v-app class="not-found">
        <div class="not-found__inner">
            <i class="not-found__icon not-found__icon--left">
                <b-svg name="404_broken" lg />
            </i>
            <i class="not-found__icon not-found__icon--top">
                <b-svg name="404_calendar" lg />
            </i>
            <i class="not-found__icon not-found__icon--right">
                <b-svg name="404_staff" lg />
            </i>
            <b-block-empty title="Что-то пошло не так" class="not-found__empty">
                <template #text> Мы уже исправляем ошибку. Пожалуйста, вернитесь назад </template>
                <template #buttons>
                    <v-btn v-if="checkHistory" min-width="150" large color="white" @click="back">
                        Вернуться назад
                    </v-btn>
                    <v-btn v-else min-width="150" large color="primary" @click="goHome">
                        Перейти на главную
                    </v-btn>
                </template>
            </b-block-empty>
        </div>
        <div class="not-found__title">???</div>
        <div class="not-found__block-shadow" />
    </v-app>
</template>

<script>
const BSvg = () => import(/* webpackChunkName: "Svg" */ '@beautybox/ui-kit/components/icons/Svg');
const BlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '@beautybox/ui-kit/components/blocks/BlockEmpty');

export default {
    components: {
        BSvg,
        BlockEmpty,
    },
    computed: {
        checkHistory() {
            return window.history.length > 1;
        },
    },
    methods: {
        back() {
            history.go(-1);
        },
        goHome() {
            window.location.replace(window.location.origin);
        },
    },
};
</script>

<style lang="scss" scoped>
.not-found {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-height: -webkit-fill-available;
    overflow: hidden;
    background-color: #fff;

    &__inner {
        max-width: $max-width;
        margin: auto;
    }

    &__title {
        position: absolute;
        top: calc(88% - calc(170px + 16vw) / 4.5);
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(0, 0, 0, 0.05);
        font-size: calc(170px + 16vw);
        font-weight: 700;
        word-wrap: unset;

        @media screen and (orientation: portrait) {
            top: calc(88% - 70vw / 4.5);
            font-size: 55vw;
        }
    }

    &__icon {
        position: absolute;

        &--left {
            top: calc(27% + 190px);
            left: calc(50% - 0.7 * calc(170px + 16vw));

            @media screen and (orientation: portrait) {
                top: calc(calc(88% - 70vw / 4.5) - 0.6 * 70vw);
                left: 2%;
            }
        }

        &--top {
            top: 12%;
            left: calc(50% - 170px);

            @media screen and (orientation: portrait) {
                top: 8%;
                left: 20%;
            }
        }

        &--right {
            top: 23%;
            left: calc(50% + 250px);

            @media screen and (orientation: portrait) {
                top: 12%;
                left: 80%;
            }
        }
    }

    &__empty {
        position: relative;
        top: -27%;
        z-index: z(fixed);
    }

    &__block-shadow {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 12%;
        background-color: white;
        box-shadow: 0px -3px 25px #0000001a;
    }

    ::v-deep {
        .empty {
            &__title {
                font-size: 32px;
                font-weight: 700;
                line-height: 43px;

                @media screen and (orientation: portrait) {
                    font-size: 28px;
                    line-height: 33px;
                }
            }
            &__text {
                max-width: 40ch;
                font-size: 14px;
            }
        }
    }
}
</style>
