<template>
    <div class="d-flex flex-column align-center pb-4">
        <v-switch
            v-model="switchValue"
            class="justify-center align-center"
            color="primary"
            hide-details
            :ripple="false"
            @change="isAlertShown = true"
        >
            <template #prepend>Единая</template>
            <template #append>Ручная</template>
        </v-switch>
        <m-alert v-model="isAlertShown" :title="alertTitle" @cancel="cancelAlert" @success="submit">
            <template #default>
                <slot v-if="switchValue" name="alert-body-active" />
                <slot v-else name="alert-body-inactive" />
            </template>
        </m-alert>
    </div>
</template>

<script>
export default {
    name: 'SystemSwitch',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        alertTitle: {
            type: String,
            default: 'Изменение системы управления',
        },
        type: {
            type: String,
            default: '',
        },
    },
    data: () => ({
        isAlertShown: false,
    }),
    computed: {
        switchValue: {
            get() {
                return this.value;
            },
            set(v) {
                this.$emit('input', v);
            },
        },
    },
    methods: {
        cancelAlert() {
            this.switchValue = !this.switchValue;
            this.isAlertShown = false;
        },
        async submit() {
            if (this.type != '') {
                await this.$fetch.put(`/settings/${this.type}-type`, {
                    allPrice: +this.switchValue,
                });
            }
            this.isAlertShown = false;
        },
    },
};
</script>

<style lang="scss" scoped>
::v-deep .v-input__append-outer {
    margin-left: 0 !important;
}
</style>
