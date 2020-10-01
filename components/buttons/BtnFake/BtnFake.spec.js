import { shallowMount, mount } from '@vue/test-utils';

import BtnFake from './index';
import { vuetify } from '@ui-kit/plugins/vuetify.js';

describe('BtnFake', () => {
    it('has button tag', () => {
        const wrapper = shallowMount(BtnFake, { vuetify });
        const inputWrapper = wrapper.find('button');
        expect(inputWrapper.tagName).toBe('BUTTON');
    });
});
