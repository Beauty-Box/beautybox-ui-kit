import { mount } from '@vue/test-utils';

import BtnAdd from './index';
import { vuetify } from '../../../plugins/vuetify';

const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
};

describe('BtnAdd', () => {
    it('has button tag', () => {
        resizeWindow(300, 600);
        const wrapper = mount(BtnAdd, { vuetify });
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    });
});
