import { shallowMount, mount } from '@vue/test-utils';

import BtnWide from './index';
import { vuetify } from '../plugins/vuetify';

describe('BtnWide', () => {
    it('has button tag', () => {
        const wrapper = shallowMount(BtnWide, { vuetify });
        const inputWrapper = wrapper.find('button');
        expect(inputWrapper.tagName).toBe('BUTTON');
    });
});
