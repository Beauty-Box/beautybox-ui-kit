import { Product } from '@beautybox/core/entity/Market/Products';

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

const productsAddToCartMixin = {
    methods: {
        addToCart(productID) {
            const formData = new FormData();
            formData.append('productID', productID);
            formData.append('quantity', 1);
            Product.addToCart(formData);

            this.$set(this.itemsInCart, productID, 1);
        },
        removeFromCart(productID) {
            const formData = new FormData();
            formData.append('productID', productID);
            Product.removeFromCart(formData);

            this.$set(this.itemsInCart, productID, 0);
        },
    },
};

export { productsFavoriteMixin, productsAddToCartMixin };
export default { productsFavoriteMixin, productsAddToCartMixin };
