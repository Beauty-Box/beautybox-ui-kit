<template>
    <v-btn
        icon
        width="40"
        height="40"
        class="c-btn-favorite u-hide-before"
        :class="{ 'is-active': isActive }"
        title="Добавить в избранное"
        :ripple="false"
        @click.stop="onToggleFavorite(id)"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="25.5" height="23.5" viewBox="0 0 25.5 23.5">
            <path
                d="M17.75,21.333c-2.662,0-4.861,2.473-5.75,3.64-.889-1.167-3.088-3.64-5.75-3.64C2.8,21.333,0,24.5,0,28.4a7.377,7.377,0,0,0,2.319,5.459.494.494,0,0,0,.079.1l9.249,9.23a.5.5,0,0,0,.707,0l9.557-9.553.1-.1c.078-.074.155-.148.242-.244a.486.486,0,0,0,.089-.119A7.549,7.549,0,0,0,24,28.4C24,24.5,21.2,21.333,17.75,21.333Z"
                transform="translate(0.75 -20.583)"
                stroke="#fff"
                stroke-width="1.5"
            />
        </svg>
    </v-btn>
</template>

<script>
export default {
    name: 'BBtnAddToFavorites',
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        id: {
            type: [Number, String],
            default: null,
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
        async addToFavorite(id) {
            console.log('---addToFavorite', id);
            await this.$fetch.post('/favorites', { addressID: id });
            this.isActive = true;
            this.messageSuccess('Добавлено в избранное');
        },
        async removeFromFavorite(id) {
            await this.$fetch.delete('/favorites/' + id);
            this.isActive = false;
            this.messageSuccess('Удалено из избранного');
        },
        onToggleFavorite(id) {
            if (this.isActive) {
                this.removeFromFavorite(id);
            } else {
                this.addToFavorite(id);
            }
            this.isActive = !this.isActive;
        },
    },
};
</script>

<style lang="scss" scoped>
.c-btn-favorite {
    fill: rgba(16, 25, 40, 0.5);

    &.is-active {
        fill: $color-error;

        svg {
            animation: 500ms ease-in-out 0s 1 normal none running addToFav;
        }
    }
}
@keyframes addToFav {
    0% {
        transform: scale(1);
    }
    25% {
        transform: scale(1.3);
    }
    50% {
        transform: scale(1);
    }
    75% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
}
</style>
