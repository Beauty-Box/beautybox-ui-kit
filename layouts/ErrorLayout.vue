<template>
    <v-app class="not-found">
        <div class="not-found__inner">
            <i class="not-found__icon not-found__icon--left">
                <component :is="svgComponent" name="404_broken" lg />
            </i>
            <i class="not-found__icon not-found__icon--top">
                <component :is="svgComponent" name="404_calendar" lg />
            </i>
            <i class="not-found__icon not-found__icon--right">
                <component :is="svgComponent" name="404_staff" lg />
            </i>
            <router-view />
        </div>
        <div class="not-found__title">{{ $route.meta.code }}</div>
        <div class="not-found__block-shadow" />
    </v-app>
</template>

<script>
import svgComponentMixin from '../mixins/svgComponent.mixin';

export default {
    mixins: [svgComponentMixin],
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
