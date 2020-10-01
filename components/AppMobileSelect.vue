<template>
    <div class="c-fake-input" :class="{ 'is-active': title, 'has-errors': errors.length }">
        <div class="c-fake-input__inner" @click="onOpen">
            <div v-if="label" class="c-fake-input__label">{{ label }}</div>
            <div v-if="title" class="c-fake-input__title" @click="modal = !modal">
                {{ title }}
            </div>
        </div>
        <!-- ICONS -->
        <button
            v-if="title && clearable"
            type="button"
            aria-label="clear icon"
            class="v-icon v-icon--link material-icons theme--light mt-3"
            :ripple="false"
            @click.srop="onClear"
        >
            clear
        </button>
        <v-icon v-else class="c-fake-input__icon">arrow_drop_down</v-icon>
        <!-- DROPDOWN -->
        <app-bottom-sheet
            v-model="modal"
            :title="titleDropdown"
            :close-btn="closeBtn"
            :success="successCallback"
            :cancel="cancelCallback"
        >
            <template #search>
                <slot name="dropdown-search" />
            </template>

            <slot name="dropdown-content" />
        </app-bottom-sheet>
        <div class="c-fake-input__errors error--text">{{ errors[0] }}</div>
    </div>
</template>

<script>
import { modalProps } from '../mixins/modalProps';
import AppBottomSheet from '@beautybox/ui-kit/components/bottom-sheet/BottomSheet';

export default {
    name: 'AppMobileSelect',
    components: { AppBottomSheet },
    mixins: [modalProps],
    props: {
        label: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        titleDropdown: {
            type: String,
            default: '',
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        closeBtn: {
            type: Boolean,
            default: false,
        },
        openCallback: {
            type: Function,
            default: () => ({}),
        },
        successCallback: {
            type: Function,
            default: () => ({}),
        },
        cancelCallback: {
            type: Function,
            default: () => ({}),
        },
        clearCallback: {
            type: Function,
            default: () => ({}),
        },
        errors: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        onOpen() {
            this.modal = true;
            this.openCallback();
        },
        onClear() {
            this.clearCallback();
        },
    },
};
</script>
