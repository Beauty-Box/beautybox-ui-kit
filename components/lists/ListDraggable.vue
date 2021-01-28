<template>
    <draggable
        v-model="modal"
        class="draggable-container"
        :handle="`.${handle}`"
        v-bind="dragOptions"
        @end="$emit('dragEnd', modal)"
    >
        <slot />
    </draggable>
</template>

<script>
const draggable = () => import(/* webpackChunkName: "Vuedraggable" */ 'vuedraggable');
import { modalToggleMixin } from '../../mixins';

export default {
    name: 'list-draggable',
    components: {
        draggable,
    },
    mixins: [modalToggleMixin],
    props: {
        handle: {
            type: String,
            required: true,
        },
    },
    data: () => ({}),
    computed: {
        dragOptions() {
            return {
                animation: 200,
                disabled: false,
                ghostClass: 'ghost',
            };
        },
    },
};
</script>

<style lang="scss">
.draggable-container {
    display: flex;
    flex-direction: column;
}
</style>
