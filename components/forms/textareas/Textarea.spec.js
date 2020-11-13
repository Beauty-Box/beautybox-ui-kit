import { shallowMount, mount } from '@vue/test-utils';

import Textarea from './index';
import { vuetify } from '../plugins/vuetify';

describe('Textarea', () => {
    it('has textarea tag', () => {
        const wrapper = mount(Textarea, { vuetify });
        const inputWrapper = wrapper.find('textarea');
        expect(inputWrapper.element.tagName).toBe('TEXTAREA');
    });
});
