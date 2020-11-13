const EmptyLayout = () =>
    import(/* webpackChunkName: "EmptyLayout" */ '../layouts/EmptyLayout');
const ErrorLayout = () =>
    import(/* webpackChunkName: "ErrorLayout" */ '../layouts/ErrorLayout');
const Forbidden = () =>
    import(/* webpackChunkName: "Forbidden" */ '../components/pages/Errors/Forbidden');
const NotFound = () =>
    import(/* webpackChunkName: "NotFound" */ '../components/pages/Errors/NotFound');
const ServerError = () =>
    import(/* webpackChunkName: "ServerError" */ '../components/pages/Errors/ServerError');
const BadRequest = () =>
    import(/* webpackChunkName: "BadRequest" */ '../components/pages/Errors/BadRequest');
const UnknownError = () =>
    import(
        /* webpackChunkName: "UnknownError" */ '../components/pages/Errors/UnknownError'
    );

import { mapGetters } from 'vuex';


const app = {
    components: {
        EmptyLayout,
        ErrorLayout,
        Forbidden,
        NotFound,
        ServerError,
        BadRequest,
        UnknownError,
    },
    computed: {
        ...mapGetters(['ERROR', 'TYPE']),
        layout() {
            if (this.ERROR) {
                return this.TYPE;
            } else {
                return (this.$route.meta.layout || 'empty') + '-layout';
            }
        },
    },
};

export { app };
export default app;
