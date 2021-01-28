const updateRouteMixin = {
    methods: {
        updateRoute(e) {
            const query = { ...this.$route.query };

            if (Array.isArray(e)) {
                e.forEach((param) => {
                    query[param.name] = param.value;
                });
            } else {
                query[e.name] = e.value;
            }

            this.replaceToQuery(query);
        },
    },
};

export { updateRouteMixin };
export default { updateRouteMixin };
