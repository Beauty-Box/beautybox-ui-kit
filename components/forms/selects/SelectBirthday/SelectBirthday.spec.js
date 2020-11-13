import { shallowMount, mount } from '@vue/test-utils';
import SelectBirthday from './index';
import { vuetify } from '../../../../plugins/vuetify';

describe('SelectBirthday', () => {
    it('has input tag', () => {
        const wrapper = mount(SelectBirthday, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
