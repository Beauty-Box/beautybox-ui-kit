<template>
    <b-filter-select
        :items="EMPLOYEES(defaultItem)"
        label="Сотрудники"
        :append-icon="defaultItem && SELECT_EMPLOYEE !== 0 ? 'close' : 'arrow_drop_down'"
        :value="SELECT_EMPLOYEE"
        type="number"
        @change="SET_EMPLOYEE"
        v-on="on"
    />
</template>

<script>
const BFilterSelect = () => import(/* webpackChunkName: "BFilterSelect" */ '../../FilterSelect');
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'FilterSelectEmployee',
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
        ...mapGetters(['SELECT_EMPLOYEE', 'EMPLOYEES']),
        on() {
            let listeners = { ...this.$listeners };
            if (this.defaultItem && this.SELECT_EMPLOYEE !== 0) {
                listeners['click:append'] = this.onClear;
            }
            return listeners;
        },
    },
    methods: {
        ...mapMutations(['SET_EMPLOYEE']),
        onClear() {
            this.SET_EMPLOYEE(0);
            this.$emit('change', 0);
        },
    },
};
</script>
