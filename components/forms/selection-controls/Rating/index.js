import VRating from 'vuetify/lib/components/VRating';

export default {
    name: 'bRating',
    extends: VRating,
    props: {
        color: {
            ...VRating.options.props.color,
            default() {
                return 'orange';
            },
        },
        halfIncrements: {
            ...VRating.options.props.halfIncrements,
            default() {
                return true;
            },
        },
        emptyIcon: {
            ...VRating.options.props.emptyIcon,
            default() {
                return 'star';
            },
        },
        backgroundColor: {
            ...VRating.options.props.backgroundColor,
            default() {
                return 'grey lighten-2';
            },
        },
    },
};
