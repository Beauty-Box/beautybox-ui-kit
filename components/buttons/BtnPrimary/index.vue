<template>
    <v-btn
        dark
        large
        :ripple="false"
        color="primary darken"
        class="button u-text-weight--medium"
        :class="[`button--${size}`, { 'button--rounded': rounded }]"
        v-bind="$props"
        v-on="$listeners"
    >
        <slot />
    </v-btn>
</template>

<script>
import { defineComponent } from 'vue';

import VBtn from 'vuetify/lib/components/VBtn';

export default defineComponent({
    components: { VBtn },
    props: {
        ...VBtn.options.props,
        rounded: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['medium', 'x-medium'].includes(value);
            },
        },
    },
    setup() {
        return {};
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
        &:not(.v-btn--depressed):not(.v-btn--disabled):not(.v-btn--flat):not(.v-btn--text):not(.v-btn--icon):not(.elevation-0):not(.white) {
        box-shadow: none !important;

        &:hover {
            box-shadow: $box-shadow-button-primary--hover !important;
        }
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
