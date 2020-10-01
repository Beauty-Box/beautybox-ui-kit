import '@crm/scss/components/_bidItem.scss';

import VTooltip from 'vuetify/lib/components/VTooltip';
import VSvg from '@beautybox/ui-kit/components/icons/Svg';

export default {
    name: 'ListItemBid',
    components: { VTooltip, VSvg },
    props: {
        weekday: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Boolean,
            default: true,
        },
        bid: {
            type: Object,
            required: true,
        },
        notAction: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onGoToBidInfo(event, bid) {
            event.preventDefault();
            if (this.notAction) {
                return false;
            }
            if (this.checkPermission(['all-show-bids', 'your-show-bids'])) {
                this.$router.push({
                    name: 'bids-info',
                    params: { id: parseInt(bid.bidID) },
                    query: { from: this.$route.fullPath },
                });
            }
            return false;
        },
    },
    template: `<a class="bid-item" @click="onGoToBidInfo($event, bid)">
    <div v-if="bid.date && date" class="bid-item__date">
        <span>{{ bid.date.day }}</span>
        <span>{{ bid.date.month }}</span>
    </div>
    <div class="bid-item__content">
        <div class="bid-item__row">
            <div class="bid-item__info">
                <div v-if="bid.timeFrom || bid.timeTo || bid.date" class="bid-item__time">
                    <span v-if="weekday && bid.date.weekday">{{ bid.date.weekday }}&nbsp;</span>
                    <span v-if="bid.timeFrom">{{ bid.timeFrom }}</span>
                    <span v-if="bid.timeTo"> - {{ bid.timeTo }}</span>
                </div>
                <div
                    v-if="bid.status"
                    class="bid-item__status"
                    :style="{ color: bid.status.value }"
                >
                    {{ bid.status.text }}
                </div>
                <div v-if="bid.isChecked || bid.isOnline" class="bid-item__type">
                    <v-tooltip
                        v-if="bid.isOnline"
                        left
                        :disabled="!!$vuetify.breakpoint.smAndDown"
                        attach=".bid-item__type"
                    >
                        <template v-slot:activator="{ on }">
                            <span class="icon" v-on="on">
                                <v-svg name="calendar-small" v-on="on" />
                            </span>
                        </template>
                        <span>Онлайн запись</span>
                    </v-tooltip>
                    <v-tooltip
                        v-if="bid.isChecked"
                        left
                        :disabled="!!$vuetify.breakpoint.smAndDown"
                        attach=".bid-item__type"
                    >
                        <template v-slot:activator="{ on }">
                            <span class="icon" v-on="on">
                                <v-svg name="checked-round" />
                            </span>
                        </template>
                        <span>Клиент уведомлен</span>
                    </v-tooltip>
                </div>
            </div>
        </div>
        <div class="bid-item__row bid-item__header">
            <div class="bid-item__title">{{ bid.serviceName }}</div>
            <div class="bid-item__price">{{ bid.price | price }}</div>
        </div>
        <div v-if="bid.client" class="bid-item__row">
            <div class="bid-item__text">Клиент: {{ bid.client }}</div>
        </div>
        <div
            v-if="bid.phone && checkPermission('all-show-phone-clients')"
            class="bid-item__row bid-item__row--phone"
        >
            <div class="bid-item__text">Телефон: {{ bid.phone }}</div>
        </div>
        <div v-if="bid.master" class="bid-item__row">
            <div class="bid-item__text">Мастер: {{ bid.master }}</div>
        </div>
        <div v-if="bid.address" class="bid-item__row">
            <div class="bid-item__text">Салон: {{ bid.address }}</div>
        </div>
        <div v-if="bid.comment" class="bid-item__row">
            <div class="bid-item__comment">{{ bid.comment }}</div>
        </div>
    </div>
</a>`,
};
