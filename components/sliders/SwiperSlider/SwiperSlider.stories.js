import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import SwiperSlider from './index';
import VImg from 'vuetify/lib/components/VImg';

import { SwiperSlide } from 'vue-awesome-swiper';

export default { title: 'sliders', decorators: [withKnobs] };

export const swiperSlider = () => ({
    components: { SwiperSlider, SwiperSlide, VImg },
    props: {
        sliderSlidesPerView: {
            default: number('sliderSlidesPerView', 1.5),
        },
        sliderSpaceBetween: {
            default: number('sliderSpaceBetween', 16),
        },
        freeMode: {
            default: boolean('freeMode', true),
        },
    },
    template: `<swiper-slider v-bind="$props">
    <swiper-slide><v-img height="300" src="https://images.unsplash.com/photo-1594735974070-b678995b9f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></v-img></swiper-slide>
    <swiper-slide><v-img height="300" src="https://images.unsplash.com/photo-1594748119670-deff800e97f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></v-img></swiper-slide>
    <swiper-slide><v-img height="300" src="https://images.unsplash.com/photo-1594801114217-6fc57805169a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></v-img></swiper-slide>
    <swiper-slide><v-img height="300" src="https://images.unsplash.com/photo-1594781503879-cdb2d83212f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></v-img></swiper-slide>
    </swiper-slider>`,
});
