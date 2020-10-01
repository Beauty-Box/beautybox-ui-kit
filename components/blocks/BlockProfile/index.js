import './style.scss';

import ImageUserAvatar from '@beautybox/ui-kit/components/image/ImageUserAvatar';
import AppMobileBottomOptions from '@beautybox/ui-kit/components/bottom-sheet/BottomSheetMobileOptions';
import VChip from 'vuetify/lib/components/VChip';

export default {
    name: 'BlockProfile',
    components: { AppMobileBottomOptions, ImageUserAvatar, VChip },
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
    template: `<div
    class="widget-profile"
    :class="{ 'widget-profile--column': column, 'widget-profile--shadow': shadow }"
    :loading="loading"
    @click="clientOptions = true"
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
                    checkPermission('all-show-phone-clients') &&
                        data.phone &&
                        !$slots.subcontent &&
                        showPhone
                "
            >
                <a
                    :href="phoneLink ? \`'tel:' + \${data.phone}\` : 'javascript:void(0);'"
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
                'background-color': \`\${data.clientType.color}2f\`,
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
        v-if="$vuetify.breakpoint.smAndDown && mobileOptions"
        v-model="clientOptions"
    >
        <v-list-item :ripple="false" tag="a" :href="'tel:' + data.phone">
            <span>Позвонить {{ data.phone }}</span>
        </v-list-item>
        <v-list-item
            :ripple="false"
            @click="
                $router.push({
                    name: \`client-info\`,
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
</div>`,
};
