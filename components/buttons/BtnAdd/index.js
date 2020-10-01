import './style.scss';

import VBtn from 'vuetify/lib/components/VBtn';
import { VFabTransition } from 'vuetify/lib/components/transitions';
import VSvg from '@ui-kit/components/icons/Svg';

export default {
    name: 'BtnAdd',
    components: { VBtn, VSvg, VFabTransition },
    props: {
        ...VBtn.options.props,
        transition: {
            ...VBtn.options.transition,
            default: () => 'slide-y-reverse-transition',
        },
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
        bottom: {
            ...VBtn.options.bottom,
            default: true,
        },
        color: {
            ...VBtn.options.color,
            default: 'primary',
        },
        ripple: {
            ...VBtn.options.ripple,
            default: false,
        },
        to: {
            type: Object,
            default: null,
        },
        forever: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes: () => ({ ...VBtn.options.computed.classes.call(this), 'btn-add': true }),
    },
    template: `<v-fab-transition v-if="$vuetify.breakpoint.mdAndDown || forever">
    <v-btn
        v-bind="{...$props, ...$attrs}"
        v-on="$listeners"
    >
        <slot>
            <v-svg name="plus--bold" />
        </slot>
        <!-- <img src="/assets/temp/colpac.svg" class="icon-colpac" alt="happy new year" />-->
    </v-btn>
</v-fab-transition>`,
};
