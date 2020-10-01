<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-list>
            <template v-for="(link, index) in links">
                <v-list-item
                    :key="index"
                    :three-line="Boolean(link.description)"
                    exact
                    :to="link.link"
                >
                    <v-list-item-content>
                        <v-list-item-title class="info--text">{{ link.text }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            link.description
                        }}</v-list-item-subtitle></v-list-item-content
                    >
                </v-list-item>
                <v-divider
                    v-if="index != links.length - 1"
                    :key="index + '' + links.length"
                    class="v-list-item__divider"
                />
            </template>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'LinksListCard',
    props: {
        title: {
            type: String,
            default: '',
        },
        subtitle: {
            type: String,
            default: '',
        },
        links: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss" scoped>
.v-card {
    &__title {
        padding: $gutter $gutter 0;
    }

    &__subtitle {
        padding: $gutter;
    }

    & + .v-card {
        margin-top: $gutter;
    }

    .v-list {
        padding: 0 0 $gutter;

        .v-list-item {
            padding: 0 $gutter;
            min-height: auto;

            &__title,
            &__subtitle {
                font-size: 15px;
            }

            &__subtitle {
                line-height: 20px;
            }

            &__divider {
                margin: 0 $gutter;
            }

            &::after {
                display: none;
            }
        }
    }
}
</style>
