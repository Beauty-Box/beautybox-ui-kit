import { shallowMount, mount } from '@vue/test-utils';

import FInput from './index';
import { vuetify } from '@beautybox/ui-kit/plugins/vuetify.js';

describe('InputSimple', () => {
    it('has input tag', () => {
        const wrapper = shallowMount(FInput, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.selector).toBe('input');
    });
});
