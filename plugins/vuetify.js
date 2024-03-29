import Vue from 'vue';
import Vuetify, { VApp, VMain, VRow, VCol } from 'vuetify/lib';
import * as Components from 'vuetify/lib/components';
import * as Directives from 'vuetify/lib/directives';
import ru from 'vuetify/lib/locale/ru';

Vue.use(Vuetify, {
    components: Components,
    directives: Directives,
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
                return import.meta.env.MODE === 'production'
                    ? css.replace(/[\r\n|\r|\n]/g, '')
                    : css;
            },
        },
        themes: {
            light: {
                // Base colors
                primary: '#101928', //* Задано
                secondary: '#67768c', //* Задано
                muted: '#eef2f7', //* Задано
                accent: '#ff8272', //* Задано
                success: '#43B581', //* Задано
                warning: '#ffc107', //* Задано
                error: '#ff2d55', //* Задано
                info: '#0a84ff', //* Задано
                link: '#2b72bd', //* Задано
                ripple: '#67768c', //* Задано
                'info--active': '#4395FD',
                'success--light': '#34C759',
                // Background colors
                background: '#101928', // Задано
                'background--light': '#eef0f2', // Задано
                'background--lighten': '#f7f7f8', // Задано
                'info--light': '#ecf4ff',
                // Text colors
                'color-text': '#101928', //* Задано
                // Border colors
                'color-border': '#dee3e7', //* Задано
                // Social colors
                whatsapp: '#23d364',
                viber: '#7d3daf',
                vk: '#2787f5',
                telegram: '#5EB5F7',
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
                'info--active': '#4395FD',
                'success--light': '#34C759',
                // Social color
                whatsapp: '#23d364',
                viber: '#7d3daf',
                vk: '#2787f5',
                telegram: '#5EB5F7',
            },
        },
    },
    icons: {
        iconfont: 'md',
    },
});
