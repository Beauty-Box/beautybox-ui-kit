import '@ui-kit/components/lists/items/style.scss';

import userAvatarMixin from '@beautybox/ui-kit/components/lists/items/mixin.js';

import { VCheckbox } from 'vuetify/lib/components/VCheckbox';

import {
    VListItem,
    VListItemAction,
    VListItemTitle,
    VListItemContent,
} from 'vuetify/lib/components/VList';

export default {
    name: 'ListItemCheck',
    mixins: [userAvatarMixin],
    components: { VListItem, VCheckbox, VListItemAction, VListItemTitle, VListItemContent },
    template: `<v-list-item
    :value="item[idName]"
    inactive
    :ripple="false"
    class="list-item"
    :style="{ '--cursor': cursor }"
    v-on="$listeners"
>
    <template v-slot:default="{ active, toggle }">
        <image-user-avatar
            v-if="avatar"
            class="v-list-item__avatar"
            size="40"
            :image="item.avatar"
        />
        <v-list-item-action v-else class="list-item__action">
            <v-checkbox v-model="active" @click="toggle" />
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <input v-if="name && active" type="hidden" :value="item[idName]" :name="name" />
        </v-list-item-content>
        <v-list-item-action v-if="avatar">
            <v-checkbox v-model="active" @click="toggle" />
        </v-list-item-action>
    </template>
</v-list-item>`,
};
