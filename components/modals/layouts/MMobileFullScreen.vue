<template>
    <v-dialog
        v-model="modal"
        width="500"
        min-heigth="300"
        overlay-color="rgba(103, 118, 140, 0.5)"
        overlay-opacity="1"
        :transition="transition"
        :persistent="persistent"
        scrollable
        :fullscreen="$vuetify.breakpoint.smAndDown"
        @click:outside="$emit('click:outside', $event)"
    >
        <v-card
            tag="form"
            @submit.prevent="$emit('submit', $event)"
            @reset.prevent="$emit('reset', $event)"
        >
            <!-- HEADER -->
            <v-card-title
                v-if="title"
                ref="header"
                class="full-screen__header"
                :class="{ 'justify-center': titleCenter }"
            >
                <span ref="title" class="full-screen__title">{{ title }}</span>

                <b-btn-close
                    type="button"
                    style="position: absolute; top: 10px; right: 10px"
                    @click="onClickCloseModal"
                />
            </v-card-title>

            <!-- BODY -->
            <v-card-text :class="({ 'is-scrolled': scroll }, bodyClass)" @scroll="onScroll">
                <b-block-loader v-if="loading" />
                <template v-else>
                    <div v-if="$vuetify.breakpoint.smAndDown" class="full-screen-content__title">
                        <div ref="contentTitle">{{ title }}</div>
                        <p v-if="description">{{ description }}</p>
                    </div>

                    <slot />
                </template>
            </v-card-text>

            <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />

            <!-- FOOTER -->
            <v-card-actions v-if="$slots.btns">
                <slot name="btns" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { dialogProps } from '../../../mixins/dialogProps';
import { modalProps } from '../../../mixins/modalProps';
import BBlockLoader from '../../blocks/BlockLoader';
const BSvg = () => import(/* webpackChunkName: "BSvg" */ '../../icons/Svg');
import BBtnClose from '../../buttons/BtnClose';

export default {
    name: 'MMobileFullScreen',
    components: { BBlockLoader, BSvg, BBtnClose },
    mixins: [dialogProps, modalProps],
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
        titleCenter: {
            type: Boolean,
            default: false,
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        scroll: {
            type: Boolean,
            default: true,
        },
        bodyClass: {
            type: String,
            default: '',
        },
        callbackClose: {
            type: Function,
            default: () => ({}),
        },
    },
    methods: {
        onClickCloseModal() {
            this.modal = false;
            this.callbackClose();
        },
    },
};
</script>

<style lang="scss" scoped>
@import './FullScreen';
.v-card {
    display: flex;
    flex-direction: column;

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
        flex-grow: 1;
        overflow-y: hidden;

        @include max(sm) {
            padding: 0 $base-indent !important;
        }

        &.is-scrolled {
            overflow-y: auto;
        }

        .full-screen-content__title {
            padding-top: 0;
            padding-right: 0;
            padding-left: 0;
            color: $color-text;
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
</style>
