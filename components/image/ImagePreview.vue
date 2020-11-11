<template>
    <vue-preview :slides="photos" class="c-gallery" />
</template>

<script>
export default {
    name: 'BScrollPhotosGallery',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    computed: {
        photos() {
            return this.items.map((item) => ({
                src: item,
                msrc: item,
                w: 480,
                h: 360,
            }));
        },
    },
};
</script>

<style lang="scss" scoped>
.c-gallery {
    overflow: hidden;

    ::v-deep .my-gallery {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        scroll-behavior: smooth;

        @include max(sm) {
            margin-bottom: -30px !important;
            padding-bottom: 30px !important;
        }

        & > figure {
            flex-shrink: 0;
            max-width: 105px;

            & + figure {
                margin-left: $base-indent / 2;
            }
        }
    }
}
::v-deep {
    .pswp__bg {
        background-color: rgba(103, 118, 140, 1);
    }
    .pswp__img {
        box-shadow: $box-shadow-base;
    }
    .pswp__top-bar {
        top: 50px;
    }
    .pswp__button--share,
    .pswp--supports-fs .pswp__button--fs {
        display: none !important;
    }
    .pswp__ui--fit .pswp__caption,
    .pswp__ui--fit .pswp__top-bar {
        background-color: transparent;
    }
    .pswp__ui--one-slide .pswp__button--arrow--left,
    .pswp__ui--one-slide .pswp__button--arrow--right,
    .pswp__ui--one-slide .pswp__counter {
        display: block;
    }
}
</style>
