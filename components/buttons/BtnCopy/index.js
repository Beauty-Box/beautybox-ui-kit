import VueClipboard from 'vue-clipboard2';
import VBtn from 'vuetify/lib/components/VBtn';

export default {
    name: 'BBtnCopy',
    components: { VBtn },
    // directives: { VueClipboard },
    props: {
        ...VBtn.options.props,
        copyText: {
            type: String,
            required: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
        large: {
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
            default: false,
        },
        color: {
            type: String,
            default: 'primary',
        },
        type: {
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
    /*template: `<v-btn
                            v-clipboard:copy="copyText"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            v-bind="$props"
                            @click.stop
                        >
                            <slot />
                        </v-btn>`,*/
    render(h) {
        return h(
            'v-btn',
            {
                props: {
                    ...this.$props,
                },
                attrs: {
                    ...this.$attrs,
                    type: this.type,
                },
                on: {
                    ...this.$listeners,
                    click: (e) => e.preventDefault(),
                },
                directives: [
                    {
                        name: 'v-clipboard',
                        arg: 'copy',
                        value: this.copyText,
                    },
                    {
                        name: 'v-clipboard',
                        arg: 'success',
                        value: this.onCopy,
                    },
                    {
                        name: 'v-clipboard',
                        arg: 'error',
                        value: this.onError,
                    },
                ],
            },
            this.$slots.default
        );
    },
};
