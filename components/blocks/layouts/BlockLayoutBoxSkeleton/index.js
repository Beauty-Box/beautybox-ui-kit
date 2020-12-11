import './BlockLayoutBoxSkeleton.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import VSkeletonLoader from 'vuetify/lib/components/VSkeletonLoader';

export default {
    name: 'BBlockLayoutBoxSkeleton',
    components: { VBtn, VSkeletonLoader },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        hideHeader: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        titleIsSmall: {
            type: Boolean,
            default: false,
        },
        hideTitle: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            default: '',
        },
        btnText: {
            type: String,
            default: '',
        },
        btnIsVisible: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        titleIsVisible() {
            if (this.hideTitle) {
                return !!this.$vuetify.breakpoint.mobile;
            } else {
                return true;
            }
        },
    },
    render(h) {
        const renderSkeleton = (type = '') => h('v-skeleton-loader', { props: { type } });
        let children = [];
        let headerBtn = [];
        let title = [];

        if (this.title && this.titleIsVisible) {
            title.push(h('h3', { class: { 'small-title': this.titleIsSmall } }, this.title));

            if (this.description && !this.$slots.description) {
                title.push(h('p', { class: { 'mb-0': true } }, this.description));
            }

            if (this.$slots.description) {
                title.push(this.$slots.description);
            }
        }

        if (this.btnText && this.btnIsVisible) {
            headerBtn.push(
                h(
                    'v-btn',
                    {
                        class: {
                            'u-text-initial font-weight-medium ml-auto': true,
                        },
                        props: {
                            depressed: true,
                            color: 'muted',
                            ripple: false,
                            small: this.$vuetify.breakpoint.xs,
                        },
                        on: {
                            ...this.$listeners,
                            click: () => this.$emit('click:header-btn'),
                        },
                    },
                    this.btnText
                )
            );
        }

        if (this.loading) {
            children.push(
                h('div', { class: { 'c-box__header': true } }, [renderSkeleton('heading')]),
                h('div', { class: { 'c-box__body': true } }, [renderSkeleton('list-item')])
            );
        } else {
            if (!this.hideHeader) {
                if ((this.title && this.titleIsVisible) || (this.btnText && this.btnIsVisible)) {
                    children.push(
                        h(
                            'div',
                            {
                                class: {
                                    'c-box__header': true,
                                },
                            },
                            [h('div', title), headerBtn]
                        )
                    );
                }
            }

            if (this.$slots.default) {
                children.push(h('div', { class: { 'c-box__body': true } }, this.$slots.default));
            }
        }

        return h(
            'div',
            {
                class: {
                    'c-box': true,
                    'is-loading': this.loading,
                },
            },
            children
        );
    },
};
