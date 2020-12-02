<template>
    <v-list-item
        :value="item[idName]"
        inactive
        :ripple="false"
        :style="{ '--cursor': cursor }"
        v-on="$listeners"
    >
        <template v-slot:default="{ active }">
            <image-user-avatar
                v-if="avatar"
                class="v-list-item__avatar"
                :size="avatarSize"
                :image="item.avatar"
            />
            <v-list-item-action v-else>
                <v-checkbox
                    :input-value="active"
                    :ripple="false"
                    hide-details
                    color="info"
                    off-icon="radio_button_unchecked"
                    on-icon="radio_button_checked"
                />
            </v-list-item-action>
            <div class="d-flex flex-column align-start" style="width: 100%">
                <v-list-item-content class="align-self-start pa-0">
                    <v-list-item-title v-if="item.name" class="font-weight-medium">
                        {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="item.description">
                        {{ item.description }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="item.caption">
                        {{ item.caption }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </div>
            <v-list-item-action v-if="avatar">
                <v-checkbox
                    :input-value="active"
                    :ripple="false"
                    hide-details
                    color="info"
                    off-icon="radio_button_unchecked"
                    on-icon="radio_button_checked"
                />
            </v-list-item-action>
        </template>
    </v-list-item>
</template>

<script>
import mix from './mixin';

export default {
    name: 'BListItemCheckOne',
    mixins: [mix],
};
</script>

<style lang="scss" scoped>
.v-list-item {
    min-height: 42px;
    width: 100%;
    cursor: var(--cursor, pointer);
    flex-shrink: 0;

    & + .v-list-item {
        margin-top: $gutter;
    }

    &__title {
        margin-bottom: 0;
        font-weight: 400;
        line-height: 24px;
        white-space: normal;
        text-overflow: initial;
        overflow: initial;
    }

    &__subtitle {
        font-size: 15px;
        font-weight: 400;
        white-space: normal;
        text-overflow: initial;
        overflow: initial;
    }

    &__action {
        //margin: 0 $base-indent / 2 auto 0 !important;
        //align-self: flex-start;
        //margin-right: $base-indent !important;
    }
}
</style>
