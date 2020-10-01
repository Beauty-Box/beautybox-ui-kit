<template>
    <v-dialog
        v-model="openModal"
        width="320"
        content-class="c-modal-alert"
        overlay-opacity="1"
        overlay-color="rgba(103, 118, 140, 0.5)"
        :persistent="persistent"
        @click:outside="$emit('cancel')"
    >
        <v-card :loading="loading" tag="form" @submit.prevent="$emit('submit', $event)">
            <v-card-title class="c-modal-alert__header">
                <slot name="header">
                    <template>
                        <div v-if="title" class="c-modal-alert__title headline">
                            {{ title }}
                        </div>
                    </template>
                </slot>
            </v-card-title>
            <v-card-text class="c-modal-alert__body">
                <slot>
                    {{ text }}
                </slot>
            </v-card-text>
            <v-card-actions v-if="actions" class="c-modal-alert__footer">
                <v-btn
                    class="c-modal-alert__btn flex-grow-1 flex-shrink-1"
                    :class="{ 'order-last': btnRevert }"
                    :color="cancelBtnColor"
                    :ripple="false"
                    large
                    text
                    @click="$emit('cancel')"
                >
                    {{ cancelBtn }}
                </v-btn>
                <v-divider vertical />
                <v-btn
                    class="c-modal-alert__btn flex-grow-1 flex-shrink-1 ml-0"
                    :class="{ 'order-first': btnRevert }"
                    :color="actionBtnColor"
                    :type="actionBtnType"
                    :ripple="false"
                    large
                    text
                    @click="$emit('success')"
                >
                    {{ actionBtn }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'MAlert',
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        actions: {
            type: Boolean,
            default: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        body: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
        btnRevert: {
            type: Boolean,
            default: false,
        },
        actionBtn: {
            type: String,
            default: 'Сохранить',
        },
        actionBtnColor: {
            type: String,
            default: 'primary',
        },
        actionBtnType: {
            type: String,
            default: 'button',
        },
        cancelBtn: {
            type: String,
            default: 'Отменить',
        },
        cancelBtnColor: {
            type: String,
            default: 'primary',
        },
    },
    computed: {
        openModal: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.c-modal-alert {
    display: flex;
    align-items: center;
    justify-content: center;

    &__header {
        justify-content: center;
        text-align: center;

        &::v-deep span {
            font-size: 18px;
            line-height: 1.3;

            & + span {
                margin-left: 5px;
            }
        }
    }

    &__body {
        justify-content: center;
        padding-top: 0 !important;
        text-align: center;
    }

    &__footer {
        padding: 0 !important;
    }

    &__btn {
        border-top: 1px solid $color-border--lightest !important;
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
        font-weight: 500 !important;
        text-transform: capitalize;

        @include max(sm) {
            font-size: 17px;
            font-weight: 400;
        }

        &::before {
            display: none;
        }

        &.order-first {
            margin-left: 0 !important;
            border-top-left-radius: 0 !important;
        }
    }
}
</style>
