<template>
    <v-subheader :class="{ center, notequal }">
        <slot />
    </v-subheader>
</template>

<script>
export default {
    name: 'SimpleSubheader',
    props: {
        center: {
            type: Boolean,
            default: false,
        },
        notequal: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-subheader {
    justify-content: flex-start;
    background-color: $color-bg--lightest;
    color: $gray-subheader;
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;

    &.center {
        justify-content: center;
    }

    &.notequal {
        height: 54px;
        padding-top: 24px;
        padding-bottom: 12px;
    }
}
</style>
