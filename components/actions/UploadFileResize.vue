<template>
    <upload-file :accept="accept" :max-files="maxFiles" @change="resize" />
</template>

<script>
import UploadFile from './UploadFile';
export default {
    name: 'UploadFileResize',
    components: { UploadFile },
    props: {
        maxFiles: {
            type: Number,
            default: 1,
        },
        accept: {
            type: Array,
            required: true,
            validator(value) {
                return value.every((item) => item.split('/').length === 2);
            },
        },
    },
    methods: {
        async resize(e) {
            const newImages = await Promise.all(Array.prototype.map.call(e, this.resizeFile));
            console.log('newImages', newImages);
            this.$emit('change', newImages);
        },
        resizeFile(file) {
            return new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                const reader = new FileReader();
                const img = new Image();

                reader.onloadend = (e) => {
                    img.src = e.target.result;
                    img.onload = () => {
                        const ratio = img.width / img.height;
                        const targetDimension = 3000;

                        if (img.width > img.height) {
                            canvas.width =
                                img.width > targetDimension ? targetDimension : img.width;
                            canvas.height = canvas.width / ratio;
                        } else {
                            canvas.height =
                                img.height > targetDimension ? targetDimension : img.height;
                            canvas.width = canvas.height * ratio;
                        }

                        context.drawImage(img, 0, 0, canvas.width, canvas.height);

                        canvas.toBlob(
                            (blob) => {
                                let file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                                resolve(file);
                            },
                            'image/jpeg',
                            0.95
                        );
                    };
                };

                reader.readAsDataURL(file);
            }).then((item) => item);
        },
    },
};
</script>
