import { shallowMount, mount } from '@vue/test-utils';
import { vuetify } from '../../../../plugins/vuetify';
import AutoComplete from './index';

describe('AutoComplete', () => {
    it('has input tag', () => {
        const wrapper = mount(AutoComplete, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
