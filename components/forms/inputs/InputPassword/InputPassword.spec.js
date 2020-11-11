import { shallowMount, mount } from '@vue/test-utils';
import { vuetify } from '../../../../plugins/vuetify';
import InputPassword from './index';

describe('InputPassword', () => {
    it('has input tag', () => {
        const wrapper = mount(InputPassword, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });

    it('shows password at icon click', async () => {
        const wrapper = mount(InputPassword, { vuetify });
        const showPasswordIcon = wrapper.find('button');
        await showPasswordIcon.trigger('click');
        expect(wrapper.find('input').attributes('type')).toBe('text');
    });
});
