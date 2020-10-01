<template>
    <v-dialog
        v-model="modal"
        content-class="c-modal"
        max-width="480"
        overlay-opacity="1"
        overlay-color="rgba(103, 118, 140, 0.5)"
        :fullscreen="$vuetify.breakpoint.smAndDown"
        :hide-overlay="$vuetify.breakpoint.smAndDown"
        transition="slide-y-reverse-transition"
    >
        <v-card class="c-modal__inner">
            <v-card-title class="c-modal__header">
                <span class="c-modal__title"> Добавление категорий </span>
                <v-btn icon class="btn-close" :ripple="false" @click="modal = false">
                    <v-svg name="close" />
                </v-btn>
            </v-card-title>

            <v-card-text class="c-modal__body">
                <app-btn-wide
                    v-if="!dialogAddCustomCategory"
                    text="Добавить свою категорию"
                    @click="dialogAddCustomCategory = true"
                />

                <div
                    class="category-list-dropdown-container"
                    :class="{ 'is-relative': dialogAddCustomCategory }"
                >
                    <template v-if="!dialogAddCustomCategory">
                        <div class="c-sub-title">Рекомендуемые</div>

                        <block-loader v-if="categoryListLoading" position="static" />

                        <block-empty
                            v-else-if="!categoriesList.length"
                            center
                            icon="category"
                            text="У нас больше нет рекомендованных категорий"
                        />

                        <ul v-else class="category-list">
                            <list-item-category
                                v-for="(item, index) in categoriesList"
                                :key="item.name"
                                :item="item"
                                height="60"
                                cursor="pointer"
                                icon-prepend="brightness_1"
                                icon-prepend-size="24"
                                :icon-prepend-color="item.color"
                                icon-append="add_circle"
                                icon-append-size="24"
                                @click="onAddCategory(item, index)"
                            />
                        </ul>
                    </template>

                    <!-- MODAL ADD NEW CATEGORY -->
                    <v-menu
                        v-model="dialogAddCustomCategory"
                        :max-width="$vuetify.breakpoint.smAndDown ? '100%' : 480"
                        attach=".category-list-dropdown-container"
                        content-class="category-list-dropdown"
                        :close-on-content-click="false"
                        :close-on-click="false"
                        :transition="false"
                        allow-overflow
                    >
                        <v-card
                            id="formNewCategory"
                            ref="form"
                            tag="form"
                            class="category-list-dropdown__inner"
                            @submit.prevent="onSaveNewCategory"
                        >
                            <v-card-text class="category-list-dropdown__body">
                                <div class="text-body-2 mb-2">Цвет категории</div>
                                <v-chip-group
                                    v-model="selectedCategoryColor"
                                    :column="!$vuetify.breakpoint.xsOnly"
                                    class="select-color mb-5"
                                    active-class="select-color__selected"
                                >
                                    <v-chip
                                        v-for="item in colors"
                                        :key="item"
                                        :color="item"
                                        :value="item"
                                        large
                                        :style="{
                                            height: '42px',
                                            width: '42px',
                                        }"
                                    >
                                        <v-svg name="checked--bold" />
                                    </v-chip>
                                    <input
                                        v-model="selectedCategoryColor"
                                        type="hidden"
                                        name="color"
                                    />
                                </v-chip-group>

                                <b-input
                                    label="Название категории"
                                    name="name"
                                    hide-details="auto"
                                />

                                <b-text-area label="Описание категории" name="description" />
                            </v-card-text>

                            <v-card-actions class="category-list-dropdown__footer">
                                <v-btn
                                    color="white"
                                    large
                                    :ripple="false"
                                    @click="dialogAddCustomCategory = false"
                                >
                                    Отменить
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    :loading="loading"
                                    :ripple="false"
                                    large
                                    type="submit"
                                >
                                    Сохранить
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { modalProps } from '../../mixins/modalProps';
import BlockLoader from '../blocks/BlockLoader';
import BlockEmpty from '../blocks/BlockEmpty';
import AppBtnWide from '../buttons/AppBtnWide';
import { ServiceListMixin } from '@crm/pages/Services/mixins';
import ListItemCategory from '../lists/items/ListItemCategory';

export default {
    name: 'MAddCategory',
    components: { ListItemCategory, AppBtnWide, BlockEmpty, BlockLoader },
    mixins: [modalProps, ServiceListMixin],
    data: () => ({
        loading: false,
        categoryListLoading: true,
        dialogAddCustomCategory: false,
    }),
    watch: {
        async modal(modal) {
            if (modal) {
                await this.getCategoriesList();
                this.categoryListLoading = false;
            }
        },
    },
    methods: {
        //Добавление категории из списка рекомендуемых
        async onAddCategory(item, index) {
            console.log('--- onAddCategory');
            await this.ADD_CATEGORY({ name: item.name, color: item.color, services: [] });
            this.categoriesList.splice(index, 1);
        },
        //Сохранение новой категории
        async onSaveNewCategory(e) {
            console.log('--- onSaveNewCategory');
            this.loading = true;
            const currentServicesArray = this.CATEGORIES_ARRAY;
            const formData = new FormData(e.target);

            const response = await this.$fetch.post('/categories', formData);

            const result = [response, ...currentServicesArray];

            this.$store.commit('SET_CATEGORIES_ARRAY', result);

            await this.GET_CATEGORIES({ addressID: this.$route.query.addressID });

            this.categoriesArray = this.CATEGORIES_ARRAY;
            this.messageSuccess('Категория успешно создана');
            this.loading = false;
            this.dialogAddCustomCategory = false;
        },
    },
};
</script>
