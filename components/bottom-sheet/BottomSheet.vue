<template>
    <v-bottom-sheet
        v-model="modal"
        scrollable
        overlay-color="rgba(103, 118, 140, 0.5)"
        overlay-opacity="1"
        v-bind="{ hideOverlay, nowItemsLength, allItemsLength, contentClass }"
    >
        <v-sheet>
            <div class="c-bottom-sheet__inner">
                <div class="c-bottom-sheet__scroll-container" @scroll="onScroll">
                    <div>
                        <b-btn-close v-if="closeBtn" size="30" @click="onClose" />

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
                    <slot name="footer">
                        <v-btn large block color="primary" :ripple="false" @click="modal = false">
                            Готово
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
        title: {
            type: String,
            default: '',
        },
        subTitle: {
            type: String,
            default: '',
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
        onClose() {
            this.$emit('close');
            this.modal = false;
        },
        onSuccess() {
            this.$emit('success');
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
