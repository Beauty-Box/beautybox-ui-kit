import '../styles.scss';

import { modalProps } from '@beautybox/core/mixins/modalProps';

import { VBottomSheet, VBtn, VSheet } from 'vuetify/lib';

import FInput from '@ui-kit/components/forms/inputs/Input';

export default {
    name: 'BottomSheetSimple',
    mixins: [modalProps],
    components: { VBottomSheet, VBtn, FInput, VSheet },
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
        openBottomSheet() {
            this.modal = true;
            this.$emit('open');
        },
    },
    template: `<div>
    <f-input
        v-model="title"
        :label="label"
        readonly
        :clearable="clearable"
        :error-messages="errorMessages"
        @click="openBottomSheet"
        @click:clear="$emit('clear')"
    />
    <input type="hidden" :value="selected" :name="name" />
    <v-bottom-sheet
        v-model="modal"
        scrollable
        overlay-color="rgba(103, 118, 140, 0.5)"
        overlay-opacity="1"
        :hide-overlay="hideOverlay"
        content-class="c-bottom-sheet c-bottom-sheet--palette"
    >
        <v-sheet>
            <div class="c-bottom-sheet__inner">
                <div class="c-bottom-sheet__scroll-container">
                    <div>
                        <v-btn
                            v-if="closeBtn"
                            icon
                            :ripple="false"
                            class="c-bottom-sheet__btn-close"
                            @click="close"
                        >
                            <v-svg name="close" xs />
                        </v-btn>
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
                    <v-btn large block color="primary" :ripple="false" @click="modal = false">
                        Готово
                    </v-btn>
                </div>
            </div>
        </v-sheet>
    </v-bottom-sheet>
</div>`,
};
