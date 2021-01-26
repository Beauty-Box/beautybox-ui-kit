<script>
import { EMPTY_PHOTO } from '@/constants';

export default {
    name: 'app-order-item-product-photo',
    components: {},
    props: {
        src: {
            type: String,
            default: '',
        },
        size: {
            type: [Number, String],
            default: 60,
        },
    },
    data: () => ({}),
    computed: {
        computedPath() {
            return this.src.length ? this.src : EMPTY_PHOTO;
        },
    },
};
</script>

<template>
    <v-img
        :max-width="size"
        :max-height="size"
        :width="size"
        :height="size"
        class="rounded"
        :src="computedPath"
    />
</template>
