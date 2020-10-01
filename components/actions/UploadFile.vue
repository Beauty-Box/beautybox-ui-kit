<template>
    <div class="c-upload">
        <div
            class="c-upload__field"
            @dragover.prevent="changeColor($event, true)"
            @dragenter.prevent="changeColor($event, true)"
            @dragleave.prevent="changeColor($event, false)"
            @drop.prevent="dropFile"
        >
            <span class="c-upload__title"> Перетащите файл сюда или </span>
            <label for="uploadFile" class="c-upload__btn" tabindex="0">
                <strong>
                    Выберите файл
                    <span v-if="$vuetify.breakpoint.mdAndUp"> на компьютере</span>
                    <span v-else> из галереи</span>
                </strong>
                <input
                    id="uploadFile"
                    ref="uploadFiles"
                    type="file"
                    name="files[]"
                    style="display: none;"
                    :accept="accept.join(',')"
                    :multiple="maxFiles > 1"
                    @change="upload"
                />
            </label>
        </div>
        <span class="c-upload__subtext">
            Типы файлов: {{ accept.map((item) => item.split('/')[1]).join(', ') }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'UploadFile',
    props: {
        maxFiles: {
            type: Number,
            default: 1,
            validator(value) {
                return value > 0;
            },
        },
        accept: {
            type: Array,
            required: true,
            validator(value) {
                return value.every((item) => item.split('/').length === 2);
            },
        },
    },
    methods: {
        changeColor(event, value) {
            value
                ? event.target.closest('.c-upload').classList.add('on-drag')
                : event.target.closest('.c-upload').classList.remove('on-drag');
        },
        dropFile(event) {
            event.target.closest('.c-upload').classList.remove('on-drag');
            this.upload(event);
        },
        clearInput() {
            this.$refs.uploadFiles.files = null;
            this.$refs.uploadFiles.value = null;
        },
        upload(event) {
            let files = event.target.files || event.dataTransfer.files;
            if (files && files.length) {
                if (files.length > this.maxFiles) {
                    this.messageError(`За раз можно загрузить только ${this.maxFiles}`);
                    this.clearInput();
                    return;
                }
                const filesCopy = Object.keys(files).map((i) => files[i]);
                this.$emit('change', filesCopy);
                this.clearInput();
                console.log('file', filesCopy);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.c-upload {
    display: flex;
    flex-direction: column;

    &__field {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        padding: 10px;
        border: dashed 3px $color-info;
        border-radius: 4px;

        &:hover {
            background-color: #e3f1ff;
        }
    }

    &__title {
        margin-bottom: $gutter;
        font-size: 18px;
    }

    &__subtext {
        display: block;
        margin-top: $base-indent;
        color: $color-text--light;
        font-size: 14px;
    }

    &__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        padding: 0 $base-indent;
        transition: all 0.2s linear;
        border: solid 1px $color-info;
        border-radius: $border-radius;
        outline: none;
        background-color: #fff;
        color: $color-info;
        cursor: pointer;

        &:hover {
            background-color: $color-info;
            color: #fff;
        }
    }
}
</style>
