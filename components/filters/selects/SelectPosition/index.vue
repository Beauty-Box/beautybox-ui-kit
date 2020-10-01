<template>
    <b-filter-select
        :items="POSITIONS"
        label="Должности"
        :append-icon="defaultItem && SELECT_POSITION !== 0 ? 'close' : 'arrow_drop_down'"
        :value="SELECT_POSITION"
        type="number"
        @change="SET_POSITION"
        v-on="on"
    />
</template>

<script>
const BFilterSelect = () => import(/* webpackChunkName: "BFilterSelect" */ '../../FilterSelect');
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'FilterSelectPosition',
    components: {
        BFilterSelect,
    },
    props: {
        defaultItem: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        ...mapGetters(['SELECT_POSITION', 'POSITIONS']),
        on() {
            let listeners = { ...this.$listeners };
            if (this.SELECT_POSITION !== 0) {
                listeners['click:append'] = this.onClear;
            }
            return listeners;
        },
    },
    methods: {
        ...mapMutations(['SET_POSITION']),
        onClear() {
            this.SET_POSITION(0);
            this.$emit('change', 0);
        },
    },
};
</script>
