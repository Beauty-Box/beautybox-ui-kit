import './style.scss';
import BSvg from '../../icons/Svg';

export default {
    name: 'BtnFake',
    components: { BSvg },
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
    /*template: `<button class="c-fake-btn" :type="type" v-on="$listeners">
                            <span class="c-fake-btn__inner">
                                <span v-if="title" class="c-fake-btn__title">{{ title }}</span>
                                <span v-if="subTitle" class="c-fake-btn__subtitle">{{ subTitle }}</span>
                            </span>
                            <v-svg :name="iconSvg" class="c-fake-btn__icon" xs />
                        </button>`,*/
    render(h) {
        return h(
            'button',
            {
                class: {
                    'c-fake-btn': true,
                },
                attrs: {
                    type: this.type,
                },
                on: this.$listeners,
            },
            [
                h(
                    'span',
                    {
                        class: {
                            'c-fake-btn__inner': true,
                        },
                    },
                    [
                        h(
                            'span',
                            {
                                class: {
                                    'c-fake-btn__title': true,
                                },
                            },
                            this.title
                        ),
                        h(
                            'span',
                            {
                                class: {
                                    'c-fake-btn__subtitle': true,
                                },
                            },
                            this.subTitle
                        ),
                    ]
                ),
                h('b-svg', {
                    class: {
                        'c-fake-btn__icon': true,
                    },
                    props: {
                        name: this.iconSvg,
                        xs: true,
                    },
                }),
            ]
        );
    },
};
