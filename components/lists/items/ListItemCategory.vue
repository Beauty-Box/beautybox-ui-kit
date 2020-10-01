<template>
    <v-list-item
        :tag="tag"
        class="item"
        :ripple="false"
        :two-line="!!item.description"
        :style="{ 'min-height': height + 'px', '--cursor': cursor }"
        v-on="$listeners"
    >
        <v-list-item-icon
            v-if="item.color && !iconPrependColor"
            :style="{ 'background-color': item.color }"
            class="item__color"
        />
        <v-list-item-action v-if="iconPrepend">
            <v-btn icon small :ripple="false" :rounded="false" class="btn-drag _hide-before">
                <v-icon
                    :size="iconPrependSize"
                    :color="iconPrependColor ? iconPrependColor : 'secondary'"
                >
                    {{ iconPrepend }}
                </v-icon>
            </v-btn>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="item.description">
                {{ item.description }}
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content v-if="item.countUsers">
            <v-list-item-subtitle class="pl-4">
                {{ item.countUsers }} сотрудник(ов)
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="$slots.actions" class="ma-0">
            <slot name="actions" />
        </v-list-item-action>
        <v-list-item-icon v-if="!$slots.actions && iconAppend" class="mt-auto mb-auto">
            <v-icon :size="iconAppendSize" color="primary lighten-5" class="ma-auto">
                {{ iconAppend }}
            </v-icon>
        </v-list-item-icon>
    </v-list-item>
</template>

<script>
export default {
    name: 'ListItemCategory',
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
        height: {
            type: [Number, String],
            default: 68,
        },
        tag: {
            type: String,
            default: 'li',
        },
        iconPrepend: {
            type: [String, Boolean],
            default: 'menu',
        },
        iconPrependColor: {
            type: String,
            default: '',
        },
        iconPrependSize: {
            type: [Number, String],
            default: 20,
        },
        iconAppend: {
            type: String,
            default: 'arrow_forward_ios',
        },
        iconAppendSize: {
            type: [Number, String],
            default: 16,
        },
        cursor: {
            type: String,
            default: 'default',
        },
    },
};
</script>

<style lang="scss" scoped>
.item {
    --cursor: default;

    flex-wrap: wrap;
    background-color: #fff;
    cursor: var(--cursor);

    &::before,
    &::after {
        display: none;
    }

    &:hover {
        background-color: $color-bg--hover;
    }

    & + & {
        @include border(top);
    }
}

.v-list-item {
    &__icon {
        &.item__color {
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            min-width: auto;
            height: 100%;
            margin: 0 !important;

            @include min(md) {
                border-radius: $border-radius * 3;
            }
        }
    }

    &__action {
        margin-right: $base-indent - 4 !important;
        cursor: grab;

        button {
            &.btn-drag {
                cursor: grab;
            }
        }
    }

    &__title {
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
    }
}

.btn-menu {
    &::before {
        border-radius: $border-radius;
    }
}
</style>
