<template>
    <v-dialog
        v-model="modal"
        persistent
        fullscreen
        hide-overlay
        :tag="tag"
        :content-class="rootClass"
        :transition="computedTransition"
    >
        <div v-if="$slots.image && !$vuetify.breakpoint.mobile" class="full-screen__image">
            <slot name="image" />
        </div>
        <form class="full-screen__form" @submit.prevent="submit">
            <!-- HEADER -->
            <div ref="header" class="full-screen__header" :class="[headerClass]">
                <h2 ref="title" class="full-screen__title">
                    {{ title || $route.meta.title }}
                </h2>
                <b-btn-close size="40" class="full-screen__btn-close" @click="redirect" />
            </div>

            <!-- CONTENT -->
            <div class="full-screen__content full-screen-content" @scroll="onScroll">
                <b-block-loader v-if="loading" :class="{ 'has-image': $slots.image }" />
                <template v-else>
                    <div v-if="$vuetify.breakpoint.mobile" class="full-screen-content__title">
                        <div ref="contentTitle">{{ title || $route.meta.title }}</div>
                        <p v-if="description || $route.meta.description">
                            {{ description || $route.meta.description }}
                        </p>
                    </div>
                    <div v-if="$slots.leftContent" class="full-screen-content__left">
                        <slot name="leftContent" />
                    </div>
                    <div v-if="$slots.rightContent" class="full-screen-content__right">
                        <slot name="rightContent" />
                    </div>
                    <div v-if="$slots.content" class="full-screen-content__inner">
                        <slot name="content" />
                    </div>
                </template>
            </div>

            <!-- FOOTER -->
            <div v-if="$slots.footer" class="full-screen__footer">
                <slot name="footer" />
            </div>
        </form>
        <slot name="dialog" />
    </v-dialog>
</template>

<script>
import { modalMixin, modalToggleMixin } from '../../../mixins';
const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../../blocks/BlockLoader');
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../../buttons/BtnClose');

export default {
    name: 'BModalLayoutFullScreen',
    components: { BBlockLoader, BBtnClose },
    mixins: [modalMixin, modalToggleMixin],
    props: {
        tag: {
            type: String,
            default: 'form',
        },
        title: {
            type: String,
            default: '',
        },
        headerClass: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
        withoutTransition: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        rootClass() {
            let rootClass = 'full-screen';
            rootClass = this.transition ? `${rootClass} has-transition` : rootClass;
            rootClass = this.$slots.image
                ? `${rootClass} full-screen--row full-screen--image`
                : rootClass;
            return rootClass;
        },
        computedTransition() {
            return !this.withoutTransition ? this.transition : false;
        },
    },
};
</script>

<style lang="scss" scoped src="./ModalLayout.scss" />
