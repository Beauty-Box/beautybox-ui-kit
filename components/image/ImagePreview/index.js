import './style.scss';

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
            console.log('--- photos', this.items);
            return this.items.map((item) => ({
                src: item,
                msrc: item,
                w: 480,
                h: 360,
            }));
        },
    },
    template: '<vue-preview :slides="photos" class="c-gallery" />',
};
