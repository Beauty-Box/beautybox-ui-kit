<script>
export default {
    name: 'app-order-item-status',
    components: {},
    props: {
        value: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
    },
};
</script>

<template>
    <v-chip small :color="value + '40'" :text-color="value" class="font-weight-medium rounded">
        {{ text }}
    </v-chip>
</template>
