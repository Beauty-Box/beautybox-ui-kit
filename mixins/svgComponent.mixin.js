const VSvg = () => import('../components/icons/Svg');
const BSvg = () => import('../components/icons/BSvg.vue');

export default {
    components: { VSvg, BSvg },
    computed: {
        // временное решение для икнонок в ui-kit. webpack подгружает иконки через require, а vite через импорт
        // сделано для того чтобы можно было перевести на vite crm и link и auth по отдельности, постепенно
        svgComponent() {
            return typeof process !== 'undefined' ? 'v-svg' : 'b-svg';
        },
    },
};
