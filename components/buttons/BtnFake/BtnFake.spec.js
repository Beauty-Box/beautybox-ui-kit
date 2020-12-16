import { shallowMount, mount } from '@vue/test-utils';

import BtnFake from './index';
import { vuetify } from '../../../plugins/vuetify';

describe('BtnFake', () => {
    it('has button tag', () => {
        const wrapper = shallowMount(BtnFake, { vuetify });
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    });
});
