<script>
import { modalMixin, modalToggleMixin, modalOverlayColorMixin } from '../../../mixins';
const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../../blocks/BlockLoader');
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../../buttons/BtnClose');
const VSvg = () => import(/* webpackChunkName: "Svg" */ '../../icons/Svg');

export default {
    name: 'MMobileFullScreen',
    components: { BBlockLoader, VSvg, BBtnClose },
    mixins: [modalMixin, modalToggleMixin, modalOverlayColorMixin],
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        loadingMaxHeight: {
            type: [String, Number],
            default: '300',
        },
        loadingMinHeight: {
            type: [String, Number],
            default: '300',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'form',
        },
        bodyClass: {
            type: String,
            default: 'form',
        },
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        width: {
            type: [Number, String],
            default: 600,
        },
        hideOverlay: {
            type: Boolean,
            default: false,
        },
        scroll: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        onClickCloseModal() {
            this.$emit('click:close');
            this.modal = false;
        },
    },
};
</script>

<template>
    <v-dialog
        v-model="modal"
        :width="width"
        min-heigth="300"
        :overlay-opacity="overlayOpacity"
        :overlay-color="overlayColor"
        :hide-overlay="hideOverlay"
        :transition="transition"
        :persistent="persistent"
        scrollable
        :fullscreen="$vuetify.breakpoint.mobile"
        @click:outside="$emit('click:outside', $event)"
    >
        <v-card
            :tag="tag"
            @submit.prevent="$emit('submit', $event)"
            @reset.prevent="$emit('reset', $event)"
        >
            <!-- HEADER -->
            <v-card-title v-if="title" ref="header" class="full-screen__header">
                <span ref="title" class="full-screen__title">{{ title }}</span>

                <b-btn-close
                    type="button"
                    size="40"
                    class="full-screen__btn-close"
                    @click="onClickCloseModal"
                />
            </v-card-title>

            <!-- BODY -->
            <v-card-text
                :class="[{ 'is-scrolled': scroll }, bodyClass]"
                :style="{
                    minHeight: loading && !!loadingMinHeight ? loadingMinHeight + 'px' : '',
                }"
                @scroll="onScroll"
            >
                <b-block-loader
                    v-if="loading"
                    :max-height="loadingMaxHeight"
                    :min-height="loadingMinHeight"
                />
                <template v-else>
                    <div v-if="$vuetify.breakpoint.mobile" class="full-screen-content__title">
                        <div ref="contentTitle">{{ title }}</div>
                        <p v-if="description">{{ description }}</p>
                    </div>

                    <slot />
                </template>
            </v-card-text>

            <v-spacer v-if="!$vuetify.breakpoint.mobile" />

            <!-- FOOTER -->
            <v-card-actions v-if="$slots.btns">
                <slot name="btns" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
@import 'ModalLayout';

.v-card {
    &__title {
        line-height: 1;
        text-align: center;

        @include max(sm) {
            padding: 0 !important;
        }

        span {
            margin: 0 auto;
            font-size: 24px;
            font-weight: 300;
            line-height: 1.2;

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
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow-y: hidden;

        @include max(sm) {
            padding: 0 $base-indent !important;
        }

        /*&.is-loading {
            min-height: 300px;
        }*/

        &.is-scrolled {
            overflow-y: auto;
        }

        ::v-deep .full-screen-content__title {
            padding-top: 0;
            padding-right: 0;
            padding-left: 0;
            color: $color-text;
        }
    }

    &__actions {
        padding: $gutter;
        @include border(top);

        @include max(sm) {
            padding: $base-indent !important;
        }

        @include max(xs) {
            @include btnHalfSize;
        }
    }
}

::v-deep {
    .wrap {
        position: relative;
        margin: calc(var(--gutter) * -1);
    }
    .c-btn-wide {
        @include min(md) {
            padding-left: $base-indent + 4;
        }

        @include max(sm) {
            padding-right: $base-indent - 4;
        }
    }
}
</style>
