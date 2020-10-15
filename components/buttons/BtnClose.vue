<template>
    <v-btn
        small
        light
        tile
        text
        :width="size"
        :min-width="size"
        :height="size"
        :ripple="false"
        class="c-btn-close"
        v-on="$listeners"
    >
        <b-svg name="close" :style="{ width: size / 2, height: size / 2 }" />
    </v-btn>
</template>

<script>
const BSvg = () => import(/* webpackChunkName: "Svg" */ '@beautybox/ui-kit/components/icons/Svg');

export default {
    name: 'BtnClose',
    components: { BSvg },
    props: {
        size: {
            type: [Number, String],
            default: 40,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-btn {
    padding: 0 !important;

    &:hover {
        svg {
            fill: $color-icon;
        }
    }

    &::before,
    &::after {
        display: none !important;
    }

    ::v-deep &__content {
        width: inherit;
        height: inherit;
    }

    svg {
        fill: $color-icon--light;

        @include max(sm) {
            width: 16px;
            height: 16px;
            fill: $color-icon;
        }
    }
}
</style>
