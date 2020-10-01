import './style.scss';

import VAvatar from 'vuetify/lib/components/VAvatar';

export default {
    name: 'ImageUserAvatar',
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
        imgType: {
            type: String,
            default: 'user',
        },
        size: {
            type: [Number, String],
            default: 60,
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
    template: `<v-avatar
    :size="size"
    :color="color"
    class="c-avatar"
    :class="{ 'c-avatar--square': square }"
    v-on="$listeners"
>
    <img
        v-if="image && !error"
        :src="hashedAvatar"
        alt="avatar"
        class="c-avatar__img"
        @error="error = true"
    />
    <span v-else-if="name" class="c-avatar__letter" :style="{ '--size': size + 'rem' }">
        {{ name[0] }}
    </span>
    <template v-else>
        <svg v-if="imgType === 'salon'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
            <g>
                <rect fill="#f4f5f6" width="44" height="44" />
                <path
                    id="salon"
                    fill="#67768c"
                    d="M19.25,31.25V26a.76.76,0,0,1,.75-.75h4a.76.76,0,0,1,.75.75v5.25h4.5V23a.75.75,0,0,1,1.5,0v9a.76.76,0,0,1-.75.75H14a.76.76,0,0,1-.75-.75V23a.75.75,0,0,1,1.5,0v8.25Zm1.5,0h2.5v-4.5h-2.5Zm-1.42-10.5a3.75,3.75,0,0,1-2.67-1.12A3.74,3.74,0,0,1,10.25,17a.7.7,0,0,1,.11-.38l3-5a.74.74,0,0,1,.64-.37H30a.75.75,0,0,1,.64.36l3,5a.77.77,0,0,1,.11.39,3.75,3.75,0,0,1-6.42,2.63,3.73,3.73,0,0,1-5.27.06L22,19.63A3.75,3.75,0,0,1,19.33,20.75Zm-4.91-8L11.76,17.2A2.24,2.24,0,0,0,16,18a.76.76,0,0,1,1-.34.77.77,0,0,1,.33.34,2.22,2.22,0,0,0,4,0,.76.76,0,0,1,1-.34.86.86,0,0,1,.34.34,2.22,2.22,0,0,0,4,0,.74.74,0,0,1,1-.33A.73.73,0,0,1,28,18a2.24,2.24,0,0,0,4.23-.81l-2.67-4.45Z"
                />
            </g>
        </svg>
        <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 180.156 180"
            class="c-avatar__icon-empty"
        >
            <rect width="180" height="180" fill="#dee3e7" />
            <path
                fill="#fff"
                d="M180.1,180H.175c-1.852-55.63,43.518-52.963,66.3-66.3,6.351-3.718,7.053-13.828,3.259-19.26C55.448,74,54.026,62.148,55.8,44.667c2.908-28.594,31.408-29.926,31.408-29.926h5.852s28.5,1.332,31.407,29.926c1.778,17.481.356,29.333-13.925,49.777-3.8,5.432-3.093,15.542,3.259,19.26C136.582,127.037,181.953,124.37,180.1,180Z"
            />
        </svg>
    </template>
</v-avatar>`,
};
