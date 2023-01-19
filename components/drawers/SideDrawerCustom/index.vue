<template>
    <v-navigation-drawer
        v-model="modal"
        fixed
        :right="right"
        touchless
        temporary
        tag="div"
        overlay-opacity="1"
        overlay-color="rgba(103, 118, 140, 0.5)"
        :width="width"
    >
        <template #default>
            <div class="c-close-box" :class="{ 'c-close-box--opposite': closeOpposite }">
                <b-btn-close size="28" type="button" @click.stop="modal = false" />
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
};
</script>

<style scoped lang="scss">
.c-close-box {
    position: absolute;
    display: flex;
    top: 10px;
    z-index: z(fixed);

    @include max(xs) {
        top: 5px;
        right: 5px;
    }

    &--opposite {
        left: 10px;
        @include max(xs) {
            left: 5px;
        }
    }

    &:not(&--opposite) {
        right: 10px;
        @include max(xs) {
            right: 5px;
        }
    }
}
</style>
