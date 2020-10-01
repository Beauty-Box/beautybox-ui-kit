import { shallowMount, mount } from '@vue/test-utils';

import BtnWide from './index';
import { vuetify } from '@ui-kit/plugins/vuetify.js';

describe('BtnWide', () => {
    it('has button tag', () => {
        const wrapper = shallowMount(BtnWide, { vuetify });
        const inputWrapper = wrapper.find('button');
        expect(inputWrapper.tagName).toBe('BUTTON');
    });
});
