<template>
    <v-bottom-sheet
        v-model="modal"
        scrollable
        retain-focus
        overlay-color="rgba(103, 118, 140, 0.5)"
        overlay-opacity="1"
        v-bind="{ hideOverlay, nowItemsLength, allItemsLength, contentClass }"
        @click:outside="$emit('click:close')"
    >
        <v-sheet :tag="tag" @submit.prevent="onSubmit">
            <div class="c-bottom-sheet__inner">
                <div class="c-bottom-sheet__scroll-container" @scroll="onScroll">
                    <div>
                        <b-btn-close v-if="closeBtn" has-bg size="30" @click="onClose" />

                        <div v-if="title || subTitle" class="c-bottom-sheet__header">
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
import { modalProps } from '../../mixins/modalProps';
import { scroll } from '../../mixins/ScrollControl';

export default {
    name: 'BBottomSheet',
    mixins: [modalProps, scroll],
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
        //Метод для фиксацияя строки поиска по скролу
        onScrollCheckFixedSearch(e) {
            let search = this.$refs.search;
            let searchOffsetTop = search.offsetHeight;

            if (e.target.scrollTop >= searchOffsetTop) {
                search.classList.add('is-fixed');
                this.isScrolled = true;
            } else {
                search.classList.remove('is-fixed');
                this.isScrolled = false;
            }
        },
    },
};
</script>

<style lang="scss" src="./styles.scss" />
