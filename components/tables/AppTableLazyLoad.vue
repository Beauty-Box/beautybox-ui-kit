<template>
    <v-simple-table>
        <template v-slot:default>
            <thead v-if="!$vuetify.breakpoint.xsOnly">
                <slot name="table-head" />
            </thead>
            <tbody v-scroll:#main="onScrollControl">
                <slot name="table-body" />

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
import { scroll } from '@beautybox/core/mixins/ScrollControl';
const BBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '@beautybox/ui-kit/components/blocks/BlockLoader');

export default {
    name: 'TableLazyLoad',
    components: { BBlockLoader },
    mixins: [scroll],
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
            required: true,
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
};
</script>
