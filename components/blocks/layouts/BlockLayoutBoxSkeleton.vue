<template>
    <div class="box" :class="{ 'is-loading': loading }">
        <template v-if="loading">
            <div v-if="titleIsVisible || btnText" class="box__header">
                <v-skeleton-loader type="heading" />
            </div>
            <div class="box__body">
                <v-skeleton-loader type="list-item" />
            </div>
        </template>
        <template v-else>
            <template v-if="!hideHeader">
                <div
                    v-if="(title && titleIsVisible) || (btnText && btnIsVisible)"
                    class="box__header"
                >
                    <div>
                        <h3 v-if="title && titleIsVisible" :class="{ 'small-title': titleIsSmall }">
                            {{ title }}
                        </h3>
                        <slot name="description" />
                    </div>
                    <v-btn
                        v-if="btnText && btnIsVisible"
                        depressed
                        color="muted"
                        :ripple="false"
                        :small="$vuetify.breakpoint.xs"
                        class="u-text-initial ml-auto"
                        @click="$emit('btnClick')"
                    >
                        {{ btnText }}
                    </v-btn>
                </div>
            </template>
            <div v-if="$slots.default" class="box__body">
                <slot name="default" />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'BlockLayoutBoxSkeleton',
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        titleIsSmall: {
            type: Boolean,
            default: false,
        },
        btnText: {
            type: String,
            default: '',
        },
        btnIsVisible: {
            type: Boolean,
            default: true,
        },
        hideTitle: {
            type: Boolean,
            default: false,
        },
        hideHeader: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        titleIsVisible() {
            if (this.hideTitle) {
                return !!this.$vuetify.breakpoint.smAndDown;
            } else {
                return true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.box {
    //margin-bottom: $gutter * 2;
    background-color: #fff;

    @include min(md) {
        border-radius: $border-radius;
        box-shadow: $box-shadow-base;
    }

    /*@include max(sm) {
        margin-bottom: $gutter;
    }*/

    &__header {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        padding: $gutter;

        @include min(md) {
            border-radius: $border-radius $border-radius 0 0;
        }

        @include max(xs) {
            padding: $base-indent;
        }

        h3 {
            font-weight: $card-title-font-weight;
            letter-spacing: map-deep-get($headings, 'h6', 'letter-spacing');

            &:not(.small-title) {
                font-size: 22px;

                @include min(md) {
                    font-size: 24px;
                    line-height: 32px;
                }
            }

            &.small-title {
                font-size: $card-title-font-size;
            }
        }

        .v-btn {
            border-radius: $border-radius;
            letter-spacing: 0;
        }
    }

    &__body {
        padding: 0 $gutter $gutter;

        @include min(md) {
            border-radius: 0 0 $border-radius $border-radius;
        }

        @include max(xs) {
            padding: $base-indent;
        }
    }

    &.is-loading {
        .box {
            &__header {
                & + .box__body {
                    @include max(xs) {
                        padding-top: 0;
                    }
                }
            }
        }
    }

    .v-card {
        padding: 0;
        border-radius: 0 !important;
        box-shadow: none !important;
    }
} //.box

::v-deep .v-skeleton-loader {
    width: 100%;

    &__list-item {
        height: 16px;
        padding: 0;
    }
}
</style>
