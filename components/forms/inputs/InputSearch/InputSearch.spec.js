import { shallowMount, mount } from '@vue/test-utils';

import InputSearch from './index';
import { vuetify } from '@ui-kit/plugins/vuetify.js';

describe('InputSearch', () => {
    it('has input tag', () => {
        const wrapper = shallowMount(InputSearch, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.selector).toBe('input');
    });
});
