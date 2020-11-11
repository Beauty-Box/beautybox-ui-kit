import './style.scss';

import VIcon from 'vuetify/lib/components/VIcon';
import VBtn from 'vuetify/lib/components/VBtn';

import {
    VListItem,
    VListItemAction,
    VListItemIcon,
    VListItemContent,
    VListItemSubtitle,
    VListItemTitle,
} from 'vuetify/lib/components/VList';

export default {
    name: 'ListItemCategory',
    components: {
        VListItem,
        VListItemAction,
        VListItemIcon,
        VListItemContent,
        VListItemSubtitle,
        VListItemTitle,
        VIcon,
        VBtn,
    },
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
        height: {
            type: [Number, String],
            default: 68,
        },
        tag: {
            type: String,
            default: 'li',
        },
        iconPrepend: {
            type: [String, Boolean],
            default: 'menu',
        },
        iconPrependColor: {
            type: String,
            default: '',
        },
        iconPrependSize: {
            type: [Number, String],
            default: 20,
        },
        iconAppend: {
            type: String,
            default: 'arrow_forward_ios',
        },
        iconAppendSize: {
            type: [Number, String],
            default: 16,
        },
        cursor: {
            type: String,
            default: 'default',
        },
    },
    template: `    <v-list-item
                                :tag="tag"
                                class="item"
                                :ripple="false"
                                :two-line="!!item.description"
                                :style="{ 'min-height': height + 'px', '--cursor': cursor }"
                                v-on="$listeners"
                            >
                                <v-list-item-icon
                                    v-if="item.color && !iconPrependColor"
                                    :style="{ 'background-color': item.color }"
                                    class="item__color"
                                />
                                <v-list-item-action v-if="iconPrepend">
                                    <v-btn icon small :ripple="false" :rounded="false" class="btn-drag u-hide-before">
                                        <v-icon
                                            :size="iconPrependSize"
                                            :color="iconPrependColor ? iconPrependColor : 'secondary'"
                                            >{{ iconPrepend }}</v-icon
                                        >
                                    </v-btn>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    <v-list-item-subtitle v-if="item.description">
                                        {{ item.description }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-content v-if="item.countUsers">
                                    <v-list-item-subtitle class="pl-4">
                                        {{ item.countUsers }} сотрудник(ов)
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action v-if="$slots.actions" class="ma-0">
                                    <slot name="actions" />
                                </v-list-item-action>
                                <v-list-item-icon v-if="!$slots.actions && iconAppend" class="mt-auto mb-auto">
                                    <v-icon :size="iconAppendSize" color="primary lighten-5" class="ma-auto">{{
                                        iconAppend
                                    }}</v-icon>
                                </v-list-item-icon>
                            </v-list-item>`,
};
