const productsFavoriteMixin = {
    data: () => ({
        favoritesProductsId: [],
    }),
    created() {
        this.$bus.$on('update:favorite-ids', this.updateFavoriteIds);
    },
    beforeDestroy() {
        this.$bus.$off('update:favorite-ids', this.updateFavoriteIds);
    },
    methods: {
        updateFavoriteIds(id) {
            const index = this.favoritesProductsId.findIndex((f) => f === id);
            if (index !== -1) {
                this.favoritesProductsId.splice(index, 1);
            } else {
                this.favoritesProductsId.push(id);
            }
        },
    },
};

export { productsFavoriteMixin };
export default { productsFavoriteMixin };
