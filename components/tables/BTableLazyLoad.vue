<template>
    <div>
        <v-simple-table :fixed-header="fixedHeader" :height="height">
            <template #default>
                <thead v-if="showHeaderAll || !$vuetify.breakpoint.mobile">
                    <slot name="table-head" />
                </thead>
                <component
                    :is="tableBody"
                    v-if="useIntersection"
                    tag="tbody"
                    v-bind="draggableProps"
                    v-on="draggableListeners"
                >
                    <slot v-if="$slots['table-body']" name="table-body" />
                    <!-- <template #footer>
                        <tr v-if="loading">
                            <td colspan="100%" align="center" :style="{ position: 'relative' }">
                                <b-block-loader
                                    position="static"
                                    size="30"
                                    style="max-height: 60px"
                                />
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
                    </template> -->
                    <!-- <template v-if="!draggable">
                        <tr v-if="loading">
                            <td colspan="100%" align="center" :style="{ position: 'relative' }">
                                <b-block-loader
                                    position="static"
                                    size="30"
                                    style="max-height: 60px"
                                />
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
                    </template> -->
                </component>
                <!-- старая реализация подгрузки по скроллу, по возможности убрать-->
                <component
                    :is="tableBody"
                    v-else
                    v-scroll:#scroll-container="onScrollControl"
                    tag="tbody"
                    v-bind="draggableProps"
                    v-on="draggableListeners"
                >
                    <slot v-if="$slots['table-body']" name="table-body" />
                    <!-- <template #footer>
                        <tr v-if="loading">
                            <td colspan="100%" align="center" :style="{ position: 'relative' }">
                                <b-block-loader
                                    position="static"
                                    size="30"
                                    style="max-height: 60px"
                                />
                            </td>
                        </tr>
                    </template>
                    <template v-if="!draggable">
                        <tr v-if="loading">
                            <td colspan="100%" align="center" :style="{ position: 'relative' }">
                                <b-block-loader
                                    position="static"
                                    size="30"
                                    style="max-height: 60px"
                                />
                            </td>
                        </tr>
                    </template> -->
                </component>
            </template>
        </v-simple-table>

        <span v-if="loading" :style="{ position: 'relative' }">
            <b-block-loader position="static" size="30" style="max-height: 60px" />
        </span>

        <span
            v-else-if="nowItemsLength < allItemsLength && useIntersection"
            v-intersect.quiet="onIntersectBottom"
            colspan="100%"
            align="center"
            :style="{ position: 'relative', height: 'auto' }"
        />
    </div>
</template>

<script>
import { getOnScrollMixin } from '../../mixins';
const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../blocks/BlockLoader');
const Draggable = () => import(/* webpackChunkName: "Vuedraggable" */ 'vuedraggable');

export default {
    name: 'BTableLazyLoad',
    components: { BBlockLoader, Draggable },
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
        fixedHeader: {
            type: Boolean,
            default: false,
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
        height: {
            type: [Number, String],
            default: 'auto',
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
.v-data-table .v-data-table__wrapper {
    tbody {
        & tr:last-child:hover td {
            &:last-child {
                border-bottom-right-radius: $border-radius-table !important;
            }

            &:first-child {
                border-bottom-left-radius: $border-radius-table !important;
            }
        }
    }
}
</style>
