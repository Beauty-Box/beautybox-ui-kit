import { withKnobs, object } from '@storybook/addon-knobs';

import ListItemSwitch from './index';

export default { title: 'lists/items', decorators: [withKnobs] };

const item = {
    avatar:
        'https://images.unsplash.com/photo-1595264544581-1ec3c9014f6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    name: 'Имя',
};

export const listItemSwitch = () => ({
    components: { ListItemSwitch },
    props: {
        item: {
            default: object('item', item),
        },
    },
    template: '<list-item-switch v-bind="$props"></list-item-switch>',
});
