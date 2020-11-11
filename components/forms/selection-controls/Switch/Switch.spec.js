import { shallowMount, mount } from '@vue/test-utils';

import Switch from './index';
import { vuetify } from '@beautybox/ui-kit/plugins/vuetify.js';

describe('Switch', () => {
    it('has input tag', () => {
        const wrapper = mount(Switch, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
