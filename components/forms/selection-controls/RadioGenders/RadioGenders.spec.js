import { shallowMount, mount } from '@vue/test-utils';

import RadioGenders from './index';
import { vuetify } from '@beautybox/ui-kit/plugins/vuetify.js';

describe('RadioGenders', () => {
    it('has input tag', () => {
        const wrapper = mount(RadioGenders, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
