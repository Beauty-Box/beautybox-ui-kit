<template>
    <v-bottom-sheet
        v-if="$vuetify.breakpoint.smAndDown"
        v-model="modal"
        content-class="c-bottom-sheet u-no-padding"
        scrollable
    >
        <v-sheet>
            <v-list>
                <slot />
            </v-list>

            <v-list-item class="c-bottom-sheet__btn-close" :ripple="false" @click="modal = false">
                <span>Закрыть</span>
            </v-list-item>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { modalProps } from '@beautybox/ui-kit/mixins';

export default {
    name: 'BottomSheetMobileOptions',
    mixins: [modalProps],
};
</script>

<style lang="scss" src="./bottom-sheet.scss" />
