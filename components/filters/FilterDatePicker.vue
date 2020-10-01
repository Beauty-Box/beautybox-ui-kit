<template>
    <div class="date-picker" :class="{ mobile: $vuetify.breakpoint.xsOnly }">
        <button :disabled="type == 'range'" class="date-picker__arrow" @click="prev">
            <v-icon class="material-icons-round">keyboard_arrow_left</v-icon>
        </button>

        <template>
            <v-divider vertical />
            <button class="date-picker_u-now" :disabled="dateNow" @click="now">Сегодня</button>
        </template>

        <v-divider vertical />

        <v-menu
            ref="menu"
            v-model="menu"
            transition="scale-transition"
            offset-y
            :close-on-content-click="type == 'day' || type == 'week'"
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <button v-if="type == 'day'" class="date-picker__pick-day" v-on="on">
                    {{ value | dateFormat }}
                </button>
                <button v-else-if="type == 'week'" class="date-picker__pick-day" v-on="on">
                    {{ value | dateToWeek }}
                </button>
                <button v-else-if="type == 'range'" class="date-picker__pick-day" v-on="on">
                    {{ value | dateToRange }}
                </button>
            </template>
            <v-date-picker
                :value="value"
                :type="type == 'month' ? 'month' : 'date'"
                :range="type == 'range'"
                no-title
                first-day-of-week="1"
                v-on="$listeners"
            />
        </v-menu>

        <v-divider vertical />

        <button :disabled="type == 'range'" class="date-picker__arrow" @click="next">
            <v-icon class="material-icons-round">keyboard_arrow_right</v-icon>
        </button>
    </div>
</template>

<script>
import { getFirstLastDayToWeek } from '@beautybox/utils';
export default {
    name: 'FilterDatePicker',
    filters: {
        dateToWeek(date) {
            let range = getFirstLastDayToWeek(date);
            let firstOps = { day: 'numeric' };
            if (range.first.getMonth() != range.last.getMonth()) {
                firstOps.month = 'short';
            }
            let lastOps = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            };
            function parseDate(date, opt) {
                return new Intl.DateTimeFormat('ru-RU', opt).format(date);
            }
            return `${parseDate(range.first, firstOps)} - ${parseDate(range.last, lastOps)}`;
        },
        dateToRange(dates) {
            if (dates.length < 2) {
                return '';
            }

            const range = {
                first: new Date(dates[0]),
                last: new Date(dates[1]),
            };

            let firstOps = { day: 'numeric' };
            if (range.first.getMonth() != range.last.getMonth()) {
                firstOps.month = 'short';
            }
            let lastOps = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            };
            function parseDate(date, opt) {
                return new Intl.DateTimeFormat('ru-RU', opt).format(date);
            }
            return `${parseDate(range.first, firstOps)} - ${parseDate(range.last, lastOps)}`;
        },
    },
    props: {
        value: {
            type: [String, Array],
            required: true,
        },
        day: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'week',
        },
    },
    data: () => ({
        menu: false,
    }),
    computed: {
        datePick: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('change', value);
                this.$emit('input', value);
            },
        },
        dateNow() {
            return this.datePick === new Date().toISOString().slice(0, 10);
        },
    },
    methods: {
        prev() {
            let dateNow = new Date(this.datePick);
            let setDay = this.type == 'day' ? 1 : 7;
            this.$emit(
                'input',
                new Date(dateNow.setDate(dateNow.getDate() - setDay)).toISOString().slice(0, 10)
            );
        },
        now() {
            const today = new Date().toISOString().slice(0, 10);
            if (this.type == 'range') {
                this.$emit('input', [today, today]);
            } else {
                this.$emit('input', today);
            }
        },
        next() {
            let dateNow = new Date(this.datePick);
            let setDay = this.type == 'day' ? 1 : 7;
            this.$emit(
                'input',
                (this.datePick = new Date(dateNow.setDate(dateNow.getDate() + setDay))
                    .toISOString()
                    .slice(0, 10))
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.date-picker {
    font-family: $font-family-base;
    display: flex;
    max-width: 400px;
    overflow: hidden;
    border-radius: $border-radius;
    background-color: #fff;
    font-weight: 400;
    color: $color-primary;
    &__pick-day {
        flex-grow: 1;
    }
    &__pick-day,
    &_u-now {
        position: relative;
        padding: 0 10px;
        position: relative;

        &[disabled] {
            color: $color-text--lighten;
            //&:before {
            //    content: '';
            //    position: absolute;
            //    top: 0;
            //    left: 0;
            //    width: 100%;
            //    height: 100%;
            //    background-color: currentColor;
            //    opacity: 0.08;
            //}
        }
    }
    &__arrow {
        width: 44px;
        position: relative;
        i {
            font-size: 23px;
        }

        &[disabled] {
            background-color: $gray--lighten;
            color: $gray--light;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: currentColor;
                opacity: 0.18;
            }
        }
    }
    button {
        height: 44px;
        border-radius: 0;
        outline: none;
        font-size: 16px;
        color: currentColor;
        &:hover:not([disabled]) {
            background-color: lighten($color-bg--lightest, 1.5%);
        }
    }
    &.mobile {
        button {
            font-size: 14px;
        }
    }
}
</style>
