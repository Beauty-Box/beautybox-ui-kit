<template>
    <div
        class="widget-profile"
        :class="{ 'widget-profile--column': column, 'widget-profile--shadow': shadow }"
        :loading="loading"
        @click="onOpenClientInfo"
    >
        <div class="widget-profile__content">
            <div class="widget-profile__avatar">
                <image-user-avatar
                    :size="size"
                    color="grey lighten-4"
                    :image="data.avatar"
                    :name="data.name"
                />
            </div>
            <div class="widget-profile__text">
                <div class="widget-profile__name">
                    {{ data.name }}
                </div>
                <template
                    v-if="
                        CHECK_PERMISSION('all-show-phone-clients') &&
                        data.phone &&
                        !$slots.subcontent &&
                        showPhone
                    "
                >
                    <a
                        :href="phoneLink ? `'tel:' + ${data.phone}` : 'javascript:void(0);'"
                        class="widget-profile__phone"
                    >
                        {{ data.phone }}
                    </a>
                </template>
                <div v-if="data.positionName" class="widget-profile__position">
                    {{ data.positionName }}
                </div>
            </div>
        </div>
        <div v-if="data.clientType" class="widget-profile__inner">
            <v-chip
                v-if="data.clientType.color"
                small
                :style="{
                    'background-color': `${data.clientType.color}2f`,
                    color: data.clientType.color,
                }"
            >
                {{ data.clientType.text }}
            </v-chip>
        </div>
        <div v-if="!!$slots.default" class="widget-profile__inner">
            <slot />
        </div>
        <div v-if="!!$slots.btns" class="widget-profile__btns">
            <slot name="btns" />
        </div>
        <div v-if="!!$slots.subcontent" class="widget-profile__subcontent">
            <slot name="subcontent" />
        </div>

        <!-- MOBILE OPTIONS -->
        <app-mobile-bottom-options
            v-if="$vuetify.breakpoint.mobile && checkShowClient && mobileOptions"
            v-model="clientOptions"
        >
            <v-list-item
                v-if="CHECK_PERMISSION('all-show-phone-clients')"
                :ripple="false"
                tag="a"
                :href="'tel:' + data.phone"
            >
                <span>Позвонить {{ data.phone }}</span>
            </v-list-item>
            <v-list-item
                v-if="CHECK_PERMISSION('all-show-clients-card')"
                :ripple="false"
                @click="
                    $router.push({
                        name: `client-info`,
                        params: {
                            query: $route.query,
                            id: data.clientID,
                        },
                    })
                "
            >
                <span>Информация о клиенте</span>
            </v-list-item>
            <slot name="mobile-options" />
        </app-mobile-bottom-options>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

const ImageUserAvatar = () =>
    import(
        /* webpackChunkName: "ImageUserAvatar" */ '@beautybox/ui-kit/components/image/ImageUserAvatar'
    );
import AppMobileBottomOptions from '@beautybox/ui-kit/components/bottom-sheet/BottomSheetMobileOptions';

export default {
    name: 'BlockProfile',
    components: { AppMobileBottomOptions, ImageUserAvatar },
    props: {
        data: {
            type: Object,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        size: {
            type: [Number, String],
            default: 80,
        },
        column: {
            type: Boolean,
            default: false,
        },
        shadow: {
            type: Boolean,
            default: false,
        },
        showPhone: {
            type: Boolean,
            default: true,
        },
        phoneLink: {
            type: Boolean,
            default: false,
        },
        mobileOptions: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        clientOptions: false,
    }),
    computed: {
        ...mapGetters(['CHECK_PERMISSION']),
        checkShowClient() {
            return this.CHECK_PERMISSION(['all-show-phone-clients', 'all-show-clients-card']);
        },
    },
    methods: {
        onOpenClientInfo() {
            if (this.checkShowClient) {
                this.clientOptions = true;
            }
        },
    },
};
</script>

<style lang="scss">
.widget-profile {
    display: flex;
    flex-direction: column;
    padding: $gutter;
    background-color: #fff;

    &:not(.widget-profile--column) {
        .c-avatar {
            &__letter {
                font-size: 28px;
                font-weight: 400;
            }
        }
    }

    &__content {
        display: flex;
        align-items: center;

        & + .widget-profile__inner {
            margin-top: $base-indent / 2;
        }
    }

    &__avatar {
        margin-right: $base-indent;
    }

    &__name {
        padding-top: 0;
        color: $color-text;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;

        &:not(:last-child) {
            padding-bottom: 0;
        }

        & + .widget-profile__subcontent {
            margin-top: $base-indent;
        }
    } //.widget-profile__name

    &__phone,
    &__position {
        color: $color-text--light !important;
        font-size: 14px;
        line-height: 20px;
        text-decoration: none;
    }

    &__surname {
    } //.widget-profile__surname

    &__btns {
        display: flex;
        align-items: center;
        justify-content: center;
        @include btnHalfSize;

        button,
        a {
            padding: 0 $base-indent / 2 !important;
        }
    } //.widget-profile__btns

    &__subcontent {
        padding: $gutter;
        border-top: 1px solid $color-border-very-light;

        @include max(sm) {
            margin-top: $gutter - 4;
            padding: $gutter - 4 0;
            @include border(top);
            @include border(bottom);
        }

        & > div {
            display: flex;
            flex-direction: column;

            span {
                color: $color-text--light;
                font-size: 14px;
            }

            a,
            p {
                margin-bottom: 0 !important;
                color: $color-text;
                font-size: 16px;
                text-decoration: none;
            }

            & + div {
                margin-top: 10px;
            }
        }
    } //.widget-profile__subcontent

    &--column {
        flex-direction: column;
        padding: 0;

        .widget-profile {
            &__content {
                flex-direction: column;
                align-items: stretch;
            } //.widget-profile--column .widget-profile__content

            &__avatar {
                display: flex;
                justify-content: center;
                margin: 0;
                padding: $gutter 0 0;
            } //.widget-profile--column .widget-profile__avatar

            &__text,
            &__inner {
                padding-top: $base-indent;
            } //.widget-profile--column .widget-profile__text, .widget-profile--column .widget-profile__inner

            &__name {
                font-size: 22px;
                font-weight: 500;
                text-align: center;
            } //.widget-profile--column .widget-profile__name

            &__inner {
                display: flex;
                justify-content: center;
                margin: 0;

                &:last-child {
                    padding-bottom: $base-indent;
                }
            } //.widget-profile--column .widget-profile__inner

            &__btns {
                padding: $gutter;

                @include max(sm) {
                    padding: 24px 0;

                    /*padding-right: 0;*/

                    /*padding-bottom: 0;*/

                    /*padding-left: 0;*/
                }

                &:empty {
                    padding: 0;
                }
            }
        }
    } //.widget-profile--column

    &--shadow {
        @include min(md) {
            border-radius: $border-radius;
            box-shadow: $box-shadow-base;
        }
    }
} //.widget-profile
</style>
