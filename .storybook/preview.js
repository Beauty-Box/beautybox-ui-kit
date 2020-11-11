import '../scss/main.scss';
import '../scss/storybook.scss';
import { configure, addDecorator } from '@storybook/vue';
import { addParameters } from '@storybook/client-api';

import Vue from 'vue';

import { vuetify } from '../plugins/vuetify';

import VueClipboard from 'vue-clipboard2';
import toastMessage from '@beautybox/core/mixins/toastMessage';
import mixins from '@beautybox/core/mixins.global';
import '@beautybox/core/filters.global';

Vue.use(mixins);
Vue.use(VueClipboard);
Vue.use(toastMessage);


// import results from '../.jest-test-results.json';

import { withTests } from '@storybook/addon-jest';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    }
})

addDecorator((storyFn) => ({
    vuetify,
    template: `<v-app>
                 <v-main>
                    <v-row class="justify-center align-center">
                        <v-col cols="6">
                            <story />
                        </v-col>
                    </v-row>
                 </v-main>
                </v-app>`,
}));

// addDecorator(withTests({ results }));

configure(require.context('../components', true, /\.stories\.js$/), module);
