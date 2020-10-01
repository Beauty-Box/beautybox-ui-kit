import { withKnobs, object, boolean, number, text } from '@storybook/addon-knobs';

import ListItemIcon from './index';

export default { title: 'lists/items', decorators: [withKnobs] };

const item = {
    avatar:
        'https://images.unsplash.com/photo-1595264544581-1ec3c9014f6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    name: 'Имя',
};

export const listItemIcon = () => ({
    components: { ListItemIcon },
    props: {
        icon: {
            default: text('icon', 'add'),
        },
        iconClass: {
            default: text('iconClass', ''),
        },
        item: {
            default: object('item', item),
        },
        disabled: {
            default: boolean('disabled', false),
        },
        inactive: {
            default: boolean('inactive', true),
        },
        square: {
            default: boolean('square', false),
        },
        avatar: {
            default: boolean('avatar', false),
        },
        avatarSize: {
            default: number('avatarSize', 45),
        },
        cursor: {
            default: text('cursor', 'pointer'),
        },
        name: {
            default: text('name', ''),
        },
    },
    template: '<list-item-icon v-bind="$props"></list-item-icon>',
});
