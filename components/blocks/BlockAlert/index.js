import './style.scss';

import VAlert from 'vuetify/lib/components/VAlert';

export default {
    name: 'BlockAlert',
    components: { VAlert },
    props: {
        color: {
            type: String,
            default: '#E8F6FF',
        },
        shadow: {
            type: String,
            default: '#2b72bd33',
        },
        icon: {
            type: String,
            default: 'info',
        },
        iconColor: {
            type: String,
            default: '#2B72BD',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        dismissible: {
            type: Boolean,
            default: true,
        },
    },
    render(h) {
        let children = [
            h(
                'h3',
                {
                    class: {
                        title: true,
                    },
                },
                this.title
            ),
            this.$slots.description,
        ];
        if (!this.$slots.description) {
            children.push(
                h(
                    'p',
                    {
                        class: {
                            description: true,
                        },
                    },
                    this.description
                )
            );
        }
        return h(
            'v-alert',
            {
                props: {
                    icon: this.icon,
                    color: this.color,
                    transition: this.transition,
                    dismissible: this.dismissible,
                },
                style: {
                    '--shadow': this.shadow,
                    '--icon-color': this.iconColor,
                },
            },
            children
        );
    },
};
