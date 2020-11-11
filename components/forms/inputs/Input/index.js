import VTextField from 'vuetify/lib/components/VTextField';
import '../style/input.scss';

export default {
    name: 'FInput',
    inheritAttrs: false,
    extends: VTextField,
    props: {
        ...VTextField.options.props,
        color: {
            ...VTextField.options.props.color,
            default() {
                return this.$vuetify.breakpoint.mobile ? 'info' : 'secondary';
            },
        },
        height: {
            ...VTextField.options.props.height,
            default: 56,
        },
        outlined: {
            ...VTextField.options.props.outlined,
            default: true,
        },
        hint: {
            ...VTextField.options.props.hint,
            default: '',
        },
        maxlength: {
            type: [Number, String],
            default: 'auto',
        },
        autocomplete: {
            type: String,
            default: 'off',
        },
        autofocus: {
            ...VTextField.options.props.autofocus,
            default: false,
        },
    },
    computed: {
        classes() {
            return {
                ...VTextField.options.computed.classes.call(this),
                'c-input': true,
                'c-input--small': this.small,
                'c-input--price': this.currency,
                'c-input--clearable': this.clearable,
                'placeholder-is-visible': this.placeholder && !this.label,
            };
        },
    },
    methods: {
        ...VTextField.options.methods,
        genInput() {
            const listeners = Object.assign({}, this.listeners$);
            delete listeners['change']; // Change should not be bound externally

            return this.$createElement('input', {
                style: {},
                domProps: {
                    value:
                        this.type === 'number' && Object.is(this.lazyValue, -0)
                            ? '-0'
                            : this.lazyValue,
                },
                attrs: {
                    ...this.attrs$,
                    autofocus: this.autofocus,
                    disabled: this.isDisabled,
                    id: this.computedId,
                    placeholder: this.placeholder,
                    readonly: this.isReadonly,
                    type: this.type,
                    autocomplete: this.autocomplete,
                },
                on: Object.assign(listeners, {
                    blur: this.onBlur,
                    input: this.onInput,
                    focus: this.onFocus,
                    keydown: this.onKeyDown,
                }),
                ref: 'input',
                directives: [
                    {
                        name: 'resize',
                        modifiers: {
                            quiet: true,
                        },
                        value: this.onResize,
                    },
                ],
            });
        },
    },
};
