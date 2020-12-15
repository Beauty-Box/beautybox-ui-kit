<template>
    <v-btn
        depressed
        outlined
        min-width="56"
        width="56"
        height="56"
        :ripple="false"
        class="c-btn--square"
        color="color-border"
    >
        <slot />
    </v-btn>
</template>

<script>
export default {
    name: 'BBtnSquare',
};
</script>

<style lang="scss" scoped></style>
