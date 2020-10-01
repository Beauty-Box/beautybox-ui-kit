import './style.scss';

import { modalProps } from '@ui-kit/mixins/modalProps';

import VNavigationDrawer from 'vuetify/lib/components/VNavigationDrawer';
import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';

export default {
    name: 'WSideDrawer',
    components: { VNavigationDrawer, VBtn, VIcon },
    mixins: [modalProps],
    props: {
        title: {
            type: String,
            default: '',
        },
        withOutFooter: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onReset(e) {
            this.modal = false;
            this.$emit('reset', e);
        },
    },
    template: `  <v-navigation-drawer
    v-model="modal"
    fixed
    right
    touchless
    temporary
    tag="form"
    overlay-opacity="1"
    overlay-color="rgba(103, 118, 140, 0.5)"
    :width="$vuetify.breakpoint.xsOnly ? '100%' : '375px'"
    @submit.prevent.native="$emit('submit', $event)"
    @reset.prevent.native="$emit('reset', $event)"
>
    <template #prepend>
        <header class="flex-grow-1 py-2 px-4">
            <h2>{{ title }}</h2>
        </header>

        <v-btn icon type="button" @click.stop="modal = false">
            <v-icon color="primary" class="_hide-before">close</v-icon>
        </v-btn>

        <slot name="header" />
    </template>
    <template>
        <slot name="body" />
    </template>
    <template v-if="!withOutFooter" #append>
        <slot v-if="$slots.footer" name="footer" />
        <template v-else>
            <v-btn type="reset" color="white" large @click="modal = false">
                Отменить
            </v-btn>
            <v-btn type="submit" color="primary" large>
                Сохранить
            </v-btn>
        </template>
    </template>
</v-navigation-drawer>`,
};
