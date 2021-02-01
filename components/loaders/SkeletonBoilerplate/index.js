import { VSkeletonLoader } from 'vuetify/lib';

export default {
    name: 'app-skeleton-boilerplate',
    functional: true,

    render(h, { data, props, children }) {
        return h(
            VSkeletonLoader,
            {
                ...data,
                props: {
                    boilerplate: true,
                    elevation: 0,
                    ...props,
                },
            },
            children
        );
    },
};
