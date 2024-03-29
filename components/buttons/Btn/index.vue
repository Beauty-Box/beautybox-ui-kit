<template>
    <v-btn
        :dark="isDark"
        large
        :ripple="false"
        :color="color"
        class="button u-text-weight--medium px-4"
        :class="[`button--${size}`, { 'button--rounded': rounded }, `button--${color}`]"
        v-bind="$props"
        v-on="$listeners"
    >
        <slot />
    </v-btn>
</template>

<script>
import { defineComponent, computed } from 'vue';

import VBtn from 'vuetify/lib/components/VBtn';

export default defineComponent({
    name: 'BBtn',
    components: { VBtn },
    props: {
        ...VBtn.options.props,
        rounded: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
            default: 'primary',
        },
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['medium', 'x-medium'].includes(value);
            },
        },
    },
    setup(props, { emit }) {
        const isDark = computed(() => {
            return props.color === 'primary';
        });

        return { isDark };
    },
});
</script>

<style scoped lang="scss">
$button-sizes: (
    'medium': 44px,
    'x-medium': 48px,
);

.button {
    // vuetify стили которые идут с импортантом переопределить можно только так, или через id
    // id использовать нельзя, так как это ui-kit, а id должен быть уникальным на странице
    .theme--light
        &:not(.v-btn--depressed):not(.v-btn--disabled):not(.v-btn--flat):not(.v-btn--text):not(.v-btn--icon):not(.elevation-0) {
        box-shadow: none !important;
        @each $name, $color in $box-shadow-colors {
            &.button--#{$name} {
                &:hover {
                    box-shadow: 0 3px 5px 0 rgba($color, 0.3) !important;
                }
            }
        }

        &.button--white {
            box-shadow: $box-shadow-base !important;
            &:hover {
                box-shadow: 0 3px 5px 0 rgba($color-border--light, 0.35) !important;
            }
        }
    }
    & ::v-deep svg {
        fill: currentColor;
        color: inherit;
    }
    &:hover::before {
        opacity: 0;
    }
    &--rounded {
        border-radius: $border-radius-button-primary;
    }

    @each $name, $size in $button-sizes {
        &--#{$name} {
            height: $size !important;
        }
    }
}
</style>
