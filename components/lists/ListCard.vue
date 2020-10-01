<template>
    <v-card class="c-list-card">
        <v-card-title v-if="!!$slots.title || !!$slots.menu" class="c-list-card__header">
            <div v-if="!!$slots.title">
                <slot name="title" />
            </div>
            <div v-if="!!$slots.menu">
                <slot name="menu" />
            </div>
        </v-card-title>
        <v-card-text
            v-scroll:#main="onScrollControl"
            class="c-list-card__content"
            @scroll="onScrollControl"
        >
            <block-loader v-if="loading" />
            <template v-else>
                <slot name="content" />
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
import { scroll } from '@beautybox/core/mixins/ScrollControl';
const BlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '@beautybox/ui-kit/components/blocks/BlockLoader');

export default {
    name: 'BCardList',
    components: { BlockLoader },
    mixins: [scroll],
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        readyToGetElements: {
            type: Boolean,
            default: true,
        },
        onScrollEndHandler: {
            type: Function,
            default: () => ({}),
        },
        allItemsLength: {
            type: Number,
            default: 0,
        },
        nowItemsLength: {
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        heightForActiveScroll: 100,
    }),
    methods: {},
};
</script>

<style lang="scss" scoped>
.c-list-card {
    height: 100%;
    transition: box-shadow 0.2s ease;
    //box-shadow: $box-shadow-base;

    &:hover {
        box-shadow: 0 5px 15px 5px rgba(164, 173, 186, 0.25);
    }

    &__header {
        padding: $gutter $gutter $base-indent;
        display: flex;
        align-items: center;

        @include max(xs) {
            padding-left: $base-indent;
            padding-right: $base-indent;
        }

        & > div {
            &:first-child {
                display: flex;
                flex-direction: column;
                flex-grow: 1;

                ::v-deep div {
                    line-height: 26px;
                }

                ::v-deep p {
                    margin-bottom: 0;
                    color: $color-text--light;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
                }
            }
            &:not(:first-child) {
                flex-shrink: 0;
            }
        }
    }

    &__content {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 400px;
        max-height: 400px;
        padding: 0;
        overflow-y: auto;
    }
}
</style>
