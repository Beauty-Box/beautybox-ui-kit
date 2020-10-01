<template>
    <div ref="dialogFloating" :class="{ 'is-open': modal }" class="c-float-modal">
        <form
            v-if="modal"
            class="c-float-modal__content"
            :style="dialogFloatingPosition"
            @submit.prevent="onSubmit"
        >
            <span
                v-if="color"
                class="c-float-modal__color"
                :style="{
                    backgroundColor: color,
                }"
            />
            <div class="c-float-modal__top">
                <v-text-field
                    v-model="propsName"
                    autofocus
                    hide-details
                    :disabled="nameIsDisabled"
                    placeholder="Введите название услуги"
                />

                <div class="button-box ml-3">
                    <v-btn text color="secondary" :ripple="false" @click.stop="onClose">
                        Отменить
                    </v-btn>

                    <v-btn text color="link" type="submit" :ripple="false" :disabled="loadingBtn">
                        Сохранить
                    </v-btn>
                </div>
            </div>
            <div class="c-float-modal__bottom">
                <div class="c-input-wrap">
                    <div class="c-input c-input--inline c-input--reverce">
                        <div class="c-input__title">Цена</div>
                        <div class="c-input__field">
                            <b-input
                                v-model.number="propsPrice"
                                type="number"
                                name="price"
                                dense
                                height="31"
                                :error-messages="priceErrors"
                                hide-details="auto"
                                suffix="₽"
                            />
                        </div>
                    </div>
                    <div class="c-input c-input--inline c-input--reverce">
                        <div class="c-input__title">Время</div>
                        <div class="c-input__field">
                            <b-select
                                v-model="propsTime"
                                :height="'auto'"
                                :items="times"
                                hide-details
                                name="time"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { modalProps } from '../../mixins/modalProps';
import { timeArray } from '@beautybox/utils/helpers';

export default {
    name: 'MFloatingDialog',
    mixins: [modalProps],
    props: {
        name: {
            type: [String, Number],
            default: '',
        },
        color: {
            type: [String, Number],
            default: '',
        },
        price: {
            type: [String, Number],
            default: '',
        },
        time: {
            type: Number,
            default: null,
        },
        nameIsDisabled: {
            type: [Boolean, String, Number],
            default: false,
        },
        event: {
            type: [MouseEvent, Object],
            required: true,
        },
    },
    data: () => ({
        loadingBtn: false,
        dialogFloatingPosition: {},
        times: timeArray,
        priceErrors: [],
    }),
    computed: {
        propsName: {
            get() {
                return this.name;
            },
            set(value) {
                this.$emit('update:name', value);
            },
        },
        propsPrice: {
            get() {
                return this.price;
            },
            set(value) {
                this.$emit('update:price', value);
            },
        },
        propsTime: {
            get() {
                return this.time;
            },
            set(value) {
                this.$emit('update:time', value);
            },
        },
    },
    watch: {
        modal(modal) {
            if (modal) {
                this.open(this.event);
                this.loadingBtn = false;
            }
        },
    },
    methods: {
        //Показываем и позиционируем диалог
        open(e) {
            const parent = e.currentTarget.parentNode;
            const elem = this.$refs.dialogFloating;
            const screenHeight = document.documentElement.offsetHeight;
            const target = e.currentTarget.getBoundingClientRect();

            parent.appendChild(elem);

            this.dialogFloatingPosition = {
                display: 'block',
                position: 'fixed',
                left: target.left + 'px',
                width: target.width + 'px',
            };

            if (target.top > screenHeight / 2) {
                this.dialogFloatingPosition.top = target.top + target.height - 128 + 'px';
            } else {
                this.dialogFloatingPosition.top = target.top + 'px';
            }
        },

        onClose() {
            console.log('--- MFloatingDialog onClose');
            this.modal = false;
            this.$emit('close');
        },

        onSubmit(e) {
            if (this.propsPrice.length === 0) {
                this.priceErrors.push('Введите цену');
                return false;
            } else {
                this.priceErrors = [];
            }
            this.loadingBtn = true;
            this.$emit('submit', e);
        },
    },
};
</script>

<style lang="scss" scoped>
$input-offset: $gutter / 2;

