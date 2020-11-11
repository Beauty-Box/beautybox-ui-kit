import { shallowMount, mount } from '@vue/test-utils';

import AutoComplete from './index';
import { vuetify } from '@beautybox/ui-kit/plugins/vuetify.js';

describe('AutoComplete', () => {
    it('has input tag', () => {
        const wrapper = mount(AutoComplete, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
