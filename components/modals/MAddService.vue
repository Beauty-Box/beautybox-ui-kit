<template>
    <v-dialog
        v-model="modal"
        max-width="480"
        content-class="c-modal"
        overlay-opacity="1"
        overlay-color="rgba(103, 118, 140, 0.5)"
        :fullscreen="$vuetify.breakpoint.mobile"
        :hide-overlay="$vuetify.breakpoint.mobile"
        transition="slide-y-reverse-transition"
    >
        <v-card class="c-modal__inner">
            <!-- HEADER -->
            <v-card-title class="c-modal__header">
                <v-btn
                    v-if="dialogRecommendedServices"
                    class="btn-close"
                    icon
                    :ripple="false"
                    @click="onCloseDialogRecommendedServices"
                >
                    <v-svg name="arrow-long--left" />
                </v-btn>
                <span class="c-modal__title"> {{ currentCategory.name }} </span>
                <v-btn class="btn-close" icon :ripple="false" @click="onCloseServiceModal">
                    <v-svg name="close" />
                </v-btn>
            </v-card-title>

            <!-- BODY -->
            <v-card-text class="c-modal__body">
                <app-btn-wide
                    v-if="!dialogRecommendedServices && !dialogAddCustomCategory"
                    text="Добавить категорию"
                    @click="onOpenDialogAddCategory"
                />

                <app-btn-wide
                    v-if="dialogRecommendedServices"
                    text="Добавить услугу"
                    @click="onCallModalAddCustomService"
                />

                <div class="category-list-dropdown-container">
                    <template v-if="dialogRecommendedServices">
                        <div class="c-sub-title">Рекомендуемые</div>

                        <block-loader v-if="recommendedServicesLoading" position="static" />

                        <block-empty
                            v-else-if="!recommendedServicesArray.length"
                            center
                            icon="category"
                            text="У нас нет рекомендаций к данной категории"
                        />

                        <ul v-else class="category-list">
                            <list-item-category
                                v-for="(service, index) in recommendedServicesArray"
                                :key="service.name"
                                :item="service"
                                height="60"
                                cursor="pointer"
                                icon-append="add_circle"
                                icon-append-size="24"
                                :icon-prepend="false"
                                @click.stop="onCallModalAddCustomService($event, service, index)"
                            />
                        </ul>
                    </template>

                    <ul v-else class="category-list">
                        <list-item-category
                            v-for="(category, index) in CATEGORIES_ARRAY"
                            :key="category.name"
                            :item="category"
                            height="60"
                            cursor="pointer"
                            icon-prepend="brightness_1"
                            icon-prepend-size="24"
                            :icon-prepend-color="category.color"
                            @click="onGetRecommendedService($event, category, index)"
                        />
                    </ul>
                </div>
            </v-card-text>

            <!-- DIALOG ADD SERVICE OPTIONS-->
            <m-floating-dialog
                v-model="dialogFloating"
                :color="currentCategory.color"
                :name.sync="currentService.name"
                :price.sync="currentService.price"
                :time.sync="currentService.time"
                :event="dialogFloatingMouseEvent"
                @submit="onSaveService"
            />
        </v-card>
    </v-dialog>
</template>

<script>
import { modalProps } from '../../mixins/modalProps';
import BlockLoader from '../blocks/BlockLoader';
import BlockEmpty from '../blocks/BlockEmpty';
import AppBtnWide from '../buttons/AppBtnWide';
import MFloatingDialog from '../modals/MFloatingDialog';
import { ServiceListMixin } from '@crm/pages/Services/mixins';
import ListItemCategory from '../lists/items/ListItemCategory';
import { timeArray } from '@beautybox/utils/helpers';

