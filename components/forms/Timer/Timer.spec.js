import { shallowMount, mount } from '@vue/test-utils';

import Timer from './index';
import { vuetify } from '@ui-kit/plugins/vuetify.js';

describe('Timer', () => {
    it('has span tag', () => {
        const wrapper = mount(Timer, { vuetify });
        const inputWrapper = wrapper.find('span');
        expect(inputWrapper.element.tagName).toBe('SPAN');
    });
});
