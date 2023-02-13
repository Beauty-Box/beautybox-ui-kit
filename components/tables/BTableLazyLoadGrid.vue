<template>
    <table :fixed-header="fixedHeader" :height="height" class="table">
        <thead v-if="showHeaderAll || !$vuetify.breakpoint.mobile" class="table__head">
            <slot name="table-head" />
        </thead>
        <tbody class="table__body">
            <slot v-if="$slots['table-body']" name="table-body" />
            <tr v-if="loading">
                <td colspan="100%" align="center" :style="{ position: 'relative' }">
                    <b-block-loader position="static" size="30" style="max-height: 60px" />
                </td>
            </tr>
            <tr v-else-if="nowItemsLength < allItemsLength">
                <td
                    v-intersect.quiet="onIntersectBottom"
                    colspan="100%"
                    align="center"
                    :style="{ position: 'relative', height: 'auto' }"
                />
            </tr>
        </tbody>
    </table>
</template>

<script>
const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../blocks/BlockLoader');

export default {
    name: 'BTableLazyLoadGrid',
    components: { BBlockLoader },
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
// .v-data-table > .v-data-table__wrapper tbody tr:last-child:hover td {
//     &:last-child {
//         border-bottom-right-radius: $border-radius-table !important;
//     }
//     &:first-child {
//         border-bottom-left-radius: $border-radius-table !important;
//     }
// }

.table {
    --cols: 5;
    display: grid !important;
    grid-template-columns: repeat(var(--cols, auto-fit), minmax(auto, 1fr));
    overflow: auto;

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
    &__body > tr {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
}
</style>
