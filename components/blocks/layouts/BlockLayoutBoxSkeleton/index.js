import './BlockLayoutBoxSkeleton.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';
import VSkeletonLoader from 'vuetify/lib/components/VSkeletonLoader';
const VSvg = () => import(/* webpackChunkName: "icon-svg" */ '../../../icons/Svg');

export default {
    name: 'BBlockLayoutBoxSkeleton',
    components: { VBtn, VIcon, VSvg, VSkeletonLoader },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        tag: {
            type: String,
            default: 'div',
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
        backBtn: {
            type: Boolean,
            default: false,
        },
        headerBtnHideShadow: {
            type: Boolean,
            default: false,
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
        let headerBtnBack = [];
        let title = [];

        if (this.title && this.titleIsVisible && !this.hideHeader) {
            title.push(h('h3', { class: { 'small-title': this.titleIsSmall } }, this.title));

            if (this.description && !this.$slots.description) {
                title.push(h('p', { class: { 'mb-0': true } }, this.description));
            }

            if (this.$slots.description) {
                title.push(this.$slots.description);
            }
        }

        if (this.backBtn && !this.hideHeader) {
            headerBtnBack.push(
                h(
                    'v-btn',
                    {
                        class: {
                            'c-box__btn-back': true,
                        },
                        attrs: {
                            title: 'Назад',
                        },
                        props: {
                            depressed: true,
                            ripple: false,
                            icon: true,
                            width: 44,
                            minWidth: 44,
                            height: 44,
                        },
                        on: {
                            ...this.$listeners,
                            click: () => this.$emit('click:back'),
                        },
                    },
                    // [h('v-icon', {}, 'west')]
                    [h('v-svg', { props: { name: 'arrow-long--left', sm: true } })]
                )
            );
        }

        if (this.btnIsVisible) {
            if (!!this.$slots.headerBtn) {
                headerBtn.push(
                    h('div', { class: { 'c-box__btn-container': true } }, this.$slots.headerBtn)
                );
            } else if (!!this.btnText) {
                headerBtn.push(
                    h(
                        'v-btn',
                        {
                            class: {
                                'u-text-initial font-weight-medium ml-auto': true,
                                'elevation-0': this.headerBtnHideShadow,
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
                                    'justify-start': this.backBtn,
                                    'align-center': this.headerBtnHideShadow,
                                },
                            },
                            [
                                headerBtnBack,
                                h(
                                    'div',
                                    {
                                        class: {
                                            'flex-column align-start':
                                                this.$slots.description || this.description.length,
                                        },
                                    },
                                    title
                                ),
                                headerBtn,
                            ]
                        )
                    );
                }
            }

            if (this.$slots.default) {
                children.push(h('div', { class: { 'c-box__body': true } }, this.$slots.default));
            }
        }

        return h(
            this.tag,
            {
                class: {
                    'c-box': true,
                    'is-loading': this.loading,
                },
                on: this.$listeners,
            },
            children
        );
    },
};
