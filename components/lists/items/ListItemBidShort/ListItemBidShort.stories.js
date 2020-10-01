import { withKnobs, object } from '@storybook/addon-knobs';

import ListItemBidShort from './index';

export default { title: 'lists/items', decorators: [withKnobs] };

const bid = {
    date: {
        day: 20,
        month: 'Jan',
    },
    timeFrom: new Date(),
    timeTo: new Date(),
    status: {
        value: 'primary',
        text: 'Новая',
    },
    isChecked: true,
    serviceName: 'Название услуги',
    price: 300,
    client: 'Имя клиента',
    phone: '+7 (937) 140-04-44',
    master: 'Имя мастера',
    address: 'ТЦ Проспект',
};

export const listItemBidShort = () => ({
    components: { ListItemBidShort },
    props: {
        bid: {
            default: object('bid', bid),
        },
    },
    template: '<list-item-bid-short v-bind="$props"></list-item-bid-short>',
});
