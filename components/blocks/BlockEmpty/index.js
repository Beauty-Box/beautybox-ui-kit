import './style.scss';

import VSvg from '../../icons/Svg';

export default {
    name: 'BlockEmpty',
    components: { VSvg },
    props: {
        icon: {
            type: String,
            default: 'user',
        },
        title: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
        center: {
            type: Boolean,
            default: false,
        },
        bigSize: {
            type: Boolean,
            default: false,
        },
    },
    template: `<div class="empty" :class="{ 'empty--centre': center, 'empty--big': bigSize }">
                            <slot name="image">
                                <v-svg v-if="icon" :name="icon" class="icon empty__icon" :class="'icon-' + icon" />
                            </slot>
                            <span v-if="title" class="empty__title">{{ title }}</span>
                            <p v-if="text || !!$slots.text" class="empty__text">
                                {{ text }}
                                <slot name="text" />
                            </p>
                          <slot name="buttons" />
                      </div>`,
};
