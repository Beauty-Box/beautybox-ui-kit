import { shallowMount, mount } from '@vue/test-utils';
import { vuetify } from '../../../../plugins/vuetify';
import FInput from './index';

describe('InputSimple', () => {
    it('has input tag', () => {
        const wrapper = shallowMount(FInput, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.selector).toBe('input');
    });
});
