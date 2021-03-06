import { shallowMount, mount } from '@vue/test-utils';
import SelectGender from './index';
import { vuetify } from '../../../../plugins/vuetify';

describe('SelectGender', () => {
    it('has input tag', () => {
        const wrapper = mount(SelectGender, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
