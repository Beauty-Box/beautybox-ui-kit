import { shallowMount, mount } from '@vue/test-utils';

import InputPhone from './index';
import { vuetify } from '@ui-kit/plugins/vuetify.js';

describe('InputPhone', () => {
    it('has input tag', () => {
        const wrapper = mount(InputPhone, { vuetify });
        const inputWrapper = wrapper.find('input');
        expect(inputWrapper.element.tagName).toBe('INPUT');
    });

    it('uses mask', async () => {
        const wrapper = mount(InputPhone, {
            vuetify,
            propsData: {
                value: '79371400444',
            },
        });
        expect(wrapper.find('input').element.value).toBe('+7 (937) 140-04-44');
    });
});
