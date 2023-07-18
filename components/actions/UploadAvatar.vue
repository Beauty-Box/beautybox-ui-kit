<template>
    <div class="c-avatar-upload" :class="{ 'c-avatar-upload--square': avatarSquare }">
        <div class="c-avatar-upload__inner">
            <div class="c-avatar-upload__image">
                <image-user-avatar
                    :class="activatorClass"
                    :size="avatarSize"
                    :image="avatar"
                    :name="name"
                    :square="avatarSquare"
                    :shadow="avatarShadow"
                    :img-type="imgType"
                />
                <div class="c-avatar-upload__overlay" @click="loadPhoto">
                    <v-icon v-if="avatar">edit</v-icon>
                    <component :is="svgComponent" v-else name="plus--bold" />
                </div>
            </div>
            <template v-if="avatarChanged">
                <input v-model="file" type="hidden" />
                <input :value="JSON.stringify({ crop })" type="hidden" name="crop" />
                <input :value="0" type="hidden" name="rotate" />
                <input :value="deleteFile" type="hidden" name="deleteFile" />
            </template>
            <input :value="avatarChanged" type="hidden" name="avatarUpdate" />
            <v-btn
                v-if="!avatar"
                color="link"
                class="c-avatar-upload__btn c-avatar-upload__btn--download"
                text
                :ripple="false"
                @click="loadPhoto"
            >
                Загрузить фото
            </v-btn>
            <!--<v-btn
                v-if="!avatar"
                color="muted"
                medium
                depressed
                class="u-text-initial font-weight-medium c-avatar-upload__btn c-avatar-upload__btn&#45;&#45;download"
                :ripple="false"
                @click="loadPhoto"
            >
                <v-icon>add_a_photo</v-icon>
                Загрузить фото профиля
            </v-btn>-->
            <div v-else class="c-avatar-upload__actions">
                <v-row style="flex-wrap: nowrap; margin-top: 10px">
                    <v-col class="pt-0 pb-0 pl-0">
                        <v-btn
                            color="link"
                            text
                            :ripple="false"
                            class="c-avatar-upload__btn"
                            @click="editPhoto"
                        >
                            Изменить фото
                        </v-btn>
                    </v-col>
                    <v-col class="pa-0 pb-0 pr-0">
                        <v-btn
                            color="error"
                            text
                            :ripple="false"
                            class="c-avatar-upload__btn"
                            @click="deletePhoto"
                        >
                            Удалить фото
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
        <m-upload-avatar
            v-model="modalCropper"
            :edit="editFile"
            :image="fullAvatar"
            :crop="crop"
            @change="editFile = $event"
            @cancel="modalCropper = false"
            @success="savePhoto"
        />
    </div>
</template>

<script>
import svgComponentMixin from '../../mixins/svgComponent.mixin';
const MUploadAvatar = () =>
    import(/* webpackChunkName: "MUploadAvatar" */ '../modals/MUploadAvatar');
const ImageUserAvatar = () =>
    import(/* webpackChunkName: "ImageUserAvatar" */ '../image/ImageUserAvatar');

export default {
    name: 'UploadAvatar',
    components: {
        MUploadAvatar,
        ImageUserAvatar,
    },
    mixins: [svgComponentMixin],
    props: {
        activatorClass: {
            type: String,
            default: '',
        },
        crop: {
            required: false,
            type: [String, Object],
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        avatar: {
            required: false,
            type: String,
            default: '',
        },
        avatarSize: {
            type: [Number, String],
            default: '80',
        },
        imgType: {
            type: String,
            default: 'user',
        },
        avatarSquare: {
            type: Boolean,
            default: false,
        },
        avatarShadow: {
            type: Boolean,
            default: false,
        },
        fullAvatar: {
            required: false,
            type: String,
            default: '',
        },
    },
    data: () => ({
        file: [],
        avatarChanged: false,
        deleteFile: false,
        editFile: false,
        modalCropper: false,
    }),
    methods: {
        editPhoto() {
            this.editFile = true;
            this.modalCropper = true;
        },
        loadPhoto() {
            this.editFile = false;
            this.deleteFile = false;
            this.modalCropper = true;
        },
        savePhoto(event) {
            this.avatarChanged = true;
            this.$nextTick(() => {
                if (event.files.length) {
                    this.file = event.files;
                }
            });
            this.modalCropper = false;
            this.$emit('set-crop', { crop: event.crop });
            this.$emit('set-avatar', event.image);
            this.$emit('change', event.files[0]);
        },
        deletePhoto() {
            this.avatarChanged = true;
            this.deleteFile = true;
            this.$emit('delete');
            this.$emit('set-crop', '');
            this.$emit('set-avatar', '');
        },
    },
};
</script>

<style lang="scss" scoped>
.c-avatar-upload {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;

    &__image {
        display: flex;
        justify-content: center;
        position: relative;
        border-radius: 50%;
    }

    &__inner {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        align-items: center;
        max-width: 220px;

        &:hover {
            .c-avatar-upload__overlay {
                visibility: visible;
                opacity: 1;
            }
        }
    }

    &__overlay {
        z-index: z(default);
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        border-radius: 50%;
        background-color: $color-info;
        @include noselect;
        @include coverdiv;

        .v-icon,
        .icon {
            z-index: z(default) + 1;
            fill: #fff;
            color: #fff;
            font-size: 28px;
            @include centre;
        }
    }

    &__actions {
        width: 100%;
    }

    &__btn {
        font-weight: 400;
        text-transform: initial;

        &::before,
        &::after {
            display: none;
        }

        &:hover {
            text-decoration: underline;
        }

        &:not(.c-avatar-upload__btn--download) {
            padding: 0 !important;

            &:hover {
                text-decoration: underline;
            }
        }

        &--download {
            margin-top: 10px;

            @include max(xs) {
                font-size: 17px;
            }
        }
    }

    &.c-avatar-upload--square {
        .c-avatar-upload {
            &__image,
            &__overlay {
                border-radius: $border-radius * 2;
            }
        }
    }
}
</style>
