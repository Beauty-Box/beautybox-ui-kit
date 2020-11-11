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
        class="c-btn-remove"
        v-on="$listeners"
    >
        <v-icon :size="size / 1.5" :color="iconColor">close</v-icon>
    </v-btn>
</template>

<script>
const BSvg = () => import(/* webpackChunkName: "Svg" */ '../icons/Svg');

export default {
    name: 'BBtnRemove',
    components: { BSvg },
    props: {
        size: {
            type: [Number, String],
            default: 30,
        },
        iconColor: {
            type: String,
            default: 'error',
        },
    },
};
</script>

<style lang="scss" scoped>
.v-btn {
    padding: 0 !important;
    transition: none !important;

    &:hover {
        .v-icon {
            transform: rotate(90deg);
            transition: transform 0.15s ease-in-out;
        }

        svg {
            fill: $color-icon;
            transform: rotate(90deg);
            transition: transform 0.15s ease-in-out;
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

    .v-icon {
        transition: none;
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
