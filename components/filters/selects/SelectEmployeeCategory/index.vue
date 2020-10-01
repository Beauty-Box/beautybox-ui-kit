<template>
    <b-filter-select
        :items="EMPLOYEES_CATEGORIES"
        label="Категории сотрудников"
        :append-icon="SELECT_EMPLOYEE_CATEGORY !== 0 ? 'close' : 'arrow_drop_down'"
        :value="SELECT_EMPLOYEE_CATEGORY"
        type="number"
        @change="SET_EMPLOYEE_CATEGORY"
        v-on="on"
    />
</template>

<script>
const BFilterSelect = () => import(/* webpackChunkName: "BFilterSelect" */ '../../FilterSelect');
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'FilterSelectEmployeeCategory',
    components: {
        BFilterSelect,
    },
    computed: {
        ...mapGetters(['SELECT_EMPLOYEE_CATEGORY', 'EMPLOYEES_CATEGORIES']),
        on() {
            let listeners = { ...this.$listeners };
            if (this.SELECT_EMPLOYEE_CATEGORY !== 0) {
                listeners['click:append'] = this.onClear;
            }
            return listeners;
        },
    },
    methods: {
        ...mapMutations(['SET_EMPLOYEE_CATEGORY']),
        onClear() {
            this.SET_EMPLOYEE_CATEGORY(0);
            this.$emit('change', 0);
        },
    },
};
</script>
