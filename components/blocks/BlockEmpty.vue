<template>
    <div class="empty" :class="{ 'empty--centre': center, 'empty--big': bigSize }">
        <slot name="image">
            <b-svg v-if="icon" :name="icon" :class="`icon icon-${icon} empty__icon`" lg />
        </slot>
        <span v-if="title" class="empty__title">{{ title }}</span>
        <p v-if="text || !!$slots.text" class="empty__text">
            {{ text }}
            <slot name="text" />
        </p>
        <slot name="buttons" />
    </div>
</template>

<script>
const BSvg = () => import(/* webpackChunkName: "Svg" */ '../icons/Svg');

export default {
    name: 'BlockEmpty',
    components: {
        BSvg,
    },
    props: {
        icon: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
        center: {
            type: Boolean,
            default: false,
        },
        bigSize: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 30px 0;
    text-align: center;

    @include max(xs) {
        margin: auto;
        padding: 30px 10px;
    }

    &__icon {
        margin-bottom: 20px;
    } //.empty__icon

    &__title {
        display: block;
        color: $color-text;
        font-size: 21px;
        font-weight: 300;
        text-align: center;

        @include max(xs) {
            font-size: 21px;
        }

        & + .empty__text {
            margin-top: 10px;
        }
    } //.empty__title

    &__text {
        display: block;
        max-width: 35ch;
        margin-right: auto;
        margin-bottom: 0 !important;
        margin-left: auto;
        color: $color-text--light;

        font-size: 14px;

        @include max(xs) {
            font-size: 16px;
            line-height: 1.5;

            .v-btn {
                font-size: 16px !important;
                line-height: inherit !important;
            }
        }

        & + .empty__text {
            margin-top: 15px;
        }

        &--medium {
            max-width: 61ch;
        } //.empty__text--medium

        &--full {
            max-width: 100%;
        } //.empty__text--full
    } //.empty__text

    &__btn,
    button,
    a {
        margin-top: 30px;
    } //.empty__btn

    &--centre {
        flex: 1;
        margin: auto;
    } //.empty--centre

    &--big {
        .empty {
            &__icon {
                margin-bottom: 21px;
            }
            &__title {
                margin-bottom: $base-indent;
                font-size: 24px;
                font-weight: 500;
            }
            &__text {
                font-size: 16px;
            }
            &__btn {
                min-width: 300px !important;
            }
        }
    }
} //.empty
</style>
