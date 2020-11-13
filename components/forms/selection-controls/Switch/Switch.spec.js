import { shallowMount, mount } from '@vue/test-utils';
import { vuetify } from '../../../../plugins/vuetify';
import Switch from './index';

describe('Switch', () => {
    it('has input tag', () => {
        const wrapper = mount(Switch, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
