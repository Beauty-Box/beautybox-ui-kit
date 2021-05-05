<template>
    <div>
        <b-input
            v-model="computedTitle"
            v-bind="$attrs"
            readonly
            :label="label"
            :disabled="disabled"
            :clearable="clearable"
            :loading="loading"
            color="primary"
            :error-messages="disabled ? [] : errorMessages"
            @click="modal = true"
            @click:clear="$emit('clear')"
        >
            <template #messages="{ messages }">
                <slot name="messages" v-bind="{ messages }" />
            </template>
        </b-input>
        <input type="hidden" :value="selected" :name="name" />
        <v-bottom-sheet
            v-model="modal"
            scrollable
            :overlay-color="overlayColor"
            :overlay-opacity="overlayOpacity"
            :hide-overlay="hideOverlay"
            :now-items-length="nowItemsLength"
            :all-items-length="allItemsLength"
            :retain-focus="false"
            content-class="c-bottom-sheet c-bottom-sheet--palette c-bottom-sheet--full-height"
        >
            <v-sheet elevation="0">
                <div class="c-bottom-sheet__inner">
                    <div class="c-bottom-sheet__scroll-container" @scroll="onScroll">
                        <div>
                            <b-btn-close v-if="closeBtn" size="30" @click="modal = false" />

                            <div
                                v-if="titleDropdown || subTitleDropdown"
                                class="c-bottom-sheet__header"
                            >
                                <h3 v-if="titleDropdown" class="c-bottom-sheet__title">
                                    {{ titleDropdown }}
                                </h3>
                                <p v-if="subTitleDropdown" class="c-bottom-sheet__subtitle">
                                    {{ subTitleDropdown }}
                                </p>
                            </div>

                            <div ref="search" class="c-bottom-sheet__search">
                                <b-input-search
                                    autocomplete="off"
                                    color="secondary"
                                    clearable
                                    hide-details
                                    height="44"
                                    :autofocus="false"
                                    :placeholder="searchPlaceholder"
                                    @input="$emit('search', $event || '')"
                                />
                            </div>

                            <slot />
                        </div>
                    </div>

                    <div class="c-bottom-sheet__footer">
                        <v-btn large block color="primary" :ripple="false" @click="modal = false">
                            Готово
                        </v-btn>
                    </div>
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
import { getOnScrollMixin, modalToggleMixin, modalOverlayColorMixin } from '../../mixins';
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../buttons/BtnClose');
const BInput = () => import(/* webpackChunkName: "Input" */ '../forms/inputs/Input');
const BInputSearch = () =>
    import(/* webpackChunkName: "InputSearch" */ '../forms/inputs/InputSearch');

export default {
    name: 'BBottomSheetSearch',
    components: { BBtnClose, BInput, BInputSearch },
    mixins: [getOnScrollMixin, modalToggleMixin, modalOverlayColorMixin],
    props: {
        selected: {
            type: [Number, String],
            required: true,
        },
        name: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        subTitle: {
            type: String,
            default: '',
        },
        titleDropdown: {
            type: String,
            required: true,
        },
        subTitleDropdown: {
            type: String,
            default: '',
        },
        searchPlaceholder: {
            type: String,
            default: 'Поиск...',
        },
        hideOverlay: {
            type: Boolean,
            default: false,
        },
        closeBtn: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        errorMessages: {
            type: Array,
            default: () => [],
        },
        // Scroll download
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
        computedTitle: {
            get() {
                return this.title;
            },
            set(value) {
                this.$emit('update:title', value);
            },
        },
    },
    methods: {
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

<style lang="scss" src="./BottomSheet.scss" />
