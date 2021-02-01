const infoLinkItemMixin = {
    data: () => ({
        loading: true,
        expect: false,
        count: null,
    }),
    async mounted() {
        await this.getData();
        setTimeout(() => (this.loading = false), 1000);
    },
    methods: {
        getData() {
            console.error('--- infoLinkItemMixin');
            throw 'getData in infoLinkItemMixin  is not defined';
        },
    },
};

export { infoLinkItemMixin };
export default { infoLinkItemMixin };
