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
            <b-btn-close
                size="35"
                type="button"
                :class="{ 'c-btn-close--opposite': closeOpposite }"
                @click.stop="modal = false"
            />
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
.c-btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
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
}
</style>
