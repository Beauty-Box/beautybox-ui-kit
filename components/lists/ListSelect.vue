<template>
    <v-list subheader flat>
        <template v-for="(item, key) in items">
            <v-list-item-group :key="key" v-model="input" class="mt-4" multiple>
                <v-subheader class="text-body-1 text--primary font-weight-bold pa-0 mt-6">
                    {{ item.text }}
                </v-subheader>
                <v-divider />
                <template v-if="props[item.value]">
                    <template v-for="(prop, index) in props[item.value]">
                        <v-list-item
                            :key="prop.value"
                            :value="prop.value"
                            :ripple="false"
                            class="_hover pa-0"
                        >
                            <template #default="{ active, toggle }">
                                <v-list-item-action class="mr-4">
                                    <v-checkbox
                                        class="c-checkbox"
                                        :class="{
                                            'c-checkbox--long': $vuetify.breakpoint.smAndDown,
                                        }"
                                        :input-value="active"
                                    />
                                </v-list-item-action>
                                <v-list-item-content class="py-6">
                                    <v-list-item-title class="text-left">
                                        {{ prop.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </v-list-item>
                        <v-divider :key="index" />
                    </template>
                </template>
                <slot v-else name="block-empty" />
            </v-list-item-group>
        </template>
    </v-list>
</template>

<script>
const BlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '@beautybox/ui-kit/components/blocks/BlockEmpty');
export default {
    name: 'ListSelect',
    components: { BlockEmpty },
    props: {
        value: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        props: {
            type: Object,
            required: true,
        },
    },
    computed: {
        input: {
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
.text-body-1 {
    @include max(sm) {
        font-size: 18px !important;
        font-weight: 500 !important;
    }
}
</style>
