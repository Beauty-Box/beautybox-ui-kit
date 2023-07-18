<template>
    <v-dialog
        :value="true"
        persistent
        fullscreen
        hide-overlay
        :tag="tag"
        :transition="false"
        :no-click-animation="noClickAnimation"
        content-class="full-screen"
    >
        <form class="full-screen__form" @submit.prevent="submit">
            <!-- HEADER -->
            <div ref="header" class="full-screen__header">
                <h2 ref="title" class="full-screen__title full-screen__title--bold">
                    {{ title || $route.meta.title }}
                </h2>
                <b-btn-close
                    size="40"
                    class="full-screen__btn-close"
                    @click="$emit('click:close')"
                />
            </div>

            <!-- CONTENT -->
            <div class="full-screen__content full-screen-content" @scroll="onScroll">
                <b-block-loader v-if="loading" />
                <template v-else>
                    <div v-if="$vuetify.breakpoint.mobile" class="full-screen-content__title">
                        <div ref="contentTitle">{{ title || $route.meta.title }}</div>
                        <p v-if="description || $route.meta.description">
                            {{ description || $route.meta.description }}
                        </p>
                    </div>
                    <div v-if="$slots.content" class="full-screen-content__center">
                        <slot name="content" />
                    </div>
                </template>
            </div>

            <!-- FOOTER -->
            <div v-if="$slots.footerBtn" class="full-screen__footer">
                <slot name="footerBtn" />
            </div>

            <slot name="dialog" />
        </form>
    </v-dialog>
</template>

<script>
import { modalMixin } from '../../../mixins';
const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../../blocks/BlockLoader');
const BBtnClose = () => import(/* webpackChunkName: "BtnClose" */ '../../buttons/BtnClose');

export default {
    name: 'MFullScreen',
    components: { BBlockLoader, BBtnClose },
    mixins: [modalMixin],
    props: {
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'form',
        },
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
        noClickAnimation: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped src="./ModalLayout.scss" />
