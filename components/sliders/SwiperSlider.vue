<template>
    <swiper
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        :modules="modules"
        navigation
        class="c-slider"
    >
        <slot name="default" />

        <div slot="button-prev" class="swiper-button-prev">
            <v-icon>arrow_back</v-icon>
        </div>
        <div slot="button-next" class="swiper-button-next">
            <v-icon>arrow_forward</v-icon>
        </div>
    </swiper>
</template>

<script>
import { Navigation } from 'swiper';
import { Swiper } from 'swiper/vue';
import 'swiper/css/bundle';

export default {
    name: 'SwiperSlider',
    components: { Swiper },
    props: {
        sliderSlidesPerView: {
            type: [Number, String],
            default: 1.5,
        },
        sliderSpaceBetween: {
            type: [Number],
            default: 16,
        },
        freeMode: {
            type: Boolean,
            default: true,
        },
    },
    data: (vm) => ({
        //swiperOption: {
        slidesPerView: vm.sliderSlidesPerView,
        spaceBetween: vm.sliderSpaceBetween,
        //freeMode: vm.freeMode,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        modules: [Navigation],
        /*breakpoints: {
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 4,
            },
        },*/
        // },
    }),
};
</script>

<style lang="scss" scoped>
.c-slider {
    z-index: 0;

    .swiper-button-next,
    .swiper-button-prev {
        z-index: 0;
        width: 36px;
        height: 36px;
        border: 1px solid $color-border--lightest;
        border-radius: 50%;
        outline: none;
        background-color: #fff;
        box-shadow: $box-shadow-base;

        &::after {
            display: none;
        }

        &.swiper-button-disabled {
            display: none !important;
        }
    }

    .swiper-button-next {
        right: 5px;
    }

    .swiper-button-prev {
        left: 5px;
    }

    ::v-deep .swiper-wrapper {
        position: static;
    }
}
</style>
