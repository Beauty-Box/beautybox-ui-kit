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
        :fullscreen="$vuetify.breakpoint.mobile"
        @click:outside="$emit('click:outside', $event)"
    >
        <v-card
            tag="form"
            @submit.prevent="$emit('submit', $event)"
            @reset.prevent="$emit('reset', $event)"
        >
            <!-- HEADER -->
            <v-card-title :class="{ 'has-title': title }">
                <span v-if="title">{{ title }}</span>
                <b-btn-close type="button" @click="onClickCloseModal" />
            </v-card-title>

            <!-- BODY -->
            <v-card-text :class="{ 'is-relative': loading }">
                <block-loader v-if="loading" />
                <template v-else>
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

<script>
import { modalProps } from '@beautybox/core/mixins/modalProps';
const BSvg = () => import(/* webpackChunkName: "BSvg" */ '@beautybox/ui-kit/components/icons/Svg');
const BlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '@beautybox/ui-kit/components/blocks/BlockLoader');

export default {
    name: 'ModalLayoutDefault',
    components: { BSvg, BlockLoader },
    mixins: [modalProps],
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
        persistent: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClickCloseModal() {
            this.modal = false;
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
.v-card {
    display: flex;
    flex-direction: column;

    &__title {
        height: 60px;
        padding: 0 !important;
        position: relative;

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

        &.has-title {
            @include border(bottom);

            ::v-deep .c-btn-close {
                @include centre('y');
                right: 14px;
                z-index: z(absolute) + 1;
            }
        }

        ::v-deep .c-btn-close {
            @include centre('y');
            right: 14px;
            z-index: z(absolute) + 1;
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
        overflow-y: hidden;
        padding: var(--gutter) !important;

        &.is-scrolled {
            overflow-y: auto;
        }

        &.is-relative {
            position: relative;
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
