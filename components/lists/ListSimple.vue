<template>
    <v-list class="pa-0" :elevation="elevation">
        <v-list-item-group v-model="modal" :multiple="multiple">
            <slot />
        </v-list-item-group>
        <v-spacer />
    </v-list>
</template>
<script>
import { modalProps } from '@beautybox/core/mixins/modalProps';
export default {
    name: 'BListSimple',
    mixins: [modalProps],
    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        elevation: {
            type: [Number, String],
            default: '',
        },
    },
};
</script>
