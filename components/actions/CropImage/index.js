import './style.scss';

import { Cropper, CircleStencil, RectangleStencil } from 'vue-advanced-cropper';

export default {
    name: 'BCropImage',
    components: { Cropper, CircleStencil, RectangleStencil },
    props: {
        image: {
            type: String,
            default: null,
        },
        crop: {
            type: [Object, String],
            default: () => ({
                x: 0,
                y: 0,
                width: 200,
                height: 200,
            }),
        },
        box: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        sanitizedCrop() {
            return Object.assign(
                {
                    x: 0,
                    y: 0,
                    width: 1000,
                    height: 1000,
                },
                this.crop
            );
        },
    },
    methods: {
        changeCrop({ coordinates, canvas, visibleArea }) {
            if (!visibleArea) {
                return;
            }
            console.log(canvas.width);
            let image = canvas.toDataURL();
            console.log('coordinates', coordinates);
            let crop = {
                x: coordinates.left,
                y: coordinates.top,
                width: coordinates.width,
                height: coordinates.height,
            };
            console.log('crop', { image, crop });
            this.$emit('change', { image, crop });
        },
        defaultVisibleArea() {
            return {
                left: this.sanitizedCrop.x,
                top: this.sanitizedCrop.y,
                height: this.sanitizedCrop.height,
                width: this.sanitizedCrop.width,
            };
        },
        defaultPosition(cropper) {
            return {
                left: this.sanitizedCrop.x,
                top: this.sanitizedCrop.y,
            };
        },
        defaultSize(cropper) {
            console.log('sanitizedCrop', this.sanitizedCrop);
            return {
                height: this.sanitizedCrop.height,
                width: this.sanitizedCrop.width,
            };
        },
    },
    render(h) {
        return h('cropper', {
            attrs: {
                defaultPosition: this.defaultPosition,
                defaultSize: this.defaultSize,
                stencilComponent: !this.box
                    ? this.$options.components.CircleStencil
                    : this.$options.components.RectangleStencil,
                src: this.image,
                stencilProps: {
                    aspectRatio: 1,
                    previewClassname: 'preview',
                    handlersClassnames: {
                        default: 'handler',
                    },
                },
            },
            on: {
                change: this.changeCrop,
                ready: () => {
                    console.log('ready');
                },
            },
        });
    },
};
