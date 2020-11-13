import '../scss/main.scss';
import '../scss/storybook.scss';
import { addDecorator } from '@storybook/vue';
// import { addParameters } from '@storybook/client-api';

import Vue from 'vue';
import { vuetify } from '../plugins/vuetify';

import VueClipboard from 'vue-clipboard2';
import toastMessage from '@beautybox/core/mixins/toastMessage';
import mixins from '@beautybox/core/mixins.global';
import '@beautybox/core/filters.global';

Vue.use(mixins);
Vue.use(toastMessage);
Vue.use(VueClipboard);


// import results from '../.jest-test-results.json';

import { withTests } from '@storybook/addon-jest';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    }
}

addDecorator(() => ({
    vuetify,
    template: `
                        <v-app
                            id="app"
                            class="v-application v-application--is-ltr container--sm"
                            style="display:flex; flex-direction: column; margin: 0 auto;"
                       >
                            <story />
                        </v-app>`,
}));

// addDecorator(withTests({ results }));

// configure(require.context('../components', true, /\.stories\.js$/), module);
