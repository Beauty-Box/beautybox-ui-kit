import './style.scss';

export default {
    name: 'ImagePreview',
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    computed: {
        photos() {
            console.log('--- photos', this.data);
            return this.data.map((item) => ({
                src: item,
                msrc: item,
                w: 480,
                h: 360,
            }));
        },
    },
    template: '<vue-preview :slides="photos" class="c-gallary" />',
};
