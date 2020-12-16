import { mount, createLocalVue } from '@vue/test-utils';
import VueClipboard from 'vue-clipboard2';
import BtnCopy from './index';
import { vuetify } from '../../../plugins/vuetify';

const localVue = createLocalVue();

localVue.use(VueClipboard);

describe('BtnCopy', () => {
    it('has button tag', () => {
        const wrapper = mount(BtnCopy, {
            vuetify,
            localVue,
            propsData: {
                copyText: 'test',
            },
        });
        const inputWrapper = wrapper.find('button');
        expect(inputWrapper.exists()).toBe(true);
    });
});
