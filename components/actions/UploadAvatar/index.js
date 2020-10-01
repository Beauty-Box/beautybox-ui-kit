import './style.scss';

import MUploadAvatar from '@ui-kit/components/modals/MUploadAvatar';
import ImageUserAvatar from '@ui-kit/components/image/ImageUserAvatar';
import VBtn from 'vuetify/lib/components/VBtn';
import VSvg from '@ui-kit/components/icons/Svg';

export default {
    name: 'UploadAvatar',
    components: { MUploadAvatar, ImageUserAvatar, VBtn, VSvg },
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
        imgType: {
            type: String,
            default: 'user',
        },
        square: {
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
    template: `<div class="c-avatar-upload" :class="{ square }">
    <div class="c-avatar-upload__image">
        <image-user-avatar
            :class="activatorClass"
            :size="$vuetify.breakpoint.smAndDown ? 120 : 80"
            :image="avatar"
            :name="name"
            :square="square"
            :img-type="imgType"
        />
        <div class="c-avatar-upload__overlay" @click="loadPhoto">
            <v-icon v-if="avatar">edit</v-icon>
            <v-svg v-else name="plus--bold" />
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
        color="info"
        class="c-avatar-upload__btn c-avatar-upload__btn--download"
        text
        :ripple="false"
        @click="loadPhoto"
    >
        Загрузить фото
    </v-btn>
    <div v-else class="c-avatar-upload__actions">
        <v-row>
            <v-col xs="6" class="d-flex justify-end">
                <v-btn
                    color="info"
                    text
                    :ripple="false"
                    class="c-avatar-upload__btn"
                    @click="editPhoto"
                >
                    Изменить фото
                </v-btn>
            </v-col>
            <v-col xs="6">
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
    <m-upload-avatar
        v-model="modalCropper"
        :edit="editFile"
        :image="fullAvatar"
        :crop="crop"
        @change="editFile = $event"
        @cancel="modalCropper = false"
        @success="savePhoto"
    />
</div>`,
};
