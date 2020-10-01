import './style.scss';

import VIcon from 'vuetify/lib/components/VIcon';
import VSpacer from 'vuetify/lib/components/VGrid/VSpacer';

export default {
    name: 'BtnWide',
    components: { VIcon, VSpacer },
    props: {
        text: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'button',
        },
        icon: {
            type: String,
            default: 'add_circle',
        },
        iconColor: {
            type: String,
            default: 'primary',
        },
        iconSize: {
            type: [String, Number],
            default: 28,
        },
        iconSvg: {
            type: String,
            default: 'plus--filled',
        },
    },
    template: `<button class="btn-wide" :type="type" v-on="$listeners">
    <!--<v-svg v-if="iconSvg" :name="iconSvg" />-->
    <v-icon :size="iconSize" :color="iconColor" style="margin-right: 12px;">{{ icon }}</v-icon>
    <v-spacer v-if="!text" />
    {{ text }}
</button>`,
};
