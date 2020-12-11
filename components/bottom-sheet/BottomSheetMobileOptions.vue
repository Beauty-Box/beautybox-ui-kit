<template>
    <v-bottom-sheet
        v-if="$vuetify.breakpoint.mobile"
        v-model="modal"
        scrollable
        :overlay-color="overlayColor"
        :overlay-opacity="overlayOpacity"
        content-class="c-bottom-sheet u-no-padding"
    >
        <v-sheet elevation="0">
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
import { modalToggleMixin, modalOverlayColorMixin } from '../../mixins';

export default {
    name: 'BBottomSheetMobileOptions',
    mixins: [modalToggleMixin, modalOverlayColorMixin],
    methods: {
        onClose() {
            this.$emit('click:close');
            this.modal = false;
        },
    },
};
</script>

<style lang="scss" src="./BottomSheet.scss" />
