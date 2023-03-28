const VSvg = () => import('../components/icons/Svg');
const BSvg = () => import('../components/icons/BSvg.vue');

// import VSvg from '../components/icons/Svg';
// import BSvg from '../components/icons/BSvg.vue';

export default {
    components: { VSvg, BSvg },
    computed: {
        svgComponent() {
            return typeof process !== 'undefined' ? 'v-svg' : 'b-svg';
        },
    },
};
