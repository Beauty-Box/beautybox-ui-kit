<template>
    <cropper
        :default-position="defaultPosition"
        :default-size="defaultSize"
        classname="cropper"
        :stencil-component="
            !box ? $options.components.CircleStencil : $options.components.RectangleStencil
        "
        :src="image"
        :stencil-props="{
            aspectRatio,
            previewClassname: 'preview',
            handlersClassnames: {
                default: 'handler',
            },
        }"
        @change="changeCrop"
    />
</template>

<script>
import { Cropper, CircleStencil, RectangleStencil } from 'vue-advanced-cropper';

export default {
    name: 'CropImage',
    components: { Cropper, CircleStencil, RectangleStencil },
    props: {
        aspectRatio: {
            type: Number,
            default: 1,
        },
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
        changeCrop({ coordinates, canvas }) {
            let image = canvas.toDataURL();
            let crop = {
                x: coordinates.left,
                y: coordinates.top,
                width: coordinates.width,
                height: coordinates.height,
            };
            this.$emit('change', { image, crop });
        },
        defaultPosition(cropper) {
            return {
                left: this.sanitizedCrop.x,
                top: this.sanitizedCrop.y,
            };
        },
        defaultSize(cropper) {
            return {
                height: this.sanitizedCrop.height,
                width: this.sanitizedCrop.width,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.cropper {
    max-height: 400px;
}

.preview {
    border: dashed 1px rgba(255, 255, 255, 0.25);
}

.handler {
    border-radius: 50%;

    &--hover {
        width: 12px;
        height: 12px;
    }
}
</style>
