<template>
    <table :fixed-header="fixedHeader" :height="height" class="table">
        <thead v-if="showHeaderAll || !$vuetify.breakpoint.mobile" class="table__head">
            <slot name="table-head" />
        </thead>
        <component
            :is="tableBody"
            tag="tbody"
            v-bind="draggableProps"
            class="table__body"
            v-on="draggableListeners"
        >
            <slot v-if="$slots['table-body']" name="table-body" />
            <template #footer>
                <tr v-if="loading">
                    <td class="table--center table__loader">
                        <b-block-loader position="static" size="30" style="max-height: 60px" />
                    </td>
                </tr>
                <tr v-else-if="nowItemsLength < allItemsLength">
                    <td v-intersect.quiet="onIntersectBottom" class="table--center" />
                </tr>
            </template>
            <template v-if="!draggable">
                <tr v-if="loading">
                    <td class="table--center table__loader">
                        <b-block-loader position="static" size="30" style="max-height: 60px" />
                    </td>
                </tr>
                <tr v-else-if="nowItemsLength < allItemsLength">
                    <td v-intersect.quiet="onIntersectBottom" class="table--center" />
                </tr>
            </template>
        </component>
    </table>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const BBlockLoader = defineAsyncComponent(() => import('../blocks/BlockLoader'));
const Draggable = defineAsyncComponent(() => import('vuedraggable'));

export default {
    name: 'BTableLazyLoadGrid',
    components: { BBlockLoader, Draggable },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        allItemsLength: {
            type: Number,
            default: 0,
        },
        nowItemsLength: {
            type: Number,
            default: 0,
        },
        showHeaderAll: {
            type: Boolean,
            default: false,
        },
        fixedHeader: {
            type: Boolean,
            default: false,
        },
        height: {
            type: [Number, String],
            default: 'auto',
        },
        draggable: {
            type: Boolean,
            default: false,
        },
        draggableProps: {
            type: Object,
            default: () => ({}),
        },
        draggableListeners: {
            type: Object,
            default: () => ({}),
        },
        backgroundColor: {
            type: String,
            default: '#fff',
        },
    },
    computed: {
        tableBody() {
            return this.draggable ? 'draggable' : 'tbody';
        },
    },
    methods: {
        onIntersectBottom(entries, observer, isIntersecting) {
            const bcr = entries[0].boundingClientRect;
            const isBottomVisible = bcr.bottom > 0;
            if (isIntersecting && !this.loading && isBottomVisible) {
                this.$emit('reach-bottom');
            }
        },
    },
};
</script>

<style scoped lang="scss">
.table {
    $self: &;
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    overflow: auto;
    background-color: v-bind(backgroundColor);
    border-radius: $border-radius-table;
    box-shadow: $box-shadow-base;

    &__head,
    &__body {
        &,
        & > tr {
            display: contents;
        }
    }
    &__head > tr {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
    &__head,
    &__body {
        tr th,
        ::v-deep tr {
            &:not(:last-child) td {
                border-bottom: thin solid $gray--lighten;
            }
            &:hover td {
                background-color: $color-bg--hover;
            }
        }
    }
    &__head th,
    &__body td,
    &__body ::v-deep td {
        padding: $base-indent;

        &:first-child {
            padding-left: $gutter;
        }

        &:last-child {
            padding-right: $gutter;
        }
    }

    &__head th {
        user-select: none;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.1;
        cursor: pointer;
    }
    &__body > tr {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
    &--center {
        position: relative;
        height: auto;
        grid-column: 1 / -1;
    }
    td#{$self}__loader {
        padding-top: $spacer * 2;
        padding-bottom: $spacer * 2;
    }
}
</style>
