<template>
    <v-btn-toggle
        v-if="items.length"
        v-model="modal"
        :mandatory="mandatory"
        class="form-items-inline c-btn-toggle"
    >
        <v-btn
            v-for="(item, index) in items"
            :key="index"
            :ripple="false"
            class="c-btn-toggle__btn v-btn--flat"
        >
            {{ item }}
        </v-btn>
    </v-btn-toggle>
</template>

<script>
import { VBtn, VBtnToggle } from 'vuetify/lib';
import { modalToggleMixin } from '../../../mixins';

export default {
    name: 'BBtnToggle',
    components: {
        VBtn,
        VBtnToggle,
    },
    mixins: [modalToggleMixin],
    props: {
        mandatory: {
            type: Boolean,
            default: true,
        },
        items: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss">
.c-btn-toggle {
    box-shadow: none !important;

    &__btn {
        box-shadow: none !important;
        height: 56px !important;
        min-height: 56px !important;
        min-width: 56px !important;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        color: $color-primary !important;

        &.v-item--active {
            background-color: $color-info !important;
            color: #fff !important;
        }
    }
}
</style>
