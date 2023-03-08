<script>
import { modalMixin } from '../../../mixins';
const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../../blocks/BlockLoader');
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../../buttons/BtnClose');
const VSvg = () => import(/* webpackChunkName: "Svg" */ '../../icons/Svg');

export default {
    name: 'MFullScreenNotEqual',
    components: { BBlockLoader, BBtnClose, VSvg },
    mixins: [modalMixin],
    props: {
        bgc: {
            type: String,
            default: '#fff',
        },
        tag: {
            type: String,
            default: 'form',
        },
        contentClass: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        overlayIsVisible: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        noClickAnimation: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        overlay: {
            get() {
                return this.overlayIsVisible;
            },
            set(value) {
                this.$emit('changeOverlayIsVisible', value);
            },
        },
    },
    created() {
        document.addEventListener('keyup', this.removeOverlay);
    },
    beforeDestroy() {
        document.removeEventListener('keyup', this.removeOverlay);
    },
    methods: {
        //Убераем Overlay при клике на Esc
        removeOverlay(e) {
            if (e.keyCode === 27) {
                this.overlay = false;
            }
        },
    },
};
</script>

<template>
    <v-dialog
        :value="true"
        fullscreen
        persistent
        :transition="transition"
        hide-overlay
        :no-click-animation="noClickAnimation"
        content-class="full-screen full-screen--not-equal"
    >
        <form
            class="full-screen__form"
            :class="contentClass"
            :disabled="disabled"
            @submit.prevent="submit"
        >
            <b-block-loader v-if="loading" />
            <template v-else>
                <!-- HEADER -->
                <div ref="header" class="full-screen__header">
                    <div ref="title">
                        <div v-if="!!$slots.customTitle" class="full-screen__title">
                            <slot name="customTitle" />
                        </div>
                        <h2 v-else class="full-screen__title">
                            {{ $route.meta.title }}
                        </h2>
                    </div>
                    <b-btn-close
                        size="40"
                        class="full-screen__btn-close"
                        @click="$emit('click:close')"
                    />
                </div>

                <!-- CONTENT -->
                <div class="full-screen__content full-screen-content" @scroll="onScroll">
                    <div v-if="$vuetify.breakpoint.mobile" class="full-screen-content__title">
                        <div ref="contentTitle">
                            <template v-if="!!$slots.customTitle">
                                <slot name="customTitle" />
                            </template>
                            <template v-else>{{ $route.meta.title || title }}</template>
                            <p v-if="$route.meta.description || description">
                                {{ $route.meta.description || description }}
                            </p>
                        </div>
                    </div>

                    <div
                        v-if="$slots.leftContent"
                        class="full-screen-content__left"
                        :style="{ '--bg-color-left-content': bgc }"
                    >
                        <slot name="leftContent" />
                    </div>

                    <div v-if="$slots.rightContent" class="full-screen-content__right">
                        <div class="full-screen-content__inner">
                            <slot name="rightContent" />
                        </div>

                        <!-- FOOTER ON DESKTOP -->
                        <div v-if="!$vuetify.breakpoint.mobile" class="full-screen__footer">
                            <slot name="footerBtn" />
                        </div>
                    </div>
                </div>

                <!-- FOOTER ON MOBILE -->
                <div v-if="$vuetify.breakpoint.mobile" class="full-screen__footer">
                    <slot name="footerBtn" />
                </div>

                <!-- OVERLAY -->
                <div v-if="overlay" class="overlay" @click="overlay = false">
                    <div class="overlay__btn">
                        <div class="overlay__icon">
                            <v-svg name="close" />
                            <span>esc</span>
                        </div>
                        <div class="overlay__text">Нажмите esc чтобы закрыть</div>
                    </div>
                </div>

                <!-- DIALOG's -->
                <slot name="dialog" />
            </template>
        </form>
    </v-dialog>
</template>

<style lang="scss" scoped src="./ModalLayout.scss" />
