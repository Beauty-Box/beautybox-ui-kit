import { shallowMount, mount } from '@vue/test-utils';

import Rating from './index';
import { vuetify } from '@ui-kit/plugins/vuetify.js';

describe('Rating', () => {
    it('has input tag', () => {
        const wrapper = mount(Rating, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
