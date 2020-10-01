import './style.scss';

import { modalProps } from '@ui-kit/mixins/modalProps';

import VNavigationDrawer from 'vuetify/lib/components/VNavigationDrawer';
import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';

export default {
    name: 'FilterMobile',
    mixins: [modalProps],
    components: { VNavigationDrawer, VBtn, VIcon },
    props: {
        withOutFooter: {
            type: Boolean,
            default: false,
        },
    },
    template: ` <v-navigation-drawer
    v-if="$vuetify.breakpoint.mdAndDown"
    v-model="modal"
    fixed
    right
    touchless
    tag="form"
    width="320"
    overlay-opacity="1"
    overlay-color="rgba(103, 118, 140, 0.5)"
    @submit.prevent.native="$emit('submit', $event)"
    @reset.prevent.native="$emit('reset', $event)"
>
    <template #prepend>
        <header class="flex-grow-1 py-2 px-4">
            <h2>Фильтр</h2>
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
            <v-btn type="reset" color="white" large>
                Отменить
            </v-btn>
            <v-btn type="submit" color="primary" large>
                Сохранить
            </v-btn>
        </template>
    </template>
</v-navigation-drawer>`,
};
