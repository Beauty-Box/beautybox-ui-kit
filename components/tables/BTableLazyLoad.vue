<template>
    <v-simple-table>
        <template v-slot:default>
            <thead v-if="showHeaderAll || !$vuetify.breakpoint.mobile">
                <slot name="table-head" />
            </thead>
            <tbody v-scroll:#main="onScrollControl">
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
import { scroll } from '../../mixins';
const BBlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '../blocks/BlockLoader');

export default {
    name: 'BTableLazyLoad',
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
        showHeaderAll: {
            type: Boolean,
            default: false,
        }
    },
};
</script>
