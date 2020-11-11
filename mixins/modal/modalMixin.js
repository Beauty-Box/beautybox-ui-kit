const modalMixin = {
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        back: {
            type: [String, Number],
            default: '',
        },
        transition: {
            type: [Boolean, String],
            default: false,
        },
    },
    methods: {
        redirect() {
            if (this.$route.query.from) {
                this.$router.replace({ path: this.$route.query.from });
            } else {
                if (window.history.length > 2 && !this.back) {
                    this.$router.go(-1);
                } else if (typeof this.back === 'number') {
                    this.$router.go(-this.back);
                } else {
                    this.$router.replace({
                        name: this.back ? this.back : this.$route.meta.back,
                        query: this.$route.query,
                    });
                }
            }
        },
        submit(e) {
            this.$emit('submit', e);
        },
        onScroll(e) {
            this.toggleVisibleHeaderOnScroll(e);
        },
        toggleVisibleHeaderOnScroll(e) {
            if (this.$refs.header && this.$refs.contentTitle) {
                let header, headerHeight, contentTitleHeight;

                if (!header || !contentTitleHeight) {
                    header = this.$refs.header;
                    headerHeight = header.clientHeight;
                    contentTitleHeight = this.$refs.contentTitle.clientHeight;
                }

                if (e.target.scrollTop >= contentTitleHeight - headerHeight - 15) {
                    header.classList.add('is-visible');
                } else {
                    header.classList.remove('is-visible');
                }
            }
        },
    },
};

export { modalMixin };
export default modalMixin;
