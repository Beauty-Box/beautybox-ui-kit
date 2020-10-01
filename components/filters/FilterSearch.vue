<template>
    <div
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
    </div>
</template>

<script>
export default {
    name: 'FilterSearch',
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
};
</script>

<style lang="scss">
.search-filter {
    @include max(md) {
        position: fixed;
        top: 50px;
        right: 0;
        left: 0;
        z-index: z(default);
        padding: $gutter / 2;
        background-color: #fff;

        input {
            margin-top: 0 !important;
            padding-top: 0 !important;
        }
    }

    &--shadow {
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    } //.search-filter--shadow

    .v-input__slot {
        @include max(md) {
            @include border(all);
            box-shadow: none !important;
        } //.search-filter .v-input__slot
    } //.search-filter .v-input
} //.search-filter
</style>
