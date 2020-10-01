<!-- Template
    <app-bids-item
        :bid="bidObjectParams"
    />
Template -->

<template>
    <a class="bid-item" @click="onGoToBidInfo($event, bid)">
        <div v-if="bid.date && date" class="bid-item__date">
            <span>{{ bid.date.day }}</span>
            <span>{{ bid.date.month }}</span>
        </div>
        <div class="bid-item__content">
            <div class="bid-item__row">
                <div class="bid-item__info">
                    <div v-if="bid.timeFrom || bid.timeTo || bid.date" class="bid-item__time">
                        <div v-if="bid.isOnline" class="bid-item__online">Онлайн-запись</div>
                        <span v-if="weekday && bid.date.weekday">{{ bid.date.weekday }}&nbsp;</span>
                        <span v-if="bid.timeFrom">{{ bid.timeFrom }}</span>
                        <span v-if="bid.timeTo">
                            - {{ bid.timeTo }}
                            <span
                                v-if="bid.status"
                                class="bid-item__status"
                                :class="{ 'bid-item__status--online': bid.isOnline }"
                                :style="{ color: bid.status.value }"
                            >
                                {{ bid.status.text }}
                            </span>
                        </span>
                    </div>
                    <div v-if="bid.isChecked" :id="'type' + bid.bidID" class="bid-item__type">
                        <v-tooltip
                            left
                            :disabled="!!$vuetify.breakpoint.smAndDown"
                            :attach="'#type' + bid.bidID"
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
            <div v-if="bid.master && USER_INFO_ROLE !== 'master'" class="bid-item__row">
                <div class="bid-item__text">Мастер: {{ bid.master || 'Любой мастер' }}</div>
            </div>
            <!--            <div v-if="bid.address" class="bid-item__row">-->
            <!--                <div class="bid-item__text">Салон: {{ bid.address }}</div>-->
            <!--            </div>-->
            <div v-if="bid.comment" class="bid-item__row">
                <div class="bid-item__comment">{{ bid.comment }}</div>
            </div>
        </div>
    </a>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'ListItemBid',
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
    computed: {
        ...mapGetters(['USER_INFO_ROLE']),
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
};
</script>

<style lang="scss">
@import '@crm/scss/components/_bidItem';
</style>
