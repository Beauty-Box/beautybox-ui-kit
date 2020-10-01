<template>
    <v-list-item
        :value="item[idName]"
        inactive
        :ripple="false"
        class="list-item"
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
            <v-list-item-action v-else class="list-item__action">
                <v-checkbox
                    :input-value="active"
                    off-icon="radio_button_unchecked"
                    on-icon="radio_button_checked"
                />
            </v-list-item-action>
            <div class="d-flex flex-column align-start" style="width: 100%">
                <v-list-item-content class="align-self-start pa-0 font-weight-medium">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content v-if="item.description" class="align-self-start pa-0 mt-1">
                    <v-list-item-title class="body-2 text--secondary">
                        {{ item.description }}
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content v-if="item.caption" class="align-self-start pa-0 mt-1">
                    <v-list-item-title class="body-2 text--secondary">
                        {{ item.caption }}
                    </v-list-item-title>
                </v-list-item-content>
            </div>
            <v-list-item-action v-if="avatar">
                <v-checkbox
                    :input-value="active"
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
    name: 'ListItemCheckOne',
    mixins: [mix],
};
</script>

<style lang="scss" scoped src="./style.scss" />
