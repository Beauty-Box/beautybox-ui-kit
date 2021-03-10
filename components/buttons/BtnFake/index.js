import './BtnFake.scss';
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
        obscureSubTitle: {
            type: Boolean,
            default: false,
        },
    },
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
                                    'text-truncate': this.obscureSubTitle,
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
