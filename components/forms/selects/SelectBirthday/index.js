import { genDayArrayForSelect, genNumberStringArrayRevert } from '@beautybox/utils';
import { monthArray } from '@beautybox/utils/helpers';
import { VRow, VCol, VBtn } from 'vuetify/lib/components';
import BAutoComplete from '../AutoComplete';

export default {
    name: 'BSelectBirthday',
    components: {
        VRow,
        VCol,
        VBtn,
        BAutoComplete,
    },
    props: {
        value: {
            type: Object,
            default: () => ({}),
        },
        name: {
            type: String,
            default: 'birthday',
        },
    },
    render(h) {
        return h(
            'div',
            {
                class: 'v-input',
            },
            [
                h('v-row', [
                    h(
                        'v-col',
                        {
                            class: 'py-0',
                        },
                        [
                            h('b-auto-complete', {
                                props: {
                                    value: this.day,
                                    items: this.dayArray,
                                    label: 'День',
                                },
                                on: {
                                    input: (event) => (this.day = event),
                                    change: () => this.$emit('change-day', this.day),
                                },
                            }),
                        ]
                    ),
                    h(
                        'v-col',
                        {
                            class: 'py-0',
                        },
                        [
                            h('b-auto-complete', {
                                props: {
                                    value: this.month,
                                    items: this.monthArray,
                                    label: 'Месяц',
                                },
                                on: {
                                    input: (event) => (this.month = event),
                                    change: this.validateMonth,
                                },
                            }),
                        ]
                    ),
                    h(
                        'v-col',
                        {
                            class: 'py-0',
                        },
                        [
                            !this.yearBirthdayToggle
                                ? h(
                                      'v-btn',
                                      {
                                          props: {
                                              disabled: !this.monthBirthday || !this.dayBirthday,
                                              ripple: false,
                                              text: true,
                                              color: 'link',
                                              large: true,
                                              depressed: true,
                                          },
                                          class: {
                                              'u-text-initial u-text-weight--normal like-link mt-5 pa-0': true,
                                          },
                                          on: {
                                              click: () =>
                                                  (this.yearBirthdayToggle = !this
                                                      .yearBirthdayToggle),
                                          },
                                      },
                                      ['Выбрать год']
                                  )
                                : h('b-auto-complete', {
                                      props: {
                                          value: this.year,
                                          items: this.yearArray,
                                          label: 'Год',
                                      },
                                      on: {
                                          input: (event) => (this.year = event),
                                      },
                                  }),
                        ]
                    ),
                    h('input', {
                        attrs: {
                            type: 'hidden',
                            name: this.name,
                            value: this.fullBirthday,
                        },
                    }),
                ]),
            ]
        );
    },
    data: () => ({
        dayBirthday: null,
        monthBirthday: null,
        yearBirthday: null,
        dayArray: genDayArrayForSelect(31),
        monthArray,
        yearArray: genNumberStringArrayRevert(
            new Date().getFullYear() - 150,
            new Date().getFullYear()
        ),
        yearBirthdayToggle: false,
    }),
    computed: {
        fullBirthday() {
            if (!this.dayBirthday || !this.monthBirthday) {
                return 'null.null.null';
            } else {
                return `${this.dayBirthday}.${this.monthBirthday}.${this.yearBirthday || null}`;
            }
        },
        day: {
            get() {
                return this.value.day || null;
            },
            set(value) {
                this.dayBirthday = value;
                this.$emit('change-day', value);
            },
        },
        month: {
            get() {
                return this.value.month || null;
            },
            set(value) {
                this.monthBirthday = value;
                this.$emit('change-month', value);
            },
        },
        year: {
            get() {
                return this.value.year || null;
            },
            set(value) {
                this.yearBirthday = value;
                this.$emit('change-year', value);
            },
        },
    },
    mounted() {
        this.dayBirthday = this.value.day;
        this.monthBirthday = this.value.month;
        this.yearBirthday = this.value.year;
        if (this.yearBirthday) {
            this.yearBirthdayToggle = true;
        }
        if (this.monthBirthday) {
            this.validateMonth();
        }
    },
    methods: {
        validateMonth() {
            let month = this.monthArray.find(
                (item) => String(item.value) === String(this.monthBirthday)
            );
            if (!month) {
                this.day = null;
                this.$emit('change-day', '');
                return;
            }
            this.$emit('change-month', month.value);

            this.dayArray = genDayArrayForSelect(month.days);
            if (month.days < parseInt(this.day)) {
                this.day = null;
                this.$emit('change-day', '');
            }
        },
    },
};
