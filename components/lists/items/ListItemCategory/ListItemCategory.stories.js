import { withKnobs, object, number, text } from '@storybook/addon-knobs';

import ListItemCategory from './index';

export default { title: 'lists/items', decorators: [withKnobs] };

const item = {
    description: 'Описание категории',
    color: 'primary',
    name: 'Название категории',
    countUsers: 4,
};

export const listItemCategory = () => ({
    components: { ListItemCategory },
    props: {
        item: {
            default: object('item', item),
        },
        height: {
            default: number('height', 68),
        },
        tag: {
            default: text('tag', 'li'),
        },
        iconPrepend: {
            default: text('iconPrepend', 'menu'),
        },
        iconPrependColor: {
            default: text('iconPrependColor', ''),
        },
        iconPrependSize: {
            default: number('iconPrependSize', 20),
        },
        iconAppend: {
            default: text('iconAppend', 'arrow_forward_ios'),
        },
        iconAppendSize: {
            default: number('iconAppendSize', 16),
        },
        cursor: {
            default: text('cursor', 'default'),
        },
    },
    template: '<list-item-category v-bind="$props"></list-item-category>',
});
