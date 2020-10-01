import { withKnobs, object, boolean, text, number } from '@storybook/addon-knobs';

import ListItemLink from './index';

export default { title: 'lists/items', decorators: [withKnobs] };

const item = {
    avatar:
        'https://images.unsplash.com/photo-1595264544581-1ec3c9014f6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    name: 'Имя',
    icon: 'add',
    title: 'Заголовок',
    subtitle: 'Подзаголовок',
};

export const listItemLink = () => ({
    components: { ListItemLink },
    props: {
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
        svg: {
            default: text('svg', ''),
        },
        tag: {
            default: text('tag', 'div'),
        },
        avatarImgType: {
            default: text('avatarImgType', ''),
        },
    },
    template: '<list-item-link v-bind="$props"></list-item-link>',
});
