import { shallowMount, mount } from '@vue/test-utils';

import BtnFake from './index';
import { vuetify } from '../plugins/vuetify';

describe('BtnFake', () => {
    it('has button tag', () => {
        const wrapper = shallowMount(BtnFake, { vuetify });
        const inputWrapper = wrapper.find('button');
        expect(inputWrapper.tagName).toBe('BUTTON');
    });
});