.c-input {
    &--inline {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .c-input {
            &__title {
                flex-shrink: 0;
                margin-right: $input-offset;
                font-size: 13px;
                font-weight: 600;
                text-transform: uppercase;
            } //.c-input--inline .c-input__title

            &__field {
                display: flex;
                flex-grow: 1;
                align-items: center;
                justify-content: flex-end;

                input {
                    width: 100%;
                    padding: 0 !important;

                    &:focus {
                        border: 0;
                        outline: none;
                    }
                }

                select {
                    width: auto;
                }

                fieldset {
                    padding: 0 !important;
                    border: 0 !important;
                }

                .icon-rub {
                    flex-shrink: 0;
                    fill: #b7bcc3;
                }

                .v-input {
                    &__slot {
                        min-height: auto !important;
                        margin-bottom: 0 !important;
                        padding: 0 !important;
                    }

                    &--is-focused {
                        fieldset {
                            border: 0 !important;
                        }
                    } //.v-input--is-focused
                }

                .v-text-field {
                    &__details {
                        align-self: flex-end;
                        margin-top: -5px;
                        margin-bottom: 0 !important;
                        padding: 0 !important;
                        line-height: 1;
                        text-align: right;
                    }
                }
            } //.c-input--inline .c-input__field
        }

        .v-input {
            &__slot {
                &::before,
                &::after {
                    display: none !important;
                }
            }
        }
    } //.c-input--inline

    &--reverce {
        .c-input {
            &__field {
                input,
                select {
                    text-align: right;
                }
            }
        }
    } //.c-input--reverce
} //.c-input
.c-input-wrap {
    display: flex;
    width: 100%;

    .c-input {
        &--inline {
            width: calc(50% - 12px);

            & + .c-input--inline {
                margin-left: $gutter;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -$gutter / 2;
                    display: block;
                    width: 1px;
                    height: 100%;
                    background-color: $color-border--lighten;
                }
            }
        } //.c-input-wrap .c-input--inline
    } //.c-input-wrap .c-input
} //.c-input-wrap
.c-float-modal {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border-color: rgba(103, 118, 140, 0.5);
    background-color: rgba(103, 118, 140, 0.5);

    &__color {
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
    } //.c-float-modal__color

    &__content {
        width: 100%;
        max-width: 100%;
        padding: $gutter - 9 $gutter - 5;
        background-color: #fff;
        box-shadow: 0 15px 30px 0 rgba(103, 118, 140, 0.4);

        @include max(xs) {
            padding: $gutter - 9 $base-indent;
        }
    } //.c-float-modal__content

    &__top,
    &__bottom {
        display: flex;
        align-items: center;
    }

    &__top {
        padding-bottom: 10px;

        .button-box {
            button,
            a {
                min-width: auto;
                height: auto;
                padding: 0;
                font-size: 14px;
                font-weight: 400;
                letter-spacing: 0;
                text-transform: capitalize;

                &::before {
                    display: none !important;
                }
            }
        }

        ::v-deep .v-input {
            margin: 0;
            padding: 0;

            input {
                flex-grow: 1;
                padding: 6px 0;
                color: $color-text !important;
                font-size: 15px !important;
                font-weight: 500;
                @include text-overflow;

                @include max(sm) {
                    margin: 0 !important;
                    padding: 7.5px 0 !important;
                }
            }
        }

        ::v-deep .v-text-field > .v-input__control > .v-input__slot::before {
            display: none !important;
        } //.c-float-modal__top .v-text-field > .v-input__control > .v-input__slot:before
    } //.c-float-modal__top

    &__bottom {
        padding-top: 10px;
        @include border(top);
    } //.c-float-modal__bottom

    &.is-open {
        display: block;
        cursor: default;

        .c-float-modal {
            &__content {
                touch-action: auto;
                pointer-events: all;
            }
        }
    } //.c-float-modal.is-open

    ::v-deep .v-input {
        &__slot {
            &::before,
            &::after {
                display: none !important;
            }
        }

        &__append-inner {
            margin-top: 0 !important;
            padding-left: 0 !important;
        }
    }

    ::v-deep .v-select {
        &__slot {
            input {
                position: absolute !important;
                z-index: z(hidden);
                visibility: hidden;
                opacity: 0;
            }
        }

        &__selections {
            justify-content: flex-end;
            padding: 0 !important;
        }

        &__selection--comma {
            margin: 0 !important;
        }
    }

    ::v-deep .v-text-field {
        @include max(xs) {
            margin-top: 0;
            padding-top: 0;
        }
    }
} //.c-float-modal
</style>
