<template>
    <v-btn
        :ripple="false"
        large
        class="button-round"
        :class="[`button-round--${variant}`]"
        @click="emit('click')"
    >
        <!-- :elevation="variant === 'outline' ? undefined : 0" -->
        <div class="d-flex align-center button-round__content">
            <slot />
            <v-svg v-if="appendIcon" :name="appendIcon" class="button-round-icon" />
        </div>
    </v-btn>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
// @ts-ignore
import VBtn from 'vuetify/lib/components/VBtn';
import { PropsVariant } from '../../../composables/ui/useVariant';

const VSvg = defineAsyncComponent(() => import('../../icons/BSvg.vue'));

interface Props {
    appendIcon?: string;
    variant?: PropsVariant['variant'];
    color?: string;
}

interface Emits {
    (e: 'click'): void;
}

const props = withDefaults(defineProps<Props>(), {
    appendIcon: undefined,
    variant: 'outline',
    color: '#101928',
});

const emit = defineEmits<Emits>();
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
        column-gap: $half-indent;
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
