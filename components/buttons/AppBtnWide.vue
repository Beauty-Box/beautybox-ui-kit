<template>
    <button class="btn-wide" :type="type" v-on="$listeners">
        <!--<v-svg v-if="iconSvg" :name="iconSvg" />-->
        <v-icon :size="iconSize" :color="iconColor" style="margin-right: 12px;">{{ icon }}</v-icon>
        <v-spacer v-if="!text" />
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'AppBtnWide',
    props: {
        text: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'button',
        },
        icon: {
            type: String,
            default: 'add_circle',
        },
        iconColor: {
            type: String,
            default: 'primary',
        },
        iconSize: {
            type: [String, Number],
            default: 28,
        },
        iconSvg: {
            type: String,
            default: 'plus--filled',
        },
    },
};
</script>

<style lang="scss" scoped>
.btn-wide {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 100%;
    height: 55px;
    padding: 0 $base-indent 0 $base-indent - 1;
    outline: none;
    background-color: #fff;
    color: $color-info;
    font-size: 16px;
    line-height: 55px;
    cursor: pointer;
    @include border(top);
    @include border(bottom);

    .icon {
        width: map-get($icons-sizes, 'sm') + 1.5;
        height: map-get($icons-sizes, 'sm') + 1.5;

        &:first-child {
            margin-right: 15px;
        }
    }
}
</style>
