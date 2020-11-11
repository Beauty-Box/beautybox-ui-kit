import { shallowMount, mount } from '@vue/test-utils';

import BtnCopy from './index';
import { vuetify } from '@beautybox/ui-kit/plugins/vuetify.js';

describe('BtnCopy', () => {
    it('has button tag', () => {
        const wrapper = shallowMount(BtnCopy, {
            vuetify,
            propsData: {
                copyText: 'test',
            },
        });
        const inputWrapper = wrapper.find('button');
        expect(inputWrapper.tagName).toBe('BUTTON');
    });
});
