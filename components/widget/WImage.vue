<template>
    <v-card>
        <v-img
            :key="imageData.uploadFilesID"
            :src="imageData.image.length ? imageData.image : empty"
            :lazy-src="imageData.image.length ? imageData.image : empty"
            aspect-ratio="1"
            class="c-img-load"
        >
            <div v-if="imageData.image.length" class="c-img-load__action">
                <v-btn
                    v-if="index > 0"
                    icon
                    class="c-img-load__btn"
                    color="white"
                    title="Сделать главной"
                    @click="upPhoto()"
                >
                    <v-icon>upload</v-icon>
                </v-btn>
                <v-btn class="c-img-load__btn" color="white" icon @click="rotatePhoto(-90)">
                    <v-icon>rotate_left</v-icon>
                </v-btn>
                <v-btn class="c-img-load__btn" color="white" icon @click="rotatePhoto(90)">
                    <v-icon>rotate_right</v-icon>
                </v-btn>
                <v-btn class="c-img-load__btn" color="white" icon @click="deletePhoto">
                    <v-icon>delete</v-icon>
                </v-btn>
                <!-- <v-btn
                    v-if="image.uploadFilesID"
                    class="c-img-load__btn"
                    color="white"
                    icon
                    @click="cropDialog = true"
                >
                    <v-icon>crop</v-icon>
                </v-btn>-->
            </div>
        </v-img>

        <m-upload-avatar
            v-if="imageData.image.length"
            v-model="cropDialog"
            edit
            :crop="imageData.crop"
            :image="imageData.originalImage"
            @success="cropImage"
            @cancel="cropDialog = false"
        />
    </v-card>
</template>

<script>
export default {
    name: 'WImage',
    props: {
        image: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        processing: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            cropDialog: false,
            empty: '/assets/empty.svg',
            imageData: this.image,
        };
    },
    mounted() {
        console.log('image', this.imageData);
    },
    methods: {
        async deletePhoto() {
            this.$emit('delete', { image: this.imageData, index: this.index });
        },
        cropImage(e) {
            this.cropDialog = false;
            this.imageData.image = e.image;
            this.imageData.crop = e.crop;
            this.$emit('crop', e);
        },
        rotatePhoto(angle) {
            if (this.imageData.uploadFilesID) {
                this.$fetch.put(`/addresses/file/${this.imageData.uploadFilesID}/rotate`, {
                    angle: -angle,
                });
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const image = document.createElement('img');
            image.crossOrigin = 'anonymous';
            image.src = this.imageData.image;

            image.onload = () => {
                if (image.width > 1000 || image.height > 1000) {
                    const ratio = image.width / image.height;
                    if (image.width >= image.height) {
                        // Картинка горизонтальная
                        canvas.width = image.width > 1000 ? 1000 : image.width;
                        canvas.height = canvas.width / ratio;
                    } else {
                        // Картинка вертикальная
                        canvas.height = image.height > 1000 ? 1000 : image.height;
                        canvas.width = ratio * canvas.height;
                    }
                } else {
                    canvas.height = image.height;
                    canvas.width = image.width;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((angle * Math.PI) / 180);

                ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);

                this.imageData.image = canvas.toDataURL();
                canvas.toBlob((blob) => this.$emit('rotate', { blob, index: this.index }));
            };
        },
        upPhoto() {
            this.$fetch.put('/addresses/file-main', {
                albumID: this.$route.params.id,
                main: this.$route.query.mainAlbum,
                uploadFileID: this.imageData.uploadFilesID,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.c-img-load {
    position: relative;
    overflow: hidden;

    &:hover {
        .c-img-load__action {
            transform: translateY(0);
        }
    }

    &__action {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        min-height: 30px;
        transition: transform 0.2s linear;
        background-color: rgba(0, 0, 0, 0.4);

        @include min(md) {
            transform: translateY(50px);
        }
    }

    &__btn {
        @include max(xs) {
            width: 25px;
            height: 30px;

            .v-icon {
                font-size: 18px;
            }
        }
    }
}
</style>
