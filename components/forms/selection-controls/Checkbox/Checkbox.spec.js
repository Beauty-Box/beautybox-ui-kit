import { shallowMount, mount } from '@vue/test-utils';

import Checkbox from './index';
import { vuetify } from '@ui-kit/plugins/vuetify.js';

describe('Checkbox', () => {
    it('has input tag', () => {
        const wrapper = mount(Checkbox, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });

    it('should be checked at change', async () => {
        const wrapper = mount(Checkbox, { vuetify });
        const wrapperInput = wrapper.find('input');
        await wrapperInput.trigger('change');
        expect(wrapperInput.attributes('aria-checked')).toBe('true');
    });
});
