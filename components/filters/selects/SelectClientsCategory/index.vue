<template>
    <b-filter-select
        :items="CLIENTS_CATEGORIES"
        label="Сотрудники"
        :append-icon="defaultItem && SELECT_CLIENTS_CATEGORY !== 0 ? 'close' : 'arrow_drop_down'"
        :value="SELECT_CLIENTS_CATEGORY"
        type="number"
        @change="SET_CLIENTS_CATEGORY"
        v-on="on"
    />
</template>

<script>
const BFilterSelect = () => import(/* webpackChunkName: "BFilterSelect" */ '../../FilterSelect');
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'FilterSelectClientsCategory',
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
        ...mapGetters(['SELECT_CLIENTS_CATEGORY', 'CLIENTS_CATEGORIES']),
        on() {
            let listeners = { ...this.$listeners };
            if (this.SELECT_CLIENTS_CATEGORY !== 0) {
                listeners['click:append'] = this.onClear;
            }
            return listeners;
        },
    },
    methods: {
        ...mapMutations(['SET_CLIENTS_CATEGORY']),
        onClear() {
            this.SET_CLIENTS_CATEGORY(0);
            this.$emit('change', 0);
        },
    },
};
</script>
