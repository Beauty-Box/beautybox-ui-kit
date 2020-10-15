<template>
    <b-filter-select
        :items="ADDRESSES"
        label="Салон"
        type="number"
        :value="SELECTED_ADDRESS"
        @change="SET_ADDRESS"
        v-on="$listeners"
    />
</template>

<script>
const BFilterSelect = () => import(/* webpackChunkName: "BFilterSelect" */ '../../FilterSelect');
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'FilterSelectAddress',
    components: {
        BFilterSelect,
    },
    computed: {
        ...mapGetters(['SELECTED_ADDRESS', 'ADDRESSES']),
    },
    methods: {
        ...mapMutations(['SET_ADDRESS']),
    },
};
</script>
