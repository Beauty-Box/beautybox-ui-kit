<template>
    <v-tabs v-model="activeTab" class="c-tabs" slider-size="4" center-active>
        <v-tab href="#bids" class="c-tabs__title" :ripple="false"> Заявки </v-tab>
        <v-tab href="#client-info" class="c-tabs__title" :ripple="false"> Информация </v-tab>

        <!-- Заявки -->
        <v-tab-item
            value="bids"
            class="c-tabs__content"
            :transition="false"
            :reverse-transition="false"
            @scroll="onScrollControl"
            @changeReadyToGetElements="readyToGetElements = $event"
        >
            <block-loader v-if="loading" center />

            <template v-else-if="client.bids.count">
                <template v-if="client.bids.coming.length">
                    <div class="bids-title">Предстоящие</div>
                    <list-item-bid
                        v-for="bid in client.bids.coming"
                        :key="bid.bidID"
                        :bid="bid"
                        :not-action="notAction"
                    />
                </template>
                <template v-if="client.bids.past.length">
                    <div class="bids-title">Прошедшие</div>
                    <list-item-bid
                        v-for="bid in client.bids.past"
                        :key="bid.bidID"
                        :bid="bid"
                        :not-action="notAction"
                    />
                </template>
                <block-loader
                    v-if="loadingBids"
                    position="static"
                    class="bids__loading-icon"
                    size="30"
                />
            </template>

            <block-empty
                v-else
                center
                big-size
                icon="calendar-clock--thin"
                title="Нет заявок"
                text="У данного клиента нет предстоящих или прошедших заявок"
            />
        </v-tab-item>

        <!-- Информация -->
        <v-tab-item
            value="client-info"
            class="c-tabs__content client-info"
            :transition="false"
            :reverse-transition="false"
        >
            <ul v-if="checkInfo" class="client-info__list">
                <li v-if="client.email" class="text-input">
                    <span class="text-input__title">E-mail</span>
                    <a :href="'mailto:' + client.email" class="text-input__field">
                        {{ client.email }}
                    </a>
                </li>
                <li v-if="birthdayTransform(client.birthday)" class="text-input">
                    <span class="text-input__title">Дата рождения</span>
                    <span class="text-input__field">{{ birthdayTransform(client.birthday) }}</span>
                </li>
                <li v-if="client.gender" class="text-input">
                    <span class="text-input__title">Пол</span>
                    <span class="text-input__field">{{ client.gender }}</span>
                </li>
                <li v-if="client.sale" class="text-input">
                    <span class="text-input__title">Скидка</span>
                    <span class="text-input__field">{{ client.sale }}</span>
                </li>
                <li v-if="client.comment" class="text-input">
                    <span class="text-input__title">Комментарий</span>
                    <span class="text-input__field">{{ client.comment }}</span>
                </li>
            </ul>
            <block-empty
                v-else
                center
                big-size
                icon="user-info--thin"
                title="Нет информации"
                text="По данному клиенту нет подробной информации"
            />
        </v-tab-item>
    </v-tabs>
</template>

<script>
import { scroll } from '../mixins/ScrollControl';
const BlockLoader = () =>
    import(/* webpackChunkName: "BlockLoader" */ '@beautybox/ui-kit/components/blocks/BlockLoader');
import ListItemBid from '@beautybox/ui-kit/components/lists/items/ListItemBid';
const BlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '@beautybox/ui-kit/components/blocks/BlockEmpty');
import { birthdayTransform } from '@beautybox/utils/helpers';

export default {
    name: 'UserInfoTabs',
    components: { BlockEmpty, ListItemBid, BlockLoader },
    mixins: [scroll],
    props: {
        loading: {
            type: Boolean,
            default: true,
        },
        client: {
            type: Object,
            required: true,
        },
        notAction: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        heightForActiveScroll: 100,
        loadingBids: false,
        readyToGetElements: true,
    }),
    computed: {
        checkInfo() {
            return Boolean(
                this.client.email ||
                    birthdayTransform(this.client.birthday) ||
                    this.client.gender ||
                    this.client.sale ||
                    this.client.comment
            );
        },
        allItemsLength() {
            return this.client.bids.count;
        },
        nowItemsLength() {
            return this.client.uploadedBids;
        },
        activeTab: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('activeTab', value);
            },
        },
    },
    methods: {
        birthdayTransform,
        //Получение заявок выбранного клиента по скролу
        async onScrollEndHandler() {
            this.loadingBids = true;
            this.readyToGetElements = false;
            await this.client.getBids();
            this.loadingBids = false;

            if (this.nowItemsLength < this.allItemsLength) {
                this.readyToGetElements = true;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.bids {
    &__loading-icon {
        min-height: 50px;
    }
}

.bid-item {
    & + .bids-title {
        border-top: 1px solid $color-border--lightest;
    }
}

.bids-title {
    padding: $gutter;
    border-bottom: 1px solid $color-border-very-light;
    color: $color-text;
    font-size: 18px;
    font-weight: 500;
}

.client-info {
    &__list {
        padding: $gutter;
    }
}

.c-tabs {
    &__content {
        overflow-y: auto;
    }

    ::v-deep .v-item-group,
    ::v-deep .v-window__container {
        &:not(.v-tabs-bar) {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
    }
}
</style>
