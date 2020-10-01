<template>
    <v-list-item
        v-if="oData.hasOwnProperty('message') && oData.message.bid"
        :key="oData.itemID"
        class="bid-info"
        tag="a"
        :ripple="false"
        @click="
            checkPermission(['all-show-bids', 'your-show-bids']) &&
                $router.push({
                    name: 'bids-info',
                    params: { id: parseInt(oData.message.bidID) },
                })
        "
    >
        <template v-if="oData.hasOwnProperty('message') && oData.message.bid">
            <v-list-item-avatar size="60">
                <image-user-avatar
                    class="mt-2"
                    size="60"
                    :image="oData.message.bid.client.avatar"
                    :name="oData.message.bid.client.name"
                />
                <span class="avatar-icon">
                    <v-icon :color="icons[oData.message.message].color">{{
                        icons[oData.message.message].icon
                    }}</v-icon>
                </span>
            </v-list-item-avatar>
            <v-list-item-content>
                <p v-if="oData.message.bid.isOnline" class="bid-info__online">
                    онлайн-запись
                </p>
                <v-list-item-title class="bid-info__title">
                    {{ oData.message.message }}
                </v-list-item-title>
                <v-list-item-subtitle class="bid-info__text">
                    {{ oData.message.bid.date.weekday }},
                    {{ oData.message.bid.date.day }}
                    {{ oData.message.bid.date.month }},
                    {{ oData.message.bid.date.timeFrom }}
                </v-list-item-subtitle>
                <!--<v-list-item-title>
                {{ oData.message.message }}
            </v-list-item-title>-->
                <v-list-item-subtitle class="bid-info__text">
                    Услуга:
                    {{ oData.message.bid.services.title }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="USER_INFO_ROLE !== 'master'" class="bid-info__text">
                    Клиент:
                    {{ oData.message.bid.client.name }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="bid-info__text">
                    Мастер:
                    {{ oData.message.bid.master.name || 'Любой мастер' }}
                </v-list-item-subtitle>
                <!--                <v-list-item-subtitle class="text-body-2 ma-0 text&#45;&#45;primary font-weight-normral">-->
                <!--                    Салон:-->
                <!--                    {{ oData.message.bid.address.nameCrm }}-->
                <!--                </v-list-item-subtitle>-->
            </v-list-item-content>
        </template>
    </v-list-item>
</template>
<script>
import { mapGetters } from 'vuex';
const ImageUserAvatar = () =>
    import(
        /* webpackChunkName: "ImageUserAvatar" */ '@beautybox/ui-kit/components/image/ImageUserAvatar'
    );

export default {
    name: 'ListItemNotification',
    components: { ImageUserAvatar },
    props: {
        oData: {
            type: Object,
            default: () => ({}),
        },
    },
    data: () => ({
        icons: {
            'Новая заявка': { icon: 'schedule', color: 'info' },
            'Заявка переназначена': { icon: 'refresh', color: 'info' },
            'Заявка отменена': { icon: 'not_interested', color: 'error' },
        },
    }),
    computed: {
        ...mapGetters(['USER_INFO_ROLE']),
    },
};
</script>

<style lang="scss" scoped>
.v-list-item {
    &::before,
    &::after {
        display: none;
    }

    &:not(:last-child) {
        .v-list-item__content {
            border-bottom: 1px solid $color-border-very-light;
        }
    }

    &__avatar {
        position: relative;
        align-self: flex-start !important;
        overflow: initial;

        .avatar-icon {
            position: absolute;
            right: -7px;
            bottom: -7px;
            display: flex;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: $box-shadow-base;

            .icon {
                width: 15px;
                height: 15px;
                margin: auto;
                border-radius: 0;
            }
        }
    }
}

.bid-info {
    &__online {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 5px;
        color: $color-text--lighten;
        font-size: 13px;
        font-weight: 400;

        &::before {
            content: '';
            display: block;
            width: 6px;
            height: 6px;
            margin-right: 6px;
            border-radius: 50%;
            background-color: $color-success;
        }
    }

    &__title {
        font-weight: 500;
        margin-bottom: 6px;
    }

    &__text {
        font-size: 13px;
    }
}
</style>
