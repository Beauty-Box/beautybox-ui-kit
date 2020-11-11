import { shallowMount, mount } from '@vue/test-utils';

import InputSecurityCode from './index';
import { vuetify } from '@beautybox/ui-kit/plugins/vuetify.js';

describe('InputSecurityCode', () => {
    it('has input tag', () => {
        const wrapper = mount(InputSecurityCode, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
