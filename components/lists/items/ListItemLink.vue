<template>
    <v-list-item
        :inactive="!to && !href"
        two-line
        class="list-item"
        :style="{ '--cursor': cursor }"
        :to="to"
        :href="href"
        :ripple="ripple"
        :tag="tag"
        v-on="$listeners"
    >
        <image-user-avatar
            v-if="avatar"
            class="v-list-item__avatar"
            :size="avatarSize"
            :image="item.avatar"
            :square="square"
            :img-type="avatarImgType"
        />
        <v-list-item-action
            v-else-if="svg || item.icon"
            class="list-item__action list-item__action--icon"
        >
            <b-svg v-if="svg" :name="svg" />
            <v-icon v-else-if="item.icon">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>
                {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{ item.subtitle }}
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="$slots.action || href || to || angle">
            <slot name="action">
                <v-icon size="15" class="ml-auto">arrow_forward_ios</v-icon>
            </slot>
        </v-list-item-action>
    </v-list-item>
</template>
<script>
import mix from './mixin';
export default {
    name: 'ListItemLink',
    mixins: [mix],
    props: {
        square: {
            type: Boolean,
            default: false,
        },
        ripple: {
            type: Boolean,
            default: true,
        },
        angle: {
            type: Boolean,
            default: false,
        },
        svg: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'div',
        },
        avatarImgType: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped src="./style.scss" />
