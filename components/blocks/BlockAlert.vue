<template>
    <v-alert
        :icon="icon"
        :color="color"
        transition="slide-y-transition"
        :dismissible="dismissible"
        :style="{
            '--shadow': shadow,
            '--icon-color': iconColor,
        }"
    >
        <h3 class="title">{{ title }}</h3>
        <p v-if="!$slots.description" class="description">{{ description }}</p>

        <slot name="description" />
    </v-alert>
</template>

<script>
import VAlert from 'vuetify/lib/components/VAlert';

export default {
    name: 'BlockAlert',
    components: {
        VAlert,
    },
    props: {
        color: {
            type: String,
            default: '#E8F6FF',
        },
        shadow: {
            type: String,
            default: '#2b72bd33',
        },
        icon: {
            type: String,
            default: 'info',
        },
        iconColor: {
            type: String,
            default: '#2B72BD',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        dismissible: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-alert {
    box-shadow: 0 4px 12px var(--shadow, #2b72bd33);

    ::v-deep &__dismissible {
        align-self: flex-start;
        margin: 0;

        &::before,
        &::after {
            display: none;
        }
    }

    ::v-deep &__icon {
        color: var(--icon-color, #2b72bd);
    }

    .title {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
    }

    ::v-deep .description,
    ::v-deep p,
    ::v-deep div {
        margin-bottom: 0;
        font-size: 16px;
        line-height: 22px;

        & + p,
        & + div,
        & + .description {
            margin-top: $base-indent;
        }

        button,
        a {
            margin-top: -1px;
            font-size: inherit !important;
            font-weight: inherit !important;
        }
    }
}
</style>
