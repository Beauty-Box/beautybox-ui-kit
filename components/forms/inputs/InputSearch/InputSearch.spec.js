import { shallowMount, mount } from '@vue/test-utils';
import { vuetify } from '../../../../plugins/vuetify';
import InputSearch from './index';

describe('InputSearch', () => {
    it('has input tag', () => {
        const wrapper = shallowMount(InputSearch, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.selector).toBe('input');
    });
});
