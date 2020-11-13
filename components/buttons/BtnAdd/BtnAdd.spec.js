import { shallowMount, mount } from '@vue/test-utils';

import BtnAdd from './index';
import { vuetify } from '../plugins/vuetify';

describe('BtnAdd', () => {
    it('has button tag', () => {
        const wrapper = shallowMount(BtnAdd, { vuetify });
        const inputWrapper = wrapper.find('button');
        expect(inputWrapper.tagName).toBe('BUTTON');
    });
});
