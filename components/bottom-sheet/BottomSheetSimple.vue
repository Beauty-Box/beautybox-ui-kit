<template>
    <div>
        <div v-if="!customElement">
            <b-input
                :value="title"
                :label="label"
                readonly
                :clearable="clearable"
                :error-messages="errorMessages"
                @click="openBottomSheet"
                @click:clear="$emit('clear')"
            />
            <input type="hidden" :value="selected" :name="name" />
        </div>
        <div v-else>
            <slot name="element" />
        </div>
        <v-bottom-sheet
            v-model="modal"
            scrollable
            :overlay-color="overlayColor"
            :overlay-opacity="overlayOpacity"
            :hide-overlay="hideOverlay"
            content-class="c-bottom-sheet c-bottom-sheet--palette"
        >
            <v-sheet elevation="0">
                <div class="c-bottom-sheet__inner">
                    <div class="c-bottom-sheet__scroll-container">
                        <div>
                            <b-btn-close v-if="closeBtn" size="30" @click="close" />
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
                            <slot />
                        </div>
                    </div>

                    <div class="c-bottom-sheet__footer">
                        <v-btn large block color="primary" :ripple="false" @click="success">
                            Готово
                        </v-btn>
                    </div>
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
import { modalToggleMixin, modalOverlayColorMixin } from '../../mixins';
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../buttons/BtnClose');
const BInput = () => import(/* webpackChunkName: "Input" */ '../forms/inputs/Input');
const BtnFake = () => import(/* webpackChunkName: "Input" */ '../buttons/BtnFake');
const BInputSearch = () =>
    import(/* webpackChunkName: "InputSearch" */ '../forms/inputs/InputSearch');

export default {
    name: 'BBottomSheetSimple',
    components: { BBtnClose, BInput, BInputSearch, BtnFake },
    mixins: [modalToggleMixin, modalOverlayColorMixin],
    props: {
        customElement: {
            type: Boolean,
            default: false,
        },
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
        hideOverlay: {
            type: Boolean,
            default: false,
        },
        closeBtn: {
            type: Boolean,
            default: false,
        },
        errorMessages: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        close() {
            this.modal = false;
            this.$emit('close');
        },
        success() {
            this.$emit('save');
            this.modal = false;
        },
        openBottomSheet() {
            this.modal = true;
            this.$emit('open');
        },
    },
};
</script>

<style lang="scss" src="./BottomSheet.scss" />
