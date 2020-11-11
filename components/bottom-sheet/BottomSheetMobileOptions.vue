<template>
    <v-bottom-sheet
        v-if="$vuetify.breakpoint.mobile"
        v-model="modal"
        scrollable
        overlay-color="rgba(103, 118, 140, 0.5)"
        overlay-opacity="1"
        content-class="c-bottom-sheet u-no-padding"
    >
        <v-sheet>
            <v-list>
                <slot />
            </v-list>

            <v-list-item
                class="c-bottom-sheet__btn-close u-hide-before"
                :ripple="false"
                @click="onClose"
            >
                <span>Закрыть</span>
            </v-list-item>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { modalProps } from '../../mixins';

export default {
    name: 'BBottomSheetMobileOptions',
    mixins: [modalProps],
    methods: {
        onClose() {
            this.$emit('click:close');
            this.modal = false;
        },
    },
};
</script>

<style lang="scss" src="./styles.scss" />
