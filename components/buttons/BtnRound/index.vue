<template>
    <v-btn
        :ripple="false"
        large
        class="button-round"
        :class="[`button-round--${variant}`]"
        v-on="listeners['content']"
    >
        <div class="d-flex align-center button-round__content">
            <div v-if="prependIcon" class="d-flex align-center" v-on="listeners['prepend']">
                <v-svg :name="prependIcon" class="button-round-icon" />
            </div>
            <slot />
            <div v-if="appendIcon" class="d-flex align-center" v-on="listeners['append']">
                <v-svg :name="appendIcon" class="button-round-icon" />
            </div>
        </div>
    </v-btn>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
// @ts-ignore
import VBtn from 'vuetify/lib/components/VBtn';
import { PropsVariant } from '../../../composables/ui/useVariant';
import { useDividedListeners } from '../../../composables/useDividedListeners';

const VSvg = defineAsyncComponent(() => import('../../icons/BSvg.vue'));

interface Props {
    prependIcon?: string;
    appendIcon?: string;
    variant?: PropsVariant['variant'];
    color?: string;
    padding?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
    prependIcon: undefined,
    appendIcon: undefined,
    variant: 'outline',
    color: '#101928',
    padding: '16px',
});

const { listeners } = useDividedListeners();

console.log('listeners in button', listeners.value);

const paddings = computed(() => {
    const horizontal = typeof props.padding === 'number' ? `${props.padding}px` : props.padding;

    return `0 ${horizontal}`;
});
</script>

<style scoped lang="scss">
.button-round {
    background-color: #fff !important;
    font-weight: 500;
    border-radius: $border-radius-largest;
    line-height: 1.25;
    border-width: 1px;
    border-style: solid;
    border-color: #fff;
    padding: v-bind('paddings') !important;

    .theme--light
        &:not(.v-btn--depressed):not(.v-btn--disabled):not(.v-btn--flat):not(.v-btn--text):not(.v-btn--icon):not(.elevation-0) {
        box-shadow: none !important;

        &.button-round--outline {
            &:hover {
                border-color: currentColor;
                transform: unset;
                box-shadow: none !important;
            }
            &::before {
                opacity: 1;
                background-color: #fff;
            }
        }
        &.button-round--fill {
            background-color: v-bind('color') !important;
            color: #fff !important;
            box-shadow: $box-shadow-base !important;
            &:hover {
            }
        }
    }

    &:hover {
        border-color: currentColor;
    }
    &__content {
        column-gap: $spacer * 2;
    }

    &-icon {
        height: 20px;
        fill: currentColor;
    }

    &--outline {
        color: v-bind('color');

        &:hover {
            border-color: currentColor;
        }
    }
    &--fill {
    }
}
</style>
