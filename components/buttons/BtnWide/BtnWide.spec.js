import { shallowMount, mount } from '@vue/test-utils';

import BtnWide from './index';
import { vuetify } from '../../../plugins/vuetify';

describe('BtnWide', () => {
    it('has button tag', () => {
        const wrapper = shallowMount(BtnWide, { vuetify });
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    });
});
