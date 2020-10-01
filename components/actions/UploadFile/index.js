import './style.scss';

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
                ? event.target.closest('.upload').classList.add('on-drag')
                : event.target.closest('.upload').classList.remove('on-drag');
        },
        dropFile(event) {
            event.target.closest('.upload').classList.remove('on-drag');
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
    template: ` <div class="c-upload">
    <div
        class="c-upload__field"
        @dragover.prevent="changeColor($event, true)"
        @dragenter.prevent="changeColor($event, true)"
        @dragleave.prevent="changeColor($event, false)"
        @drop.prevent="dropFile"
    >
        <span class="c-upload__title">
            Перетащите файл сюда или
        </span>
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
</div>`,
};
