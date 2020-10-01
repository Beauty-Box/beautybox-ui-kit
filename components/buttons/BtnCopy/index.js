import VBtn from 'vuetify/lib/components/VBtn';

export default {
    name: 'BtnCopy',
    components: { VBtn },
    props: {
        copyText: {
            type: String,
            required: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        depressed: {
            type: Boolean,
            default: false,
        },
        text: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
            default: '',
        },
    },
    methods: {
        onCopy() {
            this.messageSuccess('Ссылка скопирована');
        },
        onError() {
            this.messageError('Произошла ошибка при копировании');
        },
    },
    template: `<v-btn
        v-clipboard:copy="copyText"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="u-text-small"
        v-bind="$props"
        @click.stop
    >
        <slot />
    </v-btn>`,
};
