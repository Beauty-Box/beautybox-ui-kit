<template>
    <b-filter-select
        :items="ROLES"
        label="Роль"
        :append-icon="SELECT_ROLE !== 0 ? 'close' : 'arrow_drop_down'"
        :value="SELECT_ROLE"
        type="number"
        @change="SET_ROLE"
        v-on="on"
    />
</template>

<script>
const BFilterSelect = () => import(/* webpackChunkName: "BFilterSelect" */ '../../FilterSelect');
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'FilterSelectRole',
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
        ...mapGetters(['SELECT_ROLE', 'ROLES']),
        on() {
            let listeners = { ...this.$listeners };
            if (this.SELECT_ROLE !== 0) {
                listeners['click:append'] = this.onClear;
            }
            return listeners;
        },
    },
    methods: {
        ...mapMutations(['SET_ROLE']),
        onClear() {
            this.SET_ROLE(0);
            this.$emit('change', 0);
        },
    },
};
</script>
