import './style.scss';

import ImageUserAvatar from '../../../image/ImageUserAvatar';
export default {
    name: 'ListItemNotification',
    components: { ImageUserAvatar },
    props: {
        oData: {
            type: Object,
            required: true,
        },
    },
    template: `<v-list-item
    v-if="oData.hasOwnProperty('message') && oData.message.bid"
    :key="oData.itemID"
    tag="a"
    :ripple="false"
    @click="
        checkPermission(['all-show-bids', 'your-show-bids']) &&
            $router.push({
                name: 'bids-info',
                params: { id: parseInt(oData.message.bidID) },
            })
    "
>
    <template v-if="oData.hasOwnProperty('message') && oData.message.bid">
        <v-list-item-avatar size="60">
            <image-user-avatar
                size="60"
                :image="oData.message.bid.client.avatar"
                :name="oData.message.bid.client.name"
            />
            <span v-if="oData.message.bid.isOnline" class="avatar-icon">
                <v-svg name="calendar-narrow" fill="#43B581" />
            </span>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="text-subtitle-2 mb-1">
                {{ oData.message.bid.client.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-body-2 ma-0 text--primary font-weight-normral">
                {{ oData.message.bid.date.weekday }},
                {{ oData.message.bid.date.day }}
                {{ oData.message.bid.date.month }},
                {{ oData.message.bid.date.timeFrom }}
            </v-list-item-subtitle>
            <!--<v-list-item-title>
            {{ oData.message.message }}
        </v-list-item-title>-->
            <v-list-item-subtitle class="text-body-2 ma-0 text--primary font-weight-normral">
                Услуга:
                {{ oData.message.bid.services.title }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-body-2 ma-0 text--primary font-weight-normral">
                Салон:
                {{ oData.message.bid.address.nameCrm }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-body-2 ma-0 text--primary font-weight-normral">
                Мастер:
                {{ oData.message.bid.master.name }}
            </v-list-item-subtitle>
        </v-list-item-content>
    </template>
</v-list-item>`,
};
