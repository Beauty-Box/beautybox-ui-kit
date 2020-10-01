<template>
    <m-mobile-full-screen v-model="modal" title="Добавление нового альбома" @submit="submit">
        <b-select
            v-model="category"
            :items="categories"
            label="Категория"
            name="categoryID"
            @change="loadServices"
        />
        <b-select
            v-model="service"
            label="Услуга"
            :items="services"
            name="serviceID"
            :disabled="!services.length"
            :error-messages="emptyServicesError"
        />
        <input type="hidden" name="addressID" :value="id" />
        <template #btns>
            <v-spacer />
            <v-btn class="primary" type="submit" :loading="loading">
                Добавить
            </v-btn>
        </template>
    </m-mobile-full-screen>
</template>

<script>
import { modalProps } from '../../mixins/modalProps';
import { mapGetters } from 'vuex';

export default {
    name: 'MAddNewAlbum',
    mixins: [modalProps],
    data: () => ({
        services: [],
        categories: [],
        emptyServices: false,
        category: 0,
        service: 0,
        loading: false,
    }),
    computed: {
        ...mapGetters(['USER_INFO']),
        id() {
            return this.$route.params.id || this.USER_INFO.addresses[0].addressID;
        },
        emptyServicesError() {
            let error = [];
            if (this.emptyServices) {
                error.push('В этой категории нет доступных услуг');
            }
            return error;
        },
    },
    async created() {
        this.categories = await this.$fetch.get(`/addresses/album/${this.id}`);
    },
    methods: {
        async loadServices(e) {
            this.services = await this.$fetch.get(`/addresses/services/${e}`);
            this.emptyServices = !this.services.length;
        },
        async submit(e) {
            this.loading = true;
            await this.$fetch.post('/addresses/album', new FormData(e.target));
            this.loading = false;
            this.$emit('success');
        },
    },
};
</script>
