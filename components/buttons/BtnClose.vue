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
        :class="{ 'c-btn-close--bg': hasBg }"
        v-on="$listeners"
    >
        <v-icon v-if="hasBg" size="22">close</v-icon>
        <b-svg v-else name="close" :style="{ width: size / 2, height: size / 2 }" />
    </v-btn>
</template>

<script>
const BSvg = () => import(/* webpackChunkName: "Svg" */ '../icons/Svg');

export default {
    name: 'BtnClose',
    components: { BSvg },
    props: {
        size: {
            type: [Number, String],
            default: 40,
        },
        hasBg: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.theme--light {
    .c-btn-close--bg {
        &::before,
        &::after {
            opacity: 0.1;
        }
    }
}

.v-btn {
    padding: 0 !important;

    &:hover {
        svg {
            fill: $color-icon;
        }
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

.c-btn-close {
    &:not(.c-btn-close--bg) {
        &::before,
        &::after {
            display: none !important;
        }
    }

    &--bg {
        border-radius: 50% !important;

        &::before,
        &::after {
            border-radius: inherit;
        }
    }
}
</style>
