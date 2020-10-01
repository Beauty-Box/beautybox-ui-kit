import './style.scss';
import VSvg from '@ui-kit/components/icons/Svg';

export default {
    name: 'BtnFake',
    components: { VSvg },
    props: {
        title: {
            type: String,
            default: '',
        },
        subTitle: {
            type: String,
            default: '',
        },
        iconSvg: {
            type: String,
            default: 'angle',
        },
        type: {
            type: String,
            default: 'button',
        },
    },
    template: `<button class="c-fake-btn" :type="type" v-on="$listeners">
    <span class="c-fake-btn__inner">
        <span v-if="title" class="c-fake-btn__title">{{ title }}</span>
        <span v-if="subTitle" class="c-fake-btn__subtitle">{{ subTitle }}</span>
    </span>
    <v-svg :name="iconSvg" class="c-fake-btn__icon" xs />
</button>`,
};
