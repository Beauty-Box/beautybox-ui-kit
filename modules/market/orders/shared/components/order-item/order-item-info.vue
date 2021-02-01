<script>
export default {
    name: 'app-order-item-info',
    props: {
        deliveryType: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        stock: {
            type: String,
            default: '',
        },
        trackNumber: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            default: 0,
        },
        sale: {
            type: Number,
            default: 0,
        },
        deliveryPrice: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
    },
};
</script>

<template>
    <v-card flat :class="{ 'white rounded-0 elevation-0': isMobile, muted: !isMobile }">
        <v-row>
            <v-col md="6">
                <!-- Доставка  -->
                <v-list-item>
                    <v-list-item-action class="mb-auto">
                        <v-icon size="28">pin_drop</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">
                            Доставка {{ deliveryType }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-wrap mt-2">
                            Пункт: {{ deliveryType }}, {{ address }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-if="stock" class="text-no-wrap mt-2">
                            Отправление: {{ stock }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <!-- Трек-номер  -->
                <v-list-item v-if="trackNumber">
                    <v-list-item-action class="mb-auto">
                        <v-icon size="28">qr_code_2</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">
                            Трек-номер
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-no-wrap mt-1">
                            <app-btn-copy
                                :copy-text="String(trackNumber)"
                                color="info"
                                class="u-text-initial u-hide-before pa-0"
                                small
                                title="Скопировать"
                            >
                                {{ trackNumber }}
                            </app-btn-copy>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col md="6">
                <ul class="pa-0">
                    <!-- Товары  -->
                    <v-list-item tag="li" style="min-height: auto">
                        <v-list-item-content class="py-2">
                            <v-list-item-title>Товары</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action class="my-0">
                            {{ price | price }}
                        </v-list-item-action>
                    </v-list-item>
                    <!-- Скидка  -->
                    <v-list-item tag="li" style="min-height: auto">
                        <v-list-item-content class="py-2">
                            <v-list-item-title>Скидка</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action class="error--text my-0">
                            <span v-if="sale">−</span> {{ sale | price }}
                        </v-list-item-action>
                    </v-list-item>
                    <!-- Доставка  -->
                    <v-list-item tag="li" style="min-height: auto">
                        <v-list-item-content class="py-2">
                            <v-list-item-title>Доставка</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action class="my-0">
                            {{ deliveryPrice | price }}
                        </v-list-item-action>
                    </v-list-item>
                    <!-- Итого  -->
                    <v-list-item tag="li" style="min-height: auto">
                        <v-list-item-content class="py-2">
                            <v-list-item-title class="font-weight-bold">Итого</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action class="font-weight-bold ml-0" style="margin-right: 2px">
                            {{ total | price }}
                        </v-list-item-action>
                    </v-list-item>
                </ul>
            </v-col>
        </v-row>
    </v-card>
</template>
