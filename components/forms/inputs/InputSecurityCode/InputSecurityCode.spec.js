import { shallowMount, mount } from '@vue/test-utils';
import { vuetify } from '../../../../plugins/vuetify';
import InputSecurityCode from './index';

describe('InputSecurityCode', () => {
    it('has input tag', () => {
        const wrapper = mount(InputSecurityCode, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
