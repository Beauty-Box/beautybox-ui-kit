import './BtnAddToFavorites.scss';
import VBtn from 'vuetify/lib/components/VBtn';

const icon = `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25.5"
                            height="23.5"
                            viewBox="0 0 25.5 23.5"
                        >
                            <path
                                d="M17.75,21.333c-2.662,0-4.861,2.473-5.75,3.64-.889-1.167-3.088-3.64-5.75-3.64C2.8,21.333,0,24.5,0,28.4a7.377,7.377,0,0,0,2.319,5.459.494.494,0,0,0,.079.1l9.249,9.23a.5.5,0,0,0,.707,0l9.557-9.553.1-.1c.078-.074.155-.148.242-.244a.486.486,0,0,0,.089-.119A7.549,7.549,0,0,0,24,28.4C24,24.5,21.2,21.333,17.75,21.333Z"
                                transform="translate(0.75 -20.583)"
                                stroke="#fff"
                                stroke-width="1.5"
                            />
                        </svg>`;

export default {
    name: 'BBtnAdd',
    components: { VBtn },
    props: {
        ...VBtn.options.props,
        active: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            default: 'Добавить в избранное',
        },
        icon: {
            type: Boolean,
            default: true,
        },
        width: {
            type: [String, Number],
            default: '40',
        },
        height: {
            type: [String, Number],
            default: '40',
        },
        ripple: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isActive: {
            get() {
                return this.active;
            },
            set(value) {
                this.$emit('update:active', value);
            },
        },
    },
    methods: {
        addToFavorite() {
            this.$emit('add');
            this.isActive = true;
            this.messageSuccess('Добавлено в избранное');
        },
        removeFromFavorite() {
            this.$emit('remove');
            this.isActive = false;
            this.messageSuccess('Удалено из избранного');
        },
        onToggleFavorite() {
            if (this.isActive) {
                this.removeFromFavorite();
            } else {
                this.addToFavorite();
            }
        },
    },
    render(h) {
        return h('v-btn', {
            props: {
                ...this.$props,
                active: this.active,
                icon: this.icon,
                width: this.width,
                height: this.height,
                ripple: this.ripple,
            },
            attrs: {
                title: this.title,
            },
            domProps: {
                innerHTML: icon,
            },
            class: {
                'u-hide-before c-btn-favorite': true,
                'c-btn-favorite--active': this.isActive,
            },
            on: {
                ...this.$listeners,
                click: () => this.onToggleFavorite(),
                // 'update:active': ($event) => {
                //     console.log('--- update:active', $event);
                //     this.active = $event;
                // },
            },
        });
    },
};
