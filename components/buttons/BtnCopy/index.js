import VBtn from 'vuetify/lib/components/VBtn';

export default {
    name: 'BBtnCopy',
    components: { VBtn },
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
            console.log('copied');
            // this.messageSuccess('Ссылка скопирована');
        },
        onError() {
            console.log('error');
            // this.messageError('Произошла ошибка при копировании');
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
                    // click: (e) => e.preventDefault(),
                },
                directives: [
                    {
                        name: 'clipboard',
                        arg: 'copy',
                        value: this.copyText,
                    },
                    {
                        name: 'clipboard',
                        arg: 'success',
                        value: this.onCopy,
                    },
                    {
                        name: 'clipboard',
                        arg: 'error',
                        value: this.onError,
                    },
                ],
            },
            this.$slots.default
        );
    },
};
