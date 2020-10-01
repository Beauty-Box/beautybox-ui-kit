import './style.scss';

import { getBaseUrl } from '@beautybox/utils';
import AppBtnCopy from '@ui-kit/components/buttons/AppBtnCopy';
import { mapGetters } from 'vuex';
import MInfoLink from '@crm/pages/Online/modals/MInfoLink';
import BlockLinkInfo from '@crm/pages/Online/BlockLinkInfo';
import { VCard, VCardTitle, VBtn } from 'vuetify/lib';
import FInput from '@ui-kit/components/forms/inputs/Input';

export default {
    name: 'BlockCopy',
    components: {
        BlockLinkInfo,
        MInfoLink,
        AppBtnCopy,
        VCard,
        VCardTitle,
        VBtn,
        FInput,
    },
    props: {
        hideTitle: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        nickname: '',
        loading: false,
        dialogInfoLink: false,
        serverURL: getBaseUrl(),
        actions: [
            {
                name: 'мой сайт',
                action: 'box',
            },
            {
                name: 'онлайн-запись',
                action: 'online',
            },
        ],
    }),
    computed: {
        ...mapGetters(['USER_INFO']),
        reg: {
            get() {
                return this.nickname;
            },
            set(value) {
                value.toLowerCase();
                value = value.replace(/([а-я]|([!#$%&()*+,\/:;<=>?@[\\\]^`~]))/g, ''); // удаление руского регистра
                this.nickname = value;
            },
        },
    },
    created() {
        this.requestAll([this.getData()]);
    },
    methods: {
        async getData() {
            ({ nickname: this.nickname } = await this.$fetch.get(
                `/beautylink-settings?addressID=${this.$route.params.id}`
            ));
        },
        async changeNickname() {
            this.loading = true;
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(async () => {
                const nickname = this.nickname;
                const checkNumbers = /^[0-9]+$/;
                if (nickname.match(checkNumbers)) {
                    this.messageError('Никнейм не может состоять только из цифр');
                    this.nickname = this.USER_INFO.nickname;
                    return;
                }
                try {
                    await this.$fetch.post(
                        `/beautylink-settings/nickname?addressID=${this.$route.params.id}`,
                        {
                            nickname,
                        }
                    );
                    this.messageSuccess('Никнейм изменен');
                    this.loading = false;
                } catch (e) {
                    this.messageError(e.errors.message);
                    this.nickname = this.USER_INFO.nickname;
                }
            }, 900);
        },
    },
    template: `<v-card flat class="u-box-shadow--sm">
    <div v-if="!hideTitle" class="d-flex align-center">
        <v-card-title class="pb-1">Ссылка на мой сайт</v-card-title>
        <v-btn
            text
            x-large
            depressed
            :ripple="false"
            color="info"
            class="u-text--default font-weight-regular _hide-before like-link ml-auto pl-4 pr-4 pt-2"
            @click="dialogInfoLink = true"
        >
            Как установить?
        </v-btn>
    </div>
    <v-card-text class="u-no-padding-x--sm u-no-padding-top--sm">
        <h5 class="title">Редактировать ссылку</h5>
        <b-input v-model.trim="nickname" label="Имя пользователя" @input="changeNickname" />
    </v-card-text>
    <v-card-text class="flex-column align-stretch _no-padding-x--sm">
        <div v-for="item in actions" :key="item.action" class="link-box">
            <div class="link-box__inner">
                <h5 class="link-box__title">Ссылка на {{ item.name }}</h5>
                <a
                    class="d-inline-block text-truncate like-link link-box__link"
                    :class="{ 'is-disabled': loading }"
                    target="_blank"
                    :href="\`\${serverURL}/\${item.action}/\${
                        nickname ? nickname : $route.params.id
                    }\`"
                >
                    {{
                        \`beautybox.ru/\${item.action}/\${nickname ? nickname : $route.params.id}\`
                    }}
                </a>
            </div>
            <div class="link-box__btns">
                <v-btn
                    v-if="$vuetify.breakpoint.smAndDown"
                    depressed
                    color="muted"
                    target="_blank"
                    class="u-text-small _hide-before"
                    :ripple="false"
                    :disabled="loading"
                    :href="\`\${serverURL}/\${item.action}/\${
                        nickname ? nickname : $route.params.id
                    }\`"
                >
                    Посмотреть
                </v-btn>
                <app-btn-copy
                    :copy-text="\`\${serverURL}/\${item.action}/\${
                        nickname ? nickname : $route.params.id
                    }\`"
                    :disabled="loading"
                    color="muted"
                    class="_hide-before"
                    :text="false"
                    depressed
                >
                    Скопировать
                </app-btn-copy>
            </div>
        </div>
    </v-card-text>

    <template v-if="$vuetify.breakpoint.smAndDown">
        <h5 class="title mt-7 mb-7">Как установить ссылку</h5>
        <block-link-info />
    </template>

    <m-info-link v-model="dialogInfoLink" />
</v-card>`,
};
