import './SwiperSlider.scss';
import 'swiper/swiper.scss';

import { Swiper, directive } from 'vue-awesome-swiper';

import VIcon from 'vuetify/lib/components/VIcon';

export default {
    name: 'SwiperSlider',
    components: { Swiper, VIcon },
    directives: {
        swiper: directive,
    },
    props: {
        sliderSlidesPerView: {
            type: [Number, String],
            default: 1.5,
        },
        sliderSpaceBetween: {
            type: [Number, String],
            default: 16,
        },
        freeMode: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        },
        swiperOption() {
            return {
                slidesPerView: this.sliderSlidesPerView,
                spaceBetween: this.sliderSpaceBetween,
                freeMode: this.freeMode,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                /*breakpoints: {
                    480: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                },*/
            };
        },
    },
    template: `<swiper ref="mySwiper" :options="swiperOption" class="c-slider">
    <slot name="default" />

    <div slot="button-prev" class="swiper-button-prev">
        <v-icon>arrow_back</v-icon>
    </div>
    <div slot="button-next" class="swiper-button-next">
        <v-icon>arrow_forward</v-icon>
    </div>
</swiper>`,
};
