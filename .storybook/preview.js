import '../scss/main.scss';
import '../scss/storybook.scss';
import { configure, addDecorator } from '@storybook/vue';
import {addParameters} from '@storybook/client-api';

import Vue from 'vue';

import { vuetify } from '@ui-kit/plugins/vuetify';

import VueClipboard from 'vue-clipboard2';
import toastMessage from '@beautybox/core/mixins/toastMessage';
import checkPermission from '@beautybox/core/mixins/checkPermission';
import store from '@crm/store';
import mixins from '@beautybox/core/mixins.global';
import VuePreview from 'vue-preview';
import '@beautybox/core/filters.global';


Vue.use(VuePreview);
Vue.use(mixins);
Vue.use(checkPermission, { store });
Vue.use(VueClipboard);
Vue.use(toastMessage);


import results from '@ui-kit/.jest-test-results.json';

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

addDecorator(withTests({ results }));

configure(require.context('../components', true, /\.stories\.js$/), module);
