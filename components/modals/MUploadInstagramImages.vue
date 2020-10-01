<template>
    <m-mobile-full-screen
        v-model="opened"
        :loading="loading"
        :title="!gradient ? 'Выберите фото' : 'Выберите фон'"
        body
        scroll
        :can-submit="submittable"
        @success="success"
        @cancel="$emit('cancel')"
    >
        <v-row v-if="!gradient" class="flex-wrap">
            <v-col v-for="image in images" :key="image.id" cols="6">
                <v-img
                    :class="{ selected: image.selected }"
                    aspect-ratio="1"
                    :src="image.images.standard_resolution.url"
                    @click="selectImage(image)"
                />
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <v-row>
                    <v-col v-for="image in images" :key="image.backgroundID" cols="6">
                        <v-img
                            :class="{ selected: image.selected }"
                            aspect-ratio="1"
                            :style="{ 'background-image': image.gradient }"
                            @click="selectImage(image)"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </m-mobile-full-screen>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        maxPhotos: {
            type: Number,
            default: 10,
        },
        gradient: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        images: [],
        loading: true,
    }),
    computed: {
        opened: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
        selectedImages() {
            return this.images.filter((i) => i.selected);
        },
        submittable() {
            return this.selectedImages.length != 0 && this.selectedImages.length <= this.maxPhotos;
        },
    },
    async mounted() {
        this.images = !this.gradient
            ? (await this.$fetch.get('/instagram/photos')).photos.map((i) => {
                  i.selected = false;
                  return i;
              })
            : (await this.$fetch.get('/beautylink-settings/backgrounds')).map((i) => {
                  i.selected = false;
                  return i;
              });
        this.loading = false;
    },
    methods: {
        selectImage(image) {
            if (this.maxPhotos <= 1 && !image.selected) {
                //TODO надо протестировать с инстаграм фотками
                image.selected = !image.selected;
                this.images.map((item) => {
                    if (item.backgroundID !== image.backgroundID) {
                        item.selected = false;
                    }
                });
                return;
            }
            if (this.selectedImages.length == this.maxPhotos && !image.selected) {
                this.messageError(`Максимум ${this.maxPhotos} фото`);
                return;
            } else {
                image.selected = !image.selected;
            }
        },
        success() {
            // this.loading = true;
            this.$emit('success', this.selectedImages);
        },
    },
};
</script>

<style>
.selected {
    border: 5px solid #000;
}
</style>
