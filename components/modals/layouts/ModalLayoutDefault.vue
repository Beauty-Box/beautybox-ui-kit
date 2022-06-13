<template>
    <v-dialog
        v-model="modal"
        scrollable
        :width="width"
        :persistent="persistent"
        :transition="transition"
        :overlay-color="overlayColor"
        :overlay-opacity="overlayOpacity"
        :fullscreen="computedFullScreen"
        @click:outside="$emit('click:outside', $event)"
    >
        <v-card
            :tag="tag"
            :style="{
                minHeight: isNumber(minHeight) ? minHeight + 'px' : minHeight,
                ...contentStyles,
            }"
            @submit.prevent="$emit('submit', $event)"
            @reset.prevent="$emit('reset', $event)"
        >
            <b-btn-close type="button" @click="onClickCloseModal" />

            <!-- HEADER -->
            <v-card-title v-if="title">
                <span>{{ title }}</span>
            </v-card-title>

            <!-- BODY -->
            <v-card-text
                :class="[{ 'is-relative': loading, 'hide-padding': hidePadding }, bodyClass]"
            >
                <b-block-loader v-if="loading" />
                <template v-else>
                    <slot />
                </template>
            </v-card-text>

            <v-spacer v-if="!$vuetify.breakpoint.mobile && $slots.footer" />

            <!-- FOOTER -->
            <v-card-actions v-if="$slots.footer">
                <slot name="footer" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { isNumber } from '@beautybox/core/helpers';
import { modalToggleMixin, modalOverlayColorMixin } from '../../../mixins';

const BBtnClose = () => import(/* webpackChunkName: "BlockLoader" */ '../../buttons/BtnClose');
const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../../blocks/BlockLoader');

export default {
    name: 'BModalLayoutDefault',
    components: { BBtnClose, BBlockLoader },
    mixins: [modalToggleMixin, modalOverlayColorMixin],
    props: {
        minHeight: {
            type: String,
            default: '420',
        },
        tag: {
            type: String,
            default: 'form',
        },
        title: {
            type: String,
            default: '',
        },
        bodyClass: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false,
        },
        scrollable: {
            type: Boolean,
            default: true,
        },
        fullscreen: {
            type: Boolean,
            default: true,
        },
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
        width: {
            type: [String, Number],
            default: '500',
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        closeIsDisabled: {
            type: Boolean,
            default: false,
        },
        hidePadding: {
            type: Boolean,
            default: false,
        },
        contentStyles: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        computedFullScreen() {
            return this.fullscreen ? this.$vuetify.breakpoint.mobile : this.fullscreen;
        },
    },
    methods: {
        isNumber,
        onClickCloseModal() {
            if (this.closeIsDisabled) {
                return false;
            }
            this.modal = false;
            this.$emit('click:close');
        },
    },
};
</script>

<style lang="scss" scoped>
.v-card {
    display: flex;
    flex-direction: column;

    &__title {
        position: relative;
        height: 60px;
        padding: 0 !important;
        @include border(bottom);

        @include max(sm) {
            height: 50px;
        }

        & > span {
            width: 100%;
            max-width: 83%;
            margin: auto;
            font-size: 23px;
            font-weight: 300;
            line-height: 32px;
            text-align: center;
            @include text-overflow;

            @include max(sm) {
                font-size: 17px;
                font-weight: 500;
                line-height: 16px;
            }
        }
    }

    &__text,
    &__actions {
        &:empty {
            min-height: auto;
            padding: 0;
        }
    }

    &__text {
        flex-grow: 1;
        padding: var(--gutter) !important;
        overflow-y: hidden;

        &.is-scrolled {
            overflow-y: auto;
        }

        &.is-relative {
            position: relative;
        }

        &.hide-padding {
            padding: 0 !important;
        }
    }

    &__actions {
        padding: $base-indent $gutter;
        @include border(top);

        @include max(sm) {
            padding: $base-indent !important;
        }

        @include max(xs) {
            @include btnHalfSize;
        }
    }
}

.c-btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: z(fixed);

    @include max(xs) {
        top: 5px;
        right: 5px;
    }
}
</style>
