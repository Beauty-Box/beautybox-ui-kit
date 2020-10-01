import './style.scss';

import VAvatar from 'vuetify/lib/components/VAvatar';

export default {
    name: 'ImageSalonAvatar',
    components: { VAvatar },
    props: {
        square: {
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
        color: {
            type: String,
            default: 'grey lighten-4',
        },
        size: {
            type: [Number, String],
            default: null,
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
    },
    template: `<v-avatar :size="size" :color="color" class="c-avatar c-avatar--square" v-on="$listeners">
    <img
        v-if="image && !error"
        :src="hashedAvatar"
        alt="avatar"
        class="c-avatar__img"
        @error="error = true"
    />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" class="c-avatar__icon-empty">
        <rect fill="#f4f5f6" width="44" height="44" />
        <path
            fill="#67768c"
            d="M19.25,31.25V26a.76.76,0,0,1,.75-.75h4a.76.76,0,0,1,.75.75v5.25h4.5V23a.75.75,0,0,1,1.5,0v9a.76.76,0,0,1-.75.75H14a.76.76,0,0,1-.75-.75V23a.75.75,0,0,1,1.5,0v8.25Zm1.5,0h2.5v-4.5h-2.5Zm-1.42-10.5a3.75,3.75,0,0,1-2.67-1.12A3.74,3.74,0,0,1,10.25,17a.7.7,0,0,1,.11-.38l3-5a.74.74,0,0,1,.64-.37H30a.75.75,0,0,1,.64.36l3,5a.77.77,0,0,1,.11.39,3.75,3.75,0,0,1-6.42,2.63,3.73,3.73,0,0,1-5.27.06L22,19.63A3.75,3.75,0,0,1,19.33,20.75Zm-4.91-8L11.76,17.2A2.24,2.24,0,0,0,16,18a.76.76,0,0,1,1-.34.77.77,0,0,1,.33.34,2.22,2.22,0,0,0,4,0,.76.76,0,0,1,1-.34.86.86,0,0,1,.34.34,2.22,2.22,0,0,0,4,0,.74.74,0,0,1,1-.33A.73.73,0,0,1,28,18a2.24,2.24,0,0,0,4.23-.81l-2.67-4.45Z"
        />
    </svg>
</v-avatar>`,
};
