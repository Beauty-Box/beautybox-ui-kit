import { shallowMount, mount } from '@vue/test-utils';

import Timer from './index';
import { vuetify } from '../../../plugins/vuetify';

describe('Timer', () => {
    it('has span tag', () => {
        const wrapper = mount(Timer, { vuetify });
        const inputWrapper = wrapper.find('span');
        expect(inputWrapper.element.tagName).toBe('SPAN');
    });
});
