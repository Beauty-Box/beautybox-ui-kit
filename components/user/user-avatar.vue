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
        <span v-else-if="name" class="c-avatar__letter" :style="{ '--size': size + 'rem' }">
            {{ name[0] }}
        </span>
        <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 180 180"
            class="c-avatar__icon-empty"
            :width="size"
            :height="size"
        >
            <rect width="180" height="180" fill="#dee3e7" />
            <path
                fill="#fff"
                d="M180.1,180H.175c-1.852-55.63,43.518-52.963,66.3-66.3,6.351-3.718,7.053-13.828,3.259-19.26C55.448,74,54.026,62.148,55.8,44.667c2.908-28.594,31.408-29.926,31.408-29.926h5.852s28.5,1.332,31.407,29.926c1.778,17.481.356,29.333-13.925,49.777-3.8,5.432-3.093,15.542,3.259,19.26C136.582,127.037,181.953,124.37,180.1,180Z"
            />
        </svg>
    </v-avatar>
</template>

<script>
import { userAvatarMixin } from './user.mixin';

export default {
    name: 'user-avatar',
    mixins: [userAvatarMixin],
};
</script>

<style lang="scss" scoped>
.c-avatar {
    &__letter {
        margin: auto;
        font-size: calc(var(--size, 75rem) / 30);
        font-weight: 600;
    }

    &--square {
        border-radius: 8px;
    }

    &--shadow {
        box-shadow: $box-shadow-base;
    }
}
</style>
