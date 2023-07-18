<template>
    <draggable
        v-model="modal"
        class="draggable-container"
        :handle="`.${handle}`"
        v-bind="dragOptions"
        @end="$emit('dragEnd', modal)"
    >
        <slot />
        <template #header>
            <slot name="header" />
        </template>
        <template #footer>
            <slot name="footer" />
        </template>
    </draggable>
</template>

<script>
const draggable = () => import(/* webpackChunkName: "Vuedraggable" */ 'vuedraggable');
// import draggable from 'vuedraggable';
import { modalToggleMixin } from '../../mixins';

export default {
    name: 'ListDraggable',
    components: {
        draggable,
    },
    mixins: [modalToggleMixin],
    props: {
        filter: {
            type: String,
            default: undefined,
        },
        draggable: {
            type: String,
            default: undefined,
        },
        handle: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            default: 'div',
        },
    },
    data: () => ({}),
    computed: {
        dragOptions() {
            return {
                animation: 200,
                disabled: false,
                ghostClass: 'ghost',
                tag: this.tag,
                filter: this.filter,
                draggable: this.draggable,
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
