import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';

import BBtnAddToFavorites from './index';

export const AddToFavoritesButton = () => ({
    components: { BBtnAddToFavorites },
    props: {
        active: {
            default: boolean('active', true),
        },
        title: {
            default: text('title', 'Добавить в избранное'),
        },
        width: {
            default: number('width', 40),
        },
        height: {
            default: number('height', 40),
        },
    },
    template:
        '<b-btn-add-to-favorites v-bind="$props">Добавить в избранное</b-btn-add-to-favorites>',
});

AddToFavoritesButton.storyName = 'AddToFavoritesButton';
AddToFavoritesButton.parameters = { jest: ['AddToFavoritesButton.spec.js'] };
AddToFavoritesButton.decorators = [withKnobs];
