<template>
    <m-mobile-full-screen
        v-model="toggle"
        :title="editFile ? 'Изменение фото' : 'Загрузка фото'"
        :scroll="false"
        @submit.prevent.stop="submit"
    >
        <upload-file-resize
            v-if="!editFile"
            :accept="['image/gif', 'image/jpeg', 'image/png', 'image/pjpeg']"
            :max-files="1"
            @change="getFile"
        />

        <template v-else>
            <template>
                <crop-image :image="img || image" :crop="crop" @change="getCrop" />
                <v-row>
                    <v-col class="d-flex justify-center align-center">
                        <image-user-avatar :image="cropImg" size="80" />
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                        <image-user-avatar :image="cropImg" size="60" />
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                        <image-user-avatar :image="cropImg" size="48" />
                    </v-col>
                </v-row>
            </template>
        </template>

        <template #btns>
            <template v-if="cropImg">
                <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />

                <v-btn color="white" large class="u-box-shadow" @click="onCancel"> Отменить </v-btn>

                <v-btn large color="primary" type="submit"> Сохранить </v-btn>
            </template>
        </template>
    </m-mobile-full-screen>
</template>

<script>
import UploadFile from '../actions/UploadFile';
const CropImage = () => import('../actions/CropImage');
import ImageUserAvatar from '../image/ImageUserAvatar';
import UploadFileResize from '../actions/UploadFileResize';
import MMobileFullScreen from '../modals/layouts/MMobileFullScreen';

export default {
    name: 'MUploadAvatar',
    components: { UploadFileResize, ImageUserAvatar, CropImage, UploadFile, MMobileFullScreen },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        edit: {
            type: Boolean,
            default: false,
        },
        crop: {
            type: [Object, String],
            default: null,
        },
        image: {
            type: String,
            default: '',
        },
    },
    data: () => ({
        loadingFiles: false,
        files: [],
        cropper: null,
        img: null,
        cropImg: null,
    }),
    computed: {
        toggle: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
        editFile: {
            get() {
                return this.edit;
            },
            set(value) {
                this.$emit('change', value);
            },
        },
    },
    methods: {
        getFile(files) {
            this.loadingFiles = true;
            this.files = files;
            let reader = new FileReader();
            reader.onloadend = (e) => {
                this.img = e.target.result;
                this.editFile = true;
            };
            reader.readAsDataURL(this.files[0]);
            this.loadingFiles = false;
        },
        getCrop({ image, crop }) {
            this.cropImg = image;
            this.cropper = crop;
        },
        onCancel() {
            this.cropImg = false;
            this.editFile = false;
        },
        submit() {
            console.log('files', this.files);
            if (!this.files.length) {
                this.files = [new File([this.image], 'image.jpg', { type: 'image/jpeg' })];
                let image = new Image();
                image.src = this.image;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                        this.files = [new File([blob], 'image.jpg', { type: 'image/jpeg' })];
                        this.$emit('success', {
                            files: this.files,
                            image: this.cropImg,
                            crop: this.cropper,
                        });
                    });
                };
            } else {
                this.$emit('success', {
                    files: this.files,
                    image: this.cropImg,
                    crop: this.cropper,
                });
            }
        },
    },
};
</script>
