<template>
    <v-avatar
        :size="size"
        :color="color"
        class="c-avatar"
        :class="{ 'c-avatar--square': square, 'c-avatar--shadow': shadow }"
        v-on="$listeners"
    >
        <img
            v-if="image && !error"
            :src="hashedAvatar"
            alt="avatar"
            class="c-avatar__img"
            @error="error = true"
        />
        <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            class="c-avatar__icon-empty"
        >
            <g transform="translate(-1645 -269)">
                <rect width="44" height="44" transform="translate(1645 269)" fill="#f4f5f6" />
                <g transform="translate(181 69)">
                    <rect width="24" height="24" transform="translate(1474 210)" fill="none" />
                    <path
                        id="Безымянный-1"
                        d="M392.225,262.337a.611.611,0,0,0-.611.611v9.244h-5.1V266.97a.611.611,0,0,0-.611-.611H381.48a.611.611,0,0,0-.611.611v5.222h-5.1V262.65a.611.611,0,1,0-1.223,0V272.8a.611.611,0,0,0,.611.611H392.22a.611.611,0,0,0,.611-.611v-9.856a.611.611,0,0,0-.611-.611Zm-10.132,5.245h3.2v4.611h-3.2Zm13.092-12.544-2.4-4.138a.611.611,0,0,0-.529-.305H375.2a.611.611,0,0,0-.526.3l-2.463,4.158a3.591,3.591,0,0,0,.538,4.386c1.67,1.608,3.957.723,5.256-.176a4.047,4.047,0,0,0,2.769,1.17h.008a4.747,4.747,0,0,0,2.9-1.148,4.416,4.416,0,0,0,2.892,1.174h.124a4.683,4.683,0,0,0,2.818-1.174c2.573,1.774,4.221,1.067,5.163.122a3.617,3.617,0,0,0,.507-4.37Zm-1.37,3.5c-.351.351-1.418,1.423-3.979-.538a.611.611,0,0,0-.832.081,3.689,3.689,0,0,1-2.355,1.149,3.484,3.484,0,0,1-2.531-1.213.611.611,0,0,0-.435-.18h-.012a.614.614,0,0,0-.439.2,3.844,3.844,0,0,1-2.461,1.17h0a3.1,3.1,0,0,1-2.262-1.171.611.611,0,0,0-.845-.054c-.024.021-2.507,2.075-4.069.572a2.359,2.359,0,0,1-.335-2.882l2.286-3.858h16.361l2.219,3.833A2.394,2.394,0,0,1,393.815,258.538Z"
                        transform="translate(1102.303 -39.994)"
                        fill="#67768c"
                    />
                </g>
            </g>
        </svg>
    </v-avatar>
</template>

<script>
import { imageMixin } from '../image/image.mixin';

export default {
    name: 'ImageSalonAvatar',
    mixins: [imageMixin],
};
</script>

<style lang="scss" src="./style.scss" />
