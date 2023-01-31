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
                <b-btn-close size="28" type="button" @click.stop="close" />
                <div v-if="!!$slots['button-back']">
                    <slot name="button-back" />
                </div>
            </div>
            <slot />
        </template>
    </v-navigation-drawer>
    <!-- проп который закрывает дравел при изменении роута disable-route-watcher -->
</template>

<script>
const BSvg = () => import(/* webpackChunkName: "Svg" */ '../../icons/Svg');
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../../buttons/BtnClose');

export default {
    name: 'BSideDrawerCustom',
    components: { BSvg, BBtnClose },
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
    modalController: null,
    data() {
        return {
            modal: false,
        };
    },
    watch: {
        modal(value) {
            if (!value) {
                this.close();
            }
        },
    },
    methods: {
        open() {
            let resolve;
            let reject;

            const modalPromise = new Promise((ok, fail) => {
                resolve = ok;
                reject = fail;
            });
            this.$options.modalController = { resolve, reject };
            this.modal = true;

            return modalPromise;
        },
        // value может быть любым объектом
        confirm(value = {}) {
            this.$options.modalController.resolve(value);
            this.modal = false;
        },
        close(value = {}) {
            this.$options.modalController.resolve(value);
            this.modal = false;
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

.v-navigation-drawer {
    transition-property: transform, visibility;
    z-index: z(modal);
}
</style>
