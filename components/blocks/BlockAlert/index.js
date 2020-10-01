import './style.scss';

import { VAlert } from 'vuetify/lib';

export default {
    name: 'BlockAlert',
    components: { VAlert },
    props: {
        color: {
            type: String,
            default: '#E8F6FF',
        },
        shadow: {
            type: String,
            default: '#2b72bd33',
        },
        icon: {
            type: String,
            default: 'info',
        },
        iconColor: {
            type: String,
            default: '#2B72BD',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        dismissible: {
            type: Boolean,
            default: true,
        },
    },
    template: ` <v-alert
    :icon="icon"
    :color="color"
    transition="slide-y-transition"
    :dismissible="dismissible"
    :style="{
        '--shadow': shadow,
        '--icon-color': iconColor,
    }"
>
    <h3 class="title">{{ title }}</h3>
    <p v-if="!$slots.description" class="description">{{ description }}</p>

    <slot name="description" />
</v-alert>`,
};
