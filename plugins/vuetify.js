import Vue from 'vue';
import Vuetify, { VApp, VMain, VRow, VCol } from 'vuetify/lib';
import ru from 'vuetify/lib/locale/ru';

Vue.use(Vuetify, {
    components: {
        VApp,
        VMain,
        VRow,
        VCol,
    },
});

export const vuetify = new Vuetify({
    lang: {
        current: 'ru',
        locales: { ru },
    },
    breakpoint: {
        thresholds: {
            xs: 481,
            sm: 769,
            md: 1041,
            lg: 1383,
            xl: 1390,
        },
        mobile: true,
        mobileBreakpoint: 769,
        scrollBarWidth: 16,
    },
    theme: {
        // disable: true,
        options: {
            variations: false,
            // customProperties: true,
            minifyTheme: function (css) {
                return process.env.NODE_ENV === 'production'
                    ? css.replace(/[\r\n|\r|\n]/g, '')
                    : css;
            },
        },
        themes: {
            light: {
                primary: '#101928', //* Задано
                secondary: '#67768c', //* Задано
                muted: '#eef2f7', //* Задано
                accent: '#ff8272', //* Задано
                background: '#101928', //* Задано
                success: '#43B581', //* Задано
                warning: '#ffc107', //* Задано
                error: '#f74969', //* Задано
                info: '#037aff', //* Задано
                link: '#2b72bd', //* Задано
                ripple: '#67768c', //* Задано
                colorText: '#101928', //* Задано
                'background--light': '#f7f7f8', //* Задано
                // Social color
                whatsapp: '#23d364',
                viber: '#7d3daf',
                vk: '#4a76a8',
            },
            dark: {
                background: '#2f2f2f',
                primary: '#6b6b6b',
                secondary: '#6c757d',
                accent: '#ff8272',
                success: '#8cc152',
                warning: '#ffc107',
                info: '#5c87de',
                error: '#f33155',
                link: '#2b72bd', //* Задано
                colorText: '#585a59',
                // Social color
                whatsapp: '#23d364',
                viber: '#7d3daf',
                vk: '#4a76a8',
            },
        },
    },
    icons: {
        iconfont: 'md',
    },
});
