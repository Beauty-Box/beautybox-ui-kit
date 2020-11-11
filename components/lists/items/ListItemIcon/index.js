import '../style.scss';
import userAvatarMixin from '../mixin';

import {
    VListItem,
    VListItemAction,
    VListItemTitle,
    VListItemContent,
} from 'vuetify/lib/components/VList';

import VIcon from 'vuetify/lib/components/VIcon';
import VBtn from 'vuetify/lib/components/VBtn';

export default {
    name: 'ListItemIcon',
    components: { VListItem, VBtn, VIcon, VListItemAction, VListItemTitle, VListItemContent },
    mixins: [userAvatarMixin],
    props: {
        iconClass: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            required: true,
        },
    },
    template: `<v-list-item
    :value="item[idName]"
    :ripple="false"
    class="list-item"
    :style="{ '--cursor': cursor }"
    v-on="$listeners"
>
    <v-list-item-action class="list-item__action">
        <v-btn class="list-item__btn" icon small :class="iconClass" :ripple="false">
            <v-icon>{{ icon }}</v-icon>
        </v-btn>
        <input v-if="name" type="hidden" :value="item[idName]" :name="name" />
    </v-list-item-action>
    <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
    </v-list-item-content>
    <image-user-avatar
        v-if="avatar"
        class="v-list-item__avatar"
        size="40"
        :name="item.name"
        :image="item.avatar"
    />
    </v-list-item>`,
};
