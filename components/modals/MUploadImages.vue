<template>
    <m-mobile-full-screen
        v-model="opened"
        title="Загрузка фото"
        body
        single-button
        :action-btn="'Отмена'"
        @success="$emit('cancel')"
    >
        <v-row>
            <v-col cols="12">
                <upload-file-resize
                    :max-files="maxImages"
                    :accept="['image/gif', 'image/jpeg', 'image/png', 'image/pjpeg']"
                    @change="$emit('success', $event)"
                />
            </v-col>
        </v-row>
    </m-mobile-full-screen>
</template>

<script>
import UploadFileResize from '../actions/UploadFileResize';
export default {
    components: { UploadFileResize },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        maxImages: {
            type: Number,
            default: 10,
        },
    },
    computed: {
        opened: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>
