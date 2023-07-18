<template>
    <v-navigation-drawer
        v-model="modal"
        fixed
        right
        touchless
        temporary
        tag="form"
        overlay-opacity="1"
        overlay-color="rgba(103, 118, 140, 0.5)"
        :width="$vuetify.breakpoint.xsOnly ? '100%' : '375px'"
        @submit.prevent.native="$emit('submit', $event)"
        @reset.prevent.native="$emit('reset', $event)"
    >
        <template #prepend>
            <header class="flex-grow-1 py-4 px-4">
                <h2>{{ title }}</h2>
            </header>
            <b-btn-close size="35" type="button" class="mr-1 mt-1" @click.stop="modal = false" />
            <slot name="header" />
        </template>
        <template>
            <slot name="body" />
        </template>
        <template v-if="!withOutFooter" #append>
            <slot v-if="$slots.footer" name="footer" />
            <template v-else>
                <b-btn type="reset" color="white" @click="modal = false"> Отменить </b-btn>
                <b-btn type="submit" color="primary"> Сохранить </b-btn>
            </template>
        </template>
    </v-navigation-drawer>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { modalToggleMixin } from '../../../mixins';
const VSvg = defineAsyncComponent(() => import('../../icons/Svg'));
const BBtn = defineAsyncComponent(() => import('../../buttons/Btn/index.vue'));
const BBtnClose = defineAsyncComponent(() => import('../../buttons/BtnClose'));

export default {
    name: 'BSideDrawer',
    components: { VSvg, BBtn, BBtnClose },
    mixins: [modalToggleMixin],
    props: {
        title: {
            type: String,
            default: '',
        },
        withOutFooter: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onReset(e) {
            console.log('--- onReset');
            this.modal = false;
            this.$emit('reset', e);
        },
    },
};
</script>

<style lang="scss" scoped>
::v-deep .v-navigation-drawer {
    &__prepend,
    &__append,
    &__content {
        display: flex;
        padding: 0;
    }

    &__prepend {
        flex-wrap: wrap;
    }

    &__append {
        border-top: 0;
        @include footerBtnLayout;
    }

    &__content {
        flex-direction: column;
        & > * {
            flex-grow: 0;
        }
    }
}
</style>
