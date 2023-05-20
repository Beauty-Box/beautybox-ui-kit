<template>
    <v-list-item
        :value="item[idName]"
        inactive
        :ripple="false"
        :style="{ '--cursor': cursor }"
        v-on="$listeners"
    >
        <template #default="{ active, toggle }">
            <image-user-avatar
                v-if="avatar"
                :name="item.name"
                class="v-list-item__avatar"
                size="40"
                :image="item.avatar"
            />
            <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <v-switch v-model="active" @click="toggle" />
                <input v-if="name && active" type="hidden" :value="item[idName]" :name="name" />
            </v-list-item-action>
        </template>
    </v-list-item>
</template>
<script>
import mix from './mixin';
export default {
    name: 'ListItemSwitch',
    mixins: [mix],
};
</script>

<style lang="scss" scoped src="./style.scss" />
