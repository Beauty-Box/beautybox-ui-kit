import BInput from '../Input';

export default {
    name: 'InputPassword',
    components: {
        BInput,
    },
    props: {
        name: {
            type: String,
            default: 'password',
        },
        label: {
            type: String,
            default: 'Пароль',
        },
    },
    render(h) {
        return h('b-input', {
            attrs: this.customProps,
            on: {
                ...this.$listeners,
                'click:append': () => (this.hidePassword = !this.hidePassword),
            },
        });
    },
    data() {
        return {
            hidePassword: true,
        };
    },
    computed: {
        icon() {
            return this.hidePassword ? 'visibility' : 'visibility_off';
        },
        inputType() {
            return this.hidePassword ? 'password' : 'text';
        },
        customProps() {
            return {
                ...this.$attrs,
                name: this.name,
                label: this.label,
                appendIcon: this.icon,
                type: this.inputType,
            };
        },
    },
};
