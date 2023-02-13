import { VAvatar } from 'vuetify/lib';

export const imageMixin = {
    components: { VAvatar },
    props: {
        size: {
            type: [Number, String],
            default: 60,
        },
        color: {
            type: String,
            default: 'grey lighten-4',
        },
        letterColor: {
            type: String,
            default: 'primary',
        },
        square: {
            type: Boolean,
            default: false,
        },
        shadow: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            default: null,
        },
        emptyTwoLetters: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        error: false,
    }),
    computed: {
        /**
         * Если image это base64 строка, то возвращается эта строка без изменений,
         * если это ссылка на изображение, то к ней дописывается hash, иначе придет
         * старое изображение из кеша
         */
        hashedAvatar() {
            if (!this.image.startsWith('http')) {
                return this.image;
            } else {
                return `${this.image}?hash=${Math.random().toString(16)}`;
            }
        },

        initials() {
            let letters = '';
            if (!!this.name) {
                letters = this.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('');

                if (this.emptyTwoLetters && letters.length > 1) {
                    return letters;
                } else {
                    return letters[0];
                }
            }
            return letters;
        },
    },
};
