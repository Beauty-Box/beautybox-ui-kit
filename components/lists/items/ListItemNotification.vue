<template>
    <v-list-item
        v-if="Object.keys(item.message).length && Object.keys(item.message.bid).length"
        :key="item.itemID"
        class="bid-info"
        tag="a"
        :ripple="false"
        @click="
            CHECK_PERMISSION(['all-show-bids', 'your-show-bids']) &&
                $router.push({
                    name: 'bids-info',
                    params: { id: parseInt(item.message.bidID) },
                })
        "
    >
        <v-list-item-avatar size="60">
            <image-user-avatar
                class="mt-2"
                size="60"
                :image="item.message.bid.client.avatar"
                :name="item.message.bid.client.name"
            />
            <span v-if="item.message.message.length" class="avatar-icon">
                <v-icon :color="icons[item.message.message].color">
                    {{ icons[item.message.message].icon }}
                </v-icon>
            </span>
        </v-list-item-avatar>
        <v-list-item-content>
            <p v-if="item.message.bid.isOnline" class="bid-info__online">онлайн-запись</p>
            <v-list-item-title class="bid-info__title">
                {{ item.message.message }}
            </v-list-item-title>
            <v-list-item-subtitle class="bid-info__text">
                {{ item.message.bid.date.weekday }},
                {{ item.message.bid.date.day }}
                {{ item.message.bid.date.month }},
                {{ item.message.bid.date.timeFrom }}
            </v-list-item-subtitle>
            <!--<v-list-item-title>
                {{ item.message.message }}
            </v-list-item-title>-->
            <v-list-item-subtitle class="bid-info__text">
                Услуга:
                {{ item.message.bid.services.title }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="USER_INFO_ROLE !== 'master'" class="bid-info__text">
                Клиент:
                {{ item.message.bid.client.name }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="bid-info__text">
                Мастер:
                {{ item.message.bid.master.name || 'Любой мастер' }}
            </v-list-item-subtitle>
            <!-- <v-list-item-subtitle class="text-body-2 ma-0 text&#45;&#45;primary font-weight-normral">
                        Салон:
                        {{ item.message.bid.address.nameCrm }}
                    </v-list-item-subtitle>-->
        </v-list-item-content>
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
        item: {
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
        ...mapGetters(['USER_INFO_ROLE', 'CHECK_PERMISSION']),
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
