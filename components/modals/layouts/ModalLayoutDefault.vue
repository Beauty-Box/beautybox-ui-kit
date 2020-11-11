<template>
    <v-dialog
        v-model="modal"
        width="500"
        overlay-color="rgba(103, 118, 140, 0.5)"
        overlay-opacity="1"
        :transition="transition"
        :persistent="persistent"
        scrollable
        :fullscreen="isMobile"
        @click:outside="$emit('click:outside', $event)"
    >
        <v-card
            :tag="tag"
            @submit.prevent="$emit('submit', $event)"
            @reset.prevent="$emit('reset', $event)"
        >
            <b-btn-close type="button" @click="onClickCloseModal" />

            <!-- HEADER -->
            <v-card-title v-if="title">
                <span v-if="title">{{ title }}</span>
            </v-card-title>

            <!-- BODY -->
            <v-card-text :class="[{ 'is-relative': loading }, bodyClass]">
                <b-block-loader v-if="loading" />
                <template v-else>
                    <slot />
                </template>
            </v-card-text>

            <v-spacer v-if="!isMobile && $slots.footer" />

            <!-- FOOTER -->
            <v-card-actions v-if="$slots.footer">
                <slot name="footer" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { modalToggleMixin } from '../../../mixins';
const BBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../../blocks/BlockLoader');

export default {
    name: 'BModalLayoutDefault',
    components: { BBlockLoader },
    mixins: [modalToggleMixin],
    props: {
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
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        closeIsDisabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
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
    min-height: 420px;
    display: flex;
    flex-direction: column;

    &__title {
        height: 60px;
        padding: 0 !important;
        position: relative;
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
        overflow-y: hidden;
        padding: var(--gutter);

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

.c-btn-close {
    position: absolute;
    top: 10px;
    right: 10px;

    @include max(xs) {
        right: 7px;
    }
}
</style>
