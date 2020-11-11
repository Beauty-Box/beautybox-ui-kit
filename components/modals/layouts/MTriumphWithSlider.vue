<template>
    <v-dialog
        v-model="modal"
        persistent
        width="1200"
        overlay-opacity="1"
        overlay-color="rgba(103, 118, 140, 0.5)"
        content-class="c-modal-triumph"
        transition="slide-y-reverse-transition"
        :fullscreen="$vuetify.breakpoint.mobile"
    >
        <v-card
            tag="form"
            class="c-modal-triumph__inner"
            @submit.prevent="$emit('submit', $event)"
            @reset.prevent="$emit('reset', $event)"
        >
            <!-- HEADER -->
            <v-card-title class="c-modal-triumph__header">
                <b-btn-close
                    size="40"
                    class="full-screen__btn-close"
                    type="reset"
                    @click="modal = false"
                />
            </v-card-title>

            <!-- BODY -->
            <v-card-text class="c-modal-triumph__body" @scroll="onScrollControl">
                <div class="c-modal-triumph__text">
                    <h1 class="c-modal-triumph__title">{{ title }}</h1>
                    <slot name="text" />
                    <v-card-actions
                        v-if="!$vuetify.breakpoint.mobile"
                        class="c-modal-triumph__actions"
                    >
                        <v-btn
                            x-large
                            depressed
                            color="primary"
                            type="submit"
                            class="u-text-initial u-text-size--normal"
                        >
                            {{ btnText }}
                        </v-btn>
                    </v-card-actions>
                </div>
                <div class="c-modal-triumph__slider">
                    <v-carousel
                        cycle
                        height="555"
                        delimiter-icon="brightness_1"
                        hide-delimiter-background
                        :show-arrows="false"
                    >
                        <slot name="slider" />
                    </v-carousel>
                </div>
            </v-card-text>

            <v-card-actions
                v-if="$vuetify.breakpoint.mobile"
                class="c-modal-triumph__actions"
                :style="{ 'background-color': bottom ? '#ffde78' : 'white' }"
            >
                <div
                    class="c-modal-triumph__actions-overlay"
                    :style="{ opacity: bottom ? 0 : 1 }"
                />
                <v-btn
                    x-large
                    depressed
                    color="primary"
                    type="submit"
                    class="u-text-initial u-text-size--normal"
                >
                    {{ btnText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { modalToggleMixin } from '../../../mixins';
const BBtnClose = () =>
    import(/* webpackChunkName: "BtnClose" */ '../../buttons/BtnClose');

export default {
    name: 'MTriumphWithSlider',
    components: { BBtnClose },
    mixins: [modalToggleMixin],
    props: {
        title: {
            type: String,
            default: 'Добро пожаловать на beautybox!',
        },
        btnText: {
            type: String,
            default: 'Начать пользоваться',
        },
    },
    data: () => ({
        bottom: false,
    }),
    methods: {
        bottomVisible(element) {
            return element.scrollTop >= element.scrollHeight - element.clientHeight;
        },
        onScrollControl(e) {
            console.log('--- scroll');
            this.bottom = this.bottomVisible(e.target);
        },
    },
};
</script>

<style lang="scss" scoped>
$min-height: 664px;

::v-deep .c-modal-triumph {
    @include max(sm) {
        overflow: hidden !important;
    }
}

.c-modal-triumph {
    &__inner {
        display: flex;
        flex-direction: column;
        overflow: hidden;

        @include min(md) {
            min-height: $min-height;
        }

        @include max(sm) {
            max-height: 100%;
        }
    }

    &__header {
        padding: 0 !important;

        .icon {
            fill: $color-primary;

            &:hover {
                fill: $color-secondary;
            }
        }
    }

    &__body {
        display: flex;
        margin: auto;
        padding: 0 !important;
        background: linear-gradient(180deg, #fff 50%, #f6f7f8 100%);

        @include max(sm) {
            flex-direction: column;
            flex-grow: 1;
            overflow-y: auto;
        }

        ::v-deep .v-carousel {
            overflow: initial;

            &__controls {
                bottom: 5px;
                height: 22px;

                .v-btn {
                    width: 9px;
                    height: 9px;
                    color: $color-primary;

                    &::before,
                    &::after {
                        display: none;
                    }

                    i {
                        opacity: 1;
                        font-size: 9px !important;
                    }

                    &.v-item--active {
                        i {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

    &__text,
    &__slider {
        flex-basis: 50%;
        flex-shrink: 0;
        max-width: 50%;

        @include max(sm) {
            flex-basis: initial;
            max-width: 100%;
        }
    }

    &__text {
        display: flex;
        flex-direction: column;
        padding: 70px;

        @include max(sm) {
            padding: $gutter * 2 $gutter $gutter;
        }

        ::v-deep p {
            margin-bottom: 40px;
            color: $color-text;
            font-size: 18px;
            line-height: 27px;

            @include max(xs) {
                margin-bottom: $gutter;
                font-size: 16px;
                line-height: 24px;
            }
        }
    }

    &__title {
        max-width: 445px;
        margin-bottom: 40px;
        color: $color-primary;
        font-size: 38px;
        font-weight: 600;
        line-height: 49px;

        @include max(md) {
            font-size: 32px;
        }

        @include max(xs) {
            margin-bottom: $gutter;
            font-size: 24px;
            line-height: 33px;
        }
    }

    &__slider {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: $min-height;
        padding-top: 50px;
        overflow: hidden;
        background: url('~@beautybox/core/static/image/yellow-circle.svg') no-repeat -2% 50%/180% 200%;

        @include max(sm) {
            min-height: 555px;
            padding: 0 0 86px;
            background: url('~@beautybox/core/static/image/yellow-circle.svg') no-repeat 50% 17%/1600px
                2180px;
        }

        ::v-deep p {
            @include max(sm) {
                font-size: 18px;
                line-height: 28px;
            }
        }
    }

    &__actions {
        position: relative;
        padding: 0 !important;
        transition: background-color 0.1s ease-in;

        @include max(sm) {
            position: fixed;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: z(fixed);
            flex-shrink: 0;
            padding: $base-indent $gutter !important;
        }

        &-overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            box-shadow: 0 10px 20px 10px rgba(164, 173, 186, 0.25);
        }

        .v-btn {
            border-radius: 6px;

            @include max(sm) {
                width: 100%;
                font-size: 17px !important;
            }
        }
    }
}

.c-btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
