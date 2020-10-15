import '@crm/scss/components/_bidItem.scss';

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
    template: `<div class="bid-item bid-item--short">
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
</div>`,
    // render(h) {
    //     return h(
    //         'div',
    //         {
    //             class: {
    //                 'bid-item': true,
    //                 'bid-item--short': true,
    //             },
    //         },
    //         [
    //             h('div', { class: { 'bid-item__left': true } }, [
    //                 h(
    //                     'span',
    //                     {
    //                         class: {
    //                             'bid-item__time': true,
    //                         },
    //                     },
    //                     this.bid.timeFrom
    //                 ),
    //             ]),
    //             h('div', {
    //                 class: {
    //                     'bid-item__inner': true,
    //                 },
    //             }),
    //         ]
    //     );
    // },
};
