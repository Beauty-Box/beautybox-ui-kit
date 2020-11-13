import { shallowMount, mount } from '@vue/test-utils';
import { vuetify } from '../../../../plugins/vuetify';
import RadioGenders from './index';

describe('RadioGenders', () => {
    it('has input tag', () => {
        const wrapper = mount(RadioGenders, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
