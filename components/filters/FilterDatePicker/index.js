import './style.scss';

import { getFirstLastDayToWeek } from '@beautybox/utils';

import { VDatePicker } from 'vuetify/lib/components/VDatePicker';
import VMenu from 'vuetify/lib/components/VMenu';
import VIcon from 'vuetify/lib/components/VIcon';
import VDivider from 'vuetify/lib/components/VDivider';

export default {
    name: 'FilterDatePicker',
    components: { VDatePicker, VMenu, VIcon, VDivider },
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
    },
    props: {
        value: {
            type: String,
            default: new Date().toISOString().slice(0, 10),
        },
        day: {
            type: Boolean,
            default: false,
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
                this.$emit('input', value);
            },
        },
    },
    methods: {
        prev() {
            let dateNow = new Date(this.datePick);
            let setDay = this.day ? 1 : 7;
            this.datePick = new Date(dateNow.setDate(dateNow.getDate() - setDay))
                .toISOString()
                .slice(0, 10);
            this.$emit('prev');
        },
        now() {
            this.datePick = new Date().toISOString().slice(0, 10);
        },
        next() {
            let dateNow = new Date(this.datePick);
            let setDay = this.day ? 1 : 7;
            this.datePick = new Date(dateNow.setDate(dateNow.getDate() + setDay))
                .toISOString()
                .slice(0, 10);
            this.$emit('next');
        },
    },
    template: `  <div class="date-picker" :class="{ mobile: $vuetify.breakpoint.xsOnly }">
    <button class="date-picker__arrow" @click="prev">
        <v-icon class="material-icons-round">keyboard_arrow_left</v-icon>
    </button>

    <template>
        <v-divider vertical />
        <button class="date-picker__now" @click="now">Сегодня</button>
    </template>

    <v-divider vertical />

    <v-menu
        ref="menu"
        v-model="menu"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <button v-if="day" class="date-picker__pick-day" v-on="on">
                {{ datePick | dateFormat }}
            </button>
            <button v-else class="date-picker__pick-day" v-on="on">
                {{ datePick | dateToWeek }}
            </button>
        </template>
        <v-date-picker v-model="datePick" no-title first-day-ob-week="1" />
    </v-menu>

    <v-divider vertical />

    <button class="date-picker__arrow" @click="next">
        <v-icon class="material-icons-round">keyboard_arrow_right</v-icon>
    </button>
</div>`,
};