export default {
    name: 'MAddService',
    components: { ListItemCategory, MFloatingDialog, AppBtnWide, BlockEmpty, BlockLoader },
    mixins: [modalProps, ServiceListMixin],
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    data: () => ({
        dialogAddCustomCategory: false,
        dialogRecommendedServices: false,
        recommendedServicesLoading: true,
        recommendedServicesArray: [],

        currentCategory: {
            categoryID: null,
            index: 0,
            name: 'Выберите категорию',
            color: '',
        },

        currentService: {
            index: 0,
            name: '',
            price: '',
            priceErrors: [],
            time: timeArray[0].value,
        },

        dialogFloating: false,
        dialogFloatingNameIsDisabled: true,
        dialogFloatingMouseEvent: {},
    }),
    watch: {
        modal(modal) {
            if (modal) {
                this.getCategoriesList();

                if (Object.values(this.item).length && this.item.categoryID !== null) {
                    this.currentCategory = this.item;
                    this.getRecommendedServiceArray();
                }
            }
        },
    },
    methods: {
        //Получаем массив рекомендуемых услуг
        async getRecommendedServiceArray() {
            console.log('--- getRecommendedServiceArray');

            this.dialogRecommendedServices = true;

            this.recommendedServicesArray = await this.$fetch.get(
                `/services/create?categoryID=${this.currentCategory.categoryID}`
            );

            this.recommendedServicesLoading = false;

            console.log('--- getRecommendedServiceArray', this.recommendedServicesArray);
        },

        //Получаем массив рекомендуемых услуг при клике
        onGetRecommendedService(event, item, index) {
            console.log('--- onGetRecommendedService', item);

            if (typeof item !== 'undefined') {
                this.currentCategory.name = item.name;
                this.currentCategory.color = item.color;
                this.currentCategory.categoryID = item.categoryID;
            }

            if (typeof index !== 'undefined') {
                this.currentCategory.index = index;
            }

            this.getRecommendedServiceArray();
        },

        //Сохранение пользовательской услуги
        async onSaveService(e) {
            console.log('--- onSaveService');

            const formData = new FormData(e.target);
            const index = this.currentCategory.index;

            formData.append('categoryID', this.currentCategory.categoryID);
            formData.append('title', this.currentService.name);

            try {
                await this.ADD_SERVICE({ formData, index });
                this.categoriesArray = this.CATEGORIES_ARRAY;
                this.dialogFloating = false;

                if (this.currentService.index !== 'undefined') {
                    this.recommendedServicesArray.splice(this.currentService.index, 1);
                    this.currentService.index = 0;
                }

                this.messageSuccess('Услуга успешно добавлена');

                this.currentService.name = '';
                this.currentService.price = '';
                this.currentService.time = timeArray[0].value;
            } catch (e) {
                console.log('---e', e);
                this.messageError('Произошла ошибка при добавлении услуги');
            }
        },

        //Вызов модального окна добавления услуги
        onCallModalAddCustomService(e, item, index) {
            console.log('--- onCallModalAddCustomService', item);

            if (typeof index !== 'undefined') {
                this.currentService.index = index;
                this.dialogFloatingNameIsDisabled = true;
            } else if (index >= 0) {
                this.dialogFloatingNameIsDisabled = true;
            } else {
                this.dialogFloatingNameIsDisabled = false;
            }
            this.dialogFloatingNameIsDisabled = false;

            if (typeof item !== 'undefined') {
                this.currentService.name = item.name;
            } else {
                this.currentService.name = '';
            }

            this.dialogFloatingMouseEvent = e;
            this.dialogFloating = true;
        },

        onCloseDialogRecommendedServices() {
            console.log('--- onCloseDialogRecommendedServices');
            this.dialogRecommendedServices = false;
            this.recommendedServicesLoading = true;
            this.recommendedServicesArray = [];
            this.currentCategory.name = 'Выберите категорию';
        },

        onOpenDialogAddCategory() {
            console.log('--- onOpenDialogAddCategory');
            this.$bus.$emit('toggleDialogAddCategory');
            this.modal = false;
        },

        onCloseServiceModal() {
            console.log('--- onCloseServiceModal');
            this.modal = false;
            this.dialogAddService = false;
            this.dialogAddCategory = false;
            this.dialogAddCustomCategory = false;
            this.dialogRecommendedServices = false;
            this.recommendedServicesLoading = true;
            this.clearCurrentData();
        },

        //Очистка текущих переменных
        clearCurrentData() {
            console.log('--- clearCurrentData');
            this.currentService.index = 0;
            this.currentService.name = '';
            this.currentCategory.categoryID = null;
            this.recommendedServicesArray = [];
            this.currentCategory.name = 'Выберите категорию';
        },
    },
};
</script>
