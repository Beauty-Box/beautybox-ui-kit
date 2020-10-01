<template>
    <v-list-item
        :value="item[idName]"
        inactive
        :ripple="false"
        class="list-item"
        :style="{ '--cursor': cursor }"
        v-on="$listeners"
    >
        <template #default="{ active, toggle }">
            <image-user-avatar
                v-if="avatar"
                class="v-list-item__avatar"
                :size="avatarSize"
                :image="item.avatar"
            />
            <v-list-item-action v-else class="list-item__action">
                <v-checkbox :input-value="active" />
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    <slot>{{ item.name }}</slot>
                </v-list-item-title>
                <input v-if="name && active" type="hidden" :value="item[idName]" :name="name" />
            </v-list-item-content>
            <v-list-item-action v-if="avatar">
                <v-checkbox :input-value="active" />
            </v-list-item-action>
        </template>
    </v-list-item>
</template>

<script>
import mix from './mixin';

export default {
    name: 'ListItemCheck',
    mixins: [mix],
};
</script>

<style lang="scss" scoped src="./style.scss" />
