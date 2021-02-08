<template>
    <v-bottom-sheet
        ref="draggableBlock"
        v-model="modal"
        scrollable
        retain-focus
        :overlay-color="overlayColor"
        :overlay-opacity="overlayOpacity"
        v-bind="{ hideOverlay, nowItemsLength, allItemsLength, contentClass }"
        @click:outside="$emit('click:close')"
    >
        <v-sheet :tag="tag" elevation="0" @submit.prevent="onSubmit">
            <div
                class="btn-for-draggable"
                @touchmove="onTouchMove"
                @touchend="onTouchEnd"
                @touchstart="onTouchStart"
            />
            <div class="c-bottom-sheet__inner">
                <b-btn-close v-if="closeBtn" has-bg size="25" @click="onClose" />
                <div class="c-bottom-sheet__scroll-container" @scroll="onScroll">
                    <div>
                        <div
                            v-if="title || subTitle"
                            class="c-bottom-sheet__header"
                            :class="{ 'mr-8': closeBtn }"
                        >
                            <h3 v-if="title" class="c-bottom-sheet__title">{{ title }}</h3>
                            <p v-if="subTitle" class="c-bottom-sheet__subtitle">{{ subTitle }}</p>
                        </div>

                        <div v-if="$slots.search" ref="search" class="c-bottom-sheet__search">
                            <slot name="search" />
                        </div>

                        <slot />
                    </div>
                </div>

                <div v-if="!hideFooter" class="c-bottom-sheet__footer">
                    <slot name="footer">
                        <v-btn
                            large
                            block
                            color="primary"
                            type="submit"
                            :ripple="false"
                            :loading="btnLoading"
                            :disabled="btnDisabled"
                        >
                            {{ btnText }}
                        </v-btn>
                    </slot>
                </div>
            </div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { getOnScrollMixin, modalToggleMixin, modalOverlayColorMixin } from '../../mixins';
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../buttons/BtnClose');

export default {
    name: 'b-bottom-sheet',
    components: { BBtnClose },
    mixins: [getOnScrollMixin, modalToggleMixin, modalOverlayColorMixin],
    props: {
        tag: {
            type: String,
            default: 'form',
        },
        title: {
            type: String,
            default: '',
        },
        btnText: {
            type: String,
            default: 'Готово',
        },
        subTitle: {
            type: String,
            default: '',
        },
        simple: {
            type: Boolean,
            default: false,
        },
        closeBtn: {
            type: Boolean,
            default: false,
        },
        btnLoading: {
            type: Boolean,
            default: false,
        },
        hideFooter: {
            type: Boolean,
            default: false,
        },
        btnDisabled: {
            type: Boolean,
            default: false,
        },
        hideOverlay: {
            type: Boolean,
            default: false,
        },
        closeIsDisabled: {
            type: Boolean,
            default: false,
        },
        allItemsLength: {
            type: Number,
            default: 0,
        },
        nowItemsLength: {
            type: Number,
            default: 0,
        },
        onScrollEndHandler: {
            type: Function,
            default: () => ({}),
        },
        readyToGetElements: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        isScrolled: false,
        heightForActiveScroll: 100,
        palette: null,
        scroll: {
            blockHeight: null,
            isTouched: false,
            scrollHeight: null,
            initialYPosition: 0,
            currentY: 0,
            lastY: 0,
        },
    }),
    computed: {
        contentClass() {
            const baseClass = 'c-bottom-sheet c-bottom-sheet--palette';

            if (this.simple) {
                return `${baseClass} c-bottom-sheet--simple`;
            }

            if (!!this.$slots.search) {
                return `${baseClass} c-bottom-sheet--full-height`;
            } else {
                return baseClass;
            }
        },
    },
    methods: {
        onSubmit() {
            this.$emit('submit');
            if (!this.closeIsDisabled) {
                this.modal = false;
            }
        },
        onClose() {
            this.$emit('click:close');
            this.modal = false;
        },
        onScroll(e) {
            this.onScrollControl(e);

            if (this.$refs.search) {
                this.onScrollCheckFixedSearch(e);
            }
        },
        /** Метод для фиксацияя строки поиска по скролу */
        onScrollCheckFixedSearch(e) {
            const search = this.$refs.search;
            const searchOffsetTop = search.offsetHeight;

            if (e.target.scrollTop >= searchOffsetTop) {
                search.classList.add('is-fixed');
                this.isScrolled = true;
            } else {
                search.classList.remove('is-fixed');
                this.isScrolled = false;
            }
        },
        onTouchStart() {
            this.scroll.isTouched = true;

            if (!this.palette) {
                this.palette = this.$refs.draggableBlock.$refs.dialog;
                this.scroll.blockHeight = this.palette.offsetHeight;
            }
        },
        onTouchMove(e) {
            this.scroll.currentY = e.changedTouches[0].clientY;
            this.scroll.scrollHeight = e.changedTouches[0].pageY;

            if (!this.scroll.initialYPosition) {
                this.scroll.initialYPosition = this.scroll.currentY;
            }

            if (this.scroll.currentY > this.scroll.initialYPosition) {
                const offset = this.scroll.scrollHeight - this.scroll.blockHeight + 90;
                this.palette.style.cssText = `transform: scale3d(1, 1, 1) translate3d(0, ${offset}px, 0); transition: none 0s ease 0s;`;
            }

            if (this.scroll.currentY / 1.5 > this.scroll.blockHeight) {
                this.scroll.isTouched = false;
            }

            this.scroll.lastY = this.scroll.currentY;
        },
        onTouchEnd() {
            this.palette.style = '';

            if (!this.scroll.isTouched) {
                this.modal = false;
            }

            this.scroll.isTouched = false;
        },
    },
};
</script>

<style lang="scss" src="./BottomSheet.scss" />
