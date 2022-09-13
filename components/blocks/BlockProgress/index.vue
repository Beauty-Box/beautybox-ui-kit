<template>
    <div class="progress" :style="{ '--bg-color': this.bgc }">
        <div
            class="progress__fill"
            :style="{ width: fillWidth + '%', '--fill-color': this.color }"
        />
    </div>
</template>

<script>
export default {
    name: 'BlockProgress',
    props: {
        value: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            default: 100,
        },
        color: {
            type: String,
            default: '#101928',
        },
        bgc: {
            type: String,
            default: 'transparent',
        },
    },

    computed: {
        fillWidth() {
            return Math.min(this.value, this.max);
        },
    },
};
</script>

<style scoped lang="scss">
.progress {
    width: 100%;
    height: 5px;
    background-color: var(--bg-color, transparent);
    border-radius: $border-radius-card * 2.5;
    &__fill {
        height: 100%;
        background-color: var(--fill-color, #101928);
        border-radius: $border-radius-card * 2.5;
        transition: width 0.4s ease 0s;
    },
}
</style>
