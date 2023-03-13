<template>
    <v-btn
        :type="type"
        icon
        large
        :ripple="false"
        class="c-btn-draggable"
        :class="[`${color}--text`]"
        v-on="$listeners"
    >
        <v-icon :size="iconSize" :color="color">
            {{ icon }}
        </v-icon>
    </v-btn>
</template>

<script>
import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';

export default {
    name: 'BBtnDraggable',
    components: { VBtn, VIcon },
    props: {
        type: {
            type: String,
            default: 'button',
        },
        color: {
            type: String,
            default: 'secondary',
        },
        icon: {
            type: String,
            default: 'menu',
        },
        iconSize: {
            type: [String, Number],
            default: 22,
        },
    },
};
</script>

<style scoped lang="scss" src="./BtnDraggable.scss"></style>
