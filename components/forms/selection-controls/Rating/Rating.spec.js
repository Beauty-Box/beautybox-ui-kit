import { shallowMount, mount } from '@vue/test-utils';
import { vuetify } from '../../../../plugins/vuetify';
import Rating from './index';

describe('Rating', () => {
    it('has input tag', () => {
        const wrapper = mount(Rating, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });
});
