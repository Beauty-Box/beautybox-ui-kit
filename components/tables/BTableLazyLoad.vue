<template>
    <v-simple-table>
        <template #default>
            <thead v-if="showHeaderAll || !$vuetify.breakpoint.mobile">
                <slot name="table-head" />
            </thead>
            <tbody v-if="useIntersection">
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
            <tbody v-else v-scroll:#scroll-container="onScrollControl">
                <slot v-if="$slots['table-body']" name="table-body" />
                <tr v-if="loading">
                    <td colspan="100%" align="center" :style="{ position: 'relative' }">
                        <b-block-loader position="static" size="30" style="max-height: 60px" />
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import { getOnScrollMixin } from '../../mixins';
const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../blocks/BlockLoader');

export default {
    name: 'BTableLazyLoad',
    components: { BBlockLoader },
    mixins: [getOnScrollMixin],
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        readyToGetElements: {
            type: Boolean,
            default: false,
        },
        onScrollEndHandler: {
            type: Function,
            required: false,
            default: () => {},
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
        useIntersection: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onIntersectBottom(entries, observer, isIntersecting) {
            const bcr = entries[0].boundingClientRect;
            const isBottomVisible = bcr.bottom > 0;
            if (isIntersecting && !this.loading && isBottomVisible) {
                console.log('intersect in table', isBottomVisible);
                this.$emit('reach-bottom');
            }
        },
    },
};
</script>
