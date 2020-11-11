<template>
    <v-dialog
        v-model="modal"
        width="100%"
        max-width="400"
        overlay-opacity="1"
        overlay-color="rgba(103, 118, 140, 0.5)"
        persistent
    >
        <v-card>
            <b-btn-close size="40" @click="modal = false" />
            <v-card-title>
                Введите код
                <div>
                    Мы отправили код подтверждения <br />
                    на номер <strong> {{ phone }}</strong
                    >.
                </div>
            </v-card-title>
            <v-card-text>
                <b-security-code
                    v-model="code"
                    :error-messages="codeErrors"
                    @clearErrors="errors = {}"
                    @complete="getSuccessCode"
                />
            </v-card-text>
            <v-card-actions>
                <div v-if="countSms > 0">
                    <v-btn
                        v-if="newCodeBtnIsVisible"
                        text
                        type="button"
                        color="link"
                        height="auto"
                        class="u-text-initial u-hide-before font-weight-regular pa-0"
                        @click="onGetNewCode"
                    >
                        Получить новый код
                    </v-btn>
                    <div v-else>
                        Получить новый код можно через
                        <b-timer :time="60" @end="newCodeBtnIsVisible = true" /> сек.
                    </div>
                    <div>
                        {{ countSms > 1 ? 'Осталось' : 'Осталась' }} {{ countSms }}
                        {{ countSms > 1 ? 'попытки' : 'попытка' }}
                    </div>
                </div>
                <div v-else>
                    Попытки на сегодня исчерпаны. <br />Свяжитесь с менеджером
                    <a href="mailto:info@baeutybox.ru">info@baeutybox.ru</a>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { Api as Provider } from '@beautybox/core/api';
import { modalProps } from '../../mixins';
import BSecurityCode from '../forms/inputs/InputSecurityCode';
const BTimer = () =>
    import(/* webpackChunkName: "Timer" */ '../forms/Timer');
const BBtnClose = () =>
    import(/* webpackChunkName: "BtnClose" */ '../buttons/BtnClose');

export default {
    name: 'BModalCode',
    components: { BTimer, BBtnClose, BSecurityCode },
    mixins: [modalProps],
    props: {
        phone: {
            type: [String, Number],
            default: '...Номер не указан',
        },
        password: {
            type: [String, Number],
            default: '',
        },
        userId: {
            type: [String, Number],
            default: null,
        },
        type: {
            type: String,
            default: '',
        },
    },
    data: () => ({
        code: '',
        errors: {},
        countSms: 0,
        modelModalCode: false,
        newCodeBtnIsVisible: false,
    }),
    computed: {
        codeErrors() {
            let errors = [];

            if (typeof this.errors !== 'undefined' && this.errors.hasOwnProperty('message')) {
                errors.push(this.errors.message);
            }

            return errors;
        },
    },
    watch: {
        modal(modal) {
            if (modal) {
                this.sendSms();
            }
        },
    },
    methods: {
        async getSuccessCode() {
            console.log('--- getSuccessCode');

            let data = {
                code: this.code,
                userID: this.userId,
                password: this.password,
                phone: this.phone,
            };
            let response = {};

            ({ errors: this.errors = {}, ...response } = await new Provider('auth')._provider.post(
                '/confirm-sms',
                data
            ));

            console.log('--- getSuccessCode response', response);

            if (!Object.keys(this.errors).length) {
                if (response.hasOwnProperty('step')) {
                    await this.$router.push({
                        name: response.step,
                        query: {
                            userID: response.userID,
                            secret: response.secret,
                        },
                    });
                    return;
                }
                localStorage.removeItem('auth_type');
                this.$emit('success', this.code);
                // redirectToBack();
                this.modal = false;
            }
        },
        onGetNewCode() {
            console.log('--- onGetNewCode');
            this.newCodeBtnIsVisible = false;
            this.sendSms();
        },
        async sendSms() {
            console.log('--- sendSms');

            let errors, response;
            let data = {
                phone: this.phone,
                userID: this.userId,
                type: this.type || localStorage.getItem('auth_type'),
            };

            ({ left: this.countSms, errors = {}, ...response } = await new Provider(
                'auth'
            )._provider.post('/send-sms', data));

            if (Object.keys(errors).length) {
                this.messageError(errors.message, 5000);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.v-card {
    &__title {
        justify-content: center;
        padding-top: $gutter * 2 !important;
        padding-bottom: $gutter !important;
        font-size: 28px !important;
        text-align: center;

        & > div {
            margin-top: $base-indent;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
        }
    }
    &__actions {
        display: flex;
        padding-bottom: $gutter * 2 !important;
        font-size: 14px;

        & > div {
            width: 100%;
            text-align: center;
        }
    }

    .c-btn-close {
        position: absolute;
        top: 5px;
        right: 5px;
    }
}

.c-input-code {
    display: flex;
    align-items: center;
    justify-content: center;

    & > .v-input {
        max-width: 50px;
        margin-top: 0 !important;

        & + .v-input {
            margin-left: $base-indent / 2;
        }

        ::v-deep {
            input {
                padding: 0 !important;
                font-size: 32px;
                font-weight: 600;
                text-align: center;
            }

            fieldset {
                border: 0;
            }
        }
    }
}

::v-deep {
    .v-dialog {
        @include max(xs) {
            margin: $base-indent;
        }
    }
}
</style>
