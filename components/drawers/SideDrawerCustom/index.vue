<template>
    <v-navigation-drawer
        v-model="modal"
        fixed
        :right="right"
        touchless
        disable-route-watcher
        temporary
        tag="div"
        overlay-opacity="1"
        overlay-color="rgba(103, 118, 140, 0.5)"
        :width="width"
    >
        <template #default>
            <div class="c-close-box" :class="{ 'c-close-box--opposite': closeOpposite }">
                <b-btn-close size="28" type="button" @click.stop="onClose" />
                <div v-if="!!$slots['button-back']">
                    <slot name="button-back" />
                </div>
            </div>
            <slot />
        </template>
    </v-navigation-drawer>
</template>

<script>
import { modalToggleMixin } from '../../../mixins';
const BSvg = () => import(/* webpackChunkName: "Svg" */ '../../icons/Svg');
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../../buttons/BtnClose');

export default {
    name: 'BSideDrawerCustom',
    components: { BSvg, BBtnClose },
    mixins: [modalToggleMixin],
    props: {
        width: {
            type: [String, Number],
            required: true,
        },
        right: {
            type: Boolean,
            default: true,
        },
        closeOpposite: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClose() {
            this.modal = false;
        },
    },
};
</script>

<style scoped lang="scss">
.c-close-box {
    position: absolute;
    display: flex;
    top: 14px;
    z-index: z(fixed);

    @include max(xs) {
        top: 7px;
    }

    &--opposite {
        left: $gutter;
        @include max(xs) {
            left: $half-indent;
        }
    }

    &:not(&--opposite) {
        right: $gutter;
        @include max(xs) {
            right: $half-indent;
        }
    }
}

.v-navigation-drawer {
    transition-property: transform, visibility;
}
</style>
