<template>
    <v-bottom-sheet
        v-model="modal"
        scrollable
        overlay-color="rgba(103, 118, 140, 0.5)"
        overlay-opacity="1"
        :hide-overlay="hideOverlay"
        :now-items-length="nowItemsLength"
        :all-items-length="allItemsLength"
        :content-class="contentClass"
    >
        <v-sheet>
            <div class="c-bottom-sheet__inner">
                <div class="c-bottom-sheet__scroll-container" @scroll="onScroll">
                    <div>
                        <v-btn
                            v-if="closeBtn"
                            icon
                            :ripple="false"
                            class="c-bottom-sheet__btn-close"
                            @click="onCancel"
                        >
                            <v-svg name="close" xs />
                        </v-btn>
                        <div v-if="title || subTitle" class="c-bottom-sheet__header">
                            <h3 v-if="title" class="c-bottom-sheet__title">{{ title }}</h3>
                            <p v-if="subTitle" class="c-bottom-sheet__subtitle">{{ subTitle }}</p>
                        </div>

                        <div v-if="!!$slots.search" ref="search" class="c-bottom-sheet__search">
                            <slot name="search" />
                        </div>

                        <slot />
                    </div>
                </div>

                <div class="c-bottom-sheet__footer">
                    <v-btn large block color="primary" :ripple="false" @click="onSuccess">
                        Готово
                    </v-btn>
                </div>
            </div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { modalProps } from '../../mixins/modalProps';
import { scroll } from '../../mixins/ScrollControl';

export default {
    name: 'BottomSheet',
    mixins: [modalProps, scroll],
    props: {
        title: {
            type: String,
            default: '',
        },
        subTitle: {
            type: String,
            default: '',
        },
        success: {
            type: Function,
            default: () => ({}),
        },
        cancel: {
            type: Function,
            default: () => ({}),
        },
        hideOverlay: {
            type: Boolean,
            default: false,
        },
        closeBtn: {
            type: Boolean,
            default: false,
        },
        onScrollEndHandler: {
            type: Function,
            default: () => ({}),
        },
        nowItemsLength: {
            type: Number,
            default: 0,
        },
        allItemsLength: {
            type: Number,
            default: 0,
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
            return !!this.$slots.search
                ? 'c-bottom-sheet c-bottom-sheet--palette c-bottom-sheet--full-height'
                : 'c-bottom-sheet c-bottom-sheet--palette';
        },
    },
    methods: {
        onSuccess() {
            this.success();
            this.modal = false;
        },
        onCancel() {
            this.cancel();
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

<style lang="scss" src="./bottom-sheet.scss" />
