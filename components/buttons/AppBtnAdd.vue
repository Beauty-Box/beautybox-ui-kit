<template>
    <v-fab-transition v-if="$vuetify.breakpoint.mdAndDown || forever">
        <v-btn
            transition="slide-y-reverse-transition"
            fab
            dark
            fixed
            right
            bottom
            color="primary"
            class="btn-add"
            :ripple="false"
            :to="to"
            v-on="$listeners"
        >
            <slot>
                <v-svg name="plus--bold" />
            </slot>
            <!-- <img src="/assets/temp/colpac.svg" class="icon-colpac" alt="happy new year" />-->
        </v-btn>
    </v-fab-transition>
</template>

<script>
export default {
    name: 'AppBtnAdd',
    props: {
        to: {
            type: Object,
            default: null,
        },
        forever: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.btn-add {
    .icon {
        &:not(.icon-colpac) {
            width: 20px;
            height: 20px;
            fill: #fff;
        }
    }

    &.v-btn--right {
        right: 12px;

        @include min(md) {
            right: $gutter;
        }
    }

    &.v-btn--bottom {
        bottom: 70px;

        @include min(md) {
            bottom: 30px;
        }

        @include iphoneX() {
            bottom: 80px;
        }
    }

    .icon-colpac {
        position: absolute;
        top: -80px;
        left: -27px;
        z-index: -2;
        width: 100px;
        height: 100px;
        fill: initial;
    }
} // .btn-add
</style>
