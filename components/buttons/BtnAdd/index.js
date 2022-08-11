import './BtnAdd.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import { VFabTransition } from 'vuetify/lib/components/transitions';
import BSvg from '../../icons/Svg';

export default {
    name: 'BBtnAdd',
    components: { VBtn, BSvg, VFabTransition },
    props: {
        ...VBtn.options.props,
        fab: {
            ...VBtn.options.fab,
            default: true,
        },
        dark: {
            ...VBtn.options.dark,
            default: true,
        },
        fixed: {
            ...VBtn.options.fixed,
            default: true,
        },
        right: {
            ...VBtn.options.right,
            default: true,
        },
        ripple: {
            ...VBtn.options.ripple,
            default: false,
        },
        bottom: {
            ...VBtn.options.bottom,
            default: true,
        },
        transition: {
            ...VBtn.options.transition,
            default: () => 'slide-y-reverse-transition',
        },
        to: {
            type: Object,
            default: null,
        },
        forever: {
            type: Boolean,
            default: false,
        },
        color: {
            ...VBtn.options.color,
            default: 'primary',
        },
        outlined: {
            ...VBtn.options.outlined,
            default: false,
        },
        depressed: {
            ...VBtn.options.depressed,
            default: false,
        },
        plain: {
            ...VBtn.options.plain,
            default: false,
        },
    },
    render(h) {
        //if (this.$vuetify.breakpoint.mobile) {
        return h('v-fab-transition', {}, [
            h(
                'v-btn',
                {
                    class: {
                        'c-btn-add': true,
                    },
                    props: {
                        transition: this.transition,
                        fab: this.fab,
                        dark: this.dark,
                        fixed: this.fixed,
                        right: this.right,
                        bottom: this.bottom,
                        color: this.color,
                        ripple: this.ripple,
                        to: this.to,
                        forever: this.forever,
                        outlined: this.outlined,
                        depressed: this.depressed,
                        plain: this.plain,
                    },
                    on: this.$listeners,
                },
                [
                    this.$slots.default,
                    h('b-svg', {
                        props: {
                            name: 'plus--bold',
                            fill: this.outlined ? this.color : '',
                        },
                    }),
                ]
            ),
        ]);
        // }
    },
};
