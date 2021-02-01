<script>
import AppSkeletonBoilerplate from '../../../../../../components/loaders/SkeletonBoilerplate';

export default {
    name: 'app-info-link-item-loader',
    components: { AppSkeletonBoilerplate },
};
</script>

<template>
    <app-skeleton-boilerplate type="heading, list-item" />
</template>

<style lang="scss" scoped>
.v-skeleton-loader {
    width: 100%;
}

::v-deep {
    .v-skeleton-loader {
        &__heading {
            margin-top: $base-indent + 2px;
        }
        &__list-item {
            padding: 0 !important;
        }
    }
}
</style>
