import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

import VueClipboard from 'vue-clipboard2';
import toastMessage from '@beautybox/core/mixins/toastMessage';

registerRequireContextHook();

Vue.use(VueClipboard);
Vue.use(toastMessage);
