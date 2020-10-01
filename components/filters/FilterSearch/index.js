import './style.scss';

import VTextField from 'vuetify/lib/components/VTextField';

export default {
    name: 'FilterSearch',
    components: { VTextField },
    props: {
        solo: {
            type: Boolean,
            default: true,
        },
        dense: {
            type: Boolean,
            default: true,
        },
        value: {
            type: [String, Number],
            default: '',
        },
        label: {
            type: String,
            default: 'Имя или телефон',
        },
        icon: {
            type: String,
            default: 'search',
        },
        height: {
            type: Number,
            default: 44,
        },
        flat: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'search',
        },
        permission: {
            type: [String, Array],
            default: '',
        },
    },
    data: () => ({
        scrollTop: false,
    }),
    computed: {
        show() {
            if (!this.permission) {
                return true;
            } else {
                return this.checkPermission(this.permission);
            }
        },
    },
    methods: {
        onScrollHandler(e) {
            if (e.target.scrollTop > 0) {
                this.scrollTop = true;
            } else {
                this.scrollTop = false;
            }
        },
    },
    template: `<div
    v-scroll:#main="onScrollHandler"
    class="search-filter"
    :class="{ 'search-filter--shadow': $vuetify.breakpoint.smAndDown && scrollTop }"
>
    <v-text-field
        v-if="show"
        :value="value"
        clearable
        hide-details
        :type="type"
        clear-icon="clear"
        :solo="solo"
        :dense="dense"
        :height="height"
        :label="label"
        :prepend-inner-icon="icon"
        v-on="$listeners"
    />
</div>`,
};
