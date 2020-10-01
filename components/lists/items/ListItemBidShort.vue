<!-- Template
    <app-bids-item-short
        :bid="bidObjectParams"
    />
Template -->

<template>
    <div class="bid-item bid-item--short">
        <div class="bid-item__left">
            <span class="bid-item__time">{{ bid.timeFrom }}</span>
        </div>
        <div class="bid-item__inner">
            <div class="bid-item__content">
                <div class="bid-item__row">
                    <div class="bid-item__title">{{ bid.serviceName }}</div>
                </div>
                <div v-if="bid.master" class="bid-item__row">
                    <div class="bid-item__text">{{ bid.timeSpent }} с {{ bid.master }}</div>
                </div>
            </div>
            <div class="bid-item__right">
                <div class="bid-item__price">{{ bid.price | price }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListItemBidShort',
    props: {
        bid: {
            type: Object,
            required: true,
        },
    },
    data: () => ({}),
    methods: {
        push() {
            Notification.requestPermission(function (status) {
                console.log('Status ', status);
            });
        },
    },
};
</script>

<style lang="scss">
@import '@crm/scss/components/_bidItem';
</style>
