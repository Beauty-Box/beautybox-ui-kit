import { shallowMount, mount } from '@vue/test-utils';

import Select from './index';
import { vuetify } from '@ui-kit/plugins/vuetify.js';

describe('Select', () => {
    it('has input tag', () => {
        const wrapper = mount(Select, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
