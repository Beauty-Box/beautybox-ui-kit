<template>
    <v-dialog
        :value="true"
        persistent
        fullscreen
        hide-overlay
        :tag="tag"
        :transition="false"
        content-class="full-screen"
    >
        <form class="full-screen__form" @submit.prevent="$emit('submit', $event)">
            <!-- HEADER -->
            <div ref="header" class="full-screen__header">
                <h2 ref="title" class="full-screen__title">
                    {{ $route.meta.title }}
                </h2>
                <v-btn
                    class="full-screen__btn-close"
                    small
                    light
                    tile
                    text
                    :ripple="false"
                    @click="redirect"
                >
                    <v-svg name="close" />
                </v-btn>
            </div>

            <!-- CONTENT -->
            <div class="full-screen__content full-screen-content" @scroll="onScroll">
                <block-loader v-if="loading" />
                <template v-else>
                    <div v-if="$vuetify.breakpoint.smAndDown" class="full-screen-content__title">
                        <div ref="contentTitle">{{ $route.meta.title }}</div>
                        <p v-if="$route.meta.description">{{ $route.meta.description }}</p>
                    </div>
                    <div v-if="$slots.leftContent" class="full-screen-content__left">
                        <slot name="leftContent" />
                    </div>
                    <div v-if="$slots.rightContent" class="full-screen-content__right">
                        <slot name="rightContent" />
                    </div>
                </template>
            </div>

            <!-- FOOTER -->
            <div class="full-screen__footer">
                <slot name="footerBtn" />
            </div>

            <slot name="dialog" />
        </form>
    </v-dialog>
</template>

<script>
import { dialogProps } from '../../../mixins/dialogProps';
import BlockLoader from '../../blocks/BlockLoader';

export default {
    name: 'MFullScreen',
    components: { BlockLoader },
    mixins: [dialogProps],
    props: {
        tag: {
            type: String,
            default: 'form',
        },
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
    },
};
</script>
