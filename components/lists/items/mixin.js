const ImageUserAvatar = () =>
    import(
        /* webpackChunkName: "ImageUserAvatar" */ '../../image/ImageUserAvatar'
    );

export default {
    components: { ImageUserAvatar },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        inactive: {
            type: Boolean,
            default: true,
        },
        square: {
            type: Boolean,
            default: false,
        },
        to: {
            type: [String, Object],
            default: undefined,
        },
        href: {
            type: [String, Object],
            default: undefined,
        },
        idName: {
            type: String,
            default: 'itemID',
        },
        item: {
            type: Object,
            required: true,
        },
        avatar: {
            type: Boolean,
            default: false,
        },
        avatarSize: {
            type: [String, Number],
            default: 45,
        },
        cursor: {
            type: String,
            default: 'pointer',
        },
        name: {
            type: String,
            default: '',
        },
    },
};
