<template>
    <div
        class="loader"
        :class="{
            className,
        }"
        :style="{
            '--bg-color': bgc,
            '--position': position,
            '--z-index': zIndex,
        }"
    >
        <div>
            <v-progress-circular
                :color="color"
                :indeterminate="indeterminate"
                :size="size"
                :width="width"
            />
        </div>
    </div>
</template>

<script>
import VProgressCircular from 'vuetify/lib/components/VProgressCircular';

export default {
    name: 'BlockLoader',
    components: {
        VProgressCircular,
    },
    props: {
        color: {
            type: String,
            default: 'primary',
        },
        className: {
            type: String,
            default: null,
        },
        position: {
            type: String,
            default: 'absolute',
            validator(value) {
                return ['fixed', 'absolute', 'relative', 'static', 'sticky'].indexOf(value) !== -1;
            },
        },
        bgc: {
            type: String,
            default: 'transparent',
        },
        zIndex: {
            type: [String, Number],
            default: 1011,
        },
        indeterminate: {
            type: Boolean,
            default: true,
        },
        size: {
            type: [String, Number],
            default: 50,
        },
        width: {
            type: Number,
            default: 3,
        },
    },
};
</script>

<style lang="scss" scoped>
.loader {
    position: var(--position, absolute);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--z-index, 1011);
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color, transparent);
    pointer-events: none;
    @include noselect;

    & > div {
        margin: auto;
    }
} //.loader
</style>
